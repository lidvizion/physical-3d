'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { Eye, EyeOff, Grid3X3, Download } from 'lucide-react';

interface Model3DViewerProps {
  modelUrl?: string;
  className?: string;
  onDownload?: () => void;
}

// Placeholder 3D model component when no model is loaded
function PlaceholderModel() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#f59e0b" 
        roughness={0.2}
        metalness={0.3}
        emissive="#fbbf24"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

// Placeholder GLB model component (for demo purposes)
function GLBModel({ url }: { url: string }) {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Placeholder model - in a real app, this would load the actual GLB */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial 
          color="#10b981" 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function Model3DViewer({ modelUrl, className = '', onDownload }: Model3DViewerProps) {
  const [wireframe, setWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);


  return (
    <div className={`feature-card relative group ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Eye className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">3D Preview</h2>
            <p className="text-base text-gray-300">Interactive model viewer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              wireframe 
                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-md' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
            }`}
            title={wireframe ? 'Solid view' : 'Wireframe view'}
          >
            {wireframe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              showGrid 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-md' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-purple-600 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md'
            }`}
            title={showGrid ? 'Hide grid' : 'Show grid'}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>

          {onDownload && (
            <>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              <button
                onClick={onDownload}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download GLB</span>
                <span className="sm:hidden">GLB</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative w-full h-[28rem] bg-gradient-to-br from-gray-800/80 via-blue-900/40 to-indigo-900/60 rounded-2xl overflow-hidden shadow-2xl border border-gray-600/30 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/10 to-indigo-500/5 rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)] rounded-2xl"></div>
        <Canvas 
          shadows
          camera={{ position: [5, 5, 5], fov: 50 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {showGrid && (
            <gridHelper args={[10, 10, '#9ca3af', '#e5e7eb']} position={[0, -2, 0]} />
          )}

          {modelUrl ? (
            <GLBModel url={modelUrl} />
          ) : (
            <PlaceholderModel />
          )}
        </Canvas>

        {!modelUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-4 bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-500/40 shadow-2xl">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <Eye className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-white font-semibold text-lg">No 3D model generated yet</p>
              <p className="text-base text-gray-400">Enter a prompt or upload images to get started</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-gradient-to-r from-gray-700/40 to-blue-900/30 rounded-xl border border-gray-600/40 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-6 text-base text-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
            <span className="font-medium">🖱️ Click and drag to rotate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
            <span className="font-medium">🔍 Scroll to zoom</span>
          </div>
        </div>
        <div className="text-sm text-gray-300 bg-gradient-to-r from-gray-700/80 to-blue-800/60 px-4 py-2 rounded-full border border-gray-600/60 backdrop-blur-sm">
          ⚡ Interactive 3D Viewer
        </div>
      </div>
    </div>
  );
}