import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import OpenAI from 'openai';

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
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      // Create a prompt based on the audio file name and type
      const prompt = `Generate creative song lyrics based on a ${audioFile.type} file named "${audioFile.name}". The lyrics should be modern, engaging, and follow a typical song structure with verses and a chorus. Consider the filename for thematic inspiration.`;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a creative songwriter who specializes in writing engaging and meaningful lyrics."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-4",
        temperature: 0.7,
      });

      const generatedLyrics = completion.choices[0]?.message?.content || "No lyrics were generated";
      setLyrics(generatedLyrics);
      
      toast({
        title: "Lyrics generated",
        description: "Your lyrics have been generated successfully",
      });
    } catch (error) {
      console.error('Error generating lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to generate lyrics. Please check your OpenAI API key.",
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