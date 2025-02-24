import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LiveScores from "./LiveScores";
import MatchSchedules from "./MatchSchedules";
import PlayerProfiles from "./PlayerProfiles";
import CricketNews from "./CricketNews";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Live Scores</Link>
        <Link to="/schedules">Match Schedules</Link>
        <Link to="/players">Player Profiles</Link>
        <Link to="/news">News</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LiveScores />} />
        <Route path="/schedules" element={<MatchSchedules />} />
        <Route path="/players" element={<PlayerProfiles />} />
        <Route path="/news" element={<CricketNews />} />
      </Routes>
    </Router>
  );
};

export default App;