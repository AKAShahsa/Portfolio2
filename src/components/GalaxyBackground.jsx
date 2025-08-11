import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Galaxy Model Component
function GalaxyModel({ scrollY }) {
  const [geometry, setGeometry] = useState(null);
  const [error, setError] = useState(null);
  const modelRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load the PLY model with error handling
  useEffect(() => {
    const loader = new PLYLoader();
    
    // Try multiple paths for the PLY file
    const paths = [
      '/galaxy_model.ply',
      './galaxy_model.ply',
      '/public/galaxy_model.ply'
    ];
    
    const tryLoad = (pathIndex = 0) => {
      if (pathIndex >= paths.length) {
        setError('Could not load galaxy model');
        return;
      }
      
      loader.load(
        paths[pathIndex],
        (loadedGeometry) => {
          // Center and scale the geometry
          loadedGeometry.computeBoundingBox();
          const center = new THREE.Vector3();
          loadedGeometry.boundingBox.getCenter(center);
          loadedGeometry.translate(-center.x, -center.y, -center.z);
          
          // Normalize scale
          const size = new THREE.Vector3();
          loadedGeometry.boundingBox.getSize(size);
          const maxDimension = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDimension; // Scale to reasonable size
          loadedGeometry.scale(scale, scale, scale);
          
          // Compute normals for proper lighting
          loadedGeometry.computeVertexNormals();
          
          setGeometry(loadedGeometry);
          setError(null);
          console.log('Galaxy PLY model loaded successfully!');
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (err) => {
          console.log(`Failed to load from ${paths[pathIndex]}, trying next path...`, err);
          tryLoad(pathIndex + 1);
        }
      );
    };
    
    tryLoad();
  }, []);

  // Handle mouse movement for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (modelRef.current && geometry) {
      // Scroll-based zoom and rotation
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
      
      // Smooth rotation based on time and scroll
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.08 + scrollProgress * Math.PI * 2;
      modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
      modelRef.current.rotation.z = scrollProgress * 0.2;
      
      // Scale based on scroll with zoom effect
      const baseScale = 1 + scrollProgress * 0.8;
      modelRef.current.scale.setScalar(baseScale);
      
      // Subtle mouse parallax
      modelRef.current.position.x = mousePos.x * 0.3;
      modelRef.current.position.y = mousePos.y * 0.1;
      
      // Dynamic position based on scroll
      modelRef.current.position.z = -scrollProgress * 8;
    }
  });

  // Show error state or loading state
  if (error) {
    return (
      <mesh ref={modelRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#4a5568"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    );
  }

  if (!geometry) return null;

  return (
    <mesh ref={modelRef} geometry={geometry} position={[0, 0, 0]}>
      {/* Multi-layered galaxy material for stunning effect */}
      <meshStandardMaterial
        color="#e6f3ff"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={2.0}
        transparent
        opacity={0.85}
        emissive="#001122"
        emissiveIntensity={0.3}
      />
      
      {/* Add a second layer with different material for depth */}
      <mesh geometry={geometry} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#9966ff"
          metalness={0.7}
          roughness={0.3}
          transmission={0.2}
          transparent
          opacity={0.4}
          emissive="#330066"
          emissiveIntensity={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </mesh>
  );
}

// Enhanced Particle Field Component for PLY Galaxy
function ParticleField({ scrollY }) {
  const pointsRef = useRef();
  const particleCount = 3000;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Create galaxy spiral pattern
      const radius = Math.random() * 60 + 5;
      const spiralArm = Math.floor(Math.random() * 3); // 3 spiral arms
      const armAngle = (spiralArm * Math.PI * 2) / 3;
      const spiralOffset = (radius / 60) * Math.PI * 4; // Spiral effect
      const theta = armAngle + spiralOffset + (Math.random() - 0.5) * 0.5;
      const phi = (Math.random() - 0.5) * 0.4; // Flatten the galaxy
      
      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi) * (0.1 + Math.random() * 0.2);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      
      // Galaxy-like colors with more variety
      const color = new THREE.Color();
      const colorType = Math.random();
      if (colorType < 0.4) {
        // Blue-white stars
        color.setHSL(0.6 + Math.random() * 0.1, 0.3 + Math.random() * 0.4, 0.7 + Math.random() * 0.3);
      } else if (colorType < 0.7) {
        // Purple nebula
        color.setHSL(0.8 + Math.random() * 0.1, 0.6 + Math.random() * 0.4, 0.4 + Math.random() * 0.4);
      } else {
        // Green accent (your brand color)
        color.setHSL(0.33, 0.8 + Math.random() * 0.2, 0.5 + Math.random() * 0.3);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Variable sizes for more realism
      sizes[i] = Math.random() * 0.3 + 0.1;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
      
      // Rotate particles in galaxy formation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = scrollProgress * 0.3;
      
      // Subtle pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      pointsRef.current.scale.setScalar(scale);
      
      // Drift effect
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Enhanced Orbital Controls
function EnhancedControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={false}
      enableRotate={true}
      autoRotate={true}
      autoRotateSpeed={0.2}
      minDistance={5}
      maxDistance={50}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI - Math.PI / 4}
      dampingFactor={0.05}
      enableDamping={true}
    />
  );
}

// Enhanced Lighting Setup for PLY Galaxy
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#1a1a2e" />
      
      {/* Main directional light */}
      <directionalLight
        position={[15, 15, 10]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Galaxy accent lights */}
      <pointLight position={[-15, 10, -15]} intensity={0.8} color="#9966ff" distance={50} />
      <pointLight position={[15, -10, 15]} intensity={0.6} color="#00E676" distance={40} />
      <pointLight position={[0, 20, 0]} intensity={0.4} color="#66ccff" distance={60} />
      
      {/* Rim lighting for galaxy edges */}
      <spotLight
        position={[0, 0, 25]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={0.7}
        color="#ffffff"
        castShadow
        target-position={[0, 0, 0]}
      />
      
      {/* Back lighting */}
      <directionalLight
        position={[-10, -10, -20]}
        intensity={0.5}
        color="#4a90e2"
      />
      
      {/* Subtle fill lights */}
      <hemisphereLight
        skyColor="#1e3a8a"
        groundColor="#0f172a"
        intensity={0.3}
      />
    </>
  );
}

// Main Galaxy Background Component
export default function GalaxyBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#00E676] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#00E676] text-lg font-medium">Loading Galaxy...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: [0, 0, 15], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows
        onCreated={() => setIsLoaded(true)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          physicallyCorrectLights: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        {/* Environment and Lighting */}
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 20, 100]} />
        <SceneLighting />
        
        {/* Enhanced Star Field */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {/* Particle Field */}
        <ParticleField scrollY={scrollY} />
        
        {/* Main Galaxy Model */}
        <GalaxyModel scrollY={scrollY} />
        
        {/* Enhanced Orbital Controls */}
        <EnhancedControls />
        
        {/* Environment Mapping */}
        <Environment preset="night" />
      </Canvas>
      
      {/* Gradient Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      
      {/* Professional UI Overlay */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 opacity-60 pointer-events-none z-20">
        <div className="flex flex-col items-end gap-1 backdrop-blur-sm bg-black/20 p-2 rounded">
          <div>🌌 Interactive Galaxy</div>
          <div>🖱️ Drag to explore</div>
          <div>📜 Scroll to zoom</div>
        </div>
      </div>
    </div>
  );
}
