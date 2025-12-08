"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Geometry, Transform } from "ogl";

export default function RippleGrid({
  enableRainbow = false,
 gridColor  = "#ffffff",
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
}) {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluence = useRef(0);

  function hexToRgb(hex) {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return res
      ? [
          parseInt(res[1], 16) / 255,
          parseInt(res[2], 16) / 255,
          parseInt(res[3], 16) / 255,
        ]
      : [1, 1, 1];
  }

  useEffect(() => {
    if (!containerRef.current) return;

    // ------------------------------------------
    // Renderer Setup
    // ------------------------------------------
    const renderer = new Renderer({
      dpr: Math.min(2, window.devicePixelRatio),
      alpha: true,
      antialias: true,
    });

    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    containerRef.current.appendChild(gl.canvas);

    gl.clearColor(0.0, 0.0, 0.0, 0.0); // transparent clear

    // ------------------------------------------
    // Shader Code
    // ------------------------------------------
    const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const frag = `
      precision highp float;

      uniform float iTime;
      uniform vec2 iResolution;
      uniform bool enableRainbow;
      uniform vec3 gridColor;
      uniform float rippleIntensity;
      uniform float gridSize;
      uniform float gridThickness;
      uniform float fadeDistance;
      uniform float vignetteStrength;
      uniform float glowIntensity;
      uniform float opacity;
      uniform float gridRotation;
      uniform bool mouseInteraction;
      uniform vec2 mousePosition;
      uniform float mouseInfluence;
      uniform float mouseInteractionRadius;

      varying vec2 vUv;

      float pi = 3.141592;

      mat2 rotate2d(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        // Rotation
        if (gridRotation != 0.0) {
          uv = rotate2d(gridRotation * pi / 180.0) * uv;
        }

        float dist = length(uv);
        float ripple = sin(pi * (iTime - dist));
        vec2 rippleUv = uv + uv * ripple * rippleIntensity;

        // Mouse interaction
        if (mouseInteraction && mouseInfluence > 0.0) {
          vec2 mouseUv = mousePosition * 2.0 - 1.0;
          mouseUv.x *= iResolution.x / iResolution.y;

          float mDist = length(uv - mouseUv);
          float influence = mouseInfluence * exp(-(mDist * mDist) / (mouseInteractionRadius * mouseInteractionRadius));
          float wave = sin(pi * (iTime * 2.0 - mDist * 3.0)) * influence;

          rippleUv += normalize(uv - mouseUv) * wave * rippleIntensity * 0.3;
        }

        vec2 g = abs(sin(gridSize * pi * rippleUv));
        float gridL = exp(-gridThickness * g.x) + exp(-gridThickness * g.y);

        float faded = exp(-pow(dist, fadeDistance));
        vec3 baseColor = enableRainbow
          ? vec3(
              uv.x * 0.5 + 0.5 * sin(iTime),
              uv.y * 0.5 + 0.5 * cos(iTime),
              pow(cos(iTime), 4.0)
            )
          : gridColor;

        float vignette = pow(1.0 - length(vUv - 0.5) * 2.0, vignetteStrength);
        vignette = clamp(vignette, 0.0, 1.0);

        vec3 finalColor = gridL * baseColor * faded * vignette * opacity;

        gl_FragColor = vec4(finalColor, length(finalColor));
      }
    `;

    // ------------------------------------------
    // Uniforms
    // ------------------------------------------
    const uniforms = (uniformsRef.current = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: enableRainbow },
      gridColor: { value: hexToRgb(gridColor) },
      rippleIntensity: { value: rippleIntensity },
      gridSize: { value: gridSize },
      gridThickness: { value: gridThickness },
      fadeDistance: { value: fadeDistance },
      vignetteStrength: { value: vignetteStrength },
      glowIntensity: { value: glowIntensity },
      opacity: { value: opacity },
      gridRotation: { value: gridRotation },
      mouseInteraction: { value: mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: mouseInteractionRadius },
    });

    // ------------------------------------------
    // Fullscreen Triangle
    // ------------------------------------------
    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([
          -1, -1,
           3, -1,
          -1,  3,
        ]),
      },
    });

    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    // Scene root (Transform is the "Scene" in this version of OGL)
    const scene = new Transform();
    scene.addChild(mesh);


    // ------------------------------------------
    // Resize
    // ------------------------------------------
    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || 1;
      const h = containerRef.current.clientHeight || 1;
      renderer.setSize(w, h);
      uniforms.iResolution.value = [w, h];
    };
    window.addEventListener("resize", resize);
    resize();

    // ------------------------------------------
    // Mouse
    // ------------------------------------------
    if (mouseInteraction) {
      const handleMove = (e) => {
        const r = containerRef.current.getBoundingClientRect();
        targetMouse.current = {
          x: (e.clientX - r.left) / r.width,
          y: 1.0 - (e.clientY - r.top) / r.height,
        };
      };

      const handleEnter = () => {
        mouseInfluence.current = 1;
      };

      const handleLeave = () => {
        mouseInfluence.current = 0;
      };

      containerRef.current.addEventListener("mousemove", handleMove);
      containerRef.current.addEventListener("mouseenter", handleEnter);
      containerRef.current.addEventListener("mouseleave", handleLeave);

      // cleanup mouse listeners
      // (inside main return cleanup)
    }

    // ------------------------------------------
    // Render Loop
    // ------------------------------------------
    let frameId;

    const render = (t) => {
      uniforms.iTime.value = t * 0.001;

      // Smoothly follow target mouse
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.1;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.1;
      uniforms.mousePosition.value = [mouse.current.x, mouse.current.y];

      // Smooth influence
      uniforms.mouseInfluence.value +=
        (mouseInfluence.current - uniforms.mouseInfluence.value) * 0.05;

      renderer.render({ scene });
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (mouseInteraction && containerRef.current) {
        containerRef.current.replaceWith(containerRef.current.cloneNode(true));
      }
      cancelAnimationFrame(frameId);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      containerRef.current?.removeChild(gl.canvas);
    };
  }, []);

  // ------------------------------------------
  // Update uniforms when props change
  // ------------------------------------------
  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;

    u.enableRainbow.value = enableRainbow;
    u.gridColor.value = hexToRgb(gridColor);
    u.rippleIntensity.value = rippleIntensity;
    u.gridSize.value = gridSize;
    u.gridThickness.value = gridThickness;
    u.fadeDistance.value = fadeDistance;
    u.vignetteStrength.value = vignetteStrength;
    u.glowIntensity.value = glowIntensity;
    u.opacity.value = opacity;
    u.gridRotation.value = gridRotation;
    u.mouseInteraction.value = mouseInteraction;
    u.mouseInteractionRadius.value = mouseInteractionRadius;
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
    mouseInteraction,
    mouseInteractionRadius,
  ]);

 return (
  <div
    ref={containerRef}
    style={{
      position: "fixed",     // FIXED instead of absolute
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,             // <-- NOT NEGATIVE
      pointerEvents: "none",
    }}
  />
);

}
