import React, { useState } from 'react';
import './scss/main.scss';
import StartScreen from './components/StartScreen';
import BlobCursor from './components/blob';
import CircularProgress from './components/CircularProgress';
import { QUESTIONS, UserAnswer, calculateResults } from './data/questions';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setCurrentLevel(1);
    setAnswers([]);
    setSelectedAnswer('');
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    // Save the answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: selectedAnswer as 'never' | 'sometimes' | 'often' | 'almost_always',
      score: currentQuestion.options[selectedAnswer as keyof typeof currentQuestion.options].score
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Check if this is the last question
    if (currentQuestionIndex >= totalQuestions - 1) {
      // Show results
      setShowResults(true);
      setShowAssessment(false);
      return;
    }

    // Move to next question
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    
    // Check for level progression
    const nextQuestion = QUESTIONS[nextIndex];
    if (nextQuestion && nextQuestion.level > currentLevel) {
      setCurrentLevel(nextQuestion.level);
      // TODO: Show level up animation
    }
    
    setSelectedAnswer('');
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Remove the last answer
      const updatedAnswers = answers.slice(0, -1);
      setAnswers(updatedAnswers);
      
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // Update level if needed
      const prevQuestion = QUESTIONS[prevIndex];
      if (prevQuestion && prevQuestion.level < currentLevel) {
        setCurrentLevel(prevQuestion.level);
      }
      
      setSelectedAnswer('');
    } else {
      // Go back to start screen if on first question
      setShowAssessment(false);
      setShowResults(false);
      setCurrentQuestionIndex(0);
      setCurrentLevel(1);
      setAnswers([]);
      setSelectedAnswer('');
    }
  };

  const handleRetakeAssessment = () => {
    setShowResults(false);
    handleStartAssessment();
  };

  if (showResults) {
    const results = calculateResults(answers);
    return (
      <>
        <div className="App results-screen">
          <div className="results-container">
            <div className="results-header">
              <h1 className="results-title">Your Assessment Results</h1>
              <p className="results-subtitle">Here's your mental wellness overview</p>
            </div>
            
            <div className="results-metrics">
              <CircularProgress
                percentage={results.depression.percentage}
                label="Depression"
                status={results.depression.status}
              />
              
              <CircularProgress
                percentage={results.anxiety.percentage}
                label="Anxiety"
                status={results.anxiety.status}
              />
              
              <CircularProgress
                percentage={results.stress.percentage}
                label="Stress"
                status={results.stress.status}
              />
            </div>
            
            <div className="results-actions">
              <button className="btn btn--secondary" onClick={handleRetakeAssessment}>
                Retake Assessment
              </button>
              <button className="btn btn--primary">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
        <BlobCursor
          blobType="circle"
          fillColor="#12b695"
          trailCount={3}
          sizes={[40, 70, 50]}
          innerSizes={[15, 25, 20]}
          innerColor="rgba(255,255,255,0.9)"
          opacities={[0.6, 0.4, 0.3]}
          shadowColor="rgba(18,182,149,0.5)"
          shadowBlur={8}
          shadowOffsetX={0}
          shadowOffsetY={0}
          filterStdDeviation={20}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={9999}
        />
      </>
    );
  }

  if (!showAssessment) {
    return (
      <>
        <StartScreen onStart={handleStartAssessment} />
        <BlobCursor
          blobType="circle"
          fillColor="#12b695"
          trailCount={3}
          sizes={[40, 70, 50]}
          innerSizes={[15, 25, 20]}
          innerColor="rgba(255,255,255,0.9)"
          opacities={[0.6, 0.4, 0.3]}
          shadowColor="rgba(18,182,149,0.5)"
          shadowBlur={8}
          shadowOffsetX={0}
          shadowOffsetY={0}
          filterStdDeviation={20}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={1}
        />
      </>
    );
  }

  return (
    <>
      <div className="App assessment-screen">
        {/* Progress Bar at top of screen */}
        <div className="progress-header">
          <div className="level-badge">
            <span className="level-number">{currentLevel}</span>
            <span className="level-text">Level</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <main className="app-main">
          <div className="assessment-container">
            <div className="question-card">
              <div className="question-header">
                <div className="level-indicator">
                  Level {currentLevel}
                </div>
                <h2 className="question-text">
                  {currentQuestion?.text}
                </h2>
              </div>
              
              <div className="decorative-clouds">
                <div className="cloud-shape"></div>
                <div className="cloud-shape"></div>
                <div className="cloud-shape"></div>
              </div>
              
              <div className="question-options">
                <label className={`question-option ${selectedAnswer === 'never' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name={`question${currentQuestion?.id}`} 
                    value="never" 
                    checked={selectedAnswer === 'never'}
                    onChange={() => handleAnswerSelect('never')}
                  />
                  <span className="option-text">{currentQuestion?.options.never.text}</span>
                </label>
                <label className={`question-option ${selectedAnswer === 'sometimes' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name={`question${currentQuestion?.id}`} 
                    value="sometimes" 
                    checked={selectedAnswer === 'sometimes'}
                    onChange={() => handleAnswerSelect('sometimes')}
                  />
                  <span className="option-text">{currentQuestion?.options.sometimes.text}</span>
                </label>
                <label className={`question-option ${selectedAnswer === 'often' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name={`question${currentQuestion?.id}`} 
                    value="often" 
                    checked={selectedAnswer === 'often'}
                    onChange={() => handleAnswerSelect('often')}
                  />
                  <span className="option-text">{currentQuestion?.options.often.text}</span>
                </label>
                <label className={`question-option ${selectedAnswer === 'almost_always' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name={`question${currentQuestion?.id}`} 
                    value="almost_always" 
                    checked={selectedAnswer === 'almost_always'}
                    onChange={() => handleAnswerSelect('almost_always')}
                  />
                  <span className="option-text">{currentQuestion?.options.almost_always.text}</span>
                </label>
              </div>
              
              <div className="question-navigation">
                <button className="nav-button btn-back" onClick={handlePrevQuestion}>
                  Back
                </button>
                <button 
                  className="nav-button btn-next" 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  {currentQuestionIndex >= totalQuestions - 1 ? 'View Results' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <BlobCursor
        blobType="circle"
        fillColor="#12b695"
        trailCount={3}
        sizes={[40, 70, 50]}
        innerSizes={[15, 25, 20]}
        innerColor="rgba(255,255,255,0.9)"
        opacities={[0.6, 0.4, 0.3]}
        shadowColor="rgba(18,182,149,0.5)"
        shadowBlur={8}
        shadowOffsetX={0}
        shadowOffsetY={0}
        filterStdDeviation={20}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={9999}
      />
    </>
  );
}

export default App;
