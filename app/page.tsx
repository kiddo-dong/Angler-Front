'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResultCard } from './components/ResultCard';
import { Footer } from './components/Footer';
import type { AnalysisResult } from './types';
import { analyzePhishingImage, ApiError } from './lib/api';

export default function Home() {
  const [stage, setStage] = useState<'upload' | 'loading' | 'result'>('upload');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (data: { image: File }) => {
    setStage('loading');

    try {
      // 실제 백엔드 API 호출
      const analysisResult = await analyzePhishingImage(data.image);
      
      setResult(analysisResult);
      setStage('result');
      
      toast.success('분석 완료!', {
        description: '피싱 분석이 완료되었습니다.',
      });
    } catch (err) {
      console.error('Analysis failed:', err);
      
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : '분석 중 오류가 발생했습니다. 다시 시도해주세요.';
      
      toast.error('분석 실패', {
        description: errorMessage,
      });
      
      setStage('upload');
    }
  };

  const handleReset = () => {
    setStage('upload');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {stage === 'upload' && (
          <div className="w-full max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI 기반 실시간 분석
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
                피싱 문자 탐지 서비스
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                의심스러운 문자 이미지를 업로드하면, AI가 즉시 피싱 여부를 분석해드립니다.
              </p>
            </div>
            <UploadArea onAnalyze={handleAnalyze} />
          </div>
        )}

        {stage === 'loading' && <LoadingIndicator />}

        {stage === 'result' && result && (
          <ResultCard result={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
}
