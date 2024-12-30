import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

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
      className="w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover:border-accent
                 bg-black/10 backdrop-blur-lg border-white/20 hover:border-accent/50"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-white/80">
        <Upload className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">
          {isDragActive
            ? "Drop your audio file here"
            : "Drag & drop your audio file here or click to select"}
        </p>
        <p className="mt-2 text-sm text-white/60">Supports MP3 and WAV files</p>
      </div>
    </div>
  );
};

export default AudioUploader;