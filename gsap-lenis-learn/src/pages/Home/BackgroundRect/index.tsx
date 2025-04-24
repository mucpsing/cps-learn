/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-04-21 09:44:37
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-24 12:25:10
 * @FilePath: \gsap-lenis-learn\src\pages\Home\BackgroundRect\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
import PerspectiveTransform from "@site/src/utils/PerspectiveTransform";

import { hexToRgba } from "@site/src/utils";

import gsap from "gsap";

// import OnDragElement from "./onDragElement";
// import OnDragElement from "@site/src/components/DraggableEl";
import { useGSAP } from "@gsap/react";

interface BackgroundRectPorpsT {
  setp?: number;
  color?: string;
}

const DEFAULT_PROPS: Required<BackgroundRectPorpsT> = {
  setp: 0,
  color: "#FF4058",
};

export default function BackgroundRect(_props: BackgroundRectPorpsT) {
  const props: Required<BackgroundRectPorpsT> = { ...DEFAULT_PROPS, ..._props };

  const martrixInstance = useRef<PerspectiveTransform>(null);

  const el = useRef<HTMLDivElement>(null);
  const leftTopRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const rightDownRef = useRef<HTMLDivElement>(null);
  const leftDownRef = useRef<HTMLDivElement>(null);

  const [leftTop, setLeftTop] = useState({ x: 0, y: 0 });
  const [rightTop, setRightTop] = useState({ x: 0, y: 0 });
  const [rightDown, setRightDown] = useState({ x: 0, y: 0 });
  const [leftDown, setLeftDown] = useState({ x: 0, y: 0 });
  const updateCorners = () => {
    if (!el.current) return;
    const element = el.current;
    // 获取元素相对于视口的坐标和尺寸
    const rect = element.getBoundingClientRect();

    // 获取文档滚动的偏移量
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // 计算四角绝对坐标
    setLeftTop({
      x: Math.round(rect.left + scrollX),
      y: Math.round(rect.top + scrollY),
    });
    setRightTop({
      x: Math.round(rect.right + scrollX),
      y: Math.round(rect.top + scrollY),
    });
    setRightDown({
      x: Math.round(rect.right + scrollX),
      y: Math.round(rect.bottom + scrollY),
    });
    setLeftDown({
      x: Math.round(rect.left + scrollX),
      y: Math.round(rect.bottom + scrollY),
    });
  };

  useEffect(() => {
    if (!el.current) return;

    martrixInstance.current = new PerspectiveTransform(el.current, 200, 200, true);

    if (martrixInstance.current) {
      const tr = martrixInstance.current.update();
      console.log(tr);
      console.log(martrixInstance.current.checkError());
    }

    return () => {
      martrixInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!el.current) return;

    // 获取当前的四角坐标
    updateCorners();

    // 监听窗口变化
    window.addEventListener("resize", updateCorners);
    window.addEventListener("scroll", updateCorners);

    // 监听元素自身变化
    const element = el.current;
    const resizeObserver = new ResizeObserver(updateCorners);
    const mutationObserver = new MutationObserver(updateCorners);
    resizeObserver.observe(element);
    mutationObserver.observe(element, {
      attributes: true,
      childList: false,
      subtree: false,
    });

    return () => {
      window.removeEventListener("resize", updateCorners);
      window.removeEventListener("scroll", updateCorners);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // 动画部分
  useGSAP(
    () => {
      if (!el.current) return;

      const timeline = gsap.timeline();
      const rect = el.current.getBoundingClientRect();

      switch (props.setp) {
        case 0:
          const newW = (window.innerWidth / 12) * 3;
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
              left: "calc(70vw)",
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
              width: "calc(3/12 * 100%)", // 与样式一致，如果直接写到to中两次连续的calc对width会出现动画起始位置异常
            })
            .eventCallback("onComplete", () => {
              console.log("完成了，进行下一步");
            });

          break;
        case 1:
          console.log("step1");
          break;
      }

      return () => {
        timeline.reverse();
      };
    },
    { scope: el, dependencies: [props.setp] }
  );

  return <div ref={el} style={{ backgroundColor: hexToRgba(props.color, 0.7), left: "calc(70vw)" }} className={["fixed top-0 w-3/12 h-screen"].join(" ")}></div>;
}
