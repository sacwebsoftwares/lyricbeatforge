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
      waveColor: '#00E5FF',
      progressColor: '#4A148C',
      cursorColor: '#ffffff',
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
    <div className="w-full p-6 rounded-lg bg-black/20 backdrop-blur-lg">
      <div ref={containerRef} className="mb-4" />
      <div className="flex justify-center gap-4">
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={restart}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WaveformVisualizer;