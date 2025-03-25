import React, { useState, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/customEase";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CapsionTextLogo: React.FC<any> = ({ text = "Capsion" }) => {
  return <div>{text}</div>;
};

export default CapsionTextLogo;
