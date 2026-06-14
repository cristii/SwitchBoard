import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function HandUnderline({ children }: { children: ReactNode }) {
  return <span className="hand">{children}</span>;
}

export function Badge({
  children,
  variant
}: {
  children: ReactNode;
  variant: "green" | "amber" | "violet";
}) {
  return <span className={`badge ${variant}`}>{children}</span>;
}

export function Stat({
  value,
  label,
  color
}: {
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div>
      <div className="stat-value" style={{ color }}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

