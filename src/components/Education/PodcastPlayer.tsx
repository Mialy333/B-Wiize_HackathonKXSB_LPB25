import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, SkipForward } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface PodcastPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  playbackSpeed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  audioSrc,
  isPlaying,
  playbackSpeed,
  onPlayPause,
  onSpeedChange,
  audioRef
}) => {
  const { isDark } = useTheme();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef<HTMLInputElement>(null);

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
      setCurrentTime(0);
      onPlayPause();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, onPlayPause]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Create a dummy audio source for demonstration purposes
  // In a real app, this would be replaced with actual podcast files
  const dummyAudioSource = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} shadow-md`}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef}>
        <source src={dummyAudioSource} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex flex-col space-y-4">
        {/* Player Controls */}
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={onPlayPause}
            className={`p-3 rounded-full transition-colors ${
              isDark
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Podcast Info */}
          <div className="flex-1">
            <div className="flex items-center">
              <Volume2 className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Audio Lesson
              </span>
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatTime(currentTime)} / {formatTime(duration || 300)} {/* Default 5 min (300s) */}
            </div>
          </div>

          {/* Playback Speed */}
          <div className="flex space-x-2">
            <button
              onClick={() => onSpeedChange(1)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                playbackSpeed === 1
                  ? isDark
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 text-white'
                  : isDark
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              1x
            </button>
            <button
              onClick={() => onSpeedChange(1.5)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                playbackSpeed === 1.5
                  ? isDark
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 text-white'
                  : isDark
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              1.5x
            </button>
            <button
              onClick={() => onSpeedChange(2)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                playbackSpeed === 2
                  ? isDark
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 text-white'
                  : isDark
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              2x
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <input
            ref={progressRef}
            type="range"
            min="0"
            max={duration || 300} // Default 5 min (300s)
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-teal-500"
            style={{
              background: isDark
                ? `linear-gradient(to right, #2dd4bf ${(currentTime / (duration || 300)) * 100}%, #374151 ${(currentTime / (duration || 300)) * 100}%)`
                : `linear-gradient(to right, #14b8a6 ${(currentTime / (duration || 300)) * 100}%, #e5e7eb ${(currentTime / (duration || 300)) * 100}%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};