import { useEffect, useState } from "react";

export const ROUTES = {
  home: "/",
  preferences: "/preferences",
  waiting: "/waiting",
  matches: "/matches",
  detail: "/detail",
  bill: "/bill",
};

function getHashPath() {
  return window.location.hash.replace(/^#/, "") || ROUTES.home;
}

function parseRoute(path) {
  if (path.startsWith(`${ROUTES.detail}/`)) {
    return { name: "detail", restaurantId: Number(path.split("/")[2]) || null };
  }

  if (path.startsWith(`${ROUTES.bill}/`)) {
    return { name: "bill", restaurantId: Number(path.split("/")[2]) || null };
  }

  switch (path) {
    case ROUTES.preferences:
      return { name: "preferences", restaurantId: null };
    case ROUTES.waiting:
      return { name: "waiting", restaurantId: null };
    case ROUTES.matches:
      return { name: "matches", restaurantId: null };
    case ROUTES.home:
    default:
      return { name: "home", restaurantId: null };
  }
}

function navigateTo(path) {
  window.location.hash = path;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseRoute(getHashPath()));

  useEffect(() => {
    const syncRoute = () => setRoute(parseRoute(getHashPath()));

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  return {
    route,
    goHome: () => navigateTo(ROUTES.home),
    goPreferences: () => navigateTo(ROUTES.preferences),
    goWaiting: () => navigateTo(ROUTES.waiting),
    goMatches: () => navigateTo(ROUTES.matches),
    goDetail: (restaurantId) => navigateTo(`${ROUTES.detail}/${restaurantId}`),
    goBill: (restaurantId) => navigateTo(`${ROUTES.bill}/${restaurantId}`),
  };
}
