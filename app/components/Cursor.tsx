import { useEffect } from "react";

export function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!cursor || !ring) return;

    let raf: number;
    let rx = 0, ry = 0;
    let tx = 0, ty = 0;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      cursor!.style.left = tx + "px";
      cursor!.style.top = ty + "px";
    }

    function lerp() {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;
      ring!.style.left = rx + "px";
      ring!.style.top = ry + "px";
      raf = requestAnimationFrame(lerp);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(lerp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
