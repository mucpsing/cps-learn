import { useState, useRef } from "react";

export default function App() {
  return (
    <div>
      <div className={["h-[200%] w-[500px] bg-red-400 -top-1/2 right-[10%] absolute", "rotate-15"].join(" ")}></div>
      <div className="text-white text-2xl mix-blend-difference">test</div>
    </div>
  );
}
