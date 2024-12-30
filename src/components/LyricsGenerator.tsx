import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface LyricsGeneratorProps {
  audioFile: File | null;
}

const LyricsGenerator = ({ audioFile }: LyricsGeneratorProps) => {
  const [lyrics, setLyrics] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateLyrics = async () => {
    if (!audioFile) {
      toast({
        title: "No audio file",
        description: "Please upload an audio file first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Here we'll integrate with OpenAI API
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const sampleLyrics = "This is where the AI-generated lyrics will appear.\nConnect OpenAI to get real lyrics generation.";
      setLyrics(sampleLyrics);
      
      toast({
        title: "Lyrics generated",
        description: "Your lyrics have been generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate lyrics",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={generateLyrics}
        disabled={isGenerating || !audioFile}
        className="w-full px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating Lyrics...
          </span>
        ) : (
          "Generate Lyrics"
        )}
      </button>
      
      {lyrics && (
        <div className="p-4 space-y-2 rounded-lg bg-black/20 backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-white">Generated Lyrics:</h3>
          <pre className="whitespace-pre-wrap text-white/90">{lyrics}</pre>
        </div>
      )}
    </div>
  );
};

export default LyricsGenerator;