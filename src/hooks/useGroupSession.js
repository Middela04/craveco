import { useEffect, useRef, useState } from "react";

import { rankRestaurants } from "../lib/scoring";
import { loadGroup, makeCode, saveGroup } from "../services/groupStorage";

function toggleValue(items, value) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

function buildEmptyMember(name) {
  return { name, vibes: [], cuisines: [], hard: [], hardMaxWait: "", prices: [], distance: "", decisionStyle: "", dietaryNeeds: [], submitted: false };
}

export function useGroupSession({ restaurants, routeName, onGoHome, onGoPreferences, onGoWaiting, onGoMatches }) {
  const [myName, setMyName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const [myVibes, setMyVibes] = useState([]);
  const [myCuisines, setMyCuisines] = useState([]);
  const [myHard, setMyHard] = useState([]);
  const [myHardMaxWait, setMyHardMaxWait] = useState("");
  const [myPrice, setMyPrice] = useState([]);
  const [myDistance, setMyDistance] = useState("");
  const [myDecisionStyle, setMyDecisionStyle] = useState("");
  const [myDietaryNeeds, setMyDietaryNeeds] = useState([]);
  const [members, setMembers] = useState([]);
  const [results, setResults] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [dataErr, setDataErr] = useState("");
  const pollRef = useRef(null);

  useEffect(() => {
    if (routeName !== "waiting" || !activeCode) return undefined;

    pollRef.current = setInterval(() => {
      const latest = loadGroup(activeCode);
      if (latest) setMembers(latest);
    }, 3000);

    return () => clearInterval(pollRef.current);
  }, [routeName, activeCode]);

  useEffect(() => {
    if (routeName === "detail" || routeName === "bill") return;
    setShowBook(false);
  }, [routeName]);

  const submittedCount = members.filter((member) => member.submitted).length;
  const totalCount = members.length;

  const startGroup = () => {
    const trimmedName = myName.trim();
    if (!trimmedName) return;

    setLoading(true);
    const code = makeCode();
    const me = buildEmptyMember(trimmedName);

    saveGroup(code, [me]);
    setActiveCode(code);
    setMembers([me]);
    setLoading(false);
    onGoPreferences();
  };

  const joinGroup = () => {
    const trimmedName = myName.trim();
    const trimmedCode = joinCode.trim().toUpperCase();

    if (!trimmedName || !trimmedCode) {
      setErr("Enter your name and a group code.");
      return;
    }

    setErr("Looking up group...");
    setLoading(true);
    const existing = loadGroup(trimmedCode);

    if (!existing) {
      setErr("Group not found. Make sure the creator started the group first, then try again.");
      setLoading(false);
      return;
    }

    const alreadyJoined = existing.find((member) => member.name.toLowerCase() === trimmedName.toLowerCase());
    const updatedMembers = alreadyJoined ? existing : [...existing, buildEmptyMember(trimmedName)];

    saveGroup(trimmedCode, updatedMembers);
    setMembers(updatedMembers);
    setActiveCode(trimmedCode);
    setErr("");
    setLoading(false);
    onGoPreferences();
  };

  const submitPreferences = () => {
    const me = {
      name: myName,
      vibes: myVibes,
      cuisines: myCuisines,
      hard: myHard,
      hardMaxWait: myHardMaxWait,
      prices: myPrice,
      distance: myDistance,
      decisionStyle: myDecisionStyle,
      dietaryNeeds: myDietaryNeeds,
      submitted: true,
    };
    const latest = loadGroup(activeCode) || members;
    let updatedMembers = latest.map((member) => (member.name.toLowerCase() === myName.toLowerCase() ? me : member));

    if (!updatedMembers.find((member) => member.name.toLowerCase() === myName.toLowerCase())) {
      updatedMembers = [...updatedMembers, me];
    }

    saveGroup(activeCode, updatedMembers);
    setMembers(updatedMembers);
    onGoWaiting();
  };

  const getResults = () => {
    if (!restaurants.length) {
      setDataErr("Restaurant data is still loading.");
      return;
    }

    const submittedMembers = members.filter((member) => member.submitted);
    const baseMembers = submittedMembers.length > 0 ? submittedMembers : members;
    const scored = rankRestaurants(restaurants, baseMembers).slice(0, 10);

    setResults(scored);
    onGoMatches();
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(activeCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetApp = () => {
    setMyName("");
    setJoinCode("");
    setActiveCode("");
    setMyVibes([]);
    setMyCuisines([]);
    setMyHard([]);
    setMyHardMaxWait("");
    setMyPrice([]);
    setMyDistance("");
    setMyDecisionStyle("");
    setMyDietaryNeeds([]);
    setMembers([]);
    setResults([]);
    setShowBook(false);
    setErr("");
    setCopied(false);
    setLoading(false);
    setDataErr("");
    onGoHome();
  };

  return {
    myName,
    joinCode,
    activeCode,
    myVibes,
    myCuisines,
    myHard,
    myHardMaxWait,
    myPrice,
    myDistance,
    myDecisionStyle,
    myDietaryNeeds,
    members,
    results,
    showBook,
    loading,
    err,
    copied,
    dataErr,
    submittedCount,
    totalCount,
    setMyName,
    setJoinCode: (value) => {
      setJoinCode(value.toUpperCase().replace(/[^A-Z0-9-]/g, ""));
      setErr("");
    },
    setDataErr,
    toggleHard: (value) =>
      setMyHard((current) => {
        const updated = toggleValue(current, value);
        if (value === "Wait under" && !updated.includes("Wait under")) {
          setMyHardMaxWait("");
        }
        return updated;
      }),
    setMyHardMaxWait: (value) => setMyHardMaxWait(value.replace(/[^\d]/g, "")),
    togglePrice: (value) => setMyPrice((current) => toggleValue(current, value)),
    toggleDistance: (value) => setMyDistance((current) => (current === value ? "" : value)),
    setMyDecisionStyle: (value) => setMyDecisionStyle((current) => (current === value ? "" : value)),
    toggleDietaryNeed: (value) => setMyDietaryNeeds((current) => toggleValue(current, value)),
    toggleVibe: (value) => setMyVibes((current) => toggleValue(current, value)),
    toggleCuisine: (value) => setMyCuisines((current) => toggleValue(current, value)),
    setShowBook,
    startGroup,
    joinGroup,
    submitPreferences,
    getResults,
    copyCode,
    resetApp,
  };
}
