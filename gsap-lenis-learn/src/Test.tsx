import { useState, useRef, useEffect } from "react";
import PerspectiveTransform from "@site/src/utils/PerspectiveTransform";
export default function App() {
  const testRef = useRef<HTMLDivElement>(null);
  const ms = useRef<PerspectiveTransform>(null);

  const [leftTop, setLeftTop] = useState({ w: 180, h: 180, offset: 10 });
  const [rightTop, setRightTop] = useState({ w: 180, h: 180, offset: 0 });
  const [rightDown, setRightDown] = useState({ w: 180, h: 180, offset: 0 });
  const [leftDown, setLeftDown] = useState({ w: 180, h: 180, offset: 0 });
  const cc = "flex gap-2 justify-between";
  useEffect(() => {
    if (!testRef.current) return;
    console.log(testRef.current);

    ms.current = new PerspectiveTransform(testRef.current, 200, 200, true);
    if (ms.current) {
      const tr = ms.current.update();
      console.log(tr);
      console.log(ms.current.checkError());
    }
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
