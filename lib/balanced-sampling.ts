import { NormalizedQuestion } from './utils'

export interface BalancedByTensOptions {
  totalQuestions: number
  shuffleWithinGroups?: boolean
  shuffleGroups?: boolean
  seed?: number
}

export interface BalancedSamplingOptions {
  totalQuestions: number
  groupCount?: number
  shuffleWithinGroups?: boolean
  shuffleGroups?: boolean
  seed?: number
}

/**
 * General balanced sampling function that divides questions into specified number of groups.
 * Ensures even distribution across all groups.
 * 
 * @param questions - Array of normalized questions
 * @param options - Configuration options for balanced sampling
 * @returns Array of evenly distributed questions
 */
export function balancedSampling(
  questions: NormalizedQuestion[],
  options: BalancedSamplingOptions
): NormalizedQuestion[] {
  const { totalQuestions, groupCount = 10, shuffleWithinGroups = true, shuffleGroups = true, seed } = options

  // Validate inputs
  if (!Array.isArray(questions) || questions.length === 0) {
    return []
  }

  if (totalQuestions <= 0) {
    return []
  }

  // Limit to available questions
  const actualTotal = Math.min(totalQuestions, questions.length)

  // Create groups
  const groups = createGroups(questions, groupCount)

  // Calculate how many questions to take from each group
  const questionsPerGroup = Math.floor(actualTotal / groups.length)
  const remainder = actualTotal % groups.length

  const selectedQuestions: NormalizedQuestion[] = []

  // Shuffle groups if requested
  const groupOrder = shuffleGroups
    ? seed 
      ? shuffleWithSeed(Array.from({ length: groups.length }, (_, i) => i), seed)
      : shuffleArray(Array.from({ length: groups.length }, (_, i) => i))
    : Array.from({ length: groups.length }, (_, i) => i)

  // Select questions from each group
  for (let i = 0; i < groupOrder.length; i++) {
    const groupIndex = groupOrder[i]
    const group = groups[groupIndex]

    if (!group || group.length === 0) continue

    // Determine how many questions to take from this group
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

  return selectedQuestions
}

/**
 * Auto balanced sampling that automatically determines optimal group count.
 * 
 * @param questions - Array of normalized questions
 * @param totalQuestions - Number of questions to select
 * @param options - Optional configuration
 * @returns Array of evenly distributed questions
 */
export function autoBalancedSampling(
  questions: NormalizedQuestion[],
  totalQuestions: number,
  options: Omit<BalancedSamplingOptions, 'totalQuestions' | 'groupCount'> = {}
): NormalizedQuestion[] {
  const optimalGroups = calculateOptimalGroupCount(questions.length, totalQuestions)
  
  return balancedSampling(questions, {
    totalQuestions,
    groupCount: optimalGroups,
    ...options
  })
}

/**
 * Calculates the optimal number of groups for balanced sampling.
 * 
 * @param totalQuestions - Total number of available questions
 * @param sampleSize - Desired sample size
 * @returns Optimal number of groups
 */
export function calculateOptimalGroupCount(totalQuestions: number, sampleSize: number): number {
  if (totalQuestions <= 0 || sampleSize <= 0) {
    return 1
  }

  // Ensure we don't request more questions than available
  const actualSampleSize = Math.min(sampleSize, totalQuestions)

  // Calculate groups to ensure at least 1 question per group
  // Rule of thumb: groups should be between 5-20, and each group should have multiple questions
  const minGroups = Math.max(1, Math.floor(actualSampleSize / 5))
  const maxGroups = Math.min(20, Math.floor(totalQuestions / 3))

  // Default to 10 groups if within reasonable range
  if (minGroups <= 10 && maxGroups >= 10) {
    return 10
  }

  // Otherwise use the middle of the valid range
  return Math.max(minGroups, Math.min(maxGroups, Math.ceil(actualSampleSize / 2)))
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
 * Divides questions into groups based on their original order.
 */
function createGroups(questions: NormalizedQuestion[], groupCount: number): NormalizedQuestion[][] {
  const groups: NormalizedQuestion[][] = Array.from({ length: groupCount }, () => [])

  questions.forEach((question, index) => {
    const groupIndex = index % groupCount
    groups[groupIndex].push(question)
  })

  return groups.filter(group => group.length > 0)
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
    const group = questions.filter(q => {
      const questionId = typeof q.id === 'number' ? q.id : parseInt(q.id.toString())
      return questionId >= start && questionId <= end
    })
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
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
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
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
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
