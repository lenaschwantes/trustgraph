/*
 * DESIGN: "Cyber Trust" - Verified Badge
 * 
 * - Animated badge for verified status
 * - Pulse animation with glow effect
 */

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function VerifiedBadge({ size = 'md', showLabel = false }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-flex items-center gap-1.5"
    >
      <CheckCircle2 className={`${sizeClasses[size]} text-primary flex-shrink-0`} />
      {showLabel && (
        <span className="text-xs font-medium text-primary">Verified</span>
      )}
    </motion.div>
  );
}
