/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-13 10:14:49
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-16 00:18:15
 * @FilePath: \gsap-lenis-learn\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useState, useRef, useEffect } from "react";

import "@site/src/assets/font/fonts.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import { mainTexts, subTexts } from "@site/src/store";

// import MouseTracker from "./components/MouseIconsTracker";

import MainText from "@site/src/components/mainText";
import SubText from "@site/src/components/SubText";

import DocsText from "@site/src/components/DocsText";
import BackgroundBubble from "@site/src/components/BackgroundBubble";

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

  // const [mainText, setTMainText] = useState(["WELLCOME TO", "< CAPSION HUB / >"]);
  // const [subText, setTSubText] = useState(["CAPSION.TOP2", "CAPSION.TOP1"]);

  const [pageStep, setPageStep] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setPageStep(1);
    }, 1200);
  });

  // useGSAP(
  //   (_context, _contextSafe) => {
  //     if (!trackWarpRef.current) return;
  //     const offset = trackWarpRef.current.scrollWidth - window.innerWidth;
  //     gsap.set(trackWarpRef.current, { x: 0, y: 0 });
  //     gsap.to(trackWarpRef.current, {
  //       x: () => {
  //         const res = (DEFAULT_SUB_COLOR.length - 1) * window.innerWidth;

  //         return `-${res}`;
  //       },
  //       scrollTrigger: {
  //         trigger: trackWarpRef.current,
  //         start: "center center",
  //         end: () => "+=" + (offset - window.innerWidth),
  //         scrub: 2,
  //         pin: true,
  //         invalidateOnRefresh: true,
  //         id: "id-one",
  //       },
  //     });
  //   },
  //   { scope: mainRef }
  // );

  return (
    <ReactLenis root>
      <main ref={mainRef} className="main h-screen relative w-screen z-2">
        <header className="__home_main_text w-full h-full">
          <SubText texts={subTexts} step={pageStep}></SubText>
          <div className="my-6"></div>
          <MainText texts={mainTexts} step={pageStep}></MainText>

          {/* <div className="w-1/2 h-1/2 bg-amber-300"></div> */}
        </header>

        {/* <section ref={trackWarpRef} className={["track", "flex-nowrap h-full w-screen items-center justify-center inline-flex relative bg-gray-500"].join(" ")}>
          {DEFAULT_SUB_COLOR.map((item, key) => {
            return (
              <div key={key} className="retracklative w-screen h-[80vh]">
                <div style={{ backgroundColor: item }} className="image relative w-full h-full"></div>
              </div>
            );
          })}
        </section> */}
      </main>

      <BackgroundBubble
        bubble={[
          { x: "20%", y: "25%", blur: 25, color: "#FC1E4F", size: 500, depth: "20%", opacity: 0.2 },
          { x: "80%", y: "70%", blur: 25, color: "#FC1E4F", size: 350, depth: "30%", opacity: 0.1 },
          { x: "20%", y: "80%", blur: 25, color: "#FC1E4F", size: 360, depth: "40%", opacity: 0.1 },
        ]}
      ></BackgroundBubble>
    </ReactLenis>
  );
}

export default App;
