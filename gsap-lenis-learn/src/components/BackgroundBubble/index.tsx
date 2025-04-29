/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-27 21:14:24
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-03 15:43:26
 * @FilePath: \gsap-lenis-learn\src\components\BackgroundBubble\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect, useRef } from "react";
import { hexToRgba } from "@src/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface GlowBackgroundProps {
  bgColor?: string; // 背景颜色/透明度
  glowColor?: string; // 光晕颜色
  sizeRatio?: number; // 光晕尺寸比例（相对于视口）
  blur?: number; // 模糊度
  parallaxIntensity?: number; // 视差强度
}

export default function GlowBackground({ glowColor = "#FC1E4F", sizeRatio = 0.5, blur = 30 }: GlowBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);

  const ballGsap = useRef<gsap.core.Tween>(null);

  useGSAP(
    (_context, contextSafe) => {
      console.log("GlowBackground init");

      const onMouseMove = contextSafe((e: MouseEvent) => {
        if (!ballRef.current) return;

        if (gsap.isTweening(ballRef.current)) return;

        // const rect = ballRef.current.getBoundingClientRect() as DOMRect;

        const { clientX, clientY } = e;

        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;

        // 计算相反方向位移值
        const dx = centerX - clientX;
        const dy = centerY - clientY;

        gsap.to(ballRef.current, {
          x: dx,
          y: dy,
          duration: 3,
          ease: "power2.out",
        });
      });

      backgroundRef.current?.addEventListener("mousemove", onMouseMove);

      return () => {
        backgroundRef.current?.removeEventListener("mousemove", onMouseMove);
      };
    },
    { scope: backgroundRef }
  );

  return (
    <div ref={backgroundRef} className="overflow-hidden absolute top-0 left-0 w-full h-screen">
      <div
        ref={ballRef}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          position: "absolute",
          width: `${sizeRatio * 100}vw`,
          height: `${sizeRatio * 100}vw`,
          background: `radial-gradient(circle, ${hexToRgba(glowColor, 0.3)} 10%, transparent 60%)`,
          filter: `blur(${blur}px)`,
          borderRadius: "60%",
        }}
      />
    </div>
  );
}
