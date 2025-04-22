import { useState, useRef, useEffect } from "react";
import PerspectiveTransform from "./PerspectiveTransform";
import { hexToRgba } from "@site/src/utils";

// import OnDragElement from "./onDragElement";
import OnDragElement from "@site/src/components/DraggableEl";

interface BackgroundRectPorpsT {
  setp?: number;
  color?: string;
}

const DEFAULT_PROPS: Required<BackgroundRectPorpsT> = {
  setp: 0,
  color: "#FF4058",
};

export default function BackgroundRect<BackgroundRectPorpsT>(props) {
  props = { ...DEFAULT_PROPS, ...props };

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

  const eachItemStyle = ["absolute rounded-full bg-amber-200 w-10 h-10 cursor-pointer", "hover:bg-amber-500"].join(" ");

  // const onDrag = (coords: { x: number; y: number }, el: HTMLDivElement) => {
  //   el.style.top = coords.x;
  //   el.style.y = coords.y;
  // };
  return (
    <>
      <OnDragElement>
        <div className={["w-[50px] h-[50px] bg-amber-200 rounded-full cursor-pointer", "hover:bg-amber-300"].join(" ")}></div>
      </OnDragElement>
      <div ref={el} style={{ backgroundColor: hexToRgba(props.color, 0.7) }} className={["fixed top-0 right-[10%] w-3/12 h-screen"].join(" ")}>
        {/* <div ref={leftTopRef} style={{ top: `${leftTop.y}px`, left: `${leftTop.x}px` }} className={["absolute rounded-full bg-amber-200 w-10 h-10 cursor-pointer", "hover:bg-amber-500"].join(" ")}></div> */}
        {/* <div ref={rightTopRef} className={eachItemStyle}></div> */}
        {/* <div ref={rightDownRef} className={eachItemStyle}></div> */}
        {/* <div ref={leftDownRef} className={eachItemStyle}></div> */}
      </div>
    </>
  );
}
