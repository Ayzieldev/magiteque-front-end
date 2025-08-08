import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';

type AudioContextValue = {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playAnswerClick: () => void;
  ensureStarted: () => void;
  setBackgroundVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  backgroundVolume: number;
  sfxVolume: number;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

type Props = { children: React.ReactNode };

const BACKGROUND_SOURCES = [
  // Project-specific filenames
  '/audio/background-repeat.mp3',
  // Common fallbacks
  '/audio/background-music.mp3',
  '/audio/background.mp3',
  '/audio/bg.mp3',
  '/audio/background-music.ogg',
];

const CLICK_SOURCES = [
  // Project-specific filenames
  '/audio/click-sound-1.mp3',
  '/audio/click-sound-2.mp3',
  // Common fallbacks
  '/audio/click.mp3',
  '/audio/click.wav',
  '/audio/click.ogg',
];

export function AudioProvider({ children }: Props) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [backgroundVolume, setBackgroundVolume] = useState<number>(0.2);
  const [sfxVolume, setSfxVolume] = useState<number>(0.4);
  const hasStartedRef = useRef<boolean>(false);
  const isInitializedRef = useRef<boolean>(false);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickSrcRef = useRef<string | null>(null);

  // Resolve first existing source
  const resolveSource = async (candidates: string[]): Promise<string | null> => {
    for (const src of candidates) {
      try {
        // HEAD request via fetch to check existence
        const res = await fetch(src, { method: 'HEAD' });
        if (res.ok) return src;
      } catch (_) {
        // ignore
      }
    }
    return null;
  };

  // Initialize audio elements once
  useEffect(() => {
    if (isInitializedRef.current) return;
    
    let disposed = false;
    (async () => {
      const bg = await resolveSource(BACKGROUND_SOURCES);
      if (disposed) return;
      const click = await resolveSource(CLICK_SOURCES);
      if (disposed) return;

      if (bg) {
        const a = new Audio(bg);
        a.loop = true;
        a.preload = 'auto';
        a.volume = backgroundVolume;
        a.muted = isMuted;
        bgAudioRef.current = a;
        
        // Try to start playing immediately
        a.play().catch(() => {
          // Autoplay blocked, will start on user interaction
        });
        hasStartedRef.current = true;
      }
      if (click) {
        clickSrcRef.current = click;
      }
      
      isInitializedRef.current = true;
    })();

    return () => {
      disposed = true;
    };
  }, []); // Only run once on mount

  const ensureStarted = useCallback(() => {
    const bg = bgAudioRef.current;
    if (!bg) return;
    
    // If not already playing, try to start
    if (bg.paused) {
      bg.muted = isMuted;
      bg.play().catch(() => {
        // Autoplay blocked until user gesture; will retry on next interaction
      });
    }
  }, [isMuted]);

  // Handle mute state changes
  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle volume changes
  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = backgroundVolume;
    }
  }, [backgroundVolume]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playClick = useCallback(() => {
    if (isMuted) return;
    const src = clickSrcRef.current;
    if (!src) return;
    const a = new Audio(src);
    a.volume = sfxVolume;
    a.play().catch(() => {});
  }, [isMuted, sfxVolume]);

  const playAnswerClick = useCallback(() => {
    if (isMuted) return;
    const a = new Audio('/audio/click-sound-2.mp3');
    a.volume = sfxVolume;
    a.play().catch(() => {});
  }, [isMuted, sfxVolume]);

  const updateBackgroundVolume = useCallback((volume: number) => {
    setBackgroundVolume(volume);
  }, []);

  const updateSfxVolume = useCallback((volume: number) => {
    setSfxVolume(volume);
  }, []);

  const value = useMemo(
    () => ({ 
      isMuted, 
      toggleMute, 
      playClick, 
      playAnswerClick, 
      ensureStarted,
      setBackgroundVolume: updateBackgroundVolume,
      setSfxVolume: updateSfxVolume,
      backgroundVolume,
      sfxVolume
    }),
    [isMuted, backgroundVolume, sfxVolume, ensureStarted, playClick, playAnswerClick, updateBackgroundVolume, updateSfxVolume]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export default AudioProvider;


