/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-04-01 18:37:49
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-01 18:49:46
 * @FilePath: \gsap-lenis-learn\src\Test.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from "react";
import PerspectiveTransform from "@site/src/utils/PerspectiveTransform";
import MatrixCSS from "@site/src/utils/MatrixCSS";

export default function App() {
  const testRef = useRef<HTMLDivElement>(null);
  const ms = useRef<MatrixCSS>(null);

  const [leftTop, setLeftTop] = useState({ w: 180, h: 180, offset: 10 });
  const [rightTop, setRightTop] = useState({ w: 180, h: 180, offset: 0 });
  const [rightDown, setRightDown] = useState({ w: 180, h: 180, offset: 0 });
  const [leftDown, setLeftDown] = useState({ w: 180, h: 180, offset: 0 });
  const cc = "flex gap-2 justify-between";
  useEffect(() => {
    if (!testRef.current) return;
    console.log(testRef.current);

    const { width, height } = testRef.current.getBoundingClientRect();

    ms.current = new MatrixCSS({ element: testRef.current, width, height });

    // console.log(ms.current);

    return () => {
      ms.current = null;
    };
  });
  return (
    <div className="relative flex justify-center items-center border-2 border-red-500 h-screen w-screen">
      <div ref={testRef} className={["w-[200px] h-[200px]", "bg-green-400 absolute"].join(" ")}></div>

      <div className="absolute left-10 bottom-10 p-2 w-[320px] gap-2 flex flex-col bg-amber-300 text-black">
        <div className="flex gap-2 justify-between">
          <label htmlFor=""> leftTop: </label>
          <input type="text" onChange={() => {}} />
          <input type="text" onChange={() => {}} />
        </div>
        <div className={cc}>
          <label htmlFor=""> rightTop: </label>
          <input type="text" onChange={() => {}} />
          <input type="text" onChange={() => {}} />
        </div>
        <div className={cc}>
          <label htmlFor=""> rightDown: </label>
          <input type="text" onChange={() => {}} />
          <input type="text" onChange={() => {}} />
        </div>
        <div className={cc}>
          <label htmlFor=""> leftDown: </label>
          <input type="text" onChange={() => {}} />
          <input type="text" onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
