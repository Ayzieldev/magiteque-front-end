// Integrated Mental Health Assessment System
// DASS-21 (Depression, Anxiety and Stress Scale) + STAR of Well-Being
// Based on the official DASS-21 questionnaire and Positive Psychology framework

import { STAR_QUESTIONS, StarUserAnswer, calculateStarResults, StarAssessmentResult } from './star-assessment';

export interface Question {
  id: number;
  level: number;
  category: 'Depression' | 'Anxiety' | 'Stress' | 'Inherent' | 'Coherent';
  text: string;
  options: {
    '1': { stars: number; label: string; score: number };
    '2': { stars: number; label: string; score: number };
    '3': { stars: number; label: string; score: number };
    '4': { stars: number; label: string; score: number };
  };
}

export interface UserAnswer {
  questionId: number;
  selectedOption: '1' | '2' | '3' | '4';
  score: number;
}

export interface AssessmentResult {
  // DASS-21 Results
  depression: {
    score: number;
    percentage: number;
    status: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe';
  };
  anxiety: {
    score: number;
    percentage: number;
    status: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe';
  };
  stress: {
    score: number;
    percentage: number;
    status: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe';
  };
  overallScore: number;
  overallStatus: 'Healthy' | 'At Risk';

  // STAR Results
  starResults: StarAssessmentResult;

  // Combined Assessment
  assessmentType: 'DASS' | 'STAR' | 'COMBINED';
}

// Combined DASS-21 + STAR Assessment Questions
// Level-based progression with integrated well-being assessment
export const DASS_QUESTIONS: Question[] = [
  // DASS-21 Questions - All 21 questions in order
  // Stress: Items 1, 6, 8, 11, 12, 14, 18
  // Anxiety: Items 2, 4, 7, 9, 15, 19, 20
  // Depression: Items 3, 5, 10, 13, 16, 17, 21

  // Question 1 - Stress
  {
    id: 1,
    level: 1,
    category: 'Stress',
    text: 'I found it hard to wind down',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 2 - Anxiety
  {
    id: 2,
    level: 1,
    category: 'Anxiety',
    text: 'I was aware of dryness of my mouth',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 3 - Depression
  {
    id: 3,
    level: 1,
    category: 'Depression',
    text: "I couldn't seem to experience any positive feeling at all",
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 4 - Anxiety
  {
    id: 4,
    level: 1,
    category: 'Anxiety',
    text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 5 - Depression
  {
    id: 5,
    level: 1,
    category: 'Depression',
    text: 'I found it difficult to work up the initiative to do things',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 6 - Stress
  {
    id: 6,
    level: 2,
    category: 'Stress',
    text: 'I tended to over-react to situations',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 7 - Anxiety
  {
    id: 7,
    level: 2,
    category: 'Anxiety',
    text: 'I experienced trembling (e.g., in the hands)',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 8 - Stress
  {
    id: 8,
    level: 2,
    category: 'Stress',
    text: 'I felt that I was using a lot of nervous energy',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 9 - Anxiety
  {
    id: 9,
    level: 2,
    category: 'Anxiety',
    text: 'I was worried about situations in which I might panic and make a fool of myself',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 10 - Depression
  {
    id: 10,
    level: 2,
    category: 'Depression',
    text: 'I felt that I had nothing to look forward to',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 11 - Stress
  {
    id: 11,
    level: 3,
    category: 'Stress',
    text: 'I found myself getting agitated',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 12 - Stress
  {
    id: 12,
    level: 3,
    category: 'Stress',
    text: 'I found it difficult to relax',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 13 - Depression
  {
    id: 13,
    level: 3,
    category: 'Depression',
    text: 'I felt down-hearted and blue',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 14 - Stress
  {
    id: 14,
    level: 3,
    category: 'Stress',
    text: 'I was intolerant of anything that kept me from getting on with what I was doing',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 15 - Anxiety
  {
    id: 15,
    level: 3,
    category: 'Anxiety',
    text: 'I felt I was close to panic',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 16 - Depression
  {
    id: 16,
    level: 4,
    category: 'Depression',
    text: 'I was unable to become enthusiastic about anything',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 17 - Depression
  {
    id: 17,
    level: 4,
    category: 'Depression',
    text: "I felt I wasn't worth much as a person",
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 18 - Stress
  {
    id: 18,
    level: 4,
    category: 'Stress',
    text: 'I felt that I was rather touchy',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 19 - Anxiety
  {
    id: 19,
    level: 4,
    category: 'Anxiety',
    text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 20 - Anxiety
  {
    id: 20,
    level: 4,
    category: 'Anxiety',
    text: 'I felt scared without any good reason',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  // Question 21 - Depression
  {
    id: 21,
    level: 4,
    category: 'Depression',
    text: 'I felt that life was meaningless',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  }
];

// Combined Assessment - DASS-21 + STAR Questions
// Total: 33 questions (21 DASS + 12 STAR)
export const QUESTIONS: Question[] = [
  ...DASS_QUESTIONS,
  ...STAR_QUESTIONS.map(starQuestion => ({
    id: starQuestion.id,
    level: starQuestion.level,
    category: starQuestion.category,
    text: starQuestion.text,
    options: starQuestion.options
  }))
];

// DASS-21 Scoring and Interpretation
// Severity Level	Depression	Anxiety	Stress
// Normal	        0–9	        0–7	        0–14
// Mild	        10–13	8–9	        15–18
// Moderate	14–20	10–14	19–25
// Severe	        21–27	15–19	26–33
// Extremely Severe	28+	        20+	        34+

// Helper functions for assessment calculations
export const calculateResults = (answers: UserAnswer[]): AssessmentResult => {
  // Separate DASS and STAR answers
  const dassAnswers = answers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Depression' || question?.category === 'Anxiety' || question?.category === 'Stress';
  });

  const starAnswers: StarUserAnswer[] = answers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Inherent' || question?.category === 'Coherent';
  }).map(answer => ({
    questionId: answer.questionId,
    selectedOption: answer.selectedOption,
    score: answer.score
  }));

  // Calculate DASS results
  const depressionAnswers = dassAnswers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Depression';
  });

  const anxietyAnswers = dassAnswers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Anxiety';
  });

  const stressAnswers = dassAnswers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Stress';
  });

  const calculateCategoryScore = (categoryAnswers: UserAnswer[]) => {
    const rawScore = categoryAnswers.reduce((sum, answer) => sum + answer.score, 0);
    // DASS-21 scoring: multiply by 2 to match DASS-42
    const finalScore = rawScore * 2;
    const maxPossibleScore = categoryAnswers.length * 3 * 2; // Max score per question is 3, then multiply by 2
    const percentage = maxPossibleScore > 0 ? (finalScore / maxPossibleScore) * 100 : 0;
    
    return { score: finalScore, percentage: Math.round(percentage) };
  };

  const getSeverityStatus = (score: number, category: 'Depression' | 'Anxiety' | 'Stress'): 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe' => {
    if (category === 'Depression') {
      if (score <= 9) return 'Normal';
      if (score <= 13) return 'Mild';
      if (score <= 20) return 'Moderate';
      if (score <= 27) return 'Severe';
      return 'Extremely Severe';
    } else if (category === 'Anxiety') {
      if (score <= 7) return 'Normal';
      if (score <= 9) return 'Mild';
      if (score <= 14) return 'Moderate';
      if (score <= 19) return 'Severe';
      return 'Extremely Severe';
    } else { // Stress
      if (score <= 14) return 'Normal';
      if (score <= 18) return 'Mild';
      if (score <= 25) return 'Moderate';
      if (score <= 33) return 'Severe';
      return 'Extremely Severe';
    }
  };

  const depression = calculateCategoryScore(depressionAnswers);
  const anxiety = calculateCategoryScore(anxietyAnswers);
  const stress = calculateCategoryScore(stressAnswers);
  
  const depressionStatus = getSeverityStatus(depression.score, 'Depression');
  const anxietyStatus = getSeverityStatus(anxiety.score, 'Anxiety');
  const stressStatus = getSeverityStatus(stress.score, 'Stress');

  const overallScore = depression.score + anxiety.score + stress.score;
  const overallPercentage = (depression.percentage + anxiety.percentage + stress.percentage) / 3;
  const overallStatus = overallPercentage < 40 ? 'Healthy' : 'At Risk';

  // Calculate STAR results
  const starResults = calculateStarResults(starAnswers);

  // Determine assessment type
  const hasDassAnswers = dassAnswers.length > 0;
  const hasStarAnswers = starAnswers.length > 0;
  let assessmentType: 'DASS' | 'STAR' | 'COMBINED' = 'COMBINED';

  if (hasDassAnswers && !hasStarAnswers) assessmentType = 'DASS';
  else if (!hasDassAnswers && hasStarAnswers) assessmentType = 'STAR';

  return {
    depression: { ...depression, status: depressionStatus },
    anxiety: { ...anxiety, status: anxietyStatus },
    stress: { ...stress, status: stressStatus },
    overallScore,
    overallStatus,
    starResults,
    assessmentType
  };
};

export const getQuestionsByLevel = (level: number): Question[] => {
  return QUESTIONS.filter(q => q.level === level);
};

export const getTotalQuestions = (): number => {
  return QUESTIONS.length;
};

export const getMaxLevel = (): number => {
  return Math.max(...QUESTIONS.map(q => q.level));
};
