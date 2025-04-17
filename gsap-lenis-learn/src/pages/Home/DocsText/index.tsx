/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-17 23:32:09
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HomeDocsText: React.FC = ({ step }) => {
  const text = "「技术人的一步一个脚印：每一行笔记都是算法与逻辑的搏击实录；每个案例背后藏着深夜调试的50个报错；从稚嫩commit到优雅PR，从懵懂issue到深度RFC，见证代码如何从混沌走向诗性」";
  return (
    <div className={[""].join(" ")}>
      <p>{text}</p>
    </div>
  );
};

export default HomeDocsText;
