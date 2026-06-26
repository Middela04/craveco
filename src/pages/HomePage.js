import React from "react";

import { G } from "../lib/theme";

export default function HomePage({
  myName,
  joinCode,
  loading,
  err,
  onNameChange,
  onJoinCodeChange,
  onStartGroup,
  onJoinGroup,
}) {
  return (
    <div style={{ minHeight: "100vh", background: G.dark, fontFamily: "Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🍽️</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 4px", letterSpacing: "-2px" }}>CraveCo.</h1>
          <p style={{ color: G.accentLight, fontSize: 14, fontStyle: "italic", margin: "0 0 4px" }}>Gather. Feast. Repeat.</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>65 real Austin spots · group-first matching</p>
        </div>

        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Your Name</p>
        <input
          value={myName}
          onChange={(event) => onNameChange(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && myName.trim() && onStartGroup()}
          placeholder="Enter your name"
          style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box", marginBottom: 12 }}
        />

        <button
          onClick={onStartGroup}
          disabled={loading || !myName.trim()}
          style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: G.accent, color: "#fff", fontSize: 15, fontWeight: 700, cursor: myName.trim() ? "pointer" : "default", opacity: myName.trim() ? 1 : 0.45, fontFamily: "Georgia,serif", marginBottom: 14 }}
        >
          {loading ? "Creating..." : "+ Start a group plan"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          <span>or join with a code</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            value={joinCode}
            onChange={(event) => onJoinCodeChange(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onJoinGroup()}
            placeholder="GRP-XXXX"
            maxLength={8}
            style={{ flex: 1, padding: "13px", borderRadius: 12, border: `1.5px solid ${err && err !== "Looking up group..." ? "rgba(220,80,80,0.6)" : "rgba(255,255,255,0.15)"}`, background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, fontFamily: "Georgia,serif", outline: "none", letterSpacing: 2, textAlign: "center" }}
          />
          <button
            onClick={onJoinGroup}
            disabled={loading || !myName.trim() || !joinCode.trim()}
            style={{ padding: "13px 18px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", whiteSpace: "nowrap", opacity: myName.trim() && joinCode.trim() ? 1 : 0.5 }}
          >
            {loading ? "..." : "Join →"}
          </button>
        </div>
        {err && <p style={{ color: err === "Looking up group..." ? G.accentLight : "#FF8080", fontSize: 12, margin: "4px 0 0", textAlign: "center" }}>{err}</p>}

        <div style={{ marginTop: 28, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, border: "1px solid rgba(255,255,255,0.08)" }}>
          <strong style={{ color: "rgba(255,255,255,0.6)" }}>How it works:</strong><br />
          1. Start a plan → share your code<br />
          2. Friends open this app in the same browser, enter the code → Join<br />
          3. Everyone picks their vibe → submit<br />
          4. See your group's top 10 Austin spots 🎯
        </div>
      </div>
    </div>
  );
}
