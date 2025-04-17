/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-13 10:14:49
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-17 23:46:54
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

import MainText from "@site/src/pages/Home/mainText";
import SubText from "@site/src/pages/Home/SubText";

import DocsText from "@site/src/pages/Home/DocsText";
import BackgroundBubble from "@site/src/pages/Home/BackgroundBubble";

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.defaults({ markers: { startColor: "green", endColor: "red", fontSize: "12px" } });
gsap.defaults({ ease: "none" });

// 手动定义有首页有多少step
// step_0 加载状态
// step_1 首页1
const ALL_STEP = ["step_0", "step_1", "step_2", "step_3"] as const;
type StepT = (typeof ALL_STEP)[number];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [pageStep, setPageStep] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setPageStep(1);
    }, 1200);
  });

  return (
    <ReactLenis root>
      <main ref={mainRef} className="main h-screen relative w-screen z-2">
        <section className="__home_main_text relative w-full h-full top-0 left-0">
          <SubText texts={subTexts} step={pageStep}></SubText>

          <div className="my-6"></div>
          <MainText texts={mainTexts} step={pageStep}></MainText>

          <div className="my-6"></div>
          <DocsText></DocsText>
        </section>
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
