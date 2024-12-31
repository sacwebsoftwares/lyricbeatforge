import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface WaveformVisualizerProps {
  audioFile: File;
}

const WaveformVisualizer = ({ audioFile }: WaveformVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#535353',
      progressColor: '#1DB954',
      cursorColor: '#1DB954',
      barWidth: 2,
      barGap: 1,
      height: 100,
      normalize: true,
    });

    const audioUrl = URL.createObjectURL(audioFile);
    wavesurferRef.current.load(audioUrl);

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioFile]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full p-6 rounded-lg bg-[#282828]">
      <div ref={containerRef} className="mb-4" />
      <div className="flex justify-center gap-4">
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-[#1DB954] hover:bg-[#1ed760] transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black" />}
        </button>
        <button
          onClick={restart}
          className="p-3 rounded-full bg-[#535353] hover:bg-[#636363] transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default WaveformVisualizer;