import React from "react";

import { BackButton, Tag } from "../components/ui";
import { G, layout } from "../lib/theme";

export default function MatchesPage({
  results,
  submittedCount,
  totalCount,
  onBack,
  onSelectRestaurant,
}) {
  const decisionStyle = results[0]?.decisionStyle || "Best fit for everyone";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={layout.header}>
        <BackButton onClick={onBack} />
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>Your Top 10 Picks 🎯</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: "0 0 4px" }}>Based on {submittedCount} of {totalCount} responses · 65 restaurants scored</p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Decision style: {decisionStyle}</p>
      </div>
      <div style={layout.body}>
        {results.map((restaurant, index) => (
          <div key={restaurant.id} onClick={() => onSelectRestaurant(restaurant.id)}
            style={{ ...layout.card, cursor: "pointer", background: index === 0 ? G.dark : G.white, position: "relative", paddingTop: index === 0 ? 52 : 34 }}>
            {index === 0 && <div style={{ position: "absolute", top: -1, right: -1, background: G.accent, color: "#fff", fontSize: 10, fontWeight: 800, padding: "5px 12px", borderRadius: "0 14px 0 10px" }}>#1 BEST MATCH</div>}
            {index > 0 && <div style={{ position: "absolute", top: 10, right: 12, background: index === 1 ? "#C0C0C0" : index === 2 ? "#C8845A" : G.tagGreen, color: index < 3 ? "#fff" : G.tagGreenText, borderRadius: 20, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>#{index + 1}</div>}

            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: index === 0 ? 32 : 24, flexShrink: 0 }}>{restaurant.e}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 4 }}>
                  <h3 style={{ color: index === 0 ? "#fff" : G.text, fontSize: index === 0 ? 18 : 15, fontWeight: 800, margin: 0, paddingRight: index === 0 ? 108 : 72 }}>{restaurant.name}</h3>
                  <div style={{ flexShrink: 0, textAlign: "right", marginTop: index === 0 ? -6 : 0 }}>
                    <div style={{ fontWeight: 900, fontSize: index === 0 ? 17 : 14, color: index === 0 ? G.accentLight : G.accent }}>{restaurant.score}%</div>
                    <div style={{ fontSize: 10, color: index === 0 ? "rgba(255,255,255,0.35)" : G.faint }}>match</div>
                  </div>
                </div>
                <div style={{ color: index === 0 ? "rgba(255,255,255,0.5)" : G.muted, fontSize: 12, marginBottom: 6 }}>
                  {restaurant.type === "Food Truck" ? "🚚" : "🍽"} {restaurant.c} · {restaurant.p} · {restaurant.a} · ⭐{restaurant.r}
                </div>
                <div style={{ marginBottom: index === 0 ? 8 : 0 }}>
                  {restaurant.v.slice(0, 2).map((vibe) => <Tag key={vibe} label={vibe} />)}
                  {restaurant.d.slice(0, 1).map((diet) => <Tag key={diet} label={diet} yellow />)}
                </div>
                {index === 0 && (
                  <>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontStyle: "italic", margin: "6px 0 10px", lineHeight: 1.5 }}>{restaurant.n}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {[[restaurant.w, "wait"], [restaurant.cr, "crowd"], [restaurant.h.split(",")[0], "hours"]].map(([value, label]) => (
                        <div key={label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px", textAlign: "center" }}>
                          <div style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>{value}</div>
                          <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && <div style={{ textAlign: "center", padding: "40px 20px", color: G.muted }}>No matches found. Try relaxing your hard requirements.</div>}
      </div>
    </div>
  );
}
