// Scorecard.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Container, Paper, Typography, Grid, 
  Avatar, LinearProgress, Box, Chip 
} from "@mui/material";
import Loader from "./Loader";
import Toaster from "./Toaster";

const Scorecard = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.cricapi.com/v1/matchScore?apikey=d59eacb8-2315-4627-87ab-b3bc53757263&id=${matchId}`
        );
        if (response.data.status === "success") setMatch(response.data.data);
        else setError("Match details not found");
      } catch (err) {
        setError("Failed to load match details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [matchId]);

  if (loading) return <Loader />;

  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      {error && <Toaster open={true} message={error} severity="error" />}
      
      {match && (
        <Paper sx={{ padding: 3, marginTop: 2 }}>
          <Typography variant="h4" gutterBottom>
            {match.name}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Chip
                label={match.status}
                color={match.matchStarted ? "primary" : "secondary"}
                sx={{ fontSize: "1.1rem", padding: 1.5 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Teams
              </Typography>
              {match.teams.map((team) => (
                <Box key={team} display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{ width: 56, height: 56, mr: 2 }}
                    src={`https://flagcdn.com/${team.toLowerCase()}.svg`}
                  >
                    {team[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="h6">{team}</Typography>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Match Details
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ color: "#4caf50", mr: 1 }}>🏟️</Typography>
                  <Typography>{match.venue}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ color: "#f50057", mr: 1 }}>📅</Typography>
                  <Typography>
                    {new Date(match.date).toLocaleDateString('en-GB')}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {match.score && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Scorecard
                </Typography>
                <Box sx={{ background: "#f5f5f5", borderRadius: 2, p: 2 }}>
                  {match.score.map((inning, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="subtitle1">
                        {inning.inning}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(inning.r / 200) * 100}
                        sx={{ height: 8, mb: 1 }}
                      />
                      <Typography>
                        {inning.r}/{inning.w} ({inning.o} overs)
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default Scorecard;