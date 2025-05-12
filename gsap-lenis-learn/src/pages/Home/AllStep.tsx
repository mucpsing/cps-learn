/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-05-12 09:12:18
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-05-12 17:05:03
 * @FilePath: \gsap-lenis-learn\src\pages\Home\AllStep.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useState, useRef, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { GlobalContext, skillIcons, type pageStepType } from "@site/src/store";
import { DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

import HomeCards from "@src/components/HomeCards";
export default function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div id="mainContainer" className="relative">
        <HomeCards></HomeCards>

        <div id="step_0" style={{ background: DEFAULT_SUB_COLOR[0] }} className={["w-full h-[100vh]"].join(" ")}>
          step_{0}
        </div>
        <div style={{ background: DEFAULT_SUB_COLOR[1] }} className={["w-full h-[100vh]"].join(" ")}>
          step_{1}
        </div>
        <div style={{ background: DEFAULT_SUB_COLOR[2] }} className={["w-full h-[100vh]"].join(" ")}>
          step_{2}
        </div>
        <div style={{ background: DEFAULT_SUB_COLOR[3] }} className={["w-full h-[100vh]"].join(" ")}>
          step_{3}
        </div>
      </div>
    </ReactLenis>
  );
}
