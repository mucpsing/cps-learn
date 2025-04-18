/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-17 23:35:35
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { mainTexts, subTexts, DEFAULT_SUB_COLOR } from "@site/src/store";

gsap.registerPlugin(useGSAP);

const CapsionTextLogo: React.FC<{ texts: string[]; step?: number; className?: string[] }> = ({ step = 0, className = [] }) => {
  const capsionTextLogoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const mainText = useRef<string>("Capsion");
  const subText = useRef<string>("'s Hub");

  useGSAP(
    (context) => {
      switch (step) {
        case 0:
          // gsap.set(".eachMainChar", { y: 100, opacity: 0 });
          // gsap.set(capsionTextLogoRef.current, {
          //   x: window.innerWidth * 0.07,
          //   y: window.innerHeight * 0.15,
          // });

          // 文字循环
          break;
        case 1:
          // gsap.to(".eachMainChar", {
          //   stagger: 0.06,
          //   y: 0,
          //   direction: 1.2,
          //   ease: "back.out",
          //   opacity: 1,
          // });

          break;
      }

      // return () => context.revert();
    },
    { scope: textContainerRef, dependencies: [step] }
  );

  return (
    <section ref={capsionTextLogoRef} className={[...className, "text-left overflow-hidden w-full", "xl:h-[100px]", "lg:h-[100px]", "text-[100px]"].join(" ")}>
      <div ref={textContainerRef} className={["overflow-hidden leading-none", "mix-blend-difference text-black"].join(" ")}>
        <div className={["text flex"].join(" ")}>
          <div className={["eachChar __eachCurrentChar"].join(" ")}>
            <span>
              {"Capsion".split("").map((char, index) => {
                return (
                  <span key={index} className={["eachMainChar", "inline-block"].join(" ")} style={{ color: DEFAULT_SUB_COLOR[step] }}>
                    {char}
                  </span>
                );
              })}

              {"'s Hub".split("").map((char, index) => {
                char === " " ? "\u00A0" : char;
                return (
                  <span key={index} className={["eachMainChar", "inline-block"].join(" ")}>
                    {char}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapsionTextLogo;
