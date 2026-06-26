import React, { useEffect } from "react";

import { useGroupSession } from "./hooks/useGroupSession";
import { useHashRoute } from "./hooks/useHashRoute";
import { useRestaurants } from "./hooks/useRestaurants";
import HomePage from "./pages/HomePage";
import PreferencesPage from "./pages/PreferencesPage";
import WaitingPage from "./pages/WaitingPage";
import MatchesPage from "./pages/MatchesPage";
import DetailPage from "./pages/DetailPage";
import BillPage from "./pages/BillPage";

export default function CraveCo() {
  const { route, goHome, goPreferences, goWaiting, goMatches, goDetail, goBill } = useHashRoute();
  const { restaurants, dataErr: restaurantsDataErr } = useRestaurants();
  const {
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
    dataErr: sessionDataErr,
    submittedCount,
    totalCount,
    setMyName,
    setJoinCode,
    toggleHard,
    setMyHardMaxWait,
    togglePrice,
    toggleDistance,
    setMyDecisionStyle,
    toggleDietaryNeed,
    toggleVibe,
    toggleCuisine,
    setShowBook,
    startGroup,
    joinGroup,
    submitPreferences,
    getResults,
    copyCode,
    resetApp,
  } = useGroupSession({
    restaurants,
    routeName: route.name,
    onGoHome: goHome,
    onGoPreferences: goPreferences,
    onGoWaiting: goWaiting,
    onGoMatches: goMatches,
  });

  const selected = route.restaurantId
    ? results.find((restaurant) => restaurant.id === route.restaurantId) || null
    : null;
  const dataErr = restaurantsDataErr || sessionDataErr;

  useEffect(() => {
    if (route.name === "home") return;
    if ((route.name === "preferences" || route.name === "waiting") && !activeCode) goHome();
    if (route.name === "matches" && results.length === 0) goHome();
    if ((route.name === "detail" || route.name === "bill") && !selected) goMatches();
  }, [activeCode, results.length, route.name, selected]);

  if (dataErr && !restaurants.length && route.name !== "home") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "Georgia,serif" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: 8 }}>Data unavailable</h2>
          <p style={{ marginBottom: 16 }}>{dataErr}</p>
          <button onClick={goHome}>Back home</button>
        </div>
      </div>
    );
  }

  switch (route.name) {
    case "preferences":
      return (
        <PreferencesPage
          myName={myName}
          activeCode={activeCode}
          myHard={myHard}
          myHardMaxWait={myHardMaxWait}
          myPrice={myPrice}
          myDistance={myDistance}
          myDecisionStyle={myDecisionStyle}
          myDietaryNeeds={myDietaryNeeds}
          myVibes={myVibes}
          myCuisines={myCuisines}
          onToggleHard={toggleHard}
          onHardMaxWaitChange={setMyHardMaxWait}
          onTogglePrice={togglePrice}
          onToggleDistance={toggleDistance}
          onDecisionStyleChange={setMyDecisionStyle}
          onToggleDietaryNeed={toggleDietaryNeed}
          onToggleVibe={toggleVibe}
          onToggleCuisine={toggleCuisine}
          onSubmit={submitPreferences}
        />
      );
    case "waiting":
      return (
        <WaitingPage
          activeCode={activeCode}
          copied={copied}
          members={members}
          myName={myName}
          submittedCount={submittedCount}
          totalCount={totalCount}
          onCopyCode={copyCode}
          onSeeResults={getResults}
        />
      );
    case "matches":
      return (
        <MatchesPage
          results={results}
          submittedCount={submittedCount}
          totalCount={totalCount}
          onBack={goWaiting}
          onSelectRestaurant={(restaurantId) => {
            setShowBook(false);
            goDetail(restaurantId);
          }}
        />
      );
    case "detail":
      return (
        <DetailPage
          selected={selected}
          showBook={showBook}
          onBack={goMatches}
          onToggleBook={() => setShowBook((current) => !current)}
          onSplitBill={() => selected && goBill(selected.id)}
        />
      );
    case "bill":
      return (
        <BillPage
          selected={selected}
          members={members}
          myName={myName}
          onBack={() => selected && goDetail(selected.id)}
          onDone={resetApp}
        />
      );
    case "home":
    default:
      return (
        <HomePage
          myName={myName}
          joinCode={joinCode}
          loading={loading}
          err={err}
          onNameChange={setMyName}
          onJoinCodeChange={setJoinCode}
          onStartGroup={startGroup}
          onJoinGroup={joinGroup}
        />
      );
  }
}
