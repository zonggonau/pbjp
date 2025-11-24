import { NormalizedQuestion } from './utils'

export interface BalancedByTensOptions {
  totalQuestions: number
  shuffleWithinGroups?: boolean
  shuffleGroups?: boolean
  seed?: number
}

/**
 * Implements balanced sampling for questions divided by tens (1-10, 11-20, etc.).
 * Ensures each 10-range (1-10, 11-20, etc.) has at least one question selected.
 * 
 * @param questions - Array of normalized questions
 * @param options - Configuration options for balanced sampling by tens
 * @returns Array of evenly distributed questions
 */
export function balancedByTens(
  questions: NormalizedQuestion[],
  options: BalancedByTensOptions
): NormalizedQuestion[] {
  const { totalQuestions, shuffleWithinGroups = true, shuffleGroups = true, seed } = options

  // Validate inputs
  if (!Array.isArray(questions) || questions.length === 0) {
    return []
  }

  if (totalQuestions <= 0) {
    return []
  }

  // Create groups by tens (1-10, 11-20, ..., 581-590)
  const groups = createTensGroups(questions)

  // Calculate how many questions to take from each group
  const questionsPerGroup = Math.floor(totalQuestions / groups.length)
  const remainder = totalQuestions % groups.length

  const selectedQuestions: NormalizedQuestion[] = []

  // Shuffle groups if requested
  const groupOrder = shuffleGroups
    ? seed 
      ? shuffleWithSeed(Array.from({ length: groups.length }, (_, i) => i), seed)
      : shuffleArray(Array.from({ length: groups.length }, (_, i) => i))
    : Array.from({ length: groups.length }, (_, i) => i)

  // Select one question from each group
  for (let i = 0; i < groupOrder.length; i++) {
    const groupIndex = groupOrder[i]
    const group = groups[groupIndex]

    if (!group || group.length === 0) continue

    // Ensure we select at least one question from each group
    selectedQuestions.push(group[Math.floor(Math.random() * group.length)])

    // Now handle the remaining questions (if any)
    let takeFromGroup = questionsPerGroup
    if (i < remainder) {
      takeFromGroup += 1
    }

    // Limit to available questions in group
    takeFromGroup = Math.min(takeFromGroup, group.length)

    // Shuffle within group if requested
    const groupToSample = shuffleWithinGroups
      ? seed 
        ? shuffleWithSeed([...group], seed + groupIndex)
        : shuffleArray([...group])
      : [...group]

    // Take the required number of questions
    selectedQuestions.push(...groupToSample.slice(0, takeFromGroup))
  }

  // Ensure we don't exceed the requested total
  return selectedQuestions.slice(0, totalQuestions)
}

/**
 * Divides questions into groups based on their original order, dividing them by tens (1-10, 11-20, ...).
 */
function createTensGroups(questions: NormalizedQuestion[]): NormalizedQuestion[][] {
  const groups: NormalizedQuestion[][] = []

  // Create 59 groups (1-10, 11-20, ..., 581-590)
  for (let i = 0; i < 59; i++) {
    const start = i * 10 + 1
    const end = Math.min(start + 9, 586)

    // Collect questions in this range
    const group = questions.filter(q => q.id >= start && q.id <= end)
    groups.push(group)
  }

  return groups.filter(group => group.length > 0)
}

/**
 * Fisher-Yates shuffle algorithm with optional seed for reproducible results.
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Seeded shuffle for reproducible results (useful for testing).
 */
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array]
  let random = seededRandom(seed)

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Seeded random number generator.
 */
function seededRandom(seed: number): () => number {
  let state = seed
  return function() {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}
