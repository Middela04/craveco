import { useEffect, useState } from "react";

import { parseRestaurantsCsv } from "../lib/data";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [dataErr, setDataErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/restaurants.csv")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load restaurant data.");
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        setRestaurants(parseRestaurantsCsv(text));
        setDataErr("");
      })
      .catch(() => {
        if (cancelled) return;
        setDataErr("Restaurant data could not be loaded.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { restaurants, dataErr, setDataErr };
}
