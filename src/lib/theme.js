export const G = {
  dark: "#1B3A2D",
  mid: "#2D5A42",
  accent: "#4CAF7D",
  accentLight: "#6FCF97",
  bg: "#F4F1EA",
  white: "#FFFFFF",
  text: "#1B3A2D",
  muted: "#7A9485",
  faint: "#B8CEC5",
  red: "#D94F4F",
  redBg: "#FDF0F0",
  redBorder: "#F5C6C6",
  tagGreen: "#E6F4ED",
  tagGreenText: "#1B5E3A",
  tagYellow: "#FEF9EC",
  tagYellowText: "#8A6A00",
};

export const VIBES = ["Post org", "Celebration", "Study-friendly", "Post-exam", "Org social", "Date night", "Catch-up", "Quick bite", "Late night", "Other"];
export const HARD = ["Can split bill", "Seats 8+", "Walk-ins available", "Wait under", "Parking available"];
export const DISTANCES = ["Walk only (<10 min)", "Near campus", "Within 15 min drive", "Anywhere"];
export const DIETARY_NEEDS = ["Vegetarian", "Vegan", "Nut-friendly", "Gluten-free", "Halal", "Kosher"];
export const DECISION_STYLES = ["Fastest option", "Best fit for everyone", "Most adventurous", "Best value", "Best rated", "Hidden gems"];
export const POPULAR_CUISINES = [
  { label: "Italian", emoji: "🍕" },
  { label: "Mexican", emoji: "🌮" },
  { label: "American", emoji: "🍔" },
  { label: "Indian", emoji: "🍛" },
  { label: "Japanese", emoji: "🍣" },
  { label: "Chinese", emoji: "🍜" },
];
export const CUISINES = ["Mexican", "Japanese", "Italian", "BBQ", "American", "Indian", "Mediterranean", "Vegan", "Tex-Mex", "Latin Fusion", "Chinese", "Asian-BBQ", "Vietnamese", "Thai", "Asian Fusion", "Steakhouse"];

export const layout = {
  header: { background: G.dark, padding: "52px 20px 22px" },
  body: { background: G.bg, padding: "22px 20px", borderRadius: "22px 22px 0 0", minHeight: 400 },
  card: { background: G.white, borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" },
  label: { fontSize: 11, color: G.muted, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", display: "block" },
};
