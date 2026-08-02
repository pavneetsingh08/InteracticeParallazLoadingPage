import { useEffect, useRef } from "react";

/**
 * Tracks the normalized mouse position (-1 .. 1 on both axes) relative to the
 * viewport center. Smoothed clients can read `ref.current` directly inside a
 * gsap.quickTo loop for buttery parallax without re-rendering React.
 */
export function useMousePosition() {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      ref.current = { x: nx, y: ny };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
