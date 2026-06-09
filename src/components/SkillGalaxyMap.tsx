import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ZoomIn, ZoomOut, RefreshCw, Star, Info, HelpCircle, Target } from "lucide-react";
import { GALAXY_NODES } from "../data/galaxyData";
import { GalaxyNode } from "../types";
import { recordSkillEvidence, parseMarketDemand } from "../utils/passportStore";

export default function SkillGalaxyMap() {
  const [nodes, setNodes] = useState<GalaxyNode[]>(GALAXY_NODES);
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GalaxyNode | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  // Slow galactic orbit rotation loop
  useEffect(() => {
    let animationId: number;
    if (isRotating) {
      const updateRotation = () => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
        animationId = requestAnimationFrame(updateRotation);
      };
      animationId = requestAnimationFrame(updateRotation);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isRotating]);

  // Handle Zoom Controllers
  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.15, 0.6));
  const handleReset = () => {
    setZoomScale(1);
    setRotationAngle(0);
    setSelectedNode(null);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });

  // Handle ResizeObserver to adapt dynamic coordinate centering perfectly
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: width || 500, height: height || 400 });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Convert Cartesian coordinates utilizing rotation math to create a slow rotating 3D galaxy feel
  const getRotatedCoordinates = (x: number, y: number) => {
    const radians = (rotationAngle * Math.PI) / 180;
    const rx = x * Math.cos(radians) - y * Math.sin(radians);
    const ry = x * Math.sin(radians) + y * Math.cos(radians);
    return { rx, ry };
  };

  return (
    <div id="galaxy-map-root" className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6 min-h-[85vh] relative select-none">
      
      {/* Dynamic Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />

      {/* Header coordinates */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight flex items-center gap-3">
            <Compass className="w-8 md:w-10 h-8 md:h-10 text-luxury-gold" />
            Skill Galaxy Map
          </h2>
          <p className="text-luxury-gray mt-2 text-sm font-light">
            An immersive spatial projection mapping the quantum constellations of futuristic skill dependencies.
          </p>
        </div>

        {/* Floating Top Controls Box */}
        <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 backdrop-blur-md self-start">
          <button id="btn-zoom-in" onClick={handleZoomIn} className="p-2.5 hover:bg-white/5 text-luxury-gold rounded-lg cursor-pointer transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button id="btn-zoom-out" onClick={handleZoomOut} className="p-2.5 hover:bg-white/5 text-luxury-gold rounded-lg cursor-pointer transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="btn-rotate-toggle"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2.5 hover:bg-white/5 rounded-lg cursor-pointer transition-colors ${isRotating ? "text-luxury-gold" : "text-slate-500"}`}
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
          </button>
          <button id="btn-map-reset" onClick={handleReset} className="px-3.5 py-1 text-xs font-mono text-luxury-gold hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200">
            RESET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left side: Constellation Space Board */}
        <div ref={containerRef} className="lg:col-span-8 bg-black/40 border border-white/10 rounded-[32px] min-h-[460px] relative overflow-hidden flex items-center justify-center p-6 shadow-2xl backdrop-blur-3xl">
          
          {/* Gravitational blackhole core center indicator */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5 animate-pulse -z-10" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-white/5 -z-10" />
          
          <div className="absolute w-12 h-12 rounded-full bg-luxury-gold/5 blur-xl flex items-center justify-center pr-0.5">
            <div className="w-3 h-3 rounded-full bg-luxury-gold animate-ping" />
          </div>

          <svg className="w-full h-full min-h-[380px] relative cursor-grab active:cursor-grabbing text-left overflow-visible">
            
            {/* Main galaxy canvas alignment viewport centered perfectly */}
            <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2}) scale(${zoomScale})`}>
              
              {/* Draw Constellation Link lines first so they render under the star spheres */}
              {nodes.map((n) => {
                const startCoord = getRotatedCoordinates(n.x, n.y);
                return n.connections.map((targetId) => {
                  const target = nodes.find((val) => val.id === targetId);
                  if (!target) return null;
                  const endCoord = getRotatedCoordinates(target.x, target.y);
                  return (
                    <line
                      key={`${n.id}-${targetId}`}
                      x1={startCoord.rx}
                      y1={startCoord.ry}
                      x2={endCoord.rx}
                      y2={endCoord.ry}
                      stroke={
                        selectedNode?.id === n.id || selectedNode?.id === targetId
                          ? "rgba(244, 223, 100, 0.70)"
                          : "rgba(255, 255, 255, 0.10)"
                      }
                      strokeWidth={selectedNode?.id === n.id || selectedNode?.id === targetId ? "2.5" : "1.2"}
                      strokeDasharray={n.status === "locked" || target.status === "locked" ? "6 6" : "0"}
                      className="transition-all duration-300"
                    />
                  );
                });
              })}

              {/* Draw Star Planets */}
              {nodes.map((n) => {
                const rCoord = getRotatedCoordinates(n.x, n.y);
                
                // Categorized theme color indicators
                const isMastered = n.status === "mastered";
                const isLearning = n.status === "learning";
                const isLocked = n.status === "locked";

                const nodeColor = isMastered 
                  ? "rgb(198, 169, 138)" 
                  : isLearning 
                    ? "rgb(244, 223, 200)" 
                    : "rgb(140, 140, 140)";

                const sizeRadius = n.level === 4 ? 12 : n.level === 3 ? 9.5 : 7.5;

                return (
                  <g key={n.id} transform={`translate(${rCoord.rx}, ${rCoord.ry})`} className="cursor-pointer">
                    
                    {/* Planet outer atmosphere pulse glow */}
                    <circle
                      r={sizeRadius + 10}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth="1.5"
                      opacity={hoveredNode?.id === n.id || selectedNode?.id === n.id ? "0.4" : "0.08"}
                      className="transition-all duration-300 animate-pulse"
                    />

                    {/* Outer core */}
                    <circle
                      r={sizeRadius}
                      fill={isLocked ? "transparent" : nodeColor}
                      stroke={nodeColor}
                      strokeWidth="2.5"
                      onClick={() => {
                        setSelectedNode(n);
                        setIsRotating(false);
                      }}
                      onMouseEnter={() => setHoveredNode(n)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="transition-all duration-200"
                    />

                    {/* Locked custom lock icon overlay dot */}
                    {isLocked && (
                      <circle
                        r="3.5"
                        fill="rgb(15, 23, 42)"
                        onClick={() => {
                          setSelectedNode(n);
                          setIsRotating(false);
                        }}
                      />
                    )}

                    {/* Floating star labels on galaxy deck */}
                    <text
                      y={sizeRadius + 14}
                      textAnchor="middle"
                      fill={selectedNode?.id === n.id ? "#ffffff" : "#D9D9D9"}
                      fontSize={window.innerWidth > 768 ? "9.5" : "8"}
                      fontWeight={selectedNode?.id === n.id ? "600" : "400"}
                      className="font-mono uppercase tracking-widest pointer-events-none transition-all duration-300 select-none"
                    >
                      {n.name.split(" ")[0]}
                    </text>

                  </g>
                );
              })}

            </g>

          </svg>

        </div>

        {/* Right side: Expand detail Drawer panel */}
        <div className="lg:col-span-4 min-h-[300px] flex flex-col justify-between items-stretch">
          
          <AnimatePresence mode="wait">
            {selectedNode ? (
              /* ACTIVE DRAWER */
              <motion.div
                key="galaxy-drawer-active"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="w-full h-full bg-[#F4EAE0]/[0.05] border border-white/10 p-6 rounded-[32px] backdrop-blur-3xl flex flex-col gap-5 text-left relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl" />
                
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/5 text-luxury-gold border border-white/10 shadow-inner">
                    Category: {selectedNode.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-3">{selectedNode.name}</h3>
                </div>

                <p className="text-luxury-white text-xs leading-relaxed">
                  {selectedNode.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider">Estimated Salary Power</span>
                    <span className="text-sm font-mono text-luxury-gold font-extrabold">{selectedNode.salaryImpact}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-luxury-gray font-mono uppercase tracking-wider">Current Market Demand</span>
                    <span className="text-sm font-mono text-luxury-bronze font-extrabold">{selectedNode.marketDemand}</span>
                  </div>
                </div>

                {/* Simulated prerequisite constellation path suggestions */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                  <span className="text-[10px] text-luxury-gray font-mono uppercase tracking-widest flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-luxury-gold" />
                    Recommended Constellation Pathway Action
                  </span>
                  <p className="text-luxury-gray text-xs leading-relaxed mt-1">
                    Unlocking this node triggers dependency calibration algorithms and expands adjacent nodes of category <strong className="text-white">{selectedNode.category}</strong> by up to 14%.
                  </p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    id="btn-learn-star"
                    onClick={() => {
                      recordSkillEvidence(
                        selectedNode.name,
                        parseMarketDemand(selectedNode.marketDemand),
                        "mastered"
                      );
                      setNodes(prev => prev.map(n =>
                        n.id === selectedNode.id ? { ...n, status: "mastered" } : n
                      ));
                      setSelectedNode(prev => prev ? { ...prev, status: "mastered" } : null);
                    }}
                    className={`flex-grow py-3 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer border ${
                      selectedNode.status === "mastered"
                        ? "bg-white/5 text-slate-500 border-white/5 pointer-events-none"
                        : "bg-luxury-gold hover:bg-luxury-gold-hover text-black shadow-[0_4px_15px_rgba(244,223,200,0.22)] border-luxury-gold"
                    }`}
                  >
                    {selectedNode.status === "mastered" ? "Verified Mastered" : "Learn & Mount Star Coordinates"}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* EMPTY DEFAULT STAT BOARD info blocks */
              <motion.div
                key="galaxy-drawer-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full border border-dashed border-white/20 bg-[#F4EAE0]/[0.02] backdrop-blur-md rounded-[32px] p-8 flex flex-col justify-center items-center text-center gap-4"
              >
                <HelpCircle className="w-10 h-10 text-luxury-gold animate-pulse" />
                <div>
                  <h4 className="text-white font-extrabold text-sm uppercase tracking-widest">Planetary Grid Offline</h4>
                  <p className="text-xs text-luxury-gray max-w-sm mt-2 leading-relaxed">
                    Click any glowing star node or planet within the dynamic vector space constellation viewport to calibrate spatial coordinates.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
