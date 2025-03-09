/*
 * @Author: capsion_surfacePro7 capsion@surfacePro2.com
 * @Date: 2025-03-05 20:58:38
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-06 17:02:03
 * @FilePath: \gsap-lenis-learn\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from 'react';
import './App.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

import { DEFAULT_SUB_COLOR } from './store/config';

gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.defaults({
  markers: {
    startColor: 'green',
    endColor: 'red',
    fontSize: '12px',
  },
});

gsap.defaults({
  ease: 'none',
});

function App() {
  const lenisRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const trackWarp = useRef<HTMLDivElement>(null);

  // useGSAP(
  //   (_context, _contextSafe) => {
  //     gsap.to(trackWarp.current, {
  //       x: () => {
  //         const res = (DEFAULT_SUB_COLOR.length - 1) * window.innerWidth;
  //         console.log({ res });
  //         return `-${res}`;
  //       },
  //       scrollTrigger: {
  //         trigger: trackWarp.current,
  //         start: 'center center',
  //         end: () => '+=' + (trackWarp.current.scrollWidth - window.innerWidth),
  //         scrub: 1,
  //         pin: true,
  //         invalidateOnRefresh: true,
  //         id: 'id-one',
  //       },
  //     });
  //   },
  //   { scope: mainRef }
  // );

  useEffect(() => {});

  return (
    <ReactLenis root ref={lenisRef}>
      <main ref={mainRef} className="main h-screen relative w-screen">
        <header className="bg-red-300 w-[100vw] h-[100vh]">测试2</header>

        <section ref={trackWarp} className={['track', 'flex-nowrap h-full items-center justify-center inline-flex relative bg-gray-500'].join(' ')}>
          {DEFAULT_SUB_COLOR.map((item, key) => {
            return (
              <div key={key} className="retracklative w-screen h-[80vh]">
                <div style={{ backgroundColor: item }} className="image relative w-full h-full"></div>
              </div>
            );
          })}
        </section>

        <footer className={['flex flex-col items-center justify-center w-full py-10'].join(' ')}>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </footer>
      </main>
    </ReactLenis>
  );
}

export default App;
