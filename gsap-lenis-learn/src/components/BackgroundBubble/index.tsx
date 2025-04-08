/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-27 21:14:24
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-07 15:30:00
 * @FilePath: \gsap-lenis-learn\src\components\BackgroundBubble\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect, useRef } from "react";
import { hexToRgba } from "@src/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface GlowBackgroundProps {
  glowColor: string; // 光晕颜色
  scaleRange: [number, number]; // 光晕尺寸比例（相对于视口）
  blur: number; // 模糊度
  baseSize: number;
  parallaxIntensity: number; // 视差强度
  count: number;
}

const DEFAULT_PROPS = { glowColor: "#FC1E4F", scaleRange: [0.8, 2], blur: 10, baseSize: 200, count: 3 };

const getRandomFloat = (min: number, max: number, step: number): number => {
  // Calculate the number of possible steps between min and max
  const steps = (max - min) / step;

  // Generate a random number of steps (0 to steps inclusive)
  const randomSteps = Math.floor(Math.random() * (steps + 1));

  // Calculate and return the random float
  console.log(min + randomSteps * step);
  return min + randomSteps * step;
};
export default function GlowBackground(props: GlowBackgroundProps) {
  props = { ...DEFAULT_PROPS, ...props };

  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    (_context, contextSafe) => {
      console.log("GlowBackground init");

      const onMouseMove = contextSafe((e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        // 移动小球
        gsap.to(ballRef.current, {
          x: `${-x / 8}px`,
          y: `${-y / 8}px`,
          duration: 3,
          ease: "power3.out",
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
      {Array(props.count)
        .fill(1)
        .map((_, index) => {
          const size = props.baseSize * getRandomFloat(props.scaleRange[0], props.scaleRange[1], 0.1);
          const coords = getRandomFloat(0, 100, 0.3);
          console.log({ size });

          return (
            <div
              key={index}
              ref={(el) => {
                ballRef.current[index] = el;
              }}
              className="-translate-x-1/2 -translate-y-1/2 absolute"
              style={{
                top: `${coords}%`,
                left: `${coords}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${hexToRgba(props.glowColor as string, 0.1)} 10%, transparent 60%)`,
                filter: `blur(${blur}px)`,
                borderRadius: "60%",
              }}
            />
          );
        })}
    </div>
  );
}
