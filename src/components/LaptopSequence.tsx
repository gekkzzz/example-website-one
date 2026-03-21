import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './LaptopSequence.css';

interface LaptopSequenceProps {
  onScrollProgress?: (progress: number) => void;
}

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const easeOut = (t: number, power: number) => 1 - Math.pow(1 - t, power);

const createEditorTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2a2d2e';
  ctx.fillRect(0, 0, canvas.width, 38);
  ctx.fillStyle = '#252526';
  ctx.fillRect(0, 38, 60, canvas.height - 38);

  ctx.fillStyle = '#ff5f57';
  ctx.beginPath();
  ctx.arc(16, 19, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#febc2e';
  ctx.beginPath();
  ctx.arc(32, 19, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#28c840';
  ctx.beginPath();
  ctx.arc(48, 19, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#c7c7c7';
  ctx.font = '14px sans-serif';
  ctx.fillText('Portfolio - Visual Studio Code', 74, 24);

  ctx.fillStyle = '#2d2d2d';
  ctx.fillRect(60, 38, canvas.width - 60, 34);

  const tabs = [
    { x: 72, w: 128, label: 'home.tsx', active: true },
    { x: 202, w: 144, label: 'contact.tsx', active: false },
  ];

  tabs.forEach((tab) => {
    ctx.fillStyle = tab.active ? '#1e1e1e' : '#353535';
    ctx.fillRect(tab.x, 40, tab.w, 30);
    ctx.fillStyle = tab.active ? '#dddddd' : '#9a9a9a';
    ctx.font = '12px sans-serif';
    ctx.fillText(tab.label, tab.x + 10, 59);
  });

  const lineColors = ['#c586c0', '#9cdcfe', '#ce9178', '#4fc1ff', '#dcdcaa', '#b5cea8', '#9cdcfe'];
  const lineWidths = [420, 320, 380, 470, 340, 430, 260];

  lineColors.forEach((color, idx) => {
    ctx.fillStyle = color;
    ctx.fillRect(86, 105 + idx * 52, lineWidths[idx], 10);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.fillRect(73, 104, 2, 314);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

const CameraRig: React.FC<{ progress: number }> = ({ progress }) => {
  const { camera } = useThree();

  useFrame(() => {
    const openProgress = clamp(progress / 0.5, 0, 1);
    const zoomProgress = clamp((progress - 0.5) / 0.5, 0, 1);
    const easedOpen = easeOut(openProgress, 2.2);
    const easedZoom = easeOut(zoomProgress, 2.2);

    const targetPos = new THREE.Vector3(
      easedOpen * 0.15,
      1.35 - easedZoom * 0.35,
      5.2 - easedZoom * 4.2
    );

    camera.position.lerp(targetPos, 0.12);
    camera.lookAt(0, 0.8 - easedZoom * 0.28, 0);
  });

  return null;
};

const MacbookModel: React.FC<{ progress: number }> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const screenTexture = useMemo(() => createEditorTexture(), []);

  useFrame(() => {
    if (!groupRef.current || !lidRef.current) return;

    const openProgress = clamp(progress / 0.5, 0, 1);
    const zoomProgress = clamp((progress - 0.5) / 0.5, 0, 1);
    const easedOpen = easeOut(openProgress, 2.2);
    const easedZoom = easeOut(zoomProgress, 2.2);

    // Start closed (0) and rotate to open (-~1.3 radians)
    lidRef.current.rotation.x = -easedOpen * 1.35;

    groupRef.current.position.y = -0.28 - easedZoom * 1.08;
    groupRef.current.scale.setScalar(1 + easedZoom * 2.15);
    groupRef.current.rotation.x = 0.06 + easedOpen * 0.02;
    groupRef.current.rotation.y = (1 - easedOpen) * -0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.0, 0.2, 3.4]} />
        <meshStandardMaterial color="#a8adb6" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Keyboard area */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[4.36, 0.02, 2.68]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.15} roughness={0.88} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.064, 0.68]} receiveShadow>
        <boxGeometry args={[1.2, 0.015, 0.85]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Hinge area */}
      <mesh position={[0, 0.1, -1.65]} castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 4.8, 16]} />
        <meshStandardMaterial color="#878d99" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* Lid group */}
      <group ref={lidRef} position={[0, 0.1, -1.68]}>
        {/* Lid exterior */}
        <mesh position={[0, 1.62, 0]} castShadow>
          <boxGeometry args={[5.0, 3.24, 0.14]} />
          <meshStandardMaterial color="#aaafb8" metalness={0.94} roughness={0.16} />
        </mesh>

        {/* Screen bezel */}
        <mesh position={[0, 1.62, 0.08]}>
          <boxGeometry args={[4.5, 2.8, 0.08]} />
          <meshStandardMaterial color="#2a2f3a" metalness={0.45} roughness={0.35} />
        </mesh>

        {/* Screen display */}
        <mesh position={[0, 1.62, 0.14]}>
          <planeGeometry args={[4.38, 2.72]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Camera notch (top center) */}
        <mesh position={[0, 2.75, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Lid interior */}
        <mesh position={[0, 1.62, -0.08]}>
          <boxGeometry args={[4.8, 3.12, 0.06]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

const LaptopSequence: React.FC<LaptopSequenceProps> = ({ onScrollProgress }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalDistance = window.innerHeight * 1.15;
      const nextProgress = clamp(window.scrollY / totalDistance, 0, 1);
      setProgress(nextProgress);
      onScrollProgress?.(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [onScrollProgress]);

  const zoomProgress = clamp((progress - 0.58) / 0.42, 0, 1);

  return (
    <div className="laptop-sequence-scene" aria-hidden="true">
      <div className="scene-glow scene-glow-left" />
      <div className="scene-glow scene-glow-right" />

      <Canvas className="laptop-canvas" camera={{ fov: 35, position: [0.25, 1.45, 6.1] }} shadows>
        <color attach="background" args={['#05070f']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[2.2, 4.2, 2.8]} intensity={1.4} castShadow />
        <pointLight position={[-3, 1.8, 2.2]} intensity={0.55} color="#7aa8ff" />

        <MacbookModel progress={progress} />
        <CameraRig progress={progress} />
      </Canvas>

      <div
        className="screen-zoom-overlay"
        style={{
          opacity: zoomProgress,
          transform: `scale(${1 + zoomProgress * 2.9})`,
        }}
      />
    </div>
  );
};

export default LaptopSequence;
