"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Geometry } from "ogl";

export default function RippleGrid({
  enableRainbow = false,
  gridColor = "#ffffff",
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
    // Renderer
    // ------------------------------------------
    const renderer = new Renderer({
      dpr: Math.min(2, window.devicePixelRatio),
      alpha: true,
      antialias: true,
    });

    const gl = renderer.gl;

    // Fullscreen, fixed canvas behind everything
    Object.assign(gl.canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "0",
    });

    containerRef.current.appendChild(gl.canvas);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // ------------------------------------------
    // Shaders
    // ------------------------------------------
    const vert = `
      attribute vec2 position;
      void main() {
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

      float pi = 3.14159265359;

      mat2 rotate2d(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      void main() {
        // Normalized screen UV (0–1) from fragment coordinates
        vec2 uv = gl_FragCoord.xy / iResolution.xy;

        // Centered, aspect-correct coordinates
        vec2 p = (gl_FragCoord.xy / iResolution.xy) * 2.0 - 1.0;
        p.x *= iResolution.x / iResolution.y;

        // Rotation
        if (gridRotation != 0.0) {
          p = rotate2d(gridRotation * pi / 180.0) * p;
        }

        float dist = length(p);
        float ripple = sin(pi * (iTime - dist));
        vec2 rippleUv = p + p * ripple * rippleIntensity;

        // Mouse interaction
        if (mouseInteraction && mouseInfluence > 0.0) {
          vec2 mUv = mousePosition;
          vec2 m = mUv - 0.5;
          m.x *= iResolution.x / iResolution.y;
          m *= 2.0;

          float mDist = length(p - m);
          float influence = mouseInfluence * exp(-(mDist * mDist) / (mouseInteractionRadius * mouseInteractionRadius));
          float wave = sin(pi * (iTime * 2.0 - mDist * 3.0)) * influence;

          rippleUv += normalize(p - m) * wave * rippleIntensity * 0.3;
        }

        // Grid
        vec2 g = abs(sin(gridSize * pi * rippleUv));
        float gridL = exp(-gridThickness * g.x) + exp(-gridThickness * g.y);

        // ★ Keep a minimum visibility so it doesn't vanish on dark backgrounds
        gridL = max(gridL, 0.04);

        // Fade (kept, but softened a bit)
        float faded = exp(-pow(dist, fadeDistance));
        faded = mix(1.0, faded, 0.7);

        vec3 baseColor = enableRainbow
          ? vec3(
              0.5 + 0.5 * sin(iTime + p.x),
              0.5 + 0.5 * cos(iTime + p.y),
              pow(cos(iTime), 4.0)
            )
          : gridColor;

        // Vignette in screen UV space
        float vignette = pow(1.0 - length(uv - 0.5) * 2.0, vignetteStrength);
        vignette = clamp(vignette, 0.0, 1.0);

        vec3 finalColor = gridL * baseColor * faded * vignette * opacity;

        // Simple glow boost
        finalColor += glowIntensity * gridL * baseColor;

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

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    // ------------------------------------------
    // Size (always viewport)
    // ------------------------------------------
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      renderer.setSize(w, h);

      // Use actual drawing buffer size to match gl_FragCoord
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];

      // Extra safety: ensure viewport matches full buffer
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    window.addEventListener("resize", resize);
    resize();

    // ------------------------------------------
    // Mouse
    // ------------------------------------------
    const handleMove = (e) => {
      if (!mouseInteraction) return;
      const r = gl.canvas.getBoundingClientRect();
      targetMouse.current = {
        x: (e.clientX - r.left) / r.width,
        y: 1.0 - (e.clientY - r.top) / r.height,
      };
    };

    const handleEnter = () => {
      if (!mouseInteraction) return;
      mouseInfluence.current = 1;
    };

    const handleLeave = () => {
      if (!mouseInteraction) return;
      mouseInfluence.current = 0;
    };

    if (mouseInteraction) {
      gl.canvas.addEventListener("mousemove", handleMove);
      gl.canvas.addEventListener("mouseenter", handleEnter);
      gl.canvas.addEventListener("mouseleave", handleLeave);
    }

    // ------------------------------------------
    // Render loop
    // ------------------------------------------
    let frameId;

    const renderFrame = (t) => {
      uniforms.iTime.value = t * 0.001;

      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.1;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.1;
      uniforms.mousePosition.value = [mouse.current.x, mouse.current.y];

      uniforms.mouseInfluence.value +=
        (mouseInfluence.current - uniforms.mouseInfluence.value) * 0.05;

      gl.clear(gl.COLOR_BUFFER_BIT);
      // mesh.program.use(); // not needed, Mesh.draw binds the program
      mesh.draw();

      frameId = requestAnimationFrame(renderFrame);
    };

    frameId = requestAnimationFrame(renderFrame);

    // ------------------------------------------
    // Cleanup
    // ------------------------------------------
    return () => {
      window.removeEventListener("resize", resize);
      if (mouseInteraction) {
        gl.canvas.removeEventListener("mousemove", handleMove);
        gl.canvas.removeEventListener("mouseenter", handleEnter);
        gl.canvas.removeEventListener("mouseleave", handleLeave);
      }
      cancelAnimationFrame(frameId);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []); // run once

  // ------------------------------------------
  // React to prop changes
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

  return <div ref={containerRef} />;
}
