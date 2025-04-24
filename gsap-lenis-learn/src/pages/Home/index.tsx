import { useState, useRef, useEffect, useMemo } from "react";

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

import { PageStepContext } from "@src/store/pageStepContext";

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

  const [childCount, setChildCount] = useState(0); // 子组件数量
  const [completedCount, setCompletedCount] = useState(0); // 已完成子组件数量

  // 当所有子组件完成时触发
  useEffect(() => {
    if (childCount > 0 && completedCount === childCount) {
      // 当所有子组件完成动画后，触发页面进入下一阶段动画
      setPageStep((s) => s + 1);

      console.log("所有子组件完成动画");

      // 重置计数器（暂定是否必须添加）
      setChildCount(0);
      setCompletedCount(0);
    }
  }, [completedCount, childCount]);

  // 创建上下文值
  const contextValue = useMemo(
    () => ({
      register: (msg?: string) => {
        if (msg) console.info(msg);
        setChildCount((c) => c + 1);
        return () => setChildCount((c) => c - 1);
      },
      reportCompletion: () => setCompletedCount((c) => c + 1),
    }),
    []
  );

  return (
    <ReactLenis root>
      {/* <PageStepContext.Provider value={contextValue}> */}
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
      {/* </PageStepContext.Provider> */}
    </ReactLenis>
  );
}

function Test() {
  return <div>Home</div>;
}

export default App;
