import React, { useState } from "react";

import { Avatar, OutlineBtn, PrimaryBtn } from "../components/ui";
import { G } from "../lib/theme";

export default function BillPage({ selected, members, myName, onBack, onDone }) {
  const initialPeople = members.length > 0
    ? members.map((member) => ({ name: member.name, items: [{ desc: "", amount: "" }] }))
    : [{ name: myName || "You", items: [{ desc: "", amount: "" }] }];

  const [people, setPeople] = useState(initialPeople);
  const [tipPct, setTipPct] = useState(20);

  const updateItem = (personIndex, itemIndex, field, value) => {
    setPeople((current) => current.map((person, currentPersonIndex) => (
      currentPersonIndex !== personIndex
        ? person
        : {
            ...person,
            items: person.items.map((item, currentItemIndex) => (
              currentItemIndex !== itemIndex ? item : { ...item, [field]: value }
            )),
          }
    )));
  };

  const addItem = (personIndex) => {
    setPeople((current) => current.map((person, currentPersonIndex) => (
      currentPersonIndex !== personIndex
        ? person
        : { ...person, items: [...person.items, { desc: "", amount: "" }] }
    )));
  };

  const removeItem = (personIndex, itemIndex) => {
    setPeople((current) => current.map((person, currentPersonIndex) => (
      currentPersonIndex !== personIndex
        ? person
        : { ...person, items: person.items.filter((_, currentItemIndex) => currentItemIndex !== itemIndex) }
    )));
  };

  const addPerson = () => {
    setPeople((current) => [...current, { name: "", items: [{ desc: "", amount: "" }] }]);
  };

  const updateName = (personIndex, value) => {
    setPeople((current) => current.map((person, currentPersonIndex) => (
      currentPersonIndex !== personIndex ? person : { ...person, name: value }
    )));
  };

  const personSubtotal = (person) => person.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const groupSubtotal = people.reduce((sum, person) => sum + personSubtotal(person), 0);
  const groupTax = groupSubtotal * 0.0825;
  const groupTip = groupSubtotal * (tipPct / 100);
  const groupTotal = groupSubtotal + groupTax + groupTip;
  const personTotal = (person) => {
    const subtotal = personSubtotal(person);
    if (groupSubtotal === 0) return 0;
    const share = subtotal / groupSubtotal;
    return subtotal + groupTax * share + groupTip * share;
  };

  const copyAmounts = () => {
    navigator.clipboard?.writeText(`${people.map((person) => `${person.name || "?"}: $${personTotal(person).toFixed(2)}`).join("\n")}\nTotal: $${groupTotal.toFixed(2)}`);
  };

  const cardStyle = { background: G.white, borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" };

  return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: "Georgia,serif" }}>
      <div style={{ background: G.dark, padding: "52px 20px 22px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: G.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "Georgia,serif", padding: 0, marginBottom: 14 }}>← Back</button>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>{selected?.name || "Split the Bill"}</h2>
        <p style={{ color: G.accentLight, fontSize: 12, margin: 0 }}>Enter what each person ordered</p>
      </div>
      <div style={{ padding: "22px 20px" }}>
        {people.map((person, personIndex) => (
          <div key={personIndex} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Avatar name={person.name || "?"} size={32} />
              <input value={person.name} onChange={(event) => updateName(personIndex, event.target.value)} placeholder="Name"
                style={{ flex: 1, border: "none", borderBottom: `1.5px solid ${G.faint}`, background: "transparent", fontSize: 15, fontWeight: 700, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "4px 0" }} />
              <span style={{ color: G.accent, fontWeight: 800, fontSize: 14 }}>${personTotal(person).toFixed(2)}</span>
            </div>
            {person.items.map((item, itemIndex) => (
              <div key={itemIndex} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <input value={item.desc} onChange={(event) => updateItem(personIndex, itemIndex, "desc", event.target.value)} placeholder="Item (e.g. Tacos)"
                  style={{ flex: 1, border: "none", borderBottom: `1px solid ${G.faint}`, background: "transparent", fontSize: 13, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "6px 0" }} />
                <span style={{ color: G.muted, fontSize: 13 }}>$</span>
                <input type="number" value={item.amount} onChange={(event) => updateItem(personIndex, itemIndex, "amount", event.target.value)} placeholder="0.00"
                  style={{ width: 60, border: "none", borderBottom: `1px solid ${G.faint}`, background: "transparent", fontSize: 13, color: G.text, fontFamily: "Georgia,serif", outline: "none", padding: "6px 0", textAlign: "right" }} />
                {person.items.length > 1 && <button onClick={() => removeItem(personIndex, itemIndex)} style={{ background: "none", border: "none", color: G.faint, fontSize: 18, cursor: "pointer", padding: "0 2px" }}>×</button>}
              </div>
            ))}
            <button onClick={() => addItem(personIndex)} style={{ background: "none", border: "none", color: G.accent, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginTop: 6, padding: 0 }}>+ Add item</button>
          </div>
        ))}

        <button onClick={addPerson} style={{ width: "100%", padding: "12px 0", borderRadius: 14, border: `1.5px dashed ${G.faint}`, background: "transparent", color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: 16 }}>+ Add person</button>

        <div style={cardStyle}>
          <p style={{ fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Tip</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[15, 18, 20, 25].map((percent) => (
              <button key={percent} onClick={() => setTipPct(percent)} style={{ padding: "10px 0", borderRadius: 10, border: `1.5px solid ${tipPct === percent ? G.dark : G.faint}`, background: tipPct === percent ? G.dark : "transparent", color: tipPct === percent ? "#fff" : G.muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif" }}>{percent}%</button>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          {[["Subtotal", `$${groupSubtotal.toFixed(2)}`], ["Tax (8.25%)", `$${groupTax.toFixed(2)}`], [`Tip (${tipPct}%)`, `$${groupTip.toFixed(2)}`]].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${G.bg}` }}>
              <span style={{ color: G.muted, fontSize: 14 }}>{label}</span>
              <span style={{ color: G.text, fontSize: 14, fontWeight: 600 }}>{value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12 }}>
            <span style={{ color: G.text, fontSize: 17, fontWeight: 900 }}>Total</span>
            <span style={{ color: G.text, fontSize: 17, fontWeight: 900 }}>${groupTotal.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <OutlineBtn onClick={copyAmounts} style={{ flex: 1, marginTop: 0 }}>Copy amounts</OutlineBtn>
          <OutlineBtn onClick={() => {}} style={{ flex: 1, marginTop: 0 }}>Venmo request</OutlineBtn>
        </div>
        <PrimaryBtn onClick={onDone}>Done ✓</PrimaryBtn>
      </div>
    </div>
  );
}
