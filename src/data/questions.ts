// DASS-21 (Depression, Anxiety and Stress Scale) Questions Database
// Based on the official DASS-21 questionnaire

export interface Question {
  id: number;
  level: number;
  category: 'Depression' | 'Anxiety' | 'Stress';
  text: string;
  options: {
    never: { text: string; score: number };
    sometimes: { text: string; score: number };
    often: { text: string; score: number };
    almost_always: { text: string; score: number };
  };
}

export interface UserAnswer {
  questionId: number;
  selectedOption: 'never' | 'sometimes' | 'often' | 'almost_always';
  score: number;
}

export interface AssessmentResult {
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
}

export const QUESTIONS: Question[] = [
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
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 2 - Anxiety
  {
    id: 2,
    level: 1,
    category: 'Anxiety',
    text: 'I was aware of dryness of my mouth',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 3 - Depression
  {
    id: 3,
    level: 1,
    category: 'Depression',
    text: "I couldn't seem to experience any positive feeling at all",
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 4 - Anxiety
  {
    id: 4,
    level: 1,
    category: 'Anxiety',
    text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 5 - Depression
  {
    id: 5,
    level: 1,
    category: 'Depression',
    text: 'I found it difficult to work up the initiative to do things',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 6 - Stress
  {
    id: 6,
    level: 2,
    category: 'Stress',
    text: 'I tended to over-react to situations',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 7 - Anxiety
  {
    id: 7,
    level: 2,
    category: 'Anxiety',
    text: 'I experienced trembling (e.g., in the hands)',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 8 - Stress
  {
    id: 8,
    level: 2,
    category: 'Stress',
    text: 'I felt that I was using a lot of nervous energy',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 9 - Anxiety
  {
    id: 9,
    level: 2,
    category: 'Anxiety',
    text: 'I was worried about situations in which I might panic and make a fool of myself',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 10 - Depression
  {
    id: 10,
    level: 2,
    category: 'Depression',
    text: 'I felt that I had nothing to look forward to',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 11 - Stress
  {
    id: 11,
    level: 3,
    category: 'Stress',
    text: 'I found myself getting agitated',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 12 - Stress
  {
    id: 12,
    level: 3,
    category: 'Stress',
    text: 'I found it difficult to relax',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 13 - Depression
  {
    id: 13,
    level: 3,
    category: 'Depression',
    text: 'I felt down-hearted and blue',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 14 - Stress
  {
    id: 14,
    level: 3,
    category: 'Stress',
    text: 'I was intolerant of anything that kept me from getting on with what I was doing',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 15 - Anxiety
  {
    id: 15,
    level: 3,
    category: 'Anxiety',
    text: 'I felt I was close to panic',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 16 - Depression
  {
    id: 16,
    level: 4,
    category: 'Depression',
    text: 'I was unable to become enthusiastic about anything',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 17 - Depression
  {
    id: 17,
    level: 4,
    category: 'Depression',
    text: "I felt I wasn't worth much as a person",
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 18 - Stress
  {
    id: 18,
    level: 4,
    category: 'Stress',
    text: 'I felt that I was rather touchy',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 19 - Anxiety
  {
    id: 19,
    level: 4,
    category: 'Anxiety',
    text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 20 - Anxiety
  {
    id: 20,
    level: 4,
    category: 'Anxiety',
    text: 'I felt scared without any good reason',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  },
  // Question 21 - Depression
  {
    id: 21,
    level: 4,
    category: 'Depression',
    text: 'I felt that life was meaningless',
    options: {
      never: { text: 'Did not apply to me at all', score: 0 },
      sometimes: { text: 'Applied to me to some degree, or some of the time', score: 1 },
      often: { text: 'Applied to me to a considerable degree, or a good part of time', score: 2 },
      almost_always: { text: 'Applied to me very much, or most of the time', score: 3 }
    }
  }
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
  const depressionAnswers = answers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Depression';
  });
  
  const anxietyAnswers = answers.filter(answer => {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Anxiety';
  });
  
  const stressAnswers = answers.filter(answer => {
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

  return {
    depression: { ...depression, status: depressionStatus },
    anxiety: { ...anxiety, status: anxietyStatus },
    stress: { ...stress, status: stressStatus },
    overallScore,
    overallStatus
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