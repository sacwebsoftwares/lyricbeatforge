import React, { useState } from 'react';
import AudioUploader from '../components/AudioUploader';
import WaveformVisualizer from '../components/WaveformVisualizer';
import LyricsGenerator from '../components/LyricsGenerator';
import { Music2, Home, Library, Search, Plus } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setAudioFile(file);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#121212]">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">AI Music Studio</h1>
              <Music2 className="w-8 h-8 text-[#1DB954] animate-pulse-glow" />
            </div>
            
            <div className="space-y-8">
              {!audioFile ? (
                <AudioUploader onFileSelect={handleFileSelect} />
              ) : (
                <>
                  <WaveformVisualizer audioFile={audioFile} />
                  <LyricsGenerator audioFile={audioFile} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;