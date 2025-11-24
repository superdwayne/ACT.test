import { DemoNav } from "./demo-nav";

export function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoNav />
      <main>{children}</main>
    </>
  );
}
