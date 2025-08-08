import React, { useState } from 'react';

interface AssessmentResult {
  depression: { percentage: number; status: string };
  anxiety: { percentage: number; status: string };
  stress: { percentage: number; status: string };
  answers: Array<{ question: string; answer: string; level: number; category: string }>;
  userEmail: string;
  userName?: string;
  bookingInfo?: {
    service: string;
    date: string;
    time: string;
  };
}

interface EmailSystemProps {
  onBack: () => void;
  assessmentResults: AssessmentResult;
  adminEmail: string;
}

const EmailSystem: React.FC<EmailSystemProps> = ({ onBack, assessmentResults, adminEmail }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      setError('Please enter your email address');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      // Mock email sending - in real implementation, this would call your backend
      await sendAssessmentResults({
        ...assessmentResults,
        userEmail,
        userName: userName || 'Anonymous User'
      });
      
      setEmailSent(true);
    } catch (err) {
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const sendAssessmentResults = async (results: AssessmentResult) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Detailed console logging for email content
    console.log('📧 EMAIL SYSTEM - SENDING ASSESSMENT RESULTS');
    console.log('='.repeat(60));
    
    // Admin Email Content
    console.log('📤 TO ADMIN EMAIL:', adminEmail);
    console.log('📋 ADMIN EMAIL CONTENT:');
    console.log('Subject: New Assessment Results - Complete Data');
    console.log('From: noreply@magirque.com');
    console.log('To:', adminEmail);
    console.log('');
    console.log('📊 COMPLETE ASSESSMENT DATA:');
    console.log('User Name:', results.userName || 'Anonymous');
    console.log('User Email:', results.userEmail);
    console.log('Assessment Date:', new Date().toLocaleDateString());
    console.log('');
    console.log('📈 RESULTS SUMMARY:');
    console.log('Depression:', results.depression.percentage + '% -', results.depression.status);
    console.log('Anxiety:', results.anxiety.percentage + '% -', results.anxiety.status);
    console.log('Stress:', results.stress.percentage + '% -', results.stress.status);
    console.log('');
    console.log('📝 ALL QUESTION ANSWERS:');
    results.answers.forEach((answer, index) => {
      console.log(`${index + 1}. Question: ${answer.question}`);
      console.log(`   Answer: ${answer.answer}`);
      console.log(`   Level: ${answer.level}`);
      console.log(`   Category: ${answer.category}`);
      console.log('');
    });
    
    if (results.bookingInfo) {
      console.log('📅 BOOKING INFORMATION:');
      console.log('Service:', results.bookingInfo.service);
      console.log('Date:', results.bookingInfo.date);
      console.log('Time:', results.bookingInfo.time);
      console.log('');
    }
    
    console.log('='.repeat(60));
    
    // User Email Content
    console.log('📤 TO USER EMAIL:', results.userEmail);
    console.log('📋 USER EMAIL CONTENT:');
    console.log('Subject: Your Mental Health Assessment Results');
    console.log('From: noreply@magirque.com');
    console.log('To:', results.userEmail);
    console.log('');
    console.log('👤 PERSONAL RESULTS:');
    console.log('Name:', results.userName || 'Anonymous');
    console.log('Assessment Date:', new Date().toLocaleDateString());
    console.log('');
    console.log('📊 YOUR RESULTS:');
    console.log('Depression:', results.depression.percentage + '% -', results.depression.status);
    console.log('Anxiety:', results.anxiety.percentage + '% -', results.anxiety.status);
    console.log('Stress:', results.stress.percentage + '% -', results.stress.status);
    console.log('');
    console.log('💡 RECOMMENDATIONS:');
    console.log('- Based on your results, we recommend professional consultation');
    console.log('- Your data has been shared with our mental health team');
    console.log('- You will receive follow-up support within 24 hours');
    
    if (results.bookingInfo) {
      console.log('');
      console.log('📅 YOUR BOOKING CONFIRMATION:');
      console.log('Service:', results.bookingInfo.service);
      console.log('Date:', results.bookingInfo.date);
      console.log('Time:', results.bookingInfo.time);
      console.log('Meeting link will be sent separately');
    }
    
    console.log('='.repeat(60));
    console.log('✅ EMAILS READY TO SEND VIA HOSTINGER SMTP');
    console.log('🔧 Backend integration required for actual sending');
    console.log('='.repeat(60));
  };

  const getStatusColor = (status: string): string => {
    const s = status.toLowerCase();
    if (s.includes('extremely')) return '#7f1d1d';
    if (s.includes('severe')) return '#ef4444';
    if (s.includes('moderate')) return '#f97316';
    if (s.includes('mild')) return '#f59e0b';
    if (s.includes('normal')) return '#10b981';
    return '#12b695';
  };

  if (emailSent) {
    return (
      <div className="email-screen">
        <div className="email-container">
          <div className="email-header">
            <button className="back-button" onClick={onBack}>
              ← Back to Results
            </button>
            <h1 className="email-title">Email Sent Successfully!</h1>
          </div>
          
          <div className="email-success">
            <div className="success-icon">✅</div>
            <h2>Assessment Results Sent</h2>
            <p>Your assessment results have been sent to:</p>
            <div className="email-recipients">
              <div className="recipient">
                <strong>You:</strong> {userEmail}
              </div>
              <div className="recipient">
                <strong>Admin:</strong> {adminEmail}
              </div>
            </div>
            <div className="email-summary">
              <h3>What was sent:</h3>
              <ul>
                <li>Your complete assessment results</li>
                <li>All question answers and choices</li>
                <li>Percentage scores for each category</li>
                {assessmentResults.bookingInfo && (
                  <li>Your booking information</li>
                )}
              </ul>
            </div>
            <button className="btn btn--primary" onClick={onBack}>
              Return to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-screen">
      <div className="email-container">
        <div className="email-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Results
          </button>
          <h1 className="email-title">Send Assessment Results</h1>
        </div>

        <div className="email-content">
          <div className="email-info">
            <h2>Share Your Results</h2>
            <p>Enter your email address to receive your assessment results and share them with our team.</p>
            
            <div className="results-preview">
              <h3>Your Assessment Summary:</h3>
              <div className="preview-metrics">
                <div className="preview-metric">
                  <span className="metric-label">Depression</span>
                  <span 
                    className="metric-status"
                    style={{ color: getStatusColor(assessmentResults.depression.status) }}
                  >
                    {assessmentResults.depression.percentage}% - {assessmentResults.depression.status}
                  </span>
                </div>
                <div className="preview-metric">
                  <span className="metric-label">Anxiety</span>
                  <span 
                    className="metric-status"
                    style={{ color: getStatusColor(assessmentResults.anxiety.status) }}
                  >
                    {assessmentResults.anxiety.percentage}% - {assessmentResults.anxiety.status}
                  </span>
                </div>
                <div className="preview-metric">
                  <span className="metric-label">Stress</span>
                  <span 
                    className="metric-status"
                    style={{ color: getStatusColor(assessmentResults.stress.status) }}
                  >
                    {assessmentResults.stress.percentage}% - {assessmentResults.stress.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="email-form">
            <div className="form-group">
              <label htmlFor="userName">Full Name (Optional)</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="userEmail">Email Address *</label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="email-actions">
              <button 
                type="button" 
                className="btn btn--secondary" 
                onClick={onBack}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Results'}
              </button>
            </div>
          </form>

          <div className="email-disclaimer">
            <h3>What will be sent:</h3>
            <ul>
              <li><strong>To you:</strong> Your personal assessment results</li>
              <li><strong>To our team:</strong> Complete assessment data including all answers and scores</li>
              <li><strong>Data included:</strong> All question responses, percentage scores, and booking information (if applicable)</li>
            </ul>
            <p className="privacy-note">
              Your data is handled securely and will only be used to provide you with appropriate support and recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSystem;
