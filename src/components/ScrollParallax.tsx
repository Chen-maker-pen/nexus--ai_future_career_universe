import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number; // positive for moving up, negative for moving down
  className?: string;
  id?: string;
}

export default function ScrollParallax({ 
  children, 
  speed = 0.08, 
  className = "",
  id
}: ScrollParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate gentle translate shift based on speed coefficient
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div 
      id={id}
      ref={containerRef} 
      style={{ y }} 
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
