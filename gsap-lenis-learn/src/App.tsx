/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-13 10:14:49
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-21 16:09:37
 * @FilePath: \gsap-lenis-learn\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: capsion_surfacePro7 capsion@surfacePro2.com
 * @Date: 2025-03-05 20:58:38
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-21 10:41:18
 * @FilePath: \gsap-lenis-learn\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
import "./App.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { throttle, debounce } from "lodash";

import { DEFAULT_SUB_COLOR } from "./store/config";

import MouseTracker from "./components/CapsionText/test";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.defaults({
  markers: {
    startColor: "green",
    endColor: "red",
    fontSize: "12px",
  },
});

gsap.defaults({
  ease: "none",
});

function App() {
  const lenisRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const trackWarp = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  // const lastPos = useRef({ x: 0, y: 0 });
  // const rafId = useRef<number | undefined>(undefined);

  // 合并配置
  // const poolSize = 20;
  // const spread = 15;
  // const duration = 0.8;
  // const color = "#ff6b6b";
  // const size = 50;

  useGSAP(
    (_context, _contextSafe) => {
      gsap.to(trackWarp.current, {
        x: () => {
          const res = (DEFAULT_SUB_COLOR.length - 1) * window.innerWidth;

          return `-${res}`;
        },
        scrollTrigger: {
          trigger: trackWarp.current,
          start: "center center",
          end: () => "+=" + (trackWarp.current.scrollWidth - window.innerWidth),
          scrub: 2,
          pin: true,
          invalidateOnRefresh: true,
          id: "id-one",
        },
      });
    },
    { scope: mainRef }
  );

  // const pool = useRef<HTMLDivElement[]>([]);
  // const poolCount = 20;

  // useEffect(() => {
  //   if (!testRef.current) return;

  //   for (let i = 0; i < poolCount; i++) {
  //     const el = document.createElement("div");
  //     Object.assign(el.style, {
  //       position: "absolute",
  //       pointerEvents: "none",
  //       borderRadius: "100%",
  //       opacity: "0",
  //       width: `${size}px`,
  //       height: `${size}px`,
  //       background: "red",
  //     });

  //     testRef.current.appendChild(el);
  //     pool.current.push(el);
  //   }
  // }, []);

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (!testRef.current) return;

  //     const currtPos = { x: e.clientX, y: e.clientY };

  //     if (!lastPos.current.x || lastPos.current.y) {
  //       lastPos.current = { x: e.clientX, y: e.clientY };
  //     }

  //     if (currtPos.x - lastPos.current.x > size && currtPos.y - lastPos.current.y > size) {
  //       requestAnimationFrame(() => {
  //         createParticleAnimation();
  //       });
  //     }
  //   };

  //   if (testRef.current) {
  //     testRef.current.addEventListener("mousemove", handleMouseMove);
  //   }
  // }, []);

  // // 创建粒子动画
  // const createParticleAnimation = () => {
  //   const availableParticle = pool.current.find((el) => el.style.opacity === "0");
  //   if (!availableParticle || !testRef.current) return;
  //   const rect = testRef.current.getBoundingClientRect();

  //   // 设置初始样式
  //   gsap.set(availableParticle, {
  //     x: lastPos.current.x,
  //     y: lastPos.current.y,
  //     opacity: 1,
  //     scale: 0.5,
  //   });

  //   // 动画参数
  //   gsap.to(availableParticle, {
  //     y: window.innerHeight + 100,
  //     opacity: 0,
  //     scale: 1.2,
  //     duration,
  //     ease: "power2.in",
  //     onComplete: () => {
  //       gsap.set(availableParticle, { opacity: 0 });
  //     },
  //   });
  // };

  return (
    <ReactLenis root ref={lenisRef}>
      <main ref={mainRef} className="main h-screen relative w-screen">
        <header className="bg-red-300 w-[100vw] h-[100vh]">
          测试2
          <div>Capsion</div>
          <div ref={testRef} className="bg-amber-200 w-3/5 mx-auto h-[500px] ">
            <MouseTracker />
          </div>
        </header>
        <section ref={trackWarp} className={["track", "flex-nowrap h-full items-center justify-center inline-flex relative bg-gray-500"].join(" ")}>
          {DEFAULT_SUB_COLOR.map((item, key) => {
            return (
              <div key={key} className="retracklative w-screen h-[80vh]">
                <div style={{ backgroundColor: item }} className="image relative w-full h-full"></div>
              </div>
            );
          })}
        </section>
        <footer className={["flex flex-col items-center justify-center w-full py-10"].join(" ")}>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </footer>
      </main>
    </ReactLenis>
  );
}

export default App;
