import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "../lib/auth/options";
import { Sidebar } from "./sidebar";

export async function AppShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? "Cristi S.";

  return (
    <div className="app-frame">
      <Sidebar userName={userName} />
      <main className="main-scroll">{children}</main>
    </div>
  );
}

