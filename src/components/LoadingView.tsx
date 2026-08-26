import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative mb-6">
        {/* Animated sparkling element */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-orange-500"
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
          </svg>
        </motion.div>
        
        {/* Smaller sparkles */}
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-0 right-[-10px] text-orange-400"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2L13.3 8.7L20 10L13.3 11.3L12 18L10.7 11.3L4 10L10.7 8.7L12 2Z" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10px] left-[-10px] text-orange-400"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2L13.3 8.7L20 10L13.3 11.3L12 18L10.7 11.3L4 10L10.7 8.7L12 2Z" />
          </svg>
        </motion.div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Extracting...</h2>
      <p className="text-gray-400 text-sm">This may take a while</p>
    </div>
  );
}
