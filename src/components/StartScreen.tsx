import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-screen__background">
        <div className="floating-elements">
          <div className="cloud cloud--1"></div>
          <div className="cloud cloud--2"></div>
          <div className="cloud cloud--3"></div>
          <div className="flower flower--1">🌸</div>
          <div className="flower flower--2">🌺</div>
          <div className="flower flower--3">🌼</div>
        </div>
      </div>
      
      <div className="start-screen__content">
        <div className="brand-section">
          <div className="logo">
            <div className="butterfly">🦋</div>
          </div>
        </div>
        
        <div className="main-content">
          <h2 className="main-title">Mental Wellness <br /> Assessment</h2>
          
          <div className="character-section">
            <div className="character character--main">
              <div className="character__body"></div>
              <div className="character__face">
                <div className="character__eyes">
                  <div className="eye eye--left"></div>
                  <div className="eye eye--right"></div>
                </div>
                <div className="character__mouth"></div>
              </div>
              <div className="character__arms">
                <div className="arm arm--left"></div>
                <div className="arm arm--right"></div>
              </div>
            </div>
            
            <div className="character character--companion">
              <div className="character__body character__body--small"></div>
              <div className="character__face character__face--small">
                <div className="character__eyes character__eyes--small">
                  <div className="eye eye--small"></div>
                  <div className="eye eye--small"></div>
                </div>
                <div className="character__mouth character__mouth--small"></div>
              </div>
            </div>
          </div>
          
          <button 
            className="start-button" 
            onClick={onStart}
          >
            LET'S START
          </button>

        </div>
      </div>
    </div>
  );
};

export default StartScreen;