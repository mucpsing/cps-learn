import { useState, useRef, useEffect } from "react";

export default function HomeCards() {
  const tar = ["", ""];
  return (
    <>
      {tar.map((item, key) => {
        return (
          <div key={key} className="w-[400px] h-[320px] bg-amber-300 fixed">
            HomeCards
          </div>
        );
      })}
    </>
  );
}
