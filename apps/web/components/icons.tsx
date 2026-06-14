import type { ReactNode } from "react";

export type IconName =
  | "activity"
  | "book"
  | "chat"
  | "check"
  | "email"
  | "flow"
  | "grid"
  | "instagram"
  | "key"
  | "messenger"
  | "n8n"
  | "plus"
  | "search"
  | "slack"
  | "spark"
  | "target"
  | "telegram"
  | "webchat"
  | "whatsapp";

function path(d: string, key?: string) {
  return <path d={d} key={key ?? d.slice(0, 8)} />;
}

function circle(cx: number, cy: number, r: number, key?: string) {
  return <circle cx={cx} cy={cy} r={r} key={key ?? `c${cx}${cy}`} />;
}

function line(x1: number, y1: number, x2: number, y2: number, key?: string) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} key={key ?? `l${x1}${y1}`} />;
}

function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  rx = 2,
  key?: string
) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      key={key ?? `r${x}${y}${width}${height}`}
    />
  );
}

const iconPaths: Record<IconName, ReactNode[]> = {
  activity: [path("M4 13h3l2-6 3 12 2.5-7H20")],
  book: [
    path("M5 4.5h11a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2V4.5Z"),
    path("M18 16H7a2 2 0 0 0-2 2")
  ],
  chat: [
    path("M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5Z")
  ],
  check: [path("M5 12.5 10 17l9-10")],
  email: [rect(3, 5, 18, 14, 3), path("M4 7l8 6 8-6")],
  flow: [rect(4, 4, 6, 5, 1.6), rect(14, 15, 6, 5, 1.6), path("M7 9v4a2 2 0 0 0 2 2h5")],
  grid: [rect(4, 4, 7, 7, 2), rect(13, 4, 7, 7, 2), rect(4, 13, 7, 7, 2), rect(13, 13, 7, 7, 2)],
  instagram: [rect(3.5, 3.5, 17, 17, 5), circle(12, 12, 3.6), circle(17, 7, 0.5)],
  key: [circle(8, 15, 3.5), path("M10.5 12.5 19 4"), path("M16 7l2 2"), path("M14 9l1.5 1.5")],
  messenger: [
    path("M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.9 3.3 6.4V21l3-1.6c.86.2 1.76.3 2.7.3 5 0 9-3.7 9-8.4S17 3 12 3Z"),
    path("M7.5 13.5 11 10l2.3 2.2L16.5 10")
  ],
  n8n: [circle(5, 12, 2), circle(19, 6, 2), circle(19, 18, 2), circle(12, 12, 1.4), path("M6.7 11l3.9-1"), path("M13.4 11.2 17 7"), path("M13.4 12.8 17 17")],
  plus: [line(12, 5, 12, 19), line(5, 12, 19, 12)],
  search: [circle(11, 11, 6.5), line(20, 20, 16, 16)],
  slack: [rect(5, 5, 6, 6, 2.2), rect(13, 5, 6, 6, 2.2), rect(5, 13, 6, 6, 2.2), rect(13, 13, 6, 6, 2.2)],
  spark: [path("M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"), line(18.5, 4.5, 18.5, 7.5), line(17, 6, 20, 6)],
  target: [circle(12, 12, 8), circle(12, 12, 4), circle(12, 12, 0.7)],
  telegram: [path("M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z"), path("M8 13l9-6")],
  webchat: [rect(3, 4, 18, 14, 3), line(3, 8.5, 21, 8.5), circle(6, 6.2, 0.3), circle(8, 6.2, 0.3), path("M9 13h6")],
  whatsapp: [
    path("M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5Z"),
    path("M8.5 9.2c0 3 2.3 5.3 5.3 5.3"),
    circle(9.3, 9.6, 0.4),
    circle(13.5, 13.9, 0.4)
  ]
};

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name] ?? iconPaths.chat}
    </svg>
  );
}
