export function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

export function parseRestaurantsCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0].replace(/^\uFEFF/, ""));

  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));

    return {
      id: Number(row.id),
      name: row.name,
      type: row.type,
      e: row.e,
      c: row.c,
      p: row.p,
      a: row.a,
      v: row.v ? row.v.split("|") : [],
      d: row.d ? row.d.split("|") : [],
      r: Number(row.r),
      rv: Number(row.rv),
      w: row.w,
      cr: row.cr,
      h: row.h,
      n: row.n,
      ph: row.ph,
      addr: row.addr,
      resy: row.resy === "true",
    };
  });
}
