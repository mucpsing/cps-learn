/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-25 08:53:06
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-25 12:11:16
 * @FilePath: \gsap-lenis-learn\src\pages\Home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  const [pageStep, setPageStep] = useState<number>(-1);

  const [childCount, setChildCount] = useState(new Set<string>()); // 子组件数量
  const [completedCount, setCompletedCount] = useState(new Set<string>()); // 已完成子组件数量

  // 当所有子组件完成时触发
  useEffect(() => {
    if (childCount.size > 0 && completedCount.size === childCount.size) {
      // 当所有子组件完成动画后，触发页面进入下一阶段动画
      setPageStep((s) => s + 1);

      console.log("所有子组件完成动画");

      // 重置计数器（暂定是否必须添加）
      setChildCount((e) => {
        e.clear();
        return e;
      });
      setCompletedCount((e) => {
        e.clear();
        return e;
      });
    }
  }, [completedCount, childCount]);

  // 创建上下文值
  const contextValue = useMemo(
    () => ({
      register: (strID: string) => {
        setChildCount((c) => {
          c.add(strID);
          console.info(`register: ${strID} - ${c.size}`);
          return c;
        });
      },
      reportCompletion: (strID: string) =>
        setCompletedCount((c) => {
          c.add(strID);
          console.info(`reportCompletion: ${strID} - ${c.size}`);
          return c;
        }),
    }),
    []
  );

  return (
    <ReactLenis root>
      <PageStepContext.Provider value={contextValue}>
        <main ref={mainRef} className="main w-full h-screen relative z-2 overflow-hidden">
          <section className="__home_main_text relative w-full top-[20%] left-[10%] z-3">
            <SubText texts={subTexts} step={pageStep}></SubText>

            <div className="my-3"></div>
            <MainText texts={mainTexts} step={pageStep}></MainText>

            <div className="my-6"></div>
            <DocsText></DocsText>

            <div className="mt-15"></div>
            <HomeButtonBar></HomeButtonBar>
          </section>

          <BackgroundRect></BackgroundRect>
        </main>
        <BackgroundBubble bubble={bubbleList}></BackgroundBubble>
      </PageStepContext.Provider>
    </ReactLenis>
  );
}

function Test() {
  return <div>Home</div>;
}

export default App;
