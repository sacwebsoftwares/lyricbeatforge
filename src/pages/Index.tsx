import React, { useState } from 'react';
import AudioUploader from '../components/AudioUploader';
import WaveformVisualizer from '../components/WaveformVisualizer';
import { useToast } from '@/components/ui/use-toast';
import { Music2 } from 'lucide-react';

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
    toast({
      title: "Audio file uploaded",
      description: `Successfully loaded: ${file.name}`,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Music2 className="w-8 h-8 text-accent animate-pulse-glow mr-3" />
          <h1 className="text-4xl font-bold text-white">AI Music Studio</h1>
        </div>
        
        <div className="space-y-8">
          {!audioFile ? (
            <AudioUploader onFileSelect={handleFileSelect} />
          ) : (
            <WaveformVisualizer audioFile={audioFile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;