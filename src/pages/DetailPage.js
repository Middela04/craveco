import React from "react";

import { BackButton, OutlineBtn, Tag } from "../components/ui";
import { G, layout } from "../lib/theme";

export default function DetailPage({
  selected,
  showBook,
  onBack,
  onToggleBook,
  onSplitBill,
}) {
  if (!selected) return null;

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={layout.header}>
        <BackButton onClick={onBack} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: G.accentLight, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>{selected.type}</div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 3px" }}>{selected.e} {selected.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0 }}>{selected.c} · {selected.p} · {selected.a}</p>
          </div>
          <div style={{ background: G.accent, color: "#fff", borderRadius: 12, padding: "8px 14px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{selected.score}%</div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>match</div>
          </div>
        </div>
      </div>

      <div style={layout.body}>
        <div style={layout.card}>
          <p style={{ color: G.text, fontSize: 13, fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.6 }}>"{selected.n}"</p>
          <p style={{ color: G.muted, fontSize: 11, margin: 0 }}>⭐ {selected.r} · {selected.rv.toLocaleString()} Google reviews</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          {selected.v.map((vibe) => <Tag key={vibe} label={vibe} />)}
          {selected.d.map((diet) => <Tag key={diet} label={diet} yellow />)}
        </div>

        <div style={layout.card}>
          <span style={layout.label}>Right now</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[[selected.w, "wait"], [selected.cr, "crowd"], [selected.h.split(",")[0], "hours"]].map(([value, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, color: G.text, fontSize: 13, marginBottom: 2 }}>{value}</div>
                <div style={{ color: G.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onToggleBook}
          style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: G.dark, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: showBook ? 0 : 10 }}
        >
          {selected.resy ? "📅 Reserve a Table" : "📞 Contact & Directions"} {showBook ? "↑" : "↓"}
        </button>

        {showBook && (
          <div style={{ background: G.white, borderRadius: "0 0 14px 14px", padding: 18, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", marginBottom: 10 }}>
            {[
              ["📍", "Address", selected.addr, `https://maps.google.com/?q=${encodeURIComponent(selected.addr)}`],
              ["📞", "Phone", selected.ph, selected.ph !== "N/A" ? `tel:${selected.ph}` : null],
              ["🕐", "Hours", selected.h, null],
            ].map(([icon, label, value, href]) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${G.bg}`, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.tagGreen, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: G.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                  {href
                    ? <><a href={href} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: G.text, fontSize: 13, textDecoration: "none" }}>{value}</a>
                        {icon === "📍" && <><br /><a href={href} target="_blank" rel="noreferrer" style={{ color: G.accent, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Open in Maps →</a></>}</>
                    : <div style={{ fontWeight: 600, color: G.text, fontSize: 13 }}>{value}</div>}
                </div>
              </div>
            ))}
            {selected.resy && (
              <a href={`https://resy.com/cities/aus?query=${encodeURIComponent(selected.name)}`} target="_blank" rel="noreferrer"
                style={{ display: "block", width: "100%", padding: "13px 0", borderRadius: 12, background: G.accent, color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                Book on Resy →
              </a>
            )}
          </div>
        )}

        <OutlineBtn onClick={onSplitBill}>Split the bill 💸</OutlineBtn>
      </div>
    </div>
  );
}
