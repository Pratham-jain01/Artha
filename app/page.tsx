'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, Copy, Check, Loader2 } from 'lucide-react';

interface TranslationResult {
  phonetic?: string;
  meaning?: string;
  hindi?: string;
  marathi?: string;
  explanation?: string;
  type: 'word' | 'sentence';
}

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleTranslate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input.trim() }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to translate');
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to translate');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = () => {
    if (!input) return;
    const utterance = new SpeechSynthesisUtterance(input);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = async () => {
    if (!result) return;
    const textToCopy = `Hindi: ${result.hindi}\nMarathi: ${result.marathi}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background aesthetic blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl z-10 flex flex-col items-center"
      >
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
          Artha
        </h1>
        <p className="text-gray-400 mb-12 text-center text-sm md:text-base font-[family-name:var(--font-inter)] max-w-md">
          Discover phonetics, deep meanings, and grammatical nuances across English, Hindi, and Marathi.
        </p>

        <div className="w-full relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"></div>
          <div className="relative glassmorphism rounded-3xl p-2 flex items-end shadow-2xl transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Enter a word or a sentence..."
              className="w-full bg-transparent text-white placeholder-gray-500 p-4 outline-none resize-none min-h-[60px] max-h-[200px] font-[family-name:var(--font-inter)] text-lg"
              rows={1}
            />
            <div className="p-2 flex-shrink-0">
              <button
                onClick={handleTranslate}
                disabled={loading || !input.trim()}
                className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="mt-6 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {loading && !result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full mt-8 rounded-3xl glassmorphism-glow glassmorphism p-8 space-y-6"
            >
              <div className="h-8 bg-white/5 rounded-lg w-1/3 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-lg w-full animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-lg w-5/6 animate-pulse"></div>
              <div className="h-px bg-white/10 w-full my-6"></div>
              <div className="space-y-4">
                <div className="h-6 bg-white/5 rounded-lg w-1/2 animate-pulse"></div>
                <div className="h-6 bg-white/5 rounded-lg w-1/2 animate-pulse"></div>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full mt-8 rounded-3xl glassmorphism-glow glassmorphism p-6 md:p-8 relative"
            >
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button 
                  onClick={handleSpeech}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Copy Translations"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <div className="space-y-8 pr-16 font-[family-name:var(--font-inter)]">
                <div>
                  <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-semibold mb-2">
                    {input}
                  </h2>
                  {result.phonetic && (
                    <span className="text-purple-400 font-mono text-sm px-3 py-1 bg-purple-400/10 rounded-full">
                      {result.phonetic}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {result.meaning && (
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Meaning</h3>
                      <p className="text-gray-200 leading-relaxed">{result.meaning}</p>
                    </div>
                  )}

                  {result.explanation && (
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">Grammatical Explanation</h3>
                      <p className="text-gray-200 leading-relaxed">{result.explanation}</p>
                    </div>
                  )}

                  <div className="h-px bg-white/10 w-full" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <h3 className="text-xs uppercase tracking-wider text-orange-200 mb-2 font-semibold">Hindi</h3>
                      <p className="text-xl text-white font-medium">{result.hindi}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <h3 className="text-xs uppercase tracking-wider text-blue-200 mb-2 font-semibold">Marathi</h3>
                      <p className="text-xl text-white font-medium">{result.marathi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
