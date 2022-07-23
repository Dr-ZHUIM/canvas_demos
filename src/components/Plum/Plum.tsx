import React, { useRef, useEffect } from "react";
import "./css/index.css";

interface Point {
  x: number;
  y: number;
}

interface Branch {
  startPoint: Point;
  length: number;
  theta: number;
}

export default function Plum() {
  const el = useRef<HTMLCanvasElement | null>(null);
  //   ctx.strokeStyle = "red";
  let ctx: any;
  let count: number = 0;
  const Width = 600;
  const Height = 600;

  useEffect(() => {
    init();
    startFrame();
  });

  const init = (): void => {
    ctx = el!.current!.getContext("2d")!;
    const branch = {
      startPoint: { x: Width / 2, y: Height },
      length: 40,
      theta: -Math.PI / 2,
    };
    step(branch);
  };

  const pendingTasks: Function[] = [];

  const step = (b: Branch, depth = 0) => {
    const end = getEndPoint(b);
    drawBranch(b);
    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            startPoint: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta - 0.3 * Math.random(),
          },
          depth + 1
        )
      );
    }
    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            startPoint: end,
            length: b.length + (Math.random() * 10 - 5),
            theta: b.theta + 0.3 * Math.random(),
          },
          depth + 1
        )
      );
    }
  };

  const frame = () => {
    const tasks = [...pendingTasks];
    pendingTasks.length = 0;
    tasks.forEach((fn) => fn());
  };

  const startFrame = () => {
    requestAnimationFrame(() => {
      count += 1;
      if (count % 3 === 0) frame();
      startFrame();
    });
  };

  const lineTo = (p1: Point, p2: Point): void => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const getEndPoint = (b: Branch): Point => {
    return {
      x: b.startPoint.x + b.length * Math.cos(b.theta),
      y: b.startPoint.y + b.length * Math.sin(b.theta),
    };
  };

  const drawBranch = (b: Branch): void => {
    const { startPoint, length, theta } = b;
    const end = {
      x: startPoint.x + length * Math.cos(theta),
      y: startPoint.y + length * Math.sin(theta),
    };
    lineTo(startPoint, end);
  };

  return (
    <>
      <canvas className="canvas" ref={el} width={600} height={600}></canvas>
    </>
  );
}
