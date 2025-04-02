/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-02 10:12:57
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-02 16:49:11
 * @FilePath: \gsap-lenis-learn\src\components\BlurBalls.tsx
 * @Description: 这是一个带blur，液态跟随鼠标的球体特效
 */
import { useState, useRef, useEffect, MouseEventHandler } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface Point {
  x: number;
  y: number;
}
const getClosestCirclePoint = (rect: DOMRect, x: number, y: number): Point => {
  console.log(rect, x, y);
  // 计算圆心坐标[1,7](@ref)
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const radius = rect.width / 2; // 假设是正圆

  // 计算坐标与圆心的相对距离
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= radius) {
    return { x, y }; // 在半径范围内直接返回
  }

  // 计算在圆边界的最近点[7](@ref)
  const angle = Math.atan2(dy, dx);
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};

export default function BlurBall() {
  const testRef = useRef<HTMLDivElement>(null);
  const bigBallRef = useRef<HTMLDivElement>(null);
  const ballWarpRef = useRef<HTMLDivElement>(null);
  const smallBallRef = useRef<Array<HTMLDivElement | null>>([]);

  // 小球的移动范围局限在大球的周围，默认值
  // bigBallRef.current.offsetWidth / 2.5;
  const [maxDistance, setMaxDistance] = useState<number>(130);

  // 小球的运动
  const moveSmallBalls = (x: number, y: number) => {
    if (!smallBallRef.current) return;
    if (!ballWarpRef.current) return;
    const rect = ballWarpRef.current.getBoundingClientRect() as DOMRect;
    // 移动标题
    gsap.to(smallBallRef.current, {
      x: `${x - rect.left - rect.width / 2}px`,
      y: `${y - rect.top - rect.height / 2}px`,
      duration: 2,
      ease: "power3.out",
      stagger: {
        each: 0.1,
        from: "start",
      },
    });
  };

  useEffect(() => {
    console.log("BlurBall init");
  }, []);

  return (
    <div ref={testRef}>
      {/* 注意当前苹果的safari对blur支持不友好，可以使用转换成png的方案 */}
      <div ref={ballWarpRef} onMouseMove={(e) => moveSmallBalls(e.clientX, e.clientY)} className={["__BlurBall_balls mix-blend-darken contrast-[1000%] relative overflow-hidden", "bg-white", "rounded-full w-[400px] h-[400px]", "flex justify-center items-center"].join(" ")}>
        {/* --s 变量用于 控制小球大小比例 */}
        <div
          ref={(el) => {
            smallBallRef.current[0] = el;
          }}
          className={["__BlurBall_balls_small]", "absolute rounded-full", "bg-black blur-[10px]"].join(" ")}
          style={{ width: `${80 * 1.2}px`, height: `${80 * 1.2}px` }}
        ></div>
        <div
          ref={(el) => {
            smallBallRef.current[1] = el;
          }}
          className={["__BlurBall_balls_small]", "absolute rounded-full", "bg-black blur-[10px]"].join(" ")}
          style={{ width: `${80 * 1.5}px`, height: `${80 * 1.5}px` }}
        ></div>
        <div
          ref={(el) => {
            smallBallRef.current[2] = el;
          }}
          className={["__BlurBall_balls_small]", "absolute rounded-full", "bg-black blur-[10px]"].join(" ")}
          style={{ width: `${80 * 1.2}px`, height: `${80 * 1.2}px` }}
        ></div>
        <div ref={bigBallRef} className={["__BlurBall_balls_big ___BlurBall_ball]", "bg-black blur-[2px]", "absolute w-[300px] h-[300px] rounded-full"].join(" ")}></div>
      </div>
    </div>
  );
}
