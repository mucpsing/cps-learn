/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-05 09:29:31
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-25 15:01:45
 * @FilePath: \gsap-lenis-learn\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@site/src/components/Loading/loading";
import "./index.css";
import Home from "./pages/Home";
// import Test from "./Test.tsx";

console.log("StrictMode app");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    {/* <Test /> */}
  </StrictMode>
);
