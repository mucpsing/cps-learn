import { useState, useRef, useEffect } from "react";
// import MatrixCSS from "@src/components/MatrixCSS";
import BlurBall from "@src/components/BlurBalls";
export default function App() {
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("test init");
  }, []);

  return (
    <div ref={testRef} className="absolute top-0 left-0 w-full h-screen">
      test
      <BlurBall></BlurBall>
    </div>
  );
}
