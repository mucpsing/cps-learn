/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-27 21:14:24
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-31 15:48:47
 * @FilePath: \gsap-lenis-learn\src\components\BackgroundBubble\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from "react";

interface GlowBackgroundProps {
  bgColor?: string; // 背景颜色/透明度
  glowColor?: string; // 光晕颜色
  sizeRatio?: number; // 光晕尺寸比例（相对于视口）
  blur?: number; // 模糊度
  parallaxIntensity?: number; // 视差强度
}

export default function GlowBackground({ bgColor = "rgba(255,255,255,0)", glowColor = "rgba(255, 0, 0, 0.15)", sizeRatio = 0.4, blur = 70, parallaxIntensity = 0.15 }: GlowBackgroundProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  let timeoutId: NodeJS.Timeout;

  // 鼠标移动处理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 计算基于视口中心的对立坐标
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;

      setPosition({
        x: 50 - dx * parallaxIntensity * 100,
        y: 50 - dy * parallaxIntensity * 100,
      });

      // 重置计时器
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setPosition({ x: 50, y: 50 });
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallaxIntensity]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: bgColor,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      className="z-0"
    >
      <div
        style={{
          position: "absolute",
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: `${sizeRatio * 100}vw`,
          height: `${sizeRatio * 100}vw`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.3s ease-out",
          borderRadius: "50%",
        }}
      />

      <div className={["h-[200%] w-[500px] bg-red-400 -top-1/2 right-[10%] absolute", "rotate-15"].join(" ")}></div>
    </div>
  );
}
