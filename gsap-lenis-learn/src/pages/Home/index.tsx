/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-25 08:53:06
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-05-05 08:42:31
 * @FilePath: \gsap-lenis-learn\src\pages\Home\index.tsx
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
import { skillIcons } from "@site/src/store/icons";

import MainText from "./mainText";
import SubText from "./SubText";
import HomeButtonBar from "./HomeButtonBar";

import DocsText from "./DocsText";
import BackgroundBubble from "./BackgroundBubble";
import BackgroundRect from "./BackgroundRect";

import { PageStepContext } from "@src/store/animationContext";

import MouseTracker from "@site/src/components/MouseIconsTracker";

import DraggableElement from "@src/components/DraggableEl";

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

  // -1 动画前准备状态，loading状态
  // 0  进场动画，loading正式开始动画，所有动画完成后进入
  // 1  循环动画，页面持续状态
  const [animationStep, setAnimationStep] = useState<number>(-1);

  const [childCount, setChildCount] = useState(new Set<string>()); // 子组件数量
  const [completedCount, setCompletedCount] = useState(new Set<string>()); // 已完成子组件数量

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimationStep(0);
      console.log("开始动画: ", animationStep);
    }, 1000);
    return () => clearTimeout(t);
  });

  // 当所有子组件完成时触发
  useEffect(() => {
    if (childCount.size > 0 && completedCount.size === childCount.size) {
      console.log("所有子组件完成动画");

      // 当所有子组件完成动画后，触发页面进入下一阶段动画
      setAnimationStep((s) => s + 1);

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
  }, [completedCount]);

  // 创建上下文值
  const contextValue = {
    animationStep: animationStep,

    register: (strID: string) => {
      setChildCount((c) => {
        c.add(strID);
        // console.info(`register: ${strID} - ${c.size}`);
        return c;
      });
    },

    reportCompletion: (strID: string) =>
      setCompletedCount((c) => {
        c.add(strID);
        // console.info(`reportCompletion: ${strID} - ${c.size}`);
        return c;
      }),
  };

  return (
    <ReactLenis root>
      <PageStepContext.Provider value={contextValue}>
        <main ref={mainRef} className="main w-full h-screen relative z-2 overflow-hidden">
          {/* <DraggableElement></DraggableElement> */}

          <section
            className={[
              "__home_main_text relative w-full z-3",
              "top-[10%] left-[5%]",
              "lg:top-[13%] lg:left-[4%]",
              "xl:top-[14%] xl:left-[5%]",
              "2xl:top-[15%] 2xl:left-[6%]",
              "min-[1920px]:top-[20%] min-[1920px]:left-[10%]",
            ].join(" ")}
          >
            <SubText className={["lg:h-[3rem] lg:text-[2.6rem]", "xl:h-[3.5rem] xl:text-[3rem]", "2xl:h-[3.5rem] 2xl:text-[3rem]"].join(" ")} texts={subTexts}></SubText>

            <div className="my-3"></div>

            <MainText className={["lg:h-[4.5rem] lg:text-[4rem]", "xl:h-[5rem] xl:text-[4.5rem]", "2xl:h-[5.5rem] 2xl:text-[5rem]"].join(" ")} texts={mainTexts}></MainText>

            <div className="my-6"></div>

            <DocsText className={["lg:text-[.9rem] lg:max-w-[500px]", "xl:text-[1rem] xl:max-w-[600px]", "2xl:text-[1.1rem] 2xl:max-w-[700px]"].join(" ")}></DocsText>

            <div className="mt-15"></div>

            <HomeButtonBar></HomeButtonBar>

            <div className={["w-[700px] h-[320px]"].join(" ")}>
              <MouseTracker DEBUG={false} iconsList={skillIcons} size={30} count={skillIcons.length} threshold={100}></MouseTracker>
            </div>
          </section>

          {/* <div className={["fixed bottom-1/6 left-1/2 -translate-x-1/2 w-4/5 h-[150px]"].join(" ")}>
            <div className={["bg-red-400 rounded-3xl h-[10px] w-full"].join(" ")}></div>
          </div> */}

          <BackgroundRect className="pointer-events-none"></BackgroundRect>
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
