import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Typography, Button, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { SportsCricket, Schedule, People, Article } from "@mui/icons-material";
import LiveScores from "./components/LiveScores";
import MatchSchedules from "./components/MatchSchedules";
import PlayerProfiles from "./components/PlayerProfiles";
import PlayerDetails from "./components/PlayerDetails";
import CricketNews from "./components/CricketNews";
import Scorecard from "./components/Scorecard";

const App = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Router>
      <Container maxWidth="sm" style={{ textAlign: "center", backgroundColor: "#1e3a8a", color: "#fff", minHeight: "100vh", padding: "15px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", color: "#facc15" }}>
          Cricket App
        </Typography>
        <Routes>
          <Route path="/" element={<LiveScores />} />
          <Route path="/schedules" element={<MatchSchedules />} />
          <Route path="/scorecard/:matchId" element={<Scorecard />} />
          <Route path="/players" element={<PlayerProfiles />} />
          <Route path="/player/:playerId" element={<PlayerDetails />} />
          <Route path="/news" element={<CricketNews />} />
        </Routes>
        
        <Paper elevation={3} style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#2d3748" }}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            showLabels
            style={{ backgroundColor: "#2d3748", color: "#fff" }}
          >
            <BottomNavigationAction label="Scores" icon={<SportsCricket />} component={Link} to="/" style={{ color: value === 0 ? "#facc15" : "#fff" }} />
            <BottomNavigationAction label="Schedules" icon={<Schedule />} component={Link} to="/schedules" style={{ color: value === 1 ? "#facc15" : "#fff" }} />
            <BottomNavigationAction label="Players" icon={<People />} component={Link} to="/players" style={{ color: value === 2 ? "#facc15" : "#fff" }} />
            <BottomNavigationAction label="News" icon={<Article />} component={Link} to="/news" style={{ color: value === 3 ? "#facc15" : "#fff" }} />
          </BottomNavigation>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
