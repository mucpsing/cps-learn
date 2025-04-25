/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-21 09:44:37
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-25 12:12:25
 * @FilePath: \gsap-lenis-learn\src\pages\Home\BackgroundRect\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef, useEffect } from "react";
import PerspectiveTransform from "@site/src/utils/PerspectiveTransform";
import { usePageStep } from "@src/store/pageStepContext";

import { hexToRgba } from "@site/src/utils";
import gsap from "gsap";
interface BackgroundRectPorpsT {
  setp?: number;
  color?: string;
}

const DEFAULT_PROPS: Required<BackgroundRectPorpsT> = {
  setp: -1,
  color: "#FF4058",
};

const clamp = (min: number, width: number, max: number) => Math.max(min, Math.min(width, max));

export default function BackgroundRect(_props: BackgroundRectPorpsT) {
  const { register, reportCompletion } = usePageStep();

  const props: Required<BackgroundRectPorpsT> = { ...DEFAULT_PROPS, ..._props };

  const transformMatrix = "matrix3d(1, 0, 0, 0, -0.121065, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";

  const martrixInstance = useRef<PerspectiveTransform>(null);
  const el = useRef<HTMLDivElement>(null);

  // 动画部分
  useEffect(() => {
    register("BackgroundRect: ");
    if (!el.current) return;

    const timeline = gsap.timeline();
    switch (props.setp) {
      case 0:
        // const newW = clamp(200, window.innerWidth * 0.25, 400); // 这里要与样式统一
        const newW = window.innerWidth * 0.25; // 这里要与样式统一
        timeline
          .set(el.current, {
            left: -window.innerWidth,
            width: "calc(100vw)",
            ease: "power1",
            opacity: 0,
          })
          .to(el.current, {
            left: 0,
            ease: "power4.in",
            duration: 1,
            opacity: 1,
          })
          .to(el.current, {
            left: "calc(65vw)",
            width: newW * 1.5,
            ease: "power4.out",
            delay: 0.2,
            duration: 0.6,
          })
          .to(el.current, {
            width: newW,
            ease: "power4.out",
            duration: 0.4,
          })
          .set(el.current, {
            width: "calc(25vw)", // 与样式一致，如果直接写到to中两次连续的calc对width会出现动画起始位置异常
            // width: "clamp(300px, calc(25%), 400px)", // 与样式一致，如果直接写到to中两次连续的calc对width会出现动画起始位置异常
          })
          .eventCallback("onComplete", () => {
            // TODO 需要添加缓存
            if (!martrixInstance.current) {
              martrixInstance.current = new PerspectiveTransform(el.current as HTMLDivElement, false);
            }

            martrixInstance.current.render({
              topLeft: { x: 70, y: 0 },
              topRight: { x: 70, y: 0 },
              bottomLeft: { x: -70, y: 0 },
              bottomRight: { x: -70, y: 0 },
            });

            reportCompletion("BackgroundRect");
          });

        break;
      case 1:
        console.log("step1");
        break;
    }

    return () => {
      timeline.reverse();

      if (martrixInstance.current) martrixInstance.current.reset();
    };
  }, [props.setp]);

  return (
    <div
      ref={el}
      style={{ backgroundColor: hexToRgba(props.color, 0.7), left: "calc(65vw)", position: "absolute" }}
      className={["top-0 w-[calc(25vw)] h-screen", "transition-[transform] will-change-transform duration-700"].join(" ")}
    ></div>
  );
}
