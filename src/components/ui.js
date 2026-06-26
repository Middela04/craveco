import React from "react";

import { G } from "../lib/theme";

export function Avatar({ name, size = 34, bg = G.mid }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
      {(name || "?").slice(0, 2).toUpperCase()}
    </div>
  );
}

export function Tag({ label, yellow }) {
  return (
    <span style={{ display: "inline-flex", background: yellow ? G.tagYellow : G.tagGreen, color: yellow ? G.tagYellowText : G.tagGreenText, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 600, margin: 2 }}>
      {label}
    </span>
  );
}

export function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 22, border: `1.5px solid ${selected ? G.dark : G.faint}`, background: selected ? G.dark : "transparent", color: selected ? "#fff" : G.muted, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", fontWeight: selected ? 700 : 400, transition: "all 0.12s", margin: 3 }}>
      {label}
    </button>
  );
}

export function PrimaryBtn({ children, onClick, disabled, style }) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: disabled ? G.faint : G.dark, color: disabled ? "#aaa" : "#fff", fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer", fontFamily: "Georgia,serif", marginTop: 8, ...style }}>
      {children}
    </button>
  );
}

export function OutlineBtn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "13px 0", borderRadius: 14, border: `1.5px solid ${G.dark}`, background: "transparent", color: G.dark, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 8, ...style }}>
      {children}
    </button>
  );
}

export function BackButton({ onClick, toLabel = "Back" }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", color: G.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", padding: 0, marginBottom: 14 }}>
      ← {toLabel}
    </button>
  );
}
