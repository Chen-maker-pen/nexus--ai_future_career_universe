import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Zap } from "lucide-react";

interface ThreeDRobotAssistantProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ThreeDRobotAssistant({ onClick, isOpen }: ThreeDRobotAssistantProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [hovered, setHovered] = useState(false);
  const soundEnabledRef = useRef(false);

  // Play cinematic interaction sound effects (optional / customizable synthetics)
  const playActivationSound = () => {
    try {
      if (!soundEnabledRef.current) return;
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Retro-futuristic blip sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // Ignored if browser policy blocks autoplay autoplay
    }
  };

  useEffect(() => {
    // Enable sound synth upon first page user interaction
    const enableAudio = () => {
      soundEnabledRef.current = true;
    };
    window.addEventListener("click", enableAudio);
    return () => window.removeEventListener("click", enableAudio);
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Core High-Performance 60FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Smooth mechanical variables (State)
    let rx = 0; // Rotated offset x
    let ry = 0; // Rotated offset y
    let scaleX = 1;
    let scaleY = 1;
    let blinkValue = 1; // 1 = fully open, 0 = closed
    let blinkTimer = 0;
    const particles: Array<{ x: number; y: number; vy: number; alpha: number; size: number }> = [];

    const drawRobot = () => {
      time += 0.045;
      
      // Calculate layout bounding coordinates of canvas relative to viewport
      const rect = canvas.getBoundingClientRect();
      const rCenterX = rect.left + rect.width / 2;
      const rCenterY = rect.top + rect.height / 2;

      // Target vectors to cursor pointer location
      const dx = mouseRef.current.x - rCenterX;
      const dy = mouseRef.current.y - rCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Interpolate rotational parameters for head & eye angles
      const limit = hovered ? 22 : 16;
      const targetRx = distance > 0 ? (dx / distance) * limit : 0;
      const targetRy = distance > 0 ? (dy / distance) * limit : 0;

      // Elastic mass interpolation mapping
      rx += (targetRx - rx) * 0.12;
      ry += (targetRy - ry) * 0.12;

      // Smooth vertical hover motion
      const hoverOffset = Math.sin(time) * (hovered ? 9 : 6);

      // Handle blinks organically
      blinkTimer++;
      if (blinkTimer > 165) {
        blinkValue -= 0.22;
        if (blinkValue <= 0) {
          blinkValue = 0;
          blinkTimer = 0; // Fully reset
        }
      } else if (blinkValue < 1) {
        blinkValue += 0.22;
        if (blinkValue > 1) {
          blinkValue = 1;
        }
      }

      // Generate energy flow flare particles
      if (Math.random() < 0.35) {
        particles.push({
          x: 60 + (Math.random() - 0.5) * 18,
          y: 85 + hoverOffset,
          vy: 1.5 + Math.random() * 2,
          size: 1.5 + Math.random() * 2,
          alpha: 0.8
        });
      }

      // Clear layout
      ctx.clearRect(0, 0, 120, 120);

      // Draw Orbiting Holographic Rings first under robot
      ctx.save();
      ctx.translate(60, 60 + hoverOffset);
      ctx.rotate(time * 0.4);
      
      // Soft ambient blue shadow
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(244, 223, 200, 0.35)";

      ctx.beginPath();
      // Orbit Ring 1 - Dashed Luxury Gold
      ctx.ellipse(0, 36, 32, 10, Math.sin(time * 0.2) * 0.12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244, 223, 200, 0.45)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Orbit Ring 2 - Solid Minimal White
      ctx.beginPath();
      ctx.ellipse(0, 36, 42, 12, Math.cos(time * 0.2) * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      // Draw jet particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(244, 223, 200, 0.6)";
        ctx.fillStyle = `rgba(244, 223, 200, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ROBOT MAIN HEAD: Polished Capsule Sphere
      const bodyX = 60 + rx * 0.15;
      const bodyY = 54 + hoverOffset + ry * 0.15;

      // Ambient Drop Shadow
      ctx.save();
      ctx.shadowBlur = 24;
      ctx.shadowColor = isOpen ? "rgba(244, 223, 200, 0.4)" : "rgba(0, 0, 0, 0.85)";

      // Core Outer Metallic Shell (Black Chrome Gradient)
      const shellGrad = ctx.createRadialGradient(bodyX - 8, bodyY - 10, 4, bodyX, bodyY, 32);
      shellGrad.addColorStop(0, "#282828");
      shellGrad.addColorStop(0.3, "#121212");
      shellGrad.addColorStop(0.85, "#030303");
      shellGrad.addColorStop(1, "#000000");

      ctx.beginPath();
      ctx.arc(bodyX, bodyY, 30, 0, Math.PI * 2);
      ctx.fillStyle = shellGrad;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.6;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Luxury Gold Ring Rim around the shell
      ctx.save();
      ctx.beginPath();
      ctx.arc(bodyX, bodyY, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244, 223, 200, 0.12)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // Dark Crystal Screen Faceplate
      const faceX = bodyX + rx * 0.45;
      const faceY = bodyY + ry * 0.45;

      ctx.save();
      const faceGrad = ctx.createRadialGradient(faceX - 2, faceY - 2, 1, faceX, faceY, 20);
      faceGrad.addColorStop(0, "#080808");
      faceGrad.addColorStop(0.7, "#020202");
      faceGrad.addColorStop(1, "#000000");

      ctx.beginPath();
      // Elegant capsule shape front panel
      ctx.roundRect(faceX - 20, faceY - 14, 40, 26, 12);
      ctx.fillStyle = faceGrad;
      ctx.strokeStyle = "rgba(244, 223, 200, 0.22)";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Glass Highlighting Reflections
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(faceX - 8, faceY - 8, 10, 3, -Math.PI / 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
      ctx.fill();
      ctx.restore();

      // GLOWING AI DIGITAL EYES
      const leftEyeTargetX = faceX - 9 + rx * 0.18;
      const rightEyeTargetX = faceX + 9 + rx * 0.18;
      const eyeTargetY = faceY + ry * 0.18;

      ctx.save();
      // Glowing Soft White Shadow Style
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.fillStyle = isOpen ? "#ffffff" : "rgba(244, 223, 200, 0.95)";

      // Draw Left Eye
      if (blinkValue > 0.1) {
        ctx.beginPath();
        ctx.ellipse(leftEyeTargetX, eyeTargetY, 4, 3.5 * blinkValue, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eye Inner Pupil Accent (Soft warm gold contrast glow)
        ctx.fillStyle = "rgba(244, 223, 200, 1)";
        ctx.beginPath();
        ctx.arc(leftEyeTargetX + (rx > 0 ? 0.8 : -0.8), eyeTargetY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Blink indicator line
        ctx.strokeStyle = "rgba(244, 223, 200, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(leftEyeTargetX - 3, eyeTargetY);
        ctx.lineTo(leftEyeTargetX + 3, eyeTargetY);
        ctx.stroke();
      }

      // Draw Right Eye
      ctx.fillStyle = isOpen ? "#ffffff" : "rgba(244, 223, 200, 0.95)";
      if (blinkValue > 0.1) {
        ctx.beginPath();
        ctx.ellipse(rightEyeTargetX, eyeTargetY, 4, 3.5 * blinkValue, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(244, 223, 200, 1)";
        ctx.beginPath();
        ctx.arc(rightEyeTargetX + (rx > 0 ? 0.8 : -0.8), eyeTargetY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = "rgba(244, 223, 200, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rightEyeTargetX - 3, eyeTargetY);
        ctx.lineTo(rightEyeTargetX + 3, eyeTargetY);
        ctx.stroke();
      }
      ctx.restore();

      // Dynamic holographic pulsing antennas
      const antennaX = bodyX - rx * 0.15;
      const antennaY = bodyY - 28 - hoverOffset * 0.2;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bodyX, bodyY - 30);
      ctx.quadraticCurveTo(bodyX, antennaY + 4, antennaX, antennaY);
      ctx.strokeStyle = "rgba(244, 223, 200, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Antenna glowing tip sphere
      ctx.shadowBlur = 10;
      ctx.shadowColor = Math.sin(time * 3) > 0.2 ? "rgba(244, 223, 200, 0.95)" : "rgba(255, 255, 255, 0.5)";
      ctx.fillStyle = Math.sin(time * 3) > 0.2 ? "#ffffff" : "rgba(244, 223, 200, 0.8)";
      ctx.beginPath();
      ctx.arc(antennaX, antennaY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Elegant mechanical core frame support wings
      ctx.save();
      ctx.translate(bodyX, bodyY);
      
      // Floating Left wing Thruster Flap
      ctx.strokeStyle = "rgba(244, 223, 200, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-30, 2);
      ctx.lineTo(-44 - (hovered ? 4 : 0), -6 + Math.sin(time * 2) * 2);
      ctx.lineTo(-38, 14);
      ctx.closePath();
      ctx.stroke();
      
      // Floating Right wing Thruster Flap
      ctx.beginPath();
      ctx.moveTo(30, 2);
      ctx.lineTo(44 + (hovered ? 4 : 0), -6 + Math.cos(time * 2) * 2);
      ctx.lineTo(38, 14);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(drawRobot);
    };

    drawRobot();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hovered, isOpen]);

  return (
    <div
      className="relative flex flex-col items-center justify-center p-1.5 pointer-events-auto cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        playActivationSound();
        onClick();
      }}
    >
      {/* Intuitively glowing cinematic backdrop backing the metallic shell */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-tr from-luxury-bronze/10 via-luxury-gold/5 to-luxury-white/5 rounded-full blur-2xl pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: hovered ? 1.05 : 1,
          rotate: isOpen ? [0, -3, 3, 0] : 0
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className="cursor-pointer relative z-10 select-none active:scale-[0.94]"
      >
        <canvas
          ref={canvasRef}
          width={120}
          height={120}
          className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] cursor-pointer"
        />

        {/* Floating live caption badge near head */}
        <div className="absolute top-[-4px] left-[50%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/90 text-luxury-gold border border-luxury-gold/25 px-2.5 py-0.5 rounded-full text-[8.5px] font-mono whitespace-nowrap uppercase tracking-widest leading-none shadow-xl flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          NEXUS AI v4.1
        </div>
      </motion.div>
    </div>
  );
}
