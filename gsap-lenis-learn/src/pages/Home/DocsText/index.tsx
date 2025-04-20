/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-25 20:12:12
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-18 15:59:57
 * @FilePath: \gsap-lenis-learn\src\components\CapsionText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { descriptionText } from "@site/src/store";

gsap.registerPlugin(useGSAP);

const HomeDocsText: React.FC = ({ step }) => {
  return (
    <div className={["text-start w-[600px] leading-[2]"].join(" ")}>
      <p>{descriptionText}</p>
    </div>
  );
};

export default HomeDocsText;
