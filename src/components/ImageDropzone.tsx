'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';

interface ImageDropzoneProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  onGenerate: () => void;
  disabled?: boolean;
  maxImages?: number;
}

export default function ImageDropzone({ 
  images, 
  onImagesChange, 
  onGenerate, 
  disabled, 
  maxImages = 8 
}: ImageDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(rejection => 
        `${rejection.file.name}: ${rejection.errors.map((e: any) => e.message).join(', ')}`
      );
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    // Validate accepted files
    const validFiles: File[] = [];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of acceptedFiles) {
      if (!allowedTypes.includes(file.type)) {
        alert(`Unsupported file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`);
        continue;
      }
      
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }
      
      validFiles.push(file);
    }

    const newImages = [...images, ...validFiles].slice(0, maxImages);
    onImagesChange(newImages);
  }, [images, onImagesChange, maxImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true,
    disabled,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const getGenerationTypeText = () => {
    if (images.length === 1) return 'Single Image to 3D';
    if (images.length > 1) return 'Multi-Image to 3D';
    return 'Image to 3D';
  };


  return (
    <div className="feature-card group">
      <div className="flex items-center gap-10 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <ImageIcon className="w-7 h-7 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{getGenerationTypeText()}</h2>
          <p className="text-base text-gray-300">
            {images.length === 0 ? 'Upload photos to reconstruct in 3D' : 
             images.length === 1 ? 'Single-view reconstruction' : 
             `Multi-view reconstruction with ${images.length} angles`}
          </p>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group/dropzone ${
          isDragActive || dragActive
            ? 'border-purple-400/60 bg-gradient-to-br from-purple-500/10 to-pink-500/10 scale-[1.02] shadow-2xl backdrop-blur-xl'
            : images.length > 0
            ? 'border-gray-600/50 bg-gradient-to-br from-gray-800/40 to-gray-700/40 hover:shadow-xl backdrop-blur-sm'
            : 'border-gray-600/50 bg-gradient-to-br from-gray-800/60 to-gray-700/60 hover:border-purple-400/60 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 hover:scale-[1.01] hover:shadow-xl backdrop-blur-sm'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {images.length === 0 ? (
          <div className="space-y-8">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-2xl blur-lg opacity-20 group-hover/dropzone:opacity-30 transition-opacity duration-300"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-2xl flex items-center justify-center group-hover/dropzone:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <Upload className="w-10 h-10 text-white group-hover/dropzone:animate-bounce" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-4">
                Drop images here or click to upload
              </p>
              <p className="text-base text-gray-300 mb-6 leading-relaxed">
                Upload 1 image for single-view reconstruction or multiple images for better quality reconstruction
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-purple-500/10 text-purple-200 px-4 py-2 rounded-full font-medium border border-purple-400/20 backdrop-blur-sm">JPG</span>
                <span className="bg-pink-500/10 text-pink-200 px-4 py-2 rounded-full font-medium border border-pink-400/20 backdrop-blur-sm">PNG</span>
                <span className="bg-indigo-500/10 text-indigo-200 px-4 py-2 rounded-full font-medium border border-indigo-400/20 backdrop-blur-sm">WebP</span>
                <span className="bg-gray-500/10 text-gray-200 px-4 py-2 rounded-full font-medium border border-gray-400/20 backdrop-blur-sm">Max {maxImages} images</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">{images.length}</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-white">{images.length} image{images.length > 1 ? 's' : ''} selected</p>
                <p className="text-base text-gray-300">Ready for 3D reconstruction</p>
              </div>
            </div>
            <p className="text-base text-gray-300 bg-purple-500/5 px-6 py-4 rounded-xl border border-purple-400/20 backdrop-blur-sm">
              💡 Drop more images here or click to add more (up to {maxImages} total)
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 pt-8 border-t border-gray-600/30">
            <div className="flex items-center gap-4 text-base text-gray-300 bg-gradient-to-r from-purple-500/5 to-pink-500/5 px-6 py-4 rounded-xl border border-purple-400/20 backdrop-blur-sm flex-1 xl:max-w-none max-w-full">
              <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="font-medium">
                {images.length === 1 
                  ? '💡 Single image reconstruction - add more angles for better results'
                  : `💡 Multi-view reconstruction with ${images.length} angles for enhanced quality`
                }
              </span>
            </div>
            <button
              onClick={onGenerate}
              disabled={disabled}
              className="btn-primary flex items-center gap-3 min-w-fit px-6 py-3 text-base xl:ml-6"
            >
              <div className={`transition-transform duration-200 ${disabled ? '' : 'group-hover:scale-110'}`}>
                <Camera className="w-5 h-5" />
              </div>
              <span className="font-bold">Generate 3D Model</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
