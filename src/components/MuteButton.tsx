import React from 'react';
import { useAudio } from './AudioProvider';

type Props = { };

const MuteButton: React.FC<Props> = () => {
  const { isMuted, toggleMute, ensureStarted } = useAudio();
  return (
    <button
      aria-label={isMuted ? 'Unmute background audio' : 'Mute background audio'}
      className="mute-toggle"
      onClick={() => { ensureStarted(); toggleMute(); }}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
};

export default MuteButton;


