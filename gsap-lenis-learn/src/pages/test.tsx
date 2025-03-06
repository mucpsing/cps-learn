/*
 * @Author: capsion_surfacePro7 capsion@surfacePro2.com
 * @Date: 2025-03-05 20:58:38
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-06 09:29:03
 * @FilePath: \gsap-lenis-learn\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { DEFAULT_SUB_COLOR } from "@src/store/config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [count, setCount] = useState(0);
  // const DEFAULT_SUB_COLOR = ['#FF4058', '#F6B429', '#64D487', '#1D72B8', '#FF7F32', '#8E44AD'];
  // const DEFAULT_MAIN_COLOR = ['#FC1E4F', '#FFF43D', '#9FDA7F', '#4A90E2', '#FF9F00', '#9B4DCA'];

  const logoRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: logoRef });

  const test = contextSafe(() => {
    console.log(36011);
    gsap.to(".logo", { rotation: "+=360", duration: 1, repeatDelay: 2, ease: "expo.out" });
  });

  return (
    <div className="main flex flex-col">
      <div className="bg-red-300 w-[100vw] h-[80vh]">测试2</div>

      <div className={["w-[100vw]", "flex flex-row"].join(" ")}>
        {DEFAULT_SUB_COLOR.map((item) => {
          return <div style={{ backgroundColor: item }} className="w-[100%] h-[100vh]"></div>;
        })}
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
