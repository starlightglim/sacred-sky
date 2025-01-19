export const fragmentShader = /* glsl */ `
  const int noiseOctaves = 8;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform bool uFrontLayer;
  uniform float uCloudScale;
  uniform float uTimeScale;
  uniform float uSoftness;
  uniform float uBrightness;
  uniform float uDensity;
  uniform float uTurbulence;
  uniform float uNoiseFrequency;
  uniform float uWaveIntensity;
  uniform float uNoiseScale;

  float saturate(float num) {
    return clamp(num, 0.0, 1.0);
  }

  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
      mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
      mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
  }

  vec2 rotate(vec2 uv) {
    uv = uv + noise(uv*0.2)*uTurbulence;
    float rot = 3.0 + sin(uTime * 0.001) * uWaveIntensity;
    float sinRot = sin(rot);
    float cosRot = cos(rot);
    mat2 rotMat = mat2(cosRot, -sinRot, sinRot, cosRot);
    return uv * rotMat;
  }

  float fbm(vec2 uv) {
    float rot = 1.57;
    float sinRot = sin(rot);
    float cosRot = cos(rot);
    float f = 0.0;
    float total = 0.0;
    float mul = 0.5;
    mat2 rotMat = mat2(cosRot, -sinRot, sinRot, cosRot);
    
    for(int i = 0; i < noiseOctaves; i++) {
      float loopedTime = mod(uTime * 0.00015 * uTimeScale * (1.0-mul), 1000.0);
      vec2 noiseUv = uv * uNoiseFrequency + loopedTime;
      f += noise(noiseUv) * mul * uNoiseScale;
      total += mul * uNoiseScale;
      uv *= 3.0;
      uv = rotate(uv);
      mul *= 0.5;
    }
    return f/total;
  }

  void main() {
    vec2 screenUv = gl_FragCoord.xy/uResolution.xy;
    vec2 uv = gl_FragCoord.xy/(40000.0*uCloudScale);
    
    float cover = uDensity;
    float bright = uBrightness * (1.8-cover);
    
    float loopedTime1 = mod(uTime * 0.00004 * uTimeScale, 1000.0);
    float loopedTime2 = mod(uTime * 0.00002 * uTimeScale, 1000.0);
    
    float color1 = fbm(uv - 0.5 + loopedTime1);
    float color2 = fbm(uv - 10.5 + loopedTime2);
    
    float clouds1 = smoothstep(1.0-cover, min((1.0-cover)+uSoftness*2.0,1.0), color1);
    float clouds2 = smoothstep(1.0-cover, min((1.0-cover)+uSoftness,1.0), color2);
    
    float cloudsFormComb = saturate(clouds1+clouds2);
    
    vec4 skyCol = vec4(0.6, 0.8, 1.0, 1.0);
    float cloudCol = saturate(saturate(1.0-pow(color1,1.0)*0.2)*bright);
    vec4 clouds1Color = vec4(cloudCol,cloudCol,cloudCol,1.0);
    vec4 clouds2Color = mix(clouds1Color,skyCol,0.25);
    vec4 cloudColComb = mix(clouds1Color,clouds2Color,saturate(clouds2-clouds1));
    
    gl_FragColor = mix(skyCol, cloudColComb, cloudsFormComb);
  }
`;