function hasDietTag(restaurant, matcher) {
  return (restaurant.d || []).some((item) => matcher(item.toLowerCase()));
}

const CUISINE_MATCHERS = {
  Asian: ["Japanese", "Chinese", "Thai", "Vietnamese", "Asian Fusion", "Asian-BBQ", "Japanese-BBQ"],
};

const DIETARY_MATCHERS = {
  Vegetarian: (restaurant) => hasDietTag(restaurant, (item) => item.includes("vegetarian")),
  Vegan: (restaurant) => hasDietTag(restaurant, (item) => item.includes("vegan")),
  "Nut-friendly": (restaurant) => hasDietTag(restaurant, (item) => item.includes("nut-free")),
  "Gluten-free": (restaurant) => hasDietTag(restaurant, (item) => item.includes("gluten-free")),
  Halal: (restaurant) => hasDietTag(restaurant, (item) => item.includes("halal")),
  Kosher: (restaurant) => hasDietTag(restaurant, (item) => item.includes("kosher")),
};

function getRestaurantText(restaurant) {
  return [restaurant.name, restaurant.n, restaurant.h, restaurant.a, restaurant.cr]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function canSplitBill(restaurant) {
  const text = getRestaurantText(restaurant);
  return restaurant.type === "Restaurant" && !text.includes("cash only");
}

function canSeatLargeGroup(restaurant) {
  return restaurant.type === "Restaurant" && restaurant.cr !== "Intimate" && restaurant.w !== "Reserve";
}

function hasValetParking(restaurant) {
  const denseAreas = new Set(["Downtown", "SoCo", "Rainey Street", "Riverside"]);
  return denseAreas.has(restaurant.a) && (restaurant.p === "$$$" || restaurant.p === "$$$$" || restaurant.resy);
}

function hasStreetParking(restaurant) {
  const streetParkingAreas = new Set([
    "East Austin",
    "East 6th",
    "North Austin",
    "North Lamar",
    "North Loop",
    "Rosedale",
    "South Austin",
    "South Lamar",
    "West Austin",
  ]);
  return streetParkingAreas.has(restaurant.a);
}

function hasAnyParking(restaurant) {
  return hasStreetParking(restaurant) || hasValetParking(restaurant) || !["Downtown", "East 6th", "Rainey Street"].includes(restaurant.a);
}

function hasNoParking(restaurant) {
  return !hasAnyParking(restaurant);
}

function allowsWalkIn(restaurant) {
  const text = getRestaurantText(restaurant);
  return restaurant.w !== "Reserve" && !text.includes("reserve ahead");
}

function getWaitMinutes(restaurant) {
  if (!restaurant.w || restaurant.w === "Reserve") return null;
  const match = restaurant.w.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function getPriceLevel(restaurant) {
  return (restaurant.p || "").length || 0;
}

function clampScore(value) {
  return Math.round(Math.min(100, Math.max(0, value)));
}

const VIBE_MATCHERS = {
  "Post org": ["Lively", "Outdoor", "Cozy"],
  Celebration: ["Upscale", "Aesthetic", "Lively", "Romantic"],
  "Study-friendly": ["Cozy", "Aesthetic"],
  "Post-exam": ["Lively", "Outdoor", "Aesthetic"],
  "Org social": ["Lively", "Outdoor", "Cozy"],
  "Date night": ["Romantic", "Upscale", "Aesthetic"],
  "Catch-up": ["Cozy", "Aesthetic", "Outdoor"],
  "Quick bite": ["Lively", "Outdoor"],
  "Late night": ["Lively", "Romantic"],
  Other: ["Aesthetic", "Lively", "Cozy", "Outdoor", "Upscale", "Romantic"],
};

const WALK_ONLY_AREAS = new Set(["Downtown", "North Loop", "Rosedale"]);
const NEAR_CAMPUS_AREAS = new Set(["Downtown", "East Austin", "North Austin", "North Lamar", "North Loop", "Rosedale", "West Austin"]);
const DRIVE_15_AREAS = new Set([
  ...NEAR_CAMPUS_AREAS,
  "East 6th",
  "East Riverside",
  "Rainey Street",
  "Riverside",
  "SoCo",
  "South Lamar",
  "South Austin",
]);

function matchesDistancePreference(restaurant, preference) {
  if (preference === "Anywhere") return true;
  if (preference === "Walk only (<10 min)") return WALK_ONLY_AREAS.has(restaurant.a);
  if (preference === "Near campus") return NEAR_CAMPUS_AREAS.has(restaurant.a);
  if (preference === "Within 15 min drive") return DRIVE_15_AREAS.has(restaurant.a);
  return false;
}

function matchesVibePreference(restaurant, preference) {
  const acceptableTags = VIBE_MATCHERS[preference] || [preference];
  return acceptableTags.some((tag) => (restaurant.v || []).includes(tag));
}

function matchesCuisinePreference(restaurant, preference) {
  const acceptableCuisines = CUISINE_MATCHERS[preference] || [preference];
  return acceptableCuisines.includes(restaurant.c);
}

function matchesDietaryPreference(restaurant, preference) {
  const matcher = DIETARY_MATCHERS[preference];
  return matcher ? matcher(restaurant) : false;
}

function getMemberDistancePreferences(member) {
  if (member.distance) return [member.distance];
  return member.distances || [];
}

export function scoreRestaurant(restaurant, members) {
  if (!members || !members.length) {
    return { score: Math.round(restaurant.r * 10), blocked: false };
  }

  const count = members.length;
  let score = 0;

  const allHard = [...new Set(members.flatMap((member) => member.hard || []))];
  for (const hard of allHard) {
    if (hard === "Can split bill" && !canSplitBill(restaurant)) return { score: 0, blocked: true };
    if (hard === "Seats 8+" && !canSeatLargeGroup(restaurant)) return { score: 0, blocked: true };
    if (hard === "Parking available" && !hasAnyParking(restaurant)) return { score: 0, blocked: true };
    if (hard === "Walk-ins available" && !allowsWalkIn(restaurant)) return { score: 0, blocked: true };
    if (hard === "Wait under") {
      const activeLimits = members
        .filter((member) => (member.hard || []).includes("Wait under"))
        .map((member) => Number(member.hardMaxWait))
        .filter((value) => Number.isFinite(value) && value > 0);
      const maxAllowedWait = activeLimits.length > 0 ? Math.min(...activeLimits) : null;
      const restaurantWait = getWaitMinutes(restaurant);
      if (!maxAllowedWait || restaurantWait === null || restaurantWait > maxAllowedWait) return { score: 0, blocked: true };
    }
  }

  const cuisineMatches = members.filter((member) => (member.cuisines || []).some((cuisine) => matchesCuisinePreference(restaurant, cuisine))).length;
  score += (cuisineMatches / count) * 40;

  const priceMembers = members.filter((member) => (member.prices || []).length > 0);
  if (priceMembers.length > 0) {
    const priceHits = priceMembers.filter((member) => member.prices.includes(restaurant.p)).length;
    score += priceHits === 0 ? -15 : (priceHits / priceMembers.length) * 18;
  }

  const distanceMembers = members.filter((member) => getMemberDistancePreferences(member).length > 0);
  if (distanceMembers.length > 0) {
    const distanceHits = distanceMembers.filter((member) => getMemberDistancePreferences(member).some((preference) => matchesDistancePreference(restaurant, preference))).length;
    score += distanceHits === 0 ? -12 : (distanceHits / distanceMembers.length) * 18;
  }

  const dietaryMembers = members.filter((member) => (member.dietaryNeeds || []).length > 0);
  if (dietaryMembers.length > 0) {
    const dietaryHits = dietaryMembers.filter((member) => member.dietaryNeeds.some((preference) => matchesDietaryPreference(restaurant, preference))).length;
    score += dietaryHits === 0 ? -18 : (dietaryHits / dietaryMembers.length) * 24;
  }

  const vibeMatches = members.filter((member) => (member.vibes || []).some((vibe) => matchesVibePreference(restaurant, vibe))).length;
  score += (vibeMatches / count) * 30;
  score += restaurant.r * 2.5;

  return { score: clampScore(score), blocked: false };
}

function getGroupDecisionStyle(members) {
  const counts = new Map();
  let winner = "Best fit for everyone";
  let winnerCount = 0;

  for (const member of members) {
    const style = member.decisionStyle || "Best fit for everyone";
    const nextCount = (counts.get(style) || 0) + 1;
    counts.set(style, nextCount);
    if (nextCount > winnerCount) {
      winner = style;
      winnerCount = nextCount;
    }
  }

  return winner;
}

function getCuisinePopularity(restaurants) {
  const counts = new Map();
  restaurants.forEach((restaurant) => {
    counts.set(restaurant.c, (counts.get(restaurant.c) || 0) + 1);
  });
  return counts;
}

function getStyleScore(restaurant, baseScore, style, cuisinePopularity) {
  const waitMinutes = getWaitMinutes(restaurant);
  const priceLevel = getPriceLevel(restaurant);
  const reviewVolume = restaurant.rv || 0;
  const cuisineCount = cuisinePopularity.get(restaurant.c) || 1;
  const rarityScore = 100 - Math.min(100, cuisineCount * 8);
  const lowerReviewBoost = 100 - Math.min(100, reviewVolume / 120);
  const fastScore = waitMinutes === null ? 0 : 100 - Math.min(100, waitMinutes * 1.6);
  const valueScore = clampScore(restaurant.r * 14 + (5 - priceLevel) * 8 + (waitMinutes !== null ? Math.max(0, 18 - waitMinutes) : 0));
  const ratedScore = clampScore(restaurant.r * 18 + Math.min(10, Math.log10(reviewVolume + 1)) * 10);
  const adventurousScore = clampScore(rarityScore * 0.55 + restaurant.r * 10 + (restaurant.type === "Food Truck" ? 10 : 0));
  const hiddenGemScore = clampScore(lowerReviewBoost * 0.45 + restaurant.r * 11 + rarityScore * 0.2);

  switch (style) {
    case "Fastest option":
      return clampScore(baseScore * 0.45 + fastScore * 0.55);
    case "Most adventurous":
      return clampScore(baseScore * 0.5 + adventurousScore * 0.5);
    case "Best value":
      return clampScore(baseScore * 0.45 + valueScore * 0.55);
    case "Best rated":
      return clampScore(baseScore * 0.35 + ratedScore * 0.65);
    case "Hidden gems":
      return clampScore(baseScore * 0.4 + hiddenGemScore * 0.6);
    case "Best fit for everyone":
    default:
      return baseScore;
  }
}

export function rankRestaurants(restaurants, members) {
  const decisionStyle = getGroupDecisionStyle(members);
  const cuisinePopularity = getCuisinePopularity(restaurants);

  return restaurants
    .map((restaurant) => {
      const baseResult = scoreRestaurant(restaurant, members);
      if (baseResult.blocked) return { ...restaurant, ...baseResult, decisionStyle };

      return {
        ...restaurant,
        ...baseResult,
        score: getStyleScore(restaurant, baseResult.score, decisionStyle, cuisinePopularity),
        decisionStyle,
      };
    })
    .filter((restaurant) => !restaurant.blocked)
    .sort((a, b) => b.score - a.score);
}
