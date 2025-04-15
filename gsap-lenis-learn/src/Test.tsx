/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-04-02 12:14:23
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-14 21:29:59
 * @FilePath: \gsap-lenis-learn\src\Test.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
// import MatrixCSS from "@src/components/MatrixCSS";
// import BlurBall from "@src/components/BlurBalls";
import BackgroundBubble from "@site/src/components/BackgroundBubble";

import Loading from "@site/src/components/Loading/index";
export default function App() {
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("test init");
  }, []);

  return (
    <BackgroundBubble
      bubble={[
        { x: "20%", y: "25%", blur: 25, color: "#FC1E4F", size: 500, depth: "20%", opacity: 0.2 },
        { x: "80%", y: "70%", blur: 25, color: "#FC1E4F", size: 350, depth: "30%", opacity: 0.1 },
        { x: "20%", y: "80%", blur: 25, color: "#FC1E4F", size: 360, depth: "40%", opacity: 0.1 },
      ]}
    ></BackgroundBubble>
  );
}
