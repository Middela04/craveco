import React, { useMemo, useState } from "react";

import { Chip, PrimaryBtn } from "../components/ui";
import { CUISINES, DECISION_STYLES, DIETARY_NEEDS, DISTANCES, G, HARD, POPULAR_CUISINES, VIBES, layout } from "../lib/theme";

export default function PreferencesPage({
  myName,
  activeCode,
  myHard,
  myHardMaxWait,
  myPrice,
  myDistance,
  myDecisionStyle,
  myDietaryNeeds,
  myVibes,
  myCuisines,
  onToggleHard,
  onHardMaxWaitChange,
  onTogglePrice,
  onToggleDistance,
  onDecisionStyleChange,
  onToggleDietaryNeed,
  onToggleVibe,
  onToggleCuisine,
  onSubmit,
}) {
  const [showCuisinePicker, setShowCuisinePicker] = useState(false);
  const [cuisineSearch, setCuisineSearch] = useState("");
  const filteredCuisines = useMemo(() => {
    const query = cuisineSearch.trim().toLowerCase();
    if (!query) return CUISINES;
    return CUISINES.filter((cuisine) => cuisine.toLowerCase().includes(query));
  }, [cuisineSearch]);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={layout.header}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>Your vibe check</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: 0 }}>Hi {myName} · Code: <strong style={{ letterSpacing: 2 }}>{activeCode}</strong></p>
      </div>
      <div style={layout.body}>
        <div style={{ background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 14, padding: 14, marginBottom: 18 }}>
          <p style={{ color: G.red, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>⚠ Hard requirements — always honored</p>
          <div>
            {HARD.map((item) => (
              <button key={item} onClick={() => onToggleHard(item)} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${myHard.includes(item) ? G.red : G.redBorder}`, background: myHard.includes(item) ? "#FFEBEB" : "transparent", color: myHard.includes(item) ? G.red : "#C47070", fontSize: 12, cursor: "pointer", fontFamily: "Georgia,serif", margin: 3, fontWeight: myHard.includes(item) ? 700 : 400 }}>
                {item}
              </button>
            ))}
          </div>
          {myHard.includes("Wait under") && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <input
                value={myHardMaxWait}
                onChange={(event) => onHardMaxWaitChange(event.target.value)}
                placeholder="20"
                inputMode="numeric"
                style={{ width: 84, padding: "10px 12px", borderRadius: 12, border: `1.5px solid ${G.redBorder}`, background: "#fff", color: G.text, fontSize: 14, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box" }}
              />
              <span style={{ color: "#C47070", fontSize: 12 }}>minutes or less</span>
            </div>
          )}
        </div>

        <span style={layout.label}>Budget</span>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[["$", "Under $15"], ["$$", "$15-30"], ["$$$", "$30-50"], ["$$$$", "Splurge"]].map(([value, label]) => (
            <button key={value} onClick={() => onTogglePrice(value)} style={{ flex: 1, padding: "11px 4px", borderRadius: 12, border: `1.5px solid ${myPrice.includes(value) ? G.dark : G.faint}`, background: myPrice.includes(value) ? G.dark : "transparent", color: myPrice.includes(value) ? "#fff" : G.muted, cursor: "pointer", fontFamily: "Georgia,serif", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{value}</div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{label}</div>
            </button>
          ))}
        </div>

        <span style={layout.label}>Distance</span>
        <div style={{ marginBottom: 18 }}>{DISTANCES.map((distance) => <Chip key={distance} label={distance} selected={myDistance === distance} onClick={() => onToggleDistance(distance)} />)}</div>

        <span style={layout.label}>Decision style</span>
        <div style={{ marginBottom: 18 }}>{DECISION_STYLES.map((style) => <Chip key={style} label={style} selected={myDecisionStyle === style} onClick={() => onDecisionStyleChange(style)} />)}</div>

        <span style={layout.label}>Dietary needs</span>
        <div style={{ marginBottom: 18 }}>{DIETARY_NEEDS.map((need) => <Chip key={need} label={need} selected={myDietaryNeeds.includes(need)} onClick={() => onToggleDietaryNeed(need)} />)}</div>

        <span style={layout.label}>Tonight's vibe</span>
        <div style={{ marginBottom: 18 }}>{VIBES.map((vibe) => <Chip key={vibe} label={vibe} selected={myVibes.includes(vibe)} onClick={() => onToggleVibe(vibe)} />)}</div>

        <span style={layout.label}>Cuisine craving</span>
        <div style={{ marginBottom: 8 }}>
          {POPULAR_CUISINES.map((cuisine) => (
            <Chip
              key={cuisine.label}
              label={`${cuisine.emoji} ${cuisine.label}`}
              selected={myCuisines.includes(cuisine.label)}
              onClick={() => onToggleCuisine(cuisine.label)}
            />
          ))}
          <Chip
            label="Search more cuisines."
            selected={showCuisinePicker || myCuisines.some((cuisine) => !POPULAR_CUISINES.find((option) => option.label === cuisine))}
            onClick={() => setShowCuisinePicker((current) => !current)}
          />
        </div>
        {myCuisines.some((cuisine) => !POPULAR_CUISINES.find((option) => option.label === cuisine)) && (
          <div style={{ marginBottom: 14 }}>
            {myCuisines
              .filter((cuisine) => !POPULAR_CUISINES.find((option) => option.label === cuisine))
              .map((cuisine) => <Chip key={cuisine} label={cuisine} selected onClick={() => onToggleCuisine(cuisine)} />)}
          </div>
        )}
        {showCuisinePicker && (
          <div style={{ background: G.white, border: `1px solid ${G.faint}`, borderRadius: 16, padding: 14, marginBottom: 22, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            <input
              value={cuisineSearch}
              onChange={(event) => setCuisineSearch(event.target.value)}
              placeholder="Search cuisines..."
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${G.faint}`, background: "#fff", color: G.text, fontSize: 14, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box", marginBottom: 12 }}
            />
            <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 8 }}>
              {filteredCuisines.map((cuisine) => (
                <Chip key={cuisine} label={cuisine} selected={myCuisines.includes(cuisine)} onClick={() => onToggleCuisine(cuisine)} />
              ))}
              {filteredCuisines.length === 0 && <p style={{ margin: 0, color: G.muted, fontSize: 13 }}>No cuisines match that search.</p>}
            </div>
            <button onClick={() => setShowCuisinePicker(false)} style={{ background: "none", border: "none", color: G.dark, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", padding: 0 }}>
              Done
            </button>
          </div>
        )}

        <PrimaryBtn onClick={onSubmit}>Submit my picks →</PrimaryBtn>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button onClick={onSubmit} style={{ background: "none", border: "none", color: G.muted, fontSize: 12, cursor: "pointer", fontFamily: "Georgia,serif" }}>Skip — just show me results</button>
        </div>
      </div>
    </div>
  );
}
