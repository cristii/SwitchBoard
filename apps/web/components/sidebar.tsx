"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icons";

const navItems: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/library", label: "Projects", icon: "grid" },
  { href: "/templates", label: "Templates", icon: "book" },
  { href: "/settings/keys", label: "API keys", icon: "key" },
  { href: "/activity", label: "Activity", icon: "activity" }
];

function isActive(pathname: string, href: string) {
  if (href === "/library") {
    return pathname === "/library" || pathname.startsWith("/projects") || pathname === "/new";
  }

  return pathname.startsWith(href);
}

export function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Icon name="chat" size={20} />
        </div>
        <div>
          <div className="brand-title">Switchboard</div>
          <div className="brand-subtitle">PLAYGROUND</div>
        </div>
      </div>

      <Link className="new-project" href="/new">
        <Icon name="plus" size={17} />
        New project
      </Link>

      <nav className="side-nav">
        <div className="sidebar-kicker">WORKSPACE</div>
        {navItems.map((item) => (
          <Link
            className={`side-link ${isActive(pathname, item.href) ? "active" : ""}`}
            href={item.href}
            key={item.href}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="model-box">
          <div className="model-head">
            <span className="model-dot" />
            <span className="model-kicker">BYOK MODEL</span>
          </div>
          <div className="model-label">Built-in demo model</div>
          <Link className="model-link" href="/settings/keys">
            Manage keys &rarr;
          </Link>
        </div>
        <div className="user-row">
          <div className="avatar">{userName.slice(0, 1).toUpperCase()}</div>
          <div>
            <div style={{ color: "#F3F2EA", fontSize: "0.8rem", fontWeight: 600 }}>
              {userName}
            </div>
            <div style={{ color: "#E9E8DF80", fontSize: "0.7rem" }}>
              Builder &middot; Free
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

