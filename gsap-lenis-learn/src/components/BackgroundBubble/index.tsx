/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-27 21:14:24
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-13 21:50:02
 * @FilePath: \gsap-lenis-learn\src\components\BackgroundBubble\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect, useRef } from "react";
import { hexToRgba } from "@src/utils";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface GlowBackgroundProps {
  BubbleOptions?: BubbleOptions[];
}

interface BubbleOptions {
  blur: number; // 模糊度
  color: string; // 光晕颜色
  size: number; // 光晕尺寸（相对于视口）
  x: string;
  y: string;
}

const DEFAULT_PROPS: Required<GlowBackgroundProps> = { BubbleOptions: [{ x: "30%", y: "25%", blur: 10, color: "#FC1E4F", size: 300 }] };

/**
 * @description: 返回一个随机数，
 * @param {number} min
 * @param {number} max
 * @param {number} step
 * @return {*}
 */
const getRandomFloat = (min: number, max: number, step: number): number => {
  // Calculate the number of possible steps between min and max
  const steps = (max - min) / step;

  const randomSteps = Math.floor(Math.random() * (steps + 1));

  return min + randomSteps * step;
};
export default function GlowBackground(_props: GlowBackgroundProps = {}) {
  const props: Required<GlowBackgroundProps> = { ...DEFAULT_PROPS, ..._props };

  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<Array<HTMLDivElement | null>>([]);

  const { contextSafe } = useGSAP({ scope: backgroundRef });

  const onMouseLeave = contextSafe((e: MouseEvent) => {
    console.log("onMouseMove: ...");

    // 小球回到原来的位置
    gsap.to(ballRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  useGSAP(
    (_context, contextSafe) => {
      console.log("GlowBackground init");

      const onMouseMove = contextSafe((e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        // 移动小球
        gsap.to(ballRef.current, {
          x: `${-x / 10}px`,
          y: `${-y / 10}px`,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      backgroundRef.current?.addEventListener("mousemove", onMouseMove);

      return () => {
        backgroundRef.current?.removeEventListener("mousemove", onMouseMove);
      };
    },
    { scope: backgroundRef, dependencies: [props] }
  );

  return (
    <div onMouseLeave={onMouseLeave} ref={backgroundRef} className="overflow-hidden absolute top-0 left-0 w-full h-screen">
      {props.BubbleOptions.map((item, key) => {
        return (
          <div
            key={key}
            className="-translate-x-1/2 -translate-y-1/2 absolute"
            ref={(el) => {
              ballRef.current[key] = el;
            }}
            style={{
              top: item.y,
              left: item.x,
              background: `radial-gradient(circle, ${hexToRgba(item.color as string, 0.1)} 50%, transparent 60%)`,
              filter: `blur(${item.blur}px)`,
              borderRadius: "100%",
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
