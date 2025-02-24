import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Container, Paper, Typography, Grid, Chip, 
  Avatar, Box, Button 
} from "@mui/material";
import { styled } from "@mui/system";
import Loader from "./Loader";
import Toaster from "./Toaster";
import GoogleAdSense from "./GoogleAds"; 

const MatchCard = styled(Paper)(({ theme }) => ({
  padding: "12px",
  margin: "8px 0",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "transform 0.2s",
  '&:hover': {
    transform: "translateY(-2px)"
  }
}));

const FlagAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  margin: "4px",
  "& img": {
    objectFit: "cover"
  }
});

// const AdComponent = () => {
//   useEffect(() => {
//     if (window.adsbygoogle) {
//       window.adsbygoogle.push({});
//     }
//   }, []);

//   return (
//     <Box sx={{ marginTop: 4, textAlign: 'center', py: 2 }}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: 'block' }}
//         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
//         data-ad-slot="XXXXXXXXXX" // Replace with your ad slot ID
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       ></ins>
//     </Box>
//   );
// };

const LiveScores = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
         //const response = await axios.get("https://api.cricapi.com/v1/currentMatches?apikey=d59eacb8-2315-4627-87ab-b3bc53757263");
       const response = await axios.get("https://api.cricapi.com/v5/currentMatches?");
        if (response.data.status === "success") setMatches(response.data.data);
        else setError("No live matches found");
      } catch (err) {
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCountryCode = (team) => ({
    "Oman": "om",
    "United States of America": "us",
    "Bangladesh": "bd",
    "India": "in",
    "Australia": "au",
    "England": "gb",
    "Pakistan": "pk",
    "South Africa": "za",
    "New Zealand": "nz",
    "Sri Lanka": "lk",
    "West Indies": "wi",
    "Afghanistan": "af"
  }[team] || "unknown");

  const handleCardClick = (matchId) => {
    navigate(`/scorecard/${matchId}`);
  };

  if (loading) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ 
      background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
      minHeight: "100vh",
      padding: "16px"
    }}>
      <Typography variant="h5" sx={{ 
        color: "white", 
        textAlign: "left",
        mb: 2,
        fontWeight: "bold",
        fontSize: "1.5rem"
      }}>
        Live Scores ⚡
      </Typography>

      {error ? (
        <Box sx={{ 
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center"
        }}>
          <Typography variant="h6" sx={{ color: "#d32f2f", mb: 2 }}>
            Error: {error}
          </Typography>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Box>
      ) : matches.length > 0 ? (
        matches.map((match) => (
          <MatchCard key={match.id} onClick={() => handleCardClick(match.id)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  {match.teams.map((team) => {
                    const countryCode = getCountryCode(team);
                    return (
                      <Box key={team} display="flex" alignItems="center" mb={1}>
                        {countryCode !== "unknown" ? (
                          <FlagAvatar
                            src={`https://flagcdn.com/${countryCode}.svg`}
                            onError={(e) => {
                              e.target.src = "";
                              e.target.alt = "";
                            }}
                          />
                        ) : (
                          <FlagAvatar sx={{ bgcolor: "#1a237e" }}>
                            {team[0].toUpperCase()}
                          </FlagAvatar>
                        )}
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600, 
                          ml: 1,
                          fontSize: "0.95rem"
                        }}>
                          {team}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Chip
                  label={match.status}
                  color={match.matchStarted ? "primary" : "secondary"}
                  sx={{ 
                    width: "100%", 
                    fontWeight: "bold",
                    fontSize: "0.8rem"
                  }}
                />
              </Grid>

              {match.score && (
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: 500,
                    fontSize: "0.9rem"
                  }}>
                    {match.score[0].r}/{match.score[0].w} ({match.score[0].o} overs)
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box display="flex" flexDirection="column" gap={0.5} mt={1}>
                  <Typography variant="caption" sx={{ 
                    color: "#616161",
                    fontSize: "0.75rem",
                    textAlign: "left",
                  }}>
                    🏟️ {match.venue}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: "#616161",
                    fontSize: "0.75rem",
                    textAlign: "left",
                  }}>
                    📅 {new Date(match.date).toLocaleDateString('en-GB')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MatchCard>
        ))
      ) : (
        <Box sx={{ 
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center"
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#1a237e" }}>
            No Live Matches Available
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#616161" }}>
             It looks like there are no live matches right now. Please check back later!
           </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ fontWeight: "bold" }}
          >
            Refresh
          </Button>
        </Box>
      )}

      {/* Google AdSense */}
      {/* <AdComponent /> */}
      <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
    </Container>
  );
};

export default LiveScores;