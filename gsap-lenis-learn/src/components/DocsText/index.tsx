/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-28 09:55:57
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<any> = ({ text = "Capsion", step = 0 }) => {
  const capsionTextLogoRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [gather, setGather] = useState(true);

  const { contextSafe } = useGSAP({ scope: textContainerRef });
  const onClick = contextSafe(() => {
    console.log(gather, "gather");
    if (gather) {
      gsap.to(".eachChar", {
        yPercent: 0,
        stagger: 0.02,
        direction: 1.2,
        ease: "back.out",
      });
    } else {
      gsap.to(".eachChar", {
        yPercent: 130,
        stagger: 0.02,
        direction: 0.8,
        ease: "back.in",
      });
    }
    setGather(!gather);
  });

  useGSAP(
    (context) => {
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
    <section ref={capsionTextLogoRef} className={["bg-gray-700 inline-block absolute top-0 left-0", "xl:h-[100px]", "lg:h-[100px]"].join(" ")}>
      {/* <section ref={capsionTextLogoRef} className={["bg-gray-700", "xl:w-[500px] xl:h-[100px]", "lg:w-[400px] lg:g-[100px]"].join(" ")}> */}

      <div ref={textContainerRef} className={[" bg-gray-300 overflow-hidden text-center"].join(" ")}>
        <span className={["text flex font-sans text-[6vw]"].join(" ")}>
          {text.split("").map((item, index) => {
            return (
              <div key={index} className={["eachChar"].join(" ")}>
                {item}
              </div>
            );
          })}
        </span>
      </div>

      <button className={["absolute bottom-0 right-0"].join(" ")} onClick={() => onClick()}>
        test
      </button>
    </section>
  );
};

export default CapsionTextLogo;
