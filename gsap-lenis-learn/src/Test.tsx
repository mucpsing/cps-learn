/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-04-02 12:14:23
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-08 09:27:41
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

  return <Loading></Loading>;
}
