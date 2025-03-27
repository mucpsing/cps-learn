/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-27 23:08:39
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./CapsionText.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<any> = ({ text = "Capsion", step = "step_0" }) => {
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

  useEffect(() => {
    console.log("发生变化: ", text);
  }, [text]);

  useGSAP(
    (context) => {
      switch (step) {
        case "step_0":
          gsap.from(capsionTextLogoRef.current, {
            xPercent: -100,
          });
          break;
        case "step_1":
          gsap.from(".eachChar", {
            yPercent: 130,
            stagger: 0.02,
            direction: 1.2,
            ease: "back.out",
          });
          break;
      }

      setGather(!gather);
    },
    { scope: textContainerRef, dependencies: [step] }
  );

  return (
    <section ref={capsionTextLogoRef} className={["bg-gray-700", "w-[35vw]"].join(" ")}>
      {/*  */}
      <div ref={textContainerRef} className={["bg-gray-300 p-8 overflow-hidden flex justify-center items-center"].join(" ")}>
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

      <button onClick={() => onClick()}>test</button>
    </section>
  );
};

export default CapsionTextLogo;
