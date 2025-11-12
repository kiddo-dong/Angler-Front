import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import type { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const { message } = result;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-soft border border-white/20 p-8">
        {/* 백엔드에서 완성된 메시지 표시 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {message}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            onClick={onReset}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            새로운 분석
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 text-sm text-center mt-6"
        >
          ⚠️ AI 분석 결과는 참고용이며, 의심스러운 경우 관련 기관에 문의하세요.
        </motion.p>
      </div>
    </motion.div>
  );
}
