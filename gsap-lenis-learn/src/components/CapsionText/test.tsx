import React, { useState, useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  threshold: number;
}

// Add the global type declaration
declare global {
  interface Window {
    recordedPoints: Point[];
  }
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ threshold = 100 }) => {
  // Store the last recorded point
  const lastPoint = useRef<Point | null>(null);
  // Store the current distance traveled
  const distanceTraveled = useRef<number>(0);
  // Global array to store recorded points
  const recordedPoints = useRef<Point[]>([]);

  // State to trigger re-renders when points are added (optional, for debugging)
  const [pointCount, setPointCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("触发更新: ", recordedPoints.current.length);
  }, [recordedPoints]);

  // Calculate distance between two points
  const calculateDistance = (p1: Point, p2: Point): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentPoint: Point = { x: e.clientX - rect.x, y: e.clientY - rect.y };

    // If this is the first point, just record it
    if (!lastPoint.current) {
      lastPoint.current = currentPoint;
      return;
    }

    // Calculate distance moved since last point
    const distance = calculateDistance(lastPoint.current, currentPoint);
    distanceTraveled.current += distance;

    // If we've moved more than the threshold distance
    if (distanceTraveled.current >= threshold) {
      // Record the current point
      recordedPoints.current.push({ ...currentPoint });

      // Reset the distance counter
      distanceTraveled.current = 0;

      // Update the point count state (for debugging/display purposes)
      setPointCount(recordedPoints.current.length);

      // Dispatch a custom event to notify listeners
      const event = new CustomEvent("point-recorded", {
        detail: { point: currentPoint, allPoints: recordedPoints.current },
      });
      window.dispatchEvent(event);
    }

    // Update the last point
    lastPoint.current = currentPoint;
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="w-full h-full relative">
      <div style={{ padding: "20px", position: "absolute", top: 0, left: 0, background: "rgba(255,255,255,0.7)" }}>Recorded points: {pointCount}</div>

      {/* 每当记录新的坐标，这里就会生成一个新的元素 */}
      {recordedPoints.current.map((point, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "red",
            transform: `translate(${point.x}px, ${point.y}px)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
};

export default MouseTracker;
