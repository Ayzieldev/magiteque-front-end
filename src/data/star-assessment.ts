// STAR of Well-Being Assessment
// Based on Positive Psychology and Well-being Science
// Complements DASS-21 by focusing on positive mental health attributes

export interface StarQuestion {
  id: number;
  level: number;
  category: 'Inherent' | 'Coherent';
  attribute: string; // e.g., 'Resilience', 'Mindfulness', 'Optimism', etc.
  text: string;
  options: {
    '1': { stars: number; label: string; score: number };
    '2': { stars: number; label: string; score: number };
    '3': { stars: number; label: string; score: number };
    '4': { stars: number; label: string; score: number };
  };
}

export interface StarUserAnswer {
  questionId: number;
  selectedOption: '1' | '2' | '3' | '4';
  score: number;
}

export interface StarAssessmentResult {
  inherent: {
    score: number;
    percentage: number;
    level: 'Low' | 'Moderate' | 'High' | 'Excellent';
    attributes: {
      resilience: { score: number; percentage: number };
      optimism: { score: number; percentage: number };
      emotional_intelligence: { score: number; percentage: number };
      self_awareness: { score: number; percentage: number };
    };
  };
  coherent: {
    score: number;
    percentage: number;
    level: 'Low' | 'Moderate' | 'High' | 'Excellent';
    attributes: {
      mindfulness: { score: number; percentage: number };
      healthy_relationships: { score: number; percentage: number };
      work_life_balance: { score: number; percentage: number };
      healthy_habits: { score: number; percentage: number };
    };
  };
  overallScore: number;
  overallLevel: 'Low' | 'Moderate' | 'High' | 'Excellent';
}

// STAR of Well-Being Questions Database
// 12 questions total (6 Inherent + 6 Coherent attributes)
export const STAR_QUESTIONS: StarQuestion[] = [
  // Level 1 - Foundation (Questions 1-3)
  // Inherent Attributes
  {
    id: 101,
    level: 1,
    category: 'Inherent',
    attribute: 'Resilience',
    text: 'I bounce back quickly from setbacks and challenges',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 102,
    level: 1,
    category: 'Inherent',
    attribute: 'Optimism',
    text: 'I generally expect positive outcomes in my life',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 103,
    level: 1,
    category: 'Coherent',
    attribute: 'Mindfulness',
    text: 'I practice being present and aware in the moment',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },

  // Level 2 - Growth (Questions 4-6)
  {
    id: 104,
    level: 2,
    category: 'Inherent',
    attribute: 'Emotional_Intelligence',
    text: 'I understand and manage my emotions effectively',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 105,
    level: 2,
    category: 'Coherent',
    attribute: 'Healthy_Relationships',
    text: 'I maintain positive and supportive relationships',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 106,
    level: 2,
    category: 'Inherent',
    attribute: 'Self_Awareness',
    text: 'I have a clear understanding of my strengths and weaknesses',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },

  // Level 3 - Mastery (Questions 7-9)
  {
    id: 107,
    level: 3,
    category: 'Coherent',
    attribute: 'Work_Life_Balance',
    text: 'I maintain a healthy balance between work and personal life',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 108,
    level: 3,
    category: 'Coherent',
    attribute: 'Healthy_Habits',
    text: 'I consistently practice healthy habits (exercise, nutrition, sleep)',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 109,
    level: 3,
    category: 'Inherent',
    attribute: 'Resilience',
    text: 'I learn and grow from difficult experiences',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },

  // Level 4 - Excellence (Questions 10-12)
  {
    id: 110,
    level: 4,
    category: 'Coherent',
    attribute: 'Mindfulness',
    text: 'I regularly engage in mindfulness or meditation practices',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 111,
    level: 4,
    category: 'Inherent',
    attribute: 'Optimism',
    text: 'I maintain a positive outlook even during challenging times',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  },
  {
    id: 112,
    level: 4,
    category: 'Inherent',
    attribute: 'Emotional_Intelligence',
    text: 'I can empathize with and understand others\' perspectives',
    options: {
      '1': { stars: 1, label: 'Never', score: 0 },
      '2': { stars: 2, label: 'Sometimes', score: 1 },
      '3': { stars: 3, label: 'Often', score: 2 },
      '4': { stars: 4, label: 'Almost Always', score: 3 }
    }
  }
];

// Helper functions for STAR assessment
export const getStarQuestionsByLevel = (level: number): StarQuestion[] => {
  return STAR_QUESTIONS.filter(q => q.level === level);
};

export const getTotalStarQuestions = (): number => {
  return STAR_QUESTIONS.length;
};

export const getMaxStarLevel = (): number => {
  return Math.max(...STAR_QUESTIONS.map(q => q.level));
};

export const getStarQuestionsByCategory = (category: 'Inherent' | 'Coherent'): StarQuestion[] => {
  return STAR_QUESTIONS.filter(q => q.category === category);
};

export const getStarQuestionsByAttribute = (attribute: string): StarQuestion[] => {
  return STAR_QUESTIONS.filter(q => q.attribute.toLowerCase() === attribute.toLowerCase());
};

// STAR Assessment Scoring and Interpretation
// Scoring ranges for individual attributes and overall categories
export const calculateStarResults = (answers: StarUserAnswer[]): StarAssessmentResult => {
  // Separate answers by category
  const inherentAnswers = answers.filter(answer => {
    const question = STAR_QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Inherent';
  });

  const coherentAnswers = answers.filter(answer => {
    const question = STAR_QUESTIONS.find(q => q.id === answer.questionId);
    return question?.category === 'Coherent';
  });

  // Calculate individual attribute scores
  const calculateAttributeScore = (answers: StarUserAnswer[], attribute: string): { score: number; percentage: number } => {
    const attributeAnswers = answers.filter(answer => {
      const question = STAR_QUESTIONS.find(q => q.id === answer.questionId);
      return question?.attribute.toLowerCase() === attribute.toLowerCase();
    });

    if (attributeAnswers.length === 0) return { score: 0, percentage: 0 };

    const rawScore = attributeAnswers.reduce((sum, answer) => sum + answer.score, 0);
    const maxPossibleScore = attributeAnswers.length * 3; // Max score per question is 3
    const percentage = maxPossibleScore > 0 ? (rawScore / maxPossibleScore) * 100 : 0;

    return { score: rawScore, percentage: Math.round(percentage) };
  };

  // Calculate category totals
  const inherentTotalScore = inherentAnswers.reduce((sum, answer) => sum + answer.score, 0);
  const coherentTotalScore = coherentAnswers.reduce((sum, answer) => sum + answer.score, 0);

  const inherentMaxScore = inherentAnswers.length * 3;
  const coherentMaxScore = coherentAnswers.length * 3;

  const inherentPercentage = inherentMaxScore > 0 ? (inherentTotalScore / inherentMaxScore) * 100 : 0;
  const coherentPercentage = coherentMaxScore > 0 ? (coherentTotalScore / coherentMaxScore) * 100 : 0;

  // Get well-being level based on percentage
  const getWellbeingLevel = (percentage: number): 'Low' | 'Moderate' | 'High' | 'Excellent' => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'High';
    if (percentage >= 40) return 'Moderate';
    return 'Low';
  };

  // Calculate individual attributes
  const inherentAttributes = {
    resilience: calculateAttributeScore(inherentAnswers, 'Resilience'),
    optimism: calculateAttributeScore(inherentAnswers, 'Optimism'),
    emotional_intelligence: calculateAttributeScore(inherentAnswers, 'Emotional_Intelligence'),
    self_awareness: calculateAttributeScore(inherentAnswers, 'Self_Awareness')
  };

  const coherentAttributes = {
    mindfulness: calculateAttributeScore(coherentAnswers, 'Mindfulness'),
    healthy_relationships: calculateAttributeScore(coherentAnswers, 'Healthy_Relationships'),
    work_life_balance: calculateAttributeScore(coherentAnswers, 'Work_Life_Balance'),
    healthy_habits: calculateAttributeScore(coherentAnswers, 'Healthy_Habits')
  };

  const overallScore = inherentTotalScore + coherentTotalScore;
  const overallMaxScore = inherentMaxScore + coherentMaxScore;
  const overallPercentage = overallMaxScore > 0 ? (overallScore / overallMaxScore) * 100 : 0;

  return {
    inherent: {
      score: inherentTotalScore,
      percentage: Math.round(inherentPercentage),
      level: getWellbeingLevel(inherentPercentage),
      attributes: inherentAttributes
    },
    coherent: {
      score: coherentTotalScore,
      percentage: Math.round(coherentPercentage),
      level: getWellbeingLevel(coherentPercentage),
      attributes: coherentAttributes
    },
    overallScore,
    overallLevel: getWellbeingLevel(overallPercentage)
  };
};

// Helper function to get well-being insights based on results
export const getStarInsights = (results: StarAssessmentResult): string[] => {
  const insights: string[] = [];

  // Overall well-being insights
  if (results.overallLevel === 'Excellent') {
    insights.push("🎉 Excellent overall well-being! You're thriving in both natural strengths and learned behaviors.");
  } else if (results.overallLevel === 'High') {
    insights.push("🌟 Strong well-being foundation! You're doing great with both inherent and coherent attributes.");
  } else if (results.overallLevel === 'Moderate') {
    insights.push("📈 Good progress! There's room to strengthen both your natural abilities and daily habits.");
  } else {
    insights.push("🌱 Building well-being foundation. Focus on developing both your inherent strengths and positive habits.");
  }

  // Inherent attributes insights
  if (results.inherent.percentage < 60) {
    insights.push("💪 Consider activities that build resilience, optimism, and emotional intelligence - your natural strengths.");
  }

  // Coherent attributes insights
  if (results.coherent.percentage < 60) {
    insights.push("🧘 Focus on building healthy habits like mindfulness, balanced relationships, and work-life harmony.");
  }

  // Specific attribute insights
  if (results.inherent.attributes.resilience.percentage < 50) {
    insights.push("🏋️‍♀️ Building resilience: Try journaling about challenges you've overcome to build confidence.");
  }

  if (results.coherent.attributes.mindfulness.percentage < 50) {
    insights.push("🧘 Mindfulness practice: Even 5 minutes daily can make a big difference in your awareness.");
  }

  if (results.coherent.attributes.healthy_relationships.percentage < 50) {
    insights.push("🤝 Nurture relationships: Reach out to friends or family for meaningful connections.");
  }

  return insights;
};
