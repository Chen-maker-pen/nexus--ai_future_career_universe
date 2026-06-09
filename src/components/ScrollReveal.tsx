import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  id?: string;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.9, 
  yOffset = 30,
  id
}: ScrollRevealProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium luxury exponential curve (Apple & Linear styled)
      }}
    >
      {children}
    </motion.div>
  );
}
