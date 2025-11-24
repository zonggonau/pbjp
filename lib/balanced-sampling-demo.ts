import { balancedSampling, autoBalancedSampling, calculateOptimalGroupCount } from './balanced-sampling'
import { NormalizedQuestion } from './utils'

// Demo function to test balanced sampling
export function demoBalancedSampling() {
  console.log('🎯 Balanced Sampling Demo')
  console.log('================================')

  // Create sample questions for testing
  const sampleQuestions: NormalizedQuestion[] = []
  for (let i = 1; i <= 1000; i++) {
    sampleQuestions.push({
      id: i,
      question: `Question ${i}`,
      options: {
        A: `Option A for question ${i}`,
        B: `Option B for question ${i}`,
        C: `Option C for question ${i}`,
        D: `Option D for question ${i}`
      },
      answer: 'A',
      explanation: { correct: `Explanation for question ${i}` },
      tags: [`tag${i % 10}`],
      difficulty: ['easy', 'medium', 'hard'][i % 3]
    })
  }

  console.log(`📊 Total questions available: ${sampleQuestions.length}`)
  console.log(`🎯 Target sample size: 100 questions`)
  console.log(`📋 Default groups: 10`)
  console.log('')

  // Test 1: Basic balanced sampling
  console.log('Test 1: Basic Balanced Sampling')
  console.log('--------------------------------')
  const balanced1 = balancedSampling(sampleQuestions, {
    totalQuestions: 100,
    groupCount: 10,
    shuffleWithinGroups: false,
    shuffleGroups: false
  })
  
  console.log(`✅ Selected ${balanced1.length} questions`)
  console.log(`📊 Distribution per group:`)
  
  // Check distribution
  const distribution: { [key: number]: number } = {}
  balanced1.forEach(q => {
    const groupIndex = (q.id as number - 1) % 10
    distribution[groupIndex] = (distribution[groupIndex] || 0) + 1
  })
  
  Object.entries(distribution)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .forEach(([group, count]) => {
      console.log(`   Group ${group}: ${count} questions`)
    })

  console.log('')

  // Test 2: Auto balanced sampling
  console.log('Test 2: Auto Balanced Sampling')
  console.log('-------------------------------')
  const autoBalanced = autoBalancedSampling(sampleQuestions, 100, {
    shuffleWithinGroups: true,
    shuffleGroups: true
  })
  
  console.log(`✅ Selected ${autoBalanced.length} questions`)
  console.log(`🔀 Questions are shuffled within and between groups`)

  console.log('')

  // Test 3: Optimal group calculation
  console.log('Test 3: Optimal Group Calculation')
  console.log('----------------------------------')
  
  const scenarios = [
    { total: 1000, sample: 50 },
    { total: 1000, sample: 100 },
    { total: 1000, sample: 200 },
    { total: 500, sample: 100 },
    { total: 100, sample: 50 }
  ]

  scenarios.forEach(({ total, sample }) => {
    const optimalGroups = calculateOptimalGroupCount(total, sample)
    console.log(`📊 ${total} total, ${sample} sample → ${optimalGroups} groups`)
  })

  console.log('')

  // Test 4: Edge cases
  console.log('Test 4: Edge Cases')
  console.log('--------------------')

  // Case 1: Sample larger than population
  const edge1 = balancedSampling(sampleQuestions.slice(0, 50), {
    totalQuestions: 100
  })
  console.log(`🔄 Sample larger than available: ${edge1.length} questions (should be 50)`)

  // Case 5: Empty array
  const edge2 = balancedSampling([], { totalQuestions: 10 })
  console.log(`🔄 Empty array: ${edge2.length} questions (should be 0)`)

  // Case 6: Single group
  const edge3 = balancedSampling(sampleQuestions, {
    totalQuestions: 50,
    groupCount: 1
  })
  console.log(`🔄 Single group: ${edge3.length} questions`)

  console.log('')
  console.log('✅ Demo completed successfully!')
  console.log('')
  console.log('🎯 Key Benefits of Balanced Sampling:')
  console.log('   • Even distribution across the entire question pool')
  console.log('   • Prevents clustering of questions from the same section')
  console.log('   • More representative sample than pure random selection')
  console.log('   • Configurable group count and shuffling options')
  console.log('   • Handles edge cases gracefully')
  
  return {
    basicBalanced: balanced1,
    autoBalanced: autoBalanced,
    edgeCases: {
      largerSample: edge1,
      emptyArray: edge2,
      singleGroup: edge3
    }
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  demoBalancedSampling()
}
