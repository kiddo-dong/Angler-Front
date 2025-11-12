import { motion } from 'framer-motion';
import { Fish } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Animated Fish */}
      <div className="relative w-32 h-32">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Fish className="w-32 h-32 text-[#2563EB]" strokeWidth={1.5} />
        </motion.div>
        
        {/* Bubbles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#22D3EE] rounded-full opacity-60"
            style={{
              left: `${20 + i * 20}%`,
              bottom: '10%'
            }}
            animate={{
              y: [-60, -120],
              opacity: [0.6, 0],
              scale: [1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Water Waves */}
      <div className="relative w-64 h-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex"
          animate={{
            x: [0, -64]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              viewBox="0 0 64 16"
              className="w-16 h-16"
              fill="none"
            >
              <path
                d="M0 8 Q 16 0, 32 8 T 64 8"
                stroke="#22D3EE"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M0 12 Q 16 4, 32 12 T 64 12"
                stroke="#2563EB"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
            </svg>
          ))}
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <motion.p
          className="text-[#0F172A]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          메시지를 낚아올리고 있습니다...
        </motion.p>
        <p className="text-[#64748B]">AI가 피싱 여부를 분석 중입니다</p>
      </div>
    </div>
  );
}
