"use client";
import ShaderBackground from "./components/ShaderBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </>
  );
}
