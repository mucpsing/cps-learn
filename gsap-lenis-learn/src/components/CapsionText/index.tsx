/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-30 21:12:21
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<any> = ({ texts = ["111111111", "2222222222", "3333333333333", "4444444444444"], step = 0 }) => {
  const capsionTextLogoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const currentTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);

  const animation = useRef<gsap.core.Timeline>(null);

  const [textIndex, setTextIndex] = useState<number>(0);

  const [currentText, setCurrentText] = useState<string>(texts[textIndex]);
  const [nextText, setNextText] = useState<string | null>(texts.length > 1 ? texts[textIndex + 1] : null);

  const [gather, setGather] = useState(true);

  const { contextSafe } = useGSAP({ scope: textContainerRef });

  const testRef = useRef<string>("testRef");
  const [testState, setTestState] = useState<string>("testState");

  const onClick = contextSafe(() => {
    console.log(gather, "gather");
    if (texts.length < 2) return console.log("传入的字符串只有一行，不足以触发滚动动画");
    if (!animation.current) {
      animation.current = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 1 })
        .to(
          ".__eachCurrentChar",
          {
            yPercent: -100,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              // 修改字体
            },
          },
          0
        )
        .set(".__eachCurrentChar", {
          yPercent: 100,
          onComplete: () => {
            // 修改字体
          },
        })
        .to(
          ".__eachNextChar",
          {
            yPercent: -100,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0
        )
        .addLabel("step_1")
        .to(
          ".__eachCurrentChar",
          {
            yPercent: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          2
        )
        .to(
          ".__eachNextChar",
          {
            yPercent: -200,
            duration: 0.6,
            ease: "power2.inOut",
          },
          2
        )
        .set(".__eachNextChar", { yPercent: 0 })
        .eventCallback("onComplete", () => {
          console.log("all done");
        });

      animation.current.restart();
    }
    // if (gather) {
    //   gsap.timeline()
    //   gsap.to(".eachChar", {
    //     yPercent: 0,
    //     stagger: 0.02,
    //     direction: 1.2,
    //     ease: "back.out",
    //   });
    // } else {
    //   gsap.to(".eachChar", {
    //     yPercent: 130,
    //     stagger: 0.02,
    //     direction: 0.8,
    //     ease: "back.in",
    //   });
    // }
    setGather(!gather);
  });

  useGSAP(
    () => {
      switch (step) {
        case 0:
          gsap.set(capsionTextLogoRef.current, {
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.2,
          });

          gsap.from(capsionTextLogoRef.current, {
            xPercent: -100,
          });

          // 文字循环
          break;
        case 1:
          gsap.from(".eachChar", {
            yPercent: 130,
            stagger: 0.02,
            direction: 1.2,
            ease: "back.out",
          });
          break;
      }

      setGather(!gather);

      // return () => context.revert();
    },
    { scope: textContainerRef, dependencies: [step] }
  );

  return (
    <section ref={capsionTextLogoRef} className={["text-left w-fit overflow-y-hidden", "xl:h-[100px]", "lg:h-[100px]"].join(" ")}>
      <div ref={textContainerRef} className={["overflow-hidden text-[100px] leading-none"].join(" ")}>
        <div ref={currentTextRef} className={["up"].join(" ")}>
          <div className={["text flex font-sans "].join(" ")}>
            {currentText.split("").map((item, index) => {
              return (
                <div key={index} className={["eachChar __eachCurrentChar"].join(" ")}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {nextText && (
          <div ref={nextTextRef} className={["down"].join(" ")}>
            <div className={["text flex font-sans"].join(" ")}>
              {nextText.split("").map((item, index) => {
                return (
                  <div key={index} className={["eachChar __eachNextChar"].join(" ")}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="absolute left-0 bottom-0">
        <button className={["text-start text-[2px] w-[40px] h-[20px]"].join(" ")} onClick={() => onClick()}>
          test
        </button>
        <div>
          {testRef.current.split("").map((char, index) => {
            return <span key={index}>{char}</span>;
          })}
        </div>
        <div>
          {testState.split("").map((char, index) => {
            return <span key={index}>{char}</span>;
          })}
        </div>

        <input
          type="text"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;

            console.log(target.value);
            console.log(target.value.length);

            if (target.value.length > 0 && target.value !== testState) {
              // setTestState(target.value);
              testRef.current = target.value;
            }
          }}
        />
      </div>
    </section>
  );
};

export default CapsionTextLogo;
