/*
 * DESIGN: "Cyber Trust" - Loading Spinner
 * 
 * - Animated spinner with glow effect
 * - Used for loading states
 */

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="glow-green"
      >
        <Loader2 className="w-12 h-12 text-primary" />
      </motion.div>
    </div>
  );
}
