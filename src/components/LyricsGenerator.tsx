import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';

interface LyricsGeneratorProps {
  audioFile: File | null;
}

const LyricsGenerator = ({ audioFile }: LyricsGeneratorProps) => {
  const [lyrics, setLyrics] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
      const { data: secretData, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'OPENAI_API_KEY')
        .single();

      if (secretError || !secretData) {
        throw new Error('Failed to fetch OpenAI API key');
      }

      const openai = new OpenAI({
        apiKey: secretData.value,
        dangerouslyAllowBrowser: true
      });

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

  const saveLyrics = async () => {
    if (!lyrics || !audioFile) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('lyrics')
        .insert({
          audio_file_name: audioFile.name,
          lyrics_text: lyrics,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Lyrics saved",
        description: "Your lyrics have been saved successfully",
      });
    } catch (error) {
      console.error('Error saving lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to save lyrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={generateLyrics}
        disabled={isGenerating || !audioFile}
        className="w-full px-4 py-3 font-semibold text-black transition-colors rounded-full bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="p-6 space-y-4 rounded-lg bg-[#282828]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Generated Lyrics</h3>
            <button
              onClick={saveLyrics}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black transition-colors rounded-full bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Lyrics
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-[#B3B3B3]">{lyrics}</pre>
        </div>
      )}
    </div>
  );
};

export default LyricsGenerator;
