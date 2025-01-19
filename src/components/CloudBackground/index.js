import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CloudLayer from './CloudLayer';

const CloudBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    containerRef.current.appendChild(renderer.domElement);

    const backClouds = new CloudLayer(false);
    const frontClouds = new CloudLayer(true);

    scene.add(backClouds.mesh);
    scene.add(frontClouds.mesh);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      backClouds.setSize(width, height);
      frontClouds.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let animationFrame;
    const animate = (time) => {
      animationFrame = requestAnimationFrame(animate);
      
      const t = time * 0.001;
      backClouds.update(t);
      frontClouds.update(t);
      
      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0">
      {/* Three.js will append canvas here */}
    </div>
  );
};

export default CloudBackground;