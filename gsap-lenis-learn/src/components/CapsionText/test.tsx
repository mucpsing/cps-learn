import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import CustomEase from "gsap/customEase";
gsap.registerPlugin(CustomEase);

interface Point {
  x: number;
  y: number;
  dir?: string;
}

interface MouseTrackerProps {
  threshold: number; // 间隔，每到累计到一个间隔阈值，则记录坐标
  count: number;
}

// Add the global type declaration
declare global {
  interface Window {
    recordedPoints: Point[];
  }
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ threshold = 120, count = 25 }) => {
  // Store the last recorded point
  const lastPoint = useRef<Point | null>(null);
  // Store the current distance traveled
  const distanceTraveled = useRef<number>(0);
  // Global array to store recorded points
  const recordedPoints = useRef<Point[]>([]);

  // State to trigger re-renders when points are added (optional, for debugging)
  const [pointCount, setPointCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointPool = useRef<HTMLDivElement[]>([]);

  const size = 30;

  useEffect(() => {
    const pointContainerRef = (document.getElementById("Ccvbbbbbbbbb") as HTMLDivElement) || document.createElement("div");
    pointContainerRef.id = "Ccvbbbbbbbbb";
    Object.assign(pointContainerRef.style, { position: "absolute", top: 0, left: 0 });

    const pointInitStyle = {
      position: "absolute",
      pointerEvents: "none",
      width: `${size}px`,
      height: `${size}px`,
      opacity: "0",
      backgroundColor: "#ff6b6b",

      zIndex: 30,
    };

    for (let i = 1; i <= count; i++) {
      const eachPointRef = document.createElement("div");
      Object.assign(eachPointRef.style, pointInitStyle);
      pointPool.current.push(eachPointRef);
      pointContainerRef.appendChild(eachPointRef);
    }

    document.body.appendChild(pointContainerRef);
  }, []);

  /**
   * @description: 返回两个二维点的直线距离和过度方向
   */
  const calculateDistance = (p1: Point, p2: Point): { distance: number; direction: string } => {
    // 如果两个点相同，返回 null。
    if (p1.x === p2.x && p1.y === p2.y) return { distance: 0, direction: "none" };

    // 计算差值（方向应为 p1 指向 p2）
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    // 计算欧几里得距离
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 计算角度（弧度转为角度，并转换为 0° - 360° 范围内）
    const thetaRad = Math.atan2(dy, dx);
    const thetaDeg = ((thetaRad * 180) / Math.PI + 360) % 360;

    // 定义八个方向的查找表
    const directions = ["right", "rightTop", "top", "leftTop", "left", "leftBottom", "bottom", "rightBottom"];

    // 将角度加 22.5° 后，分成 45° 的区间，得到方向索引
    const index = Math.floor((thetaDeg + 22.5) / 45) % 8;
    const direction = directions[index];

    return { distance, direction };
  };

  const calculateOffset = (direction: string) => {
    const baseOffset = 80;
    const baseRotate = 140;
    const baseRotate2 = -500;

    // 查找表：定义各方向对应的 x, y 偏移倍数和旋转符号
    const mapping: { [key: string]: { x: number; y: number; r: number } } = {
      left: { x: -1, y: 0, r: -1 },
      // leftBottom: { x: -1, y: 1, r: -1 },
      leftTop: { x: -1, y: -1, r: -1 },
      right: { x: 1, y: 0, r: 1 },
      rightTop: { x: 1, y: 1, r: 1 },
      // rightBottom: { x: 1, y: 1, r: 1 },
    };

    // 获取指定方向的倍数，若无则使用默认值（即偏移量 0，旋转保持原值）
    const { x, y, r } = mapping[direction] || { x: 0, y: 0, r: 1 };

    return {
      offsetX: x * baseOffset,
      offsetY: y * baseOffset,
      rotate1: r * baseRotate,
      rotate2: r * baseRotate2,
    };
  };

  // 创建粒子动画
  CustomEase.create("c1", "0.475, -0.210, 0.000, 1.240");
  CustomEase.create("c2", "0.000, 0.020, 0.000, 1.650");
  // CustomEase.create("c2", "0.00, 0.01, 0.00, 0.99");

  /**
   * @param {number} x
   * @param {number} y
   * @param {string} offseDir 来源的方向
   */
  const createParticleAnimation = (x: number, y: number, offseDir: string = "") => {
    const availableParticle = pointPool.current.find((el) => el.style.opacity === "0");

    const rect = containerRef.current?.getBoundingClientRect();
    // console.log(rect);
    console.log(document.body.getBoundingClientRect());

    if (!availableParticle) return;
    const { offsetX, offsetY, rotate1, rotate2 } = calculateOffset(offseDir);

    // 设置元素初始位置
    gsap.set(availableParticle, { x: x + offsetX, y: y + offsetY, opacity: 0, scale: 0.2, rotate: rotate1 });

    /* 元素放大，带弹性效果 */
    gsap.to(availableParticle, {
      opacity: 0.8,
      scale: 2,
      duration: 0.9,
      rotate: 0,
      ease: "c1",
      x,
      y,
      onComplete: () => {
        // 元素放大后设置落下效果
        gsap.to(availableParticle, {
          y: window.innerHeight + 100,
          rotate: rotate2,
          duration: 3,
          delay: 0.03,
          ease: "c2",
          opacity: 0,
        });
      },
    });
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // if (!containerRef.current) return;
    // const rect = containerRef.current.getBoundingClientRect();
    // const currentPoint: Point = { x: e.clientX - rect.x, y: e.clientY - rect.y };
    const currentPoint: Point = { x: e.clientX, y: e.clientY };

    // If this is the first point, just record it
    if (!lastPoint.current) return (lastPoint.current = currentPoint);

    const distance = calculateDistance(currentPoint, lastPoint.current);
    distanceTraveled.current += distance.distance;

    // If we've moved more than the threshold distance
    if (distanceTraveled.current >= threshold) {
      // Record the current point
      recordedPoints.current.push({ ...currentPoint });

      // Reset the distance counter
      distanceTraveled.current = 0;

      // Update the point count state (for debugging/display purposes)
      setPointCount(recordedPoints.current.length);

      createParticleAnimation(currentPoint.x, currentPoint.y, distance.direction);
    }

    // Update the last point
    lastPoint.current = currentPoint;
  };

  return (
    // 触发区域
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full h-full relative">
      <div style={{ padding: "20px", position: "absolute", top: 0, left: 0, background: "rgba(255,255,255,0.7)" }}>Recorded points: {pointCount}</div>
    </div>
  );
};

export default MouseTracker;
