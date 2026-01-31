/*
 * DESIGN: "Cyber Trust" - Profile Node Component
 * 
 * - Glassmorphism card with glow effect
 * - Verified badge with pulse animation
 * - Skills displayed as glowing tags
 */

import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { CheckCircle2, User } from 'lucide-react';

interface ProfileNodeData {
  label: string;
  role: string;
  skills: string[];
  verified: boolean;
}

export default function ProfileNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ProfileNodeData;
  const { label, role, skills, verified } = nodeData;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-secondary !border-secondary !w-3 !h-3"
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`
          relative min-w-[200px] max-w-[280px] p-4 rounded-xl
          glass-card cursor-pointer
          ${selected ? 'ring-2 ring-accent glow-cyan' : ''}
          ${verified ? 'border-primary/50' : 'border-muted/50'}
          transition-all duration-300
        `}
      >
        {/* Verified glow effect */}
        {verified && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-lg opacity-60" />
        )}
        
        <div className="relative z-10">
          {/* Header with avatar and verified badge */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${verified ? 'bg-primary/20 glow-green' : 'bg-muted'}
              transition-all duration-300
            `}>
              <User className={`w-6 h-6 ${verified ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground truncate text-sm">
                  {label}
                </h3>
                {verified && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{role}</p>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  px-2 py-0.5 text-[10px] font-medium rounded-full
                  ${verified 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-muted text-muted-foreground border border-muted'
                  }
                `}
              >
                {skill}
              </motion.span>
            ))}
            {skills.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
                +{skills.length - 4}
              </span>
            )}
          </div>
          
          {/* Verification status */}
          <div className={`
            mt-3 pt-2 border-t border-border/50 text-[10px] font-medium
            ${verified ? 'text-primary' : 'text-muted-foreground'}
          `}>
            {verified ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Verified via .cv domain
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Pending verification
              </span>
            )}
          </div>
        </div>
      </motion.div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-secondary !border-secondary !w-3 !h-3"
      />
    </>
  );
}
