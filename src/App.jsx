import { Routes, Route, Navigate } from "react-router-dom";
import UpcomingMatches from "./pages/UpcomingMatches";
import PickPlayers from "./pages/PickPlayers";
import MyTeams from "./pages/MyTeams";
import PickCaptain from "./pages/PickCaptain";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<UpcomingMatches />} />
          <Route
            path="/matches/:matchId/pick-players"
            element={<PickPlayers />}
          />
          <Route path="/matches/:matchId/my-teams" element={<MyTeams />} />
          <Route
            path="/matches/:matchId/pick-captain"
            element={<PickCaptain />}
          />
        </Routes>
      </main>
    </div>
  );
}
