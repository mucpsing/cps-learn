/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-13 10:14:49
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-28 16:36:51
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
import { useState, useRef } from "react";
import "./App.css";
import "./assets/font/fonts.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import { DEFAULT_SUB_COLOR } from "./store/config";

import MouseTracker from "./components/MouseTracker";
import CapsionText from "./components/CapsionText";
import CapsionTextTest from "./components/CapsionText/test";
import DocsText from "./components/DocsText";
import BackgroundBubble from "./components/BackgroundBubble";

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

// 手动定义有首页有多少step
// step_0 加载状态
// step_1 首页1
const ALL_STEP = ["step_0", "step_1", "step_2", "step_3"] as const;
type StepT = (typeof ALL_STEP)[number];

function App() {
  const [count, setCount] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);

  const trackWarpRef = useRef<HTMLDivElement>(null);

  const [mainText, setTMainText] = useState(["WELLCOME TO", "< CAPSION HUB / >"]);
  const [subText, setTSubText] = useState(["CAPSION.TOP"]);

  const [pageStep, setPageStep] = useState<number>(0);

  useGSAP(
    (_context, _contextSafe) => {
      if (!trackWarpRef.current) return;
      const offset = trackWarpRef.current.scrollWidth - window.innerWidth;
      gsap.set(trackWarpRef.current, { x: 0, y: 0 });
      gsap.to(trackWarpRef.current, {
        x: () => {
          const res = (DEFAULT_SUB_COLOR.length - 1) * window.innerWidth;

          return `-${res}`;
        },
        scrollTrigger: {
          trigger: trackWarpRef.current,
          start: "center center",
          end: () => "+=" + (offset - window.innerWidth),
          scrub: 2,
          pin: true,
          invalidateOnRefresh: true,
          id: "id-one",
        },
      });
    },
    { scope: mainRef }
  );

  return (
    <ReactLenis root>
      <main ref={mainRef} className="main h-screen relative w-screen">
        <header className="__home_main_text w-[100vw] h-[100vh] bg-red-100 relative">
          <CapsionText step={pageStep}></CapsionText>
          {/* <CapsionTextTest texts={["First Text", "Second Text", "Third Text"]}></CapsionTextTest> */}
        </header>

        <section ref={trackWarpRef} className={["track", "flex-nowrap h-full items-center justify-center inline-flex relative bg-gray-500"].join(" ")}>
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
