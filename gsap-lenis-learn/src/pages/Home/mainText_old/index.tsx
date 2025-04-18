/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-14 22:13:31
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mainTexts, subTexts, DEFAULT_SUB_COLOR } from "@site/src/store";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<{ texts: string[]; step?: number; className?: string[] }> = ({
  texts = ["111111111", "2222222222", "3333333333333", "4444444444444", "555", "666666666", "7777777777", "888"],
  step = 0,
  className = [],
}) => {
  const capsionTextLogoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const currentTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);

  const animation = useRef<gsap.core.Timeline>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(1);

  const [gather, setGather] = useState(true);

  const { contextSafe } = useGSAP({ scope: textContainerRef });

  const upDownAnimation = () => {
    if (!nextTextRef.current) return console.log("warn: nextTextRef not found");
    if (!currentTextRef.current) return console.log("warn: currentTextRef not found");
    if (!animation.current) {
      animation.current = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 1 })

        .to(currentTextRef.current, { yPercent: -100, duration: 0.5, ease: "power2.inOut" }, 1)
        .to(nextTextRef.current, { yPercent: -100, duration: 0.5, ease: "power2.inOut" }, 1)

        .set(currentTextRef.current, { yPercent: 100 }, 2)
        .call(() => setCurrentIndex((prev) => (prev + 2) % texts.length), [], 2.5)

        .to(currentTextRef.current, { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 3.5)
        .to(nextTextRef.current, { yPercent: -200, duration: 0.5, ease: "power2.inOut" }, 3.5)

        .set(nextTextRef.current, { yPercent: 100 }, 4)

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

    return animation.current;
  };

  // useEffect((): any => {
  //   if (texts.length <= 1) return;
  //   if (!animation.current) upDownAnimation();

  //   return () => {
  //     animation.current?.kill();
  //     animation.current = null;
  //   };
  // }, [step]);

  useGSAP(
    () => {
      switch (step) {
        case 0:
          gsap.set(capsionTextLogoRef.current, {
            x: window.innerWidth * 0.07,
            y: window.innerHeight * 0.15,
          });

          gsap.from(capsionTextLogoRef.current, {
            xPercent: -100,
          });

          // 文字循环
          break;
        case 1:
          // gsap.from(".eachChar", {
          //   yPercent: 130,
          //   stagger: 0.02,
          //   direction: 1.2,
          //   ease: "back.out",
          // });

          upDownAnimation();
          break;
      }

      setGather(!gather);

      // return () => context.revert();
    },
    { scope: textContainerRef, dependencies: [step] }
  );

  return (
    <section ref={capsionTextLogoRef} className={[...className, "text-left overflow-hidden w-full", "xl:h-[100px]", "lg:h-[100px]", "text-[100px]"].join(" ")}>
      <div ref={textContainerRef} className={["overflow-hidden leading-none", "mix-blend-difference text-black"].join(" ")}>
        <div ref={currentTextRef} className={["up"].join(" ")}>
          <div className={["text flex"].join(" ")}>
            <div className={["eachChar __eachCurrentChar"].join(" ")}>{texts[currentIndex]}</div>

            {/* {texts[currentIndex].split(" ").map((item, index) => {
              if (texts[currentIndex].toLocaleLowerCase().indexOf("capsion") != -1) 
              
              const style = { color: item == "/" ? DEFAULT_SUB_COLOR[0] : "" };
              return (
                <div key={index} className="overflow-hidden flex mr-5" style={style}>
                  {item.split("").map((eachChar, index) => {
                    return (
                      <div key={index} className={["eachChar __eachCurrentChar"].join(" ")}>
                        {eachChar}
                      </div>
                    );
                  })}
                </div>
              );
            })} */}
          </div>
        </div>
        {texts.length > 1 && (
          <div ref={nextTextRef} className={["down absolute"].join(" ")}>
            <div className={["text flex"].join(" ")}>
              <div className={["eachChar __eachNextChar"].join(" ")}>{texts[nextIndex]}</div>
            </div>
          </div>
        )}

        {/* {texts.length > 1 && (
          <div ref={nextTextRef} className={["down absolute"].join(" ")}>
            <div className={["text flex"].join(" ")}>
              {texts[nextIndex].split("").map((item, index) => {
                return (
                  <div key={index} className="overflow-hidden1">
                    <div className={["eachChar __eachNextChar"].join(" ")}>{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default CapsionTextLogo;
