/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-13 10:14:49
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-24 22:14:41
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

import { mainTexts, subTexts, bubbleList } from "@site/src/store";

// import MouseTracker from "./components/MouseIconsTracker";

import MainText from "./mainText";
import SubText from "./SubText";
import HomeButtonBar from "./HomeButtonBar";

import DocsText from "./DocsText";
import BackgroundBubble from "./BackgroundBubble";
import BackgroundRect from "./BackgroundRect";

import PerspectiveTransform from "@site/src/utils/PerspectiveTransform";

// 手动定义有首页有多少step
// step_0 加载状态
// step_1 首页1
const ALL_STEP = ["step_0", "step_1", "step_2", "step_3"] as const;
type StepT = (typeof ALL_STEP)[number];

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.defaults({ markers: { startColor: "green", endColor: "red", fontSize: "12px" } });
gsap.defaults({ ease: "none" });

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [pageStep, setPageStep] = useState<number>(0);

  useEffect(() => {
    console.log("init useEffect app");
    const id = setTimeout(() => {
      setPageStep(() => 1);
    }, 1200);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <ReactLenis root>
        <main ref={mainRef} className="main w-full h-screen relative z-2 overflow-hidden">
          <section className="__home_main_text relative w-full top-[15%] left-[10%] z-3 pointer-events-none">
            <SubText texts={subTexts} step={pageStep}></SubText>

            <div className="my-3"></div>
            <MainText texts={mainTexts} step={pageStep}></MainText>

            <div className="my-6"></div>
            <DocsText></DocsText>

            <div className="mt-10"></div>
            <HomeButtonBar></HomeButtonBar>
          </section>

          <BackgroundRect></BackgroundRect>
        </main>
        <BackgroundBubble bubble={bubbleList}></BackgroundBubble>
      </ReactLenis>
    </>
  );
}

function Test() {
  return <div>Home</div>;
}

export default App;
