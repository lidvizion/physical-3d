'use client';

import { useState, useEffect, useRef } from 'react';
import { Type, Sparkles } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  disabled?: boolean;
}


export default function PromptInput({ value, onChange, onGenerate, disabled }: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onGenerate();
    }
  };

  // Auto typing effect
  useEffect(() => {
    if (!value && textareaRef.current) {
      setIsTyping(true);
      setTypedText('');
      
      const placeholderText = "Describe the 3D object you want to create... (e.g., 'A modern wooden chair with metal legs')";
      
      const typeText = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Initial delay
        
        for (let i = 0; i <= placeholderText.length; i++) {
          if (value) break; // Stop if user starts typing
          
          setTypedText(placeholderText.substring(0, i));
          
          if (i < placeholderText.length) {
            const char = placeholderText[i];
            let delay = 50; // Base speed
            
            // Variable speed based on character type
            if (/[.!?,:;]/.test(char)) delay = 150; // Punctuation = longer pause
            else if (char === ' ') delay = 25; // Spaces = shorter pause
            else if (/[0-9]/.test(char)) delay = 60; // Numbers = medium pause
            
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
        
        setIsTyping(false);
      };
      
      typeText();
    }
  }, [value]);

  // Handle manual input - stop auto typing if user starts typing
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsTyping(false); // Stop the typing animation
    onChange(e.target.value);
  };

  return (
    <div className="feature-card group">
      <div className="flex items-center gap-10 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <Type className="w-7 h-7 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Text to 3D Generation</h2>
          <p className="text-base text-gray-300">Describe your vision in natural language</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="relative group/textarea">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 rounded-2xl blur-sm"></div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className={`relative w-full px-12 py-10 border-2 rounded-2xl resize-none transition-all duration-300 bg-gray-800/60 backdrop-blur-xl font-medium text-white placeholder-gray-400 ${
              isFocused 
                ? 'border-blue-400 ring-4 ring-blue-400/30 shadow-2xl transform scale-[1.01] bg-gray-700/70' 
                : 'border-gray-600/50 hover:border-blue-400/60 hover:shadow-xl hover:bg-gray-800/70'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus:outline-none`}
            rows={6}
            disabled={disabled}
            maxLength={500}
          />
          
          {/* Auto-typing placeholder overlay */}
          {!value && typedText && (
            <div className="absolute top-10 left-12 right-12 text-green-400 font-medium pointer-events-none whitespace-pre-wrap">
              {typedText}
              {isTyping && (
                <span className="text-green-400 animate-pulse">|</span>
              )}
            </div>
          )}
          
          <div className={`absolute bottom-8 right-12 text-base font-medium transition-colors duration-200 ${
            value.length > 450 ? 'text-amber-400' : 
            value.length > 400 ? 'text-blue-400' : 'text-gray-500'
          }`}>
            {value.length}/500
          </div>
        </div>
        
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-3 rounded-xl border border-blue-400/30 backdrop-blur-sm flex-1 xl:max-w-none max-w-full">
            <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="font-medium leading-tight">💡 Be specific about materials, colors, and style for better results</span>
          </div>
          
          <button
            type="submit"
            disabled={!value.trim() || disabled}
            className="btn-primary flex items-center gap-3 min-w-fit px-6 py-3 text-base xl:ml-6"
          >
            <div className={`transition-transform duration-200 ${disabled || !value.trim() ? '' : 'group-hover:rotate-12'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold">Generate 3D Model</span>
          </button>
        </div>
      </form>
    </div>
  );
}
