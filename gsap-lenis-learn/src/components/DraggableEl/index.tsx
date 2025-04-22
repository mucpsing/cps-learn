import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { type CSSProperties } from "react";
export interface DraggableElementProps {
  children: React.ReactNode;
  parentElementId?: string;
  onMove?: (distance: [number, number]) => void;
  style?: CSSProperties;
  startCoords?: { x: number; y: number };
}

export interface DraggableElementHandle {
  getMoveDistance: () => [number, number];
  setCoords: (x: number, y: number) => void; // 暴露方法
  parentElement: HTMLElement | null;
}

const DraggableElement = forwardRef<DraggableElementHandle, DraggableElementProps>(
  ({ children, parentElementId, onMove, style, startCoords }, ref) => {
    const draggableRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLElement | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const isDragging = useRef(false); // 改为使用ref跟踪状态
    const startPos = useRef(startCoords || { x: 0, y: 0 });
    const initialElementPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
      parentRef.current = parentElementId ? document.getElementById(parentElementId) : null;
    }, [parentElementId]);

    useImperativeHandle(ref, () => ({
      getMoveDistance: () => [position.x, position.y],
      setCoords: (x: number, y: number) => setCoords(x, y), // 暴露方法
      parentElement: parentRef.current,
    }));

    const getBoundaryLimits = () => {
      if (!parentElementId) return null;
      if (!draggableRef.current) return null;

      let parentRect;
      if (parentRef.current) {
        parentRect = parentRef.current.getBoundingClientRect();
      } else {
        parentRect = document.body.getBoundingClientRect();
      }

      const elementRect = draggableRef.current.getBoundingClientRect();

      return {
        minX: 0,
        minY: 0,
        maxX: parentRect.width - elementRect.width,
        maxY: parentRect.height - elementRect.height,
      };
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true; // 直接修改ref
      startPos.current = { x: e.clientX, y: e.clientY };
      initialElementPos.current = { x: position.x, y: position.y };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const setCoords = (x: number, y: number) => {
      let newX = x;
      let newY = y;

      // 应用边界限制
      const limits = getBoundaryLimits();
      if (limits) {
        newX = Math.max(limits.minX, Math.min(newX, limits.maxX));
        newY = Math.max(limits.minY, Math.min(newY, limits.maxY));
      }

      setPosition({ x: newX, y: newY });
      onMove?.([newX, newY]); // 触发移动回调
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !draggableRef.current) return; // 使用ref判断

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      let newX = initialElementPos.current.x + dx;
      let newY = initialElementPos.current.y + dy;

      setCoords(newX, newY);
    };

    const handleMouseUp = () => {
      isDragging.current = false; // 修改ref状态
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
      <div
        ref={draggableRef}
        style={{
          ...style,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 9999,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: "move",
          userSelect: "none",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    );
  }
);

export default DraggableElement;
