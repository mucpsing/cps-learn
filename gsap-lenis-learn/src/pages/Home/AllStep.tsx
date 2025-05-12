/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-05-12 09:12:18
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-05-12 09:25:16
 * @FilePath: \gsap-lenis-learn\src\pages\Home\AllStep.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";

import { GlobalContext, skillIcons, type pageStepType } from "@site/src/store";
import { DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

export default function App() {
  useEffect(() => {
    console.log("all Step");
  });
  return (
    <ReactLenis root>
      <div>
        {DEFAULT_SUB_COLOR.map((color, index) => {
          return (
            <div style={{ background: color }} key={index} className={["w-full h-[100vh]"].join(" ")}>
              step_{index}
            </div>
          );
        })}
      </div>
    </ReactLenis>
  );
}
