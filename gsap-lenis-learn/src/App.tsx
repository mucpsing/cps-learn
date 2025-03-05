/*
 * @Author: capsion_surfacePro7 capsion@surfacePro2.com
 * @Date: 2025-03-05 20:58:38
 * @LastEditors: capsion_surfacePro7 capsion@surfacePro2.com
 * @LastEditTime: 2025-03-05 21:30:21
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

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [count, setCount] = useState(0);

  const logoRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: logoRef });

  const test = contextSafe(() => {
    console.log(360);
    gsap.to(".logo", { rotation: "+=360", duration: 1, repeatDelay: 2, ease: "expo.out" });
  });

  return (
    <>
      <div className="bg-red-300">测试</div>
      <div>
        <span ref={logoRef}>
          <img src={viteLogo} onClick={test} className="logo" alt="Vite logo" />
        </span>

        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
