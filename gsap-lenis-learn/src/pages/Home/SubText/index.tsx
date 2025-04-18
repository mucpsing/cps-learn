/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-18 15:38:33
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<{ texts: string[]; step?: number; className?: string }> = ({
  texts = ["WELLCOME TO", "This is My blog", "I'm Capsion", "I'm a Front-end Developer", "I'm a Designer", "I'm a Gamer"],
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

  const upDownAnimation = () => {
    console.log("upDownAnimation");

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

  useEffect(() => {
    return () => {};
  });

  useGSAP(
    () => {
      console.log({ step });
      switch (step) {
        case 0:
          // gsap.from(capsionTextLogoRef.current, {
          //   x: window.innerWidth * 0.07,
          //   y: window.innerHeight * 0.15,
          // });

          // gsap.to(capsionTextLogoRef.current, {
          //   xPercent: -100,
          // });

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

      // return () => context.revert();
    },
    { scope: textContainerRef, dependencies: [step] }
  );

  return (
    <section ref={capsionTextLogoRef} className={[className, "text-left overflow-hidden w-full relative", "text-[60px]"].join(" ")}>
      <div
        ref={textContainerRef}
        className={["overflow-hidden leading-none", "xl:h-[70px]", "lg:h-[70px]", "text-black mix-blend-difference"].join(" ")}
      >
        <div ref={currentTextRef} className={["up py-[5px] eachChar"].join(" ")}>
          {texts[currentIndex]}
        </div>

        {texts.length > 1 && (
          <div ref={nextTextRef} className={["down py-[5px] absolute eachChar"].join(" ")}>
            {texts[nextIndex]}
          </div>
        )}
      </div>
    </section>
  );
};

export default CapsionTextLogo;
