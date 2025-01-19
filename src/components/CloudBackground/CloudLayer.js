import * as THREE from 'three';
import { fragmentShader } from './shaders';

class CloudLayer {
  constructor(isFront = false) {
    const isMobile = window.innerWidth <= 768;
    
    this.settings = {
      timeScale: 6.0,
      cloudScale: isMobile ? 0.15 : 0.13,
      softness: isMobile ? 0.24 : 0.12,
      brightness: 1.0,
      turbulence: 0.007,
      noiseFrequency: isMobile ? 4.4 : 0.87,
      waveIntensity: 0.05,
      noiseScale: 2.0,
      density: isFront ? 0.57 : 0.58,
      depth: isFront ? 0.1 : -0.58
    };

    // Create the shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uFrontLayer: { value: isFront },
        uCloudScale: { value: this.settings.cloudScale },
        uTimeScale: { value: this.settings.timeScale },
        uSoftness: { value: this.settings.softness },
        uBrightness: { value: this.settings.brightness },
        uDensity: { value: this.settings.density },
        uTurbulence: { value: this.settings.turbulence },
        uNoiseFrequency: { value: this.settings.noiseFrequency },
        uWaveIntensity: { value: this.settings.waveIntensity },
        uNoiseScale: { value: this.settings.noiseScale }
      },
      fragmentShader,
      transparent: true
    });

    // Create a full-screen plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Create the mesh with the geometry and material
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = this.settings.depth;
    this.material = material;
  }

  /**
   * Updates the time uniform for animation
   * @param {number} time - Current time in seconds
   */
  update(time) {
    this.material.uniforms.uTime.value = time;
  }

  /**
   * Updates the resolution uniform when window is resized
   * @param {number} width - Window width
   * @param {number} height - Window height
   */
  setSize(width, height) {
    this.material.uniforms.uResolution.value.set(width, height);
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.material.dispose();
    this.mesh.geometry.dispose();
  }
}

export default CloudLayer;