import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [count, setCount] = useState(0);

  const logoRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: logoRef });

  const test = contextSafe(() => {
    console.log(360);
    gsap.to(".logo", { rotation: "+=360", duration: 1, repeatDelay: 2, ease: "expo.out" });
  });

  return (
    <>
      <div>测试</div>
      <div>
        <span ref={logoRef}>
          <img src={viteLogo} onClick={test} className="logo" alt="Vite logo" />
        </span>

        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
