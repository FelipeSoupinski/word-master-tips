import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import minigameMusic from '../assets/minigame.mp3';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [volume, setVolume] = useState(0.1); // 10% default volume
  const [isHovered, setIsHovered] = useState(false);
  
  const audioRef = useRef(null);
  const location = useLocation();
  
  const isPlayingGame = location.pathname.includes('/play');

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      if (isPlayingGame && !isMuted) {
        audioRef.current.play().catch(e => console.log(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlayingGame, isMuted, volume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleWheel = (e) => {
    if (isMuted) return; // Don't adjust volume if muted
    
    // Prevent page scrolling while adjusting volume
    e.preventDefault();
    
    // deltaY < 0 means scrolling UP (increase volume)
    // deltaY > 0 means scrolling DOWN (decrease volume)
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    
    setVolume(prev => {
      let newVol = prev + delta;
      // Fix floating point precision
      newVol = Math.round(newVol * 100) / 100;
      if (newVol > 1) newVol = 1;
      if (newVol < 0) newVol = 0;
      return newVol;
    });
  };

  // Attach non-passive wheel event listener to container to prevent page scroll
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const onWheel = (e) => handleWheel(e);
    
    // passive: false allows e.preventDefault() to work
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [isMuted]);

  if (!isPlayingGame) return null;

  return (
    <div 
      className="audio-player-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src={minigameMusic} loop />
      
      <button 
        className={`audio-toggle-btn ${isMuted ? 'muted' : ''}`} 
        onClick={toggleMute} 
        title={isMuted ? "Ativar Música" : "Desativar Música"}
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      </button>

      {!isMuted && isHovered && (
        <div className="volume-dropdown">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <span className="volume-label">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </div>
  );
}
