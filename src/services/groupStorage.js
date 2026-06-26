export function saveGroup(code, members) {
  try {
    localStorage.setItem(`craveco_${code}`, JSON.stringify(members));
    return true;
  } catch (e) {
    return false;
  }
}

export function loadGroup(code) {
  try {
    const value = localStorage.getItem(`craveco_${code}`);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
}

export function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "GRP-";

  for (let i = 0; i < 4; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}
