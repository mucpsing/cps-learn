/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-02 10:12:57
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-02 13:05:50
 * @FilePath: \gsap-lenis-learn\src\components\BlurBalls.tsx
 * @Description: 这是一个带blur，液态跟随鼠标的球体特效
 */
import { useState, useRef, useEffect, MouseEventHandler } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function BlurBall() {
  const testRef = useRef<HTMLDivElement>(null);
  const bigBallRef = useRef<HTMLDivElement>(null);
  const smallBallRef = useRef<Array<HTMLDivElement | null>>([]);

  // 小球的移动范围局限在大球的周围，默认值
  // bigBallRef.current.offsetWidth / 2.5;
  const [maxDistance, setMaxDistance] = useState<number>(130);

  // 小球的运动
  const moveSmallBalls = (x: number, y: number) => {
    // const target = e.target as HTMLDivElement;
    // console.log("onSmallBallsMove: ", { x: e.clientX, y: e.clientY });
    // const { x, y } = { x: e.clientX, y: e.clientY };

    // 更新距离:以屏幕中心为基准
    let distance_x = x - innerWidth / 2;
    let distance_y = y - innerHeight / 2;

    // 限制移动边界
    distance_x = Math.min(maxDistance, Math.max(-maxDistance, distance_x));
    distance_y = Math.min(maxDistance, Math.max(-maxDistance, distance_y));

    // 移动标题
    gsap.to(smallBallRef.current, {
      x: `${distance_x}px`,
      y: `${distance_y}px`,
      duration: 2,
      ease: "power3.out",
      stagger: {
        each: 0.01,
        from: "start",
      },
    });
  };

  useEffect(() => {
    console.log("BlurBall init");
  }, []);
  return (
    <div className="bg-white" ref={testRef} onMouseOut={(e) => moveSmallBalls(innerWidth / 2, innerHeight / 2)} onMouseMove={(e) => moveSmallBalls(e.clientX, e.screenY)}>
      {/* 注意当前苹果的safari对blur支持不友好，可以使用转换成png的方案 */}
      <div className={["__BlurBall_balls mix-blend-darken contrast-200", "w-[400px] h-[400px] border-2 border-amber-200 border-solid rounded-full", "flex justify-center items-center"].join(" ")}>
        {/* --s 变量用于 控制小球大小比例 */}
        {Array(5)
          .fill(1)
          .map((_item, key) => {
            return (
              <div
                ref={(el) => {
                  smallBallRef.current[key] = el;
                }}
                key={key}
                className={["__BlurBall_balls_small blur-[10px] ", "absolute", "bg-black rounded-full"].join(" ")}
                style={{ width: `${50 * (1 + key / 10)}px`, height: `${50 * (1 + key / 10)}px` }}
              ></div>
            );
          })}

        <div ref={bigBallRef} className={["__BlurBall_balls_big ___BlurBall_ball blur-[10px]", "w-[300px] h-[300px] bg-black rounded-full", "contrast-[100%]"].join(" ")}></div>
      </div>

      {/* <svg className="__BlurBall_line" viewBox="0 0 50 50">
        <circle className="_dashed" cx="25" cy="25" r="25" vector-effect="non-scaling-stroke" />
      </svg> */}
    </div>
  );
}
