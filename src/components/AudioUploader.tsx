import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music } from 'lucide-react';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

const AudioUploader = ({ onFileSelect }: AudioUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
                 bg-[#282828] hover:bg-[#3E3E3E] border-[#535353] hover:border-[#1DB954]"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-[#B3B3B3]">
        <div className="p-4 mb-4 rounded-full bg-[#1DB954]">
          <Music className="w-8 h-8 text-black" />
        </div>
        <p className="text-lg font-medium text-white">
          {isDragActive
            ? "Drop your audio file here"
            : "Choose an audio file or drag & drop it here"}
        </p>
        <p className="mt-2 text-sm">Supports MP3 and WAV files</p>
      </div>
    </div>
  );
};

export default AudioUploader;