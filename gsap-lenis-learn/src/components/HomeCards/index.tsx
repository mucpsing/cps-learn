import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useState, useRef, useEffect } from "react";

export default function HomeCards() {
  const tar = ["1", "2"];
  useGSAP(() => {
    gsap.set(".eachCard", {
      x: window.innerWidth / 2 - 150 / 2,
      y: window.innerHeight,
      scale: 1.6,
      opacity: 0,
    });

    gsap.to(".eachCard", {
      direction: 2,
      stagger: 0.2,
      opacity: 1,
      scale: 1.0,
      rotate: 200,
      y: window.innerHeight / 2 - 150 / 2,
    });
    // gsap.to(".eachCard", {
    //   x: 500,
    //   stagger: 0.2,
    //   scrollTrigger: {
    //     trigger: "#step_0",
    //     start: "center 200",
    //     end: "bottom bottom",
    //     markers: true,
    //   },
    // });
  });
  return (
    <>
      {tar.map((item, key) => {
        return (
          <div key={key} className={["w-[150px] h-[150px] bg-amber-300 fixed", "eachCard"].join(" ")}>
            {item}
          </div>
        );
      })}
    </>
  );
}
