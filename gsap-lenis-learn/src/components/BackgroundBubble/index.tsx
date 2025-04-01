/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-27 21:14:24
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-01 09:33:08
 * @FilePath: \gsap-lenis-learn\src\components\BackgroundBubble\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from "react";
import { hexToRgba } from "@src/utils";
// import { PerspectiveTransform, type Points } from "react-perspective-transform";

interface GlowBackgroundProps {
  bgColor?: string; // 背景颜色/透明度
  glowColor?: string; // 光晕颜色
  sizeRatio?: number; // 光晕尺寸比例（相对于视口）
  blur?: number; // 模糊度
  parallaxIntensity?: number; // 视差强度
}

// function ControlledExample() {
//   const [points, setPoints] = useState<Points>({
//     topLeft: { x: 50, y: 50 },
//     topRight: { x: 250, y: 50 },
//     bottomRight: { x: 250, y: 200 },
//     bottomLeft: { x: 50, y: 200 },
//   });

//   const [editable, setEditable] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setPoints({
//         topLeft: { x: 50, y: 50 },
//         topRight: { x: 250, y: 50 },
//         bottomRight: { x: 500, y: 500 },
//         bottomLeft: { x: 50, y: 200 },
//       });
//     }, 1000);
//   });

//   return (
//     <PerspectiveTransform points={points} onPointsChange={setPoints} editable={editable} onEditableChange={setEditable}>
//       <div className={["h-screen w-[500px] bg-red-400", "transition-all duration-1000"].join(" ")}></div>
//     </PerspectiveTransform>
//   );
// }

export default function GlowBackground({ glowColor = "#FC1E4F", sizeRatio = 0.3, blur = 90 }: GlowBackgroundProps) {
  useEffect(() => {
    console.log("GlowBackground init");
  }, []);

  return (
    <div className="z-0 overflow-hidden absolute top-0 left-0 w-screen h-screen pointer-events-none">
      <button className="z-20" onClick={() => console.log(2222)}>
        1111111111
      </button>
      <div
        style={{
          position: "absolute",
          width: `${sizeRatio * 100}vw`,
          height: `${sizeRatio * 100}vw`,
          background: `radial-gradient(circle, ${hexToRgba(glowColor, 0.5)} 10%, transparent 60%)`,
          filter: `blur(${blur}px)`,
          borderRadius: "60%",
        }}
      />
      {/* <div className={["h-screen w-[500px] bg-red-400 right-0 absolute", ""].join(" ")}></div> */}
      {/* <ControlledExample></ControlledExample> */}
    </div>
  );
}
