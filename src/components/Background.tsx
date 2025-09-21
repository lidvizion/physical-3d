"use client";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* 1. Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>

      {/* 2. Grid SVG (Gold + Purple Lines & Shapes) */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {/* Grid Lines (wider and blurry) */}
          <g stroke="#FFD700" strokeWidth="3" opacity="0.12" fill="none" filter="blur(1px)">
            {[...Array(9)].map((_, i) => (
              <line key={i} x1="0" y1={(i + 1) * 100} x2="1000" y2={(i + 1) * 100} />
            ))}
          </g>
          <g stroke="#7B68EE" strokeWidth="3" opacity="0.12" fill="none" filter="blur(1px)">
            {[...Array(9)].map((_, i) => (
              <line key={i} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="1000" />
            ))}
          </g>

          {/* Gold squares (wider and blurry) */}
          <g fill="#FFD700" opacity="0.15" filter="blur(1px)">
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={90 + i * 100} y={90 + i * 100} width="20" height="20" />
            ))}
          </g>

          {/* Purple rectangles (wider and blurry) */}
          <g fill="#7B68EE" opacity="0.10" filter="blur(1px)">
            <rect x="140" y="140" width="40" height="30" />
            <rect x="340" y="240" width="50" height="40" />
            <rect x="540" y="340" width="45" height="35" />
            <rect x="740" y="440" width="55" height="45" />
            <rect x="240" y="640" width="60" height="50" />
          </g>
        </svg>
      </div>

      {/* 3. Neon Gradient Lines (Animated with Framer Motion) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-arcade-purple to-transparent opacity-60"
          style={{ top: "38%", filter: "blur(2px)" }}
          animate={{ x: ["-40%", "40%", "-40%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-arcade-pink to-transparent opacity-40"
          style={{ top: "82%", filter: "blur(3px)" }}
          animate={{ x: ["40%", "-40%", "40%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-50"
          style={{ left: "54%", filter: "blur(2px)" }}
          animate={{ y: ["-40%", "40%", "-40%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>


      {/* 5. Shading Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-800/20 to-transparent opacity-50"></div>
    </div>
  );
};

export default Background;
