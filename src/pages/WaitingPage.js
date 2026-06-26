import React from "react";

import { Avatar, PrimaryBtn } from "../components/ui";
import { G, layout } from "../lib/theme";

export default function WaitingPage({
  activeCode,
  copied,
  members,
  myName,
  submittedCount,
  totalCount,
  onCopyCode,
  onSeeResults,
}) {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia,serif" }}>
      <div style={{ ...layout.header, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 6px" }}>Waiting on the crew</h2>
        <p style={{ color: G.accentLight, fontSize: 13, margin: "0 0 18px" }}>Share this code — friends open CraveCo and join</p>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Group Code</div>
            <div style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: 4 }}>{activeCode}</div>
          </div>
          <button onClick={onCopyCode} style={{ background: copied ? G.mid : G.accent, border: "none", color: "#fff", borderRadius: 10, padding: "11px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", transition: "background 0.2s" }}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, margin: 0 }}>Friends join on the same browser · refreshes every 3s</p>
      </div>

      <div style={layout.body}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={layout.label}>Group Responses</span>
          <span style={{ fontSize: 13, color: G.accent, fontWeight: 700 }}>{submittedCount}/{totalCount} submitted</span>
        </div>

        <div style={{ marginBottom: 18 }}>
          {members.map((member) => (
            <div key={member.name} style={{ ...layout.card, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
              <Avatar name={member.name} bg={member.submitted ? G.mid : G.faint} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: G.text, fontSize: 14 }}>{member.name}{member.name === myName ? " (you)" : ""}</div>
                {member.submitted
                  ? <div style={{ color: G.muted, fontSize: 12 }}>{[...(member.cuisines || []), ...(member.vibes || [])].slice(0, 3).join(" · ") || "Submitted"}</div>
                  : <div style={{ color: G.faint, fontSize: 12 }}>Waiting to submit...</div>}
              </div>
              {member.submitted
                ? <div style={{ width: 24, height: 24, borderRadius: "50%", background: G.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 }}>✓</div>
                : <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${G.faint}` }} />}
            </div>
          ))}
        </div>

        <div style={{ height: 6, background: "#E0EDE7", borderRadius: 3, marginBottom: 6, overflow: "hidden" }}>
          <div style={{ width: `${totalCount > 0 ? (submittedCount / totalCount) * 100 : 0}%`, height: "100%", background: G.accent, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <p style={{ fontSize: 11, color: G.muted, textAlign: "center", margin: "0 0 14px" }}>Auto-refreshes every 3s</p>
        <PrimaryBtn onClick={onSeeResults} style={{ marginTop: 0 }}>
          {submittedCount >= totalCount && totalCount > 0 ? "See our top 10 →" : `See top 10 now (${submittedCount} responded) →`}
        </PrimaryBtn>
      </div>
    </div>
  );
}
