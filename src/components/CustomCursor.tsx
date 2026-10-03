import React, { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setIsFinePointer(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Click ripple listener
  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [isFinePointer]);

  if (!isFinePointer || ripples.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-(--blue2) bg-(--blue2)/20 animate-ping opacity-85"
        />
      ))}
    </div>
  );
};
