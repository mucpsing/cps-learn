/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-31 11:14:27
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<{ texts: string[]; step?: number }> = ({ texts = ["111111111", "2222222222", "3333333333333", "4444444444444", "555", "666666666", "7777777777", "888"], step = 0 }) => {
  const capsionTextLogoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const currentTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);

  const animation = useRef<gsap.core.Timeline>(null);
  const currentAnimation = useRef<gsap.core.Timeline>(null);
  const nextAnimation = useRef<gsap.core.Timeline>(null);

  const [textIndex, setTextIndex] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(1);

  const [currentText, setCurrentText] = useState<string>(texts[textIndex]);
  const [nextText, setNextText] = useState<string | null>(texts.length > 1 ? texts[textIndex + 1] : null);

  const [gather, setGather] = useState(true);

  const { contextSafe } = useGSAP({ scope: textContainerRef });

  const testRef = useRef<string>("testRef");
  const [testState, setTestState] = useState<string>("testState");

  const createAnimation = () => {
    if (!animation.current) {
      animation.current = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 2 })

        .to(currentTextRef.current, { yPercent: -100, duration: 0.5, ease: "power2.inOut" }, "+=1")
        .set(currentTextRef.current, { yPercent: 100 }, "+=1")
        .call(() => setCurrentIndex((prev) => (prev + 2) % texts.length), [], "+=0.5")
        .to(currentTextRef.current, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.5")
        .call(
          () =>
            setNextIndex((prev) => {
              let nextIndex = (prev + 2) % texts.length;

              if (nextIndex == 0) nextIndex = 1;
              if (nextIndex >= texts.length) nextIndex = 1;

              return nextIndex;
            }),
          [],
          "+=0.5"
        );

      animation.current.restart();
    }
  };

  const onClick = contextSafe(() => {
    console.log(gather, "gather");
    if (texts.length < 2) return console.log("传入的字符串只有一行，不足以触发滚动动画");

    createAnimation();

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

  useEffect(() => {
    setCurrentText(texts[textIndex]);
    // setNextText(texts[textIndex + 1]);
  }, [textIndex]);

  useEffect(() => {
    if (texts.length <= 1) return;
    if (!animation.current) return createAnimation();

    // const timer = setInterval(() => {
    //   setTextIndex((prev) => {
    //     const nextIndex = (prev + 1) % texts.length;
    //     setCurrentText(texts[nextIndex]);

    //     // 触发动画
    //     animation.current?.restart();
    //     return nextIndex;
    //   });
    // }, 6000);

    // return () => clearInterval(timer);
    return () => {
      animation.current?.kill();
      animation.current = null;
    };
  }, []);

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
    <section ref={capsionTextLogoRef} className={["text-left overflow-hidden w-full", "xl:h-[100px]", "lg:h-[100px]"].join(" ")}>
      <div ref={textContainerRef} className={["overflow-hidden text-[100px] leading-none mix-blend-difference text-black", "bg-amber-200"].join(" ")}>
        <div ref={currentTextRef} className={["up"].join(" ")}>
          <div className={["text flex font-sans "].join(" ")}>
            {texts[currentIndex].split("").map((item, index) => {
              return (
                <div key={index} className="overflow-hidden">
                  <div className={["eachChar __eachCurrentChar"].join(" ")}>{item}</div>
                </div>
              );
            })}
          </div>
        </div>

        {texts.length > 1 && (
          <div ref={nextTextRef} className={["down absolute"].join(" ")}>
            <div className={["text flex font-sans"].join(" ")}>
              {texts[nextIndex].split("").map((item, index) => {
                return (
                  <div key={index} className="overflow-hidden">
                    <div className={["eachChar __eachNextChar"].join(" ")}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="left-0 top-0 absolute z-10">
        <button className={["text-start text-[2px] w-[40px] h-[20px]"].join(" ")} onClick={() => onClick()}>
          test
        </button>
      </div>
    </section>
  );
};

export default CapsionTextLogo;
