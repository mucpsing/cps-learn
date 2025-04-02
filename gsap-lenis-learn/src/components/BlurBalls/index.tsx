/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-02 10:12:57
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-02 11:19:12
 * @FilePath: \gsap-lenis-learn\src\components\BlurBalls.tsx
 * @Description: 这是一个带blur，液态跟随鼠标的球体特效
 */
import { useState, useRef, useEffect } from "react";

export default function BlurBall() {
  const testRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("BlurBall init");
  }, []);
  return (
    <div ref={testRef}>
      {/* 注意当前苹果的safari对blur支持不友好，可以使用转换成png的方案 */}
      <div className={["__BlurBall_balls", "absolute w-[500px] h-[500px] border-2 border-amber-200 border-solid", "flex justify-center items-center"].join(" ")}>
        <div className={["__BlurBall_balls_big ___BlurBall_ball", "w-[300px] h-[300px] bg-red-400 rounded-full", "contrast-[100%]"].join(" ")}></div>

        {/* --s 变量用于 控制小球大小比例 */}
        {Array(10)
          .fill(null)
          .map((_item, key) => {
            return (
              <div key={key} className={["__BlurBall_balls_small", "absolute", "w-[100px] h-[100px] bg-red-300 rounded-full"].join(" ")} style={{ "--s": `1.${key}` }}>
                {`1.${key}`}
              </div>
            );
          })}
      </div>

      {/* <svg className="__BlurBall_line" viewBox="0 0 50 50">
        <circle className="_dashed" cx="25" cy="25" r="25" vector-effect="non-scaling-stroke" />
      </svg> */}
    </div>
  );
}
