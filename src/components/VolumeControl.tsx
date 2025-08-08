import React, { useState } from 'react';
import { useAudio } from './AudioProvider';

type Props = { };

const VolumeControl: React.FC<Props> = () => {
  const { 
    isMuted, 
    toggleMute, 
    ensureStarted, 
    backgroundVolume, 
    sfxVolume, 
    setBackgroundVolume, 
    setSfxVolume 
  } = useAudio();
  const [showControls, setShowControls] = useState(false);

  const handleBgVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setBackgroundVolume(volume);
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setSfxVolume(volume);
  };

  return (
    <div className="volume-control">
      <button
        className="volume-toggle"
        onClick={() => { 
          ensureStarted(); 
          toggleMute(); 
        }}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      
      {showControls && (
        <div className="volume-sliders">
          <div className="volume-slider">
            <label>Background</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={backgroundVolume}
              onChange={handleBgVolumeChange}
              className="volume-range"
            />
            <span>{Math.round(backgroundVolume * 100)}%</span>
          </div>
          
          <div className="volume-slider">
            <label>Effects</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sfxVolume}
              onChange={handleSfxVolumeChange}
              className="volume-range"
            />
            <span>{Math.round(sfxVolume * 100)}%</span>
          </div>
        </div>
      )}
      
      <button
        className="settings-toggle"
        onClick={() => setShowControls(!showControls)}
        aria-label="Audio settings"
      >
        ⚙️
      </button>
    </div>
  );
};

export default VolumeControl;
