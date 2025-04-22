import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface AudioPlayerProps {
  audioSrc: string;
  title?: string;
  onComplete?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  title,
  onComplete
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [playAttemptFailed, setPlayAttemptFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) onComplete();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Create a flag to track if we're in the middle of a play operation
    let playPromise: Promise<void> | undefined;

    if (isPlaying && !playAttemptFailed) {
      // Store the play promise
      playPromise = audio.play();
      
      // Handle the promise to catch any errors
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
            setPlayAttemptFailed(false);
          })
          .catch(error => {
            // Auto-play was prevented or another error occurred
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            setPlayAttemptFailed(true);
          });
      }
    } else {
      // Only pause if we're not in the middle of a play operation
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Now it's safe to pause
            audio.pause();
          })
          .catch(() => {
            // Play was already rejected, so we don't need to pause
          });
      } else {
        // No play operation in progress, safe to pause
        audio.pause();
      }
    }
  }, [isPlaying, playAttemptFailed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const handlePlayPause = () => {
    // Reset the failed flag when user explicitly clicks play
    if (!isPlaying) {
      setPlayAttemptFailed(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowVolumeControl(!showVolumeControl);
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    
    const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Create a dummy audio source for demonstration purposes
  // In a real app, this would be replaced with actual audio files
  const dummyAudioSource = audioSrc || "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/80' : 'bg-gray-100'} shadow-md`}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata">
        <source src={dummyAudioSource} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex flex-col space-y-4">
        {/* Title */}
        {title && (
          <div className="flex items-center">
            <Volume2 className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {title}
            </span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full">
          <input
            ref={progressRef}
            type="range"
            min="0"
            max={duration || 1}
            step="0.01"
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-purple-500"
            style={{
              background: isDark
                ? `linear-gradient(to right, #a855f7 ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%)`
                : `linear-gradient(to right, #8b5cf6 ${(currentTime / (duration || 1)) * 100}%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <div className="flex justify-between mt-1">
            <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatTime(currentTime)}
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Player Controls - Centered for mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          {/* Main Controls (Play/Pause, Skip) */}
          <div className="flex items-center justify-center space-x-2">
            {/* Skip Back */}
            <button
              onClick={() => seek(-10)}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className={`p-3 rounded-full transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => seek(10)}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary Controls (Volume, Speed) */}
          <div className="flex items-center justify-center space-x-2">
            {/* Volume Control */}
            <div className="relative flex items-center">
              <button
                onClick={toggleMute}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark
                    ? 'hover:bg-gray-600 text-gray-400'
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              {showVolumeControl && (
                <div className="absolute bottom-full left-0 mb-2 p-2 rounded-lg shadow-lg z-10 min-w-[100px]"
                     style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6' }}>
                  <input
                    ref={volumeRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-purple-500"
                    style={{
                      background: isDark
                        ? `linear-gradient(to right, #a855f7 ${volume * 100}%, #4b5563 ${volume * 100}%)`
                        : `linear-gradient(to right, #8b5cf6 ${volume * 100}%, #d1d5db ${volume * 100}%)`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Playback Speed */}
            <div className="flex space-x-1">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handlePlaybackRateChange(rate)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    playbackRate === rate
                      ? isDark
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-500 text-white'
                      : isDark
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};