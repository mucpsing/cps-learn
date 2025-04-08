/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-28 09:13:14
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-08 22:33:26
 * @FilePath: \gsap-lenis-learn\src\components\Loading\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import "./loading.css";
export default function Loading() {
  return (
    <div id="__cps_loading-warp">
      <div></div>

      <div id="__cps_loading-mainText">
        <span id="__cps_loading-char">&lt;</span>
        <span id="__cps_loading-char">&nbsp;</span>
        <span id="__cps_loading-char">C</span>
        <span id="__cps_loading-char">a</span>
        <span id="__cps_loading-char">p</span>
        <span id="__cps_loading-char">s</span>
        <span id="__cps_loading-char">i</span>
        <span id="__cps_loading-char">o</span>
        <span id="__cps_loading-char">n</span>
        <span id="__cps_loading-char">'</span>
        <span id="__cps_loading-char">s</span>
        <span id="__cps_loading-char">&nbsp;</span>
        <span id="__cps_loading-char">H</span>
        <span id="__cps_loading-char">u</span>
        <span id="__cps_loading-char">b</span>
        <span id="__cps_loading-char">&nbsp;</span>
        <span id="__cps_loading-char" className="__cps_loading-colorSlash">
          <strong id="__cps_loading-colorSlash">/</strong>
        </span>
        <span id="__cps_loading-char">&gt;</span>
      </div>

      <div className="wavesWarp">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>

        <div className="wavesFooter">
          <div id="__cps_loading-subText">
            Page | Loading
            <span className="dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
