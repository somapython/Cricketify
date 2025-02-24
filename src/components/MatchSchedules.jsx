// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Container, Paper, Typography, Grid, Chip, 
//   CircularProgress, Avatar, LinearProgress, Box 
// } from "@mui/material";
// import { styled } from "@mui/system";
// import Loader from "./Loader";
// import Toaster from "./Toaster";
// import { useNavigate } from "react-router-dom";

// // Styled Components
// const MatchCard = styled(Paper)(({ theme }) => ({
//   padding: "16px",
//   margin: "10px 0",
//   borderRadius: "12px",
//   background: "rgba(255, 255, 255, 0.9)",
//   backdropFilter: "blur(5px)",
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   cursor: "pointer",
// }));

// const FlagAvatar = styled(Avatar)({
//   width: "40px",
//   height: "40px",
//   objectFit: "contain",
//   marginRight: "10px",
// });

// const MatchSchedules = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get("https://api.cricapi.com/v1/matches?apikey=d59eacb8-2315-4627-87ab-b3bc53757263");
        
//         if (response.data.status === "success" && response.data.data.length > 0) {
//           setMatches(response.data.data);
//         } else {
//           setError("No match schedules found.");
//         }
//       } catch (error) {
//         setError("Failed to fetch match schedules. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMatches();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB"); // Formats to dd-mm-yyyy
//   };

//   if (loading) return <Loader />;

//   return (
//     <Container maxWidth="sm" sx={{ 
//       background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
//       minHeight: "100vh",
//       padding: "15px",
//     }}>
//       <Typography variant="h5" sx={{ 
//         color: "white", 
//         textAlign: "center",
//         mb: 2,
//         fontWeight: "bold",
//         textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//       }}>
//         Match Schedules 📅
//       </Typography>

//       {error && <Toaster open={true} message={error} severity="error" />}

//       {matches.map((match) => (
//         <MatchCard key={match.id} onClick={() => navigate(`/scorecard/${match.id}`)}>
//           <Grid container spacing={2} direction="column">
//             {/* Teams & Flags */}
//             {match.teams.map((team, index) => (
//               <Grid item key={team}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <FlagAvatar src={`https://flagcdn.com/w320/${team.toLowerCase().slice(0, 2)}.png`} alt={team} />
//                   <Typography 
//                     variant="subtitle1" 
//                     sx={{ 
//                       fontWeight: 600, 
//                       color: "#1a237e",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       maxWidth: "200px", // Adjust as needed
//                     }}
//                   >
//                     {team}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}

//             {/* Match Status */}
//             <Grid item>
//               <Chip
//                 label={match.status}
//                 color={match.matchStarted ? "primary" : "secondary"}
//                 sx={{ fontWeight: "bold" }}
//               />
//             </Grid>

//             {/* Venue & Date */}
//             <Grid item>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: "#d32f2f", 
//                   fontWeight: "bold",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 🏟️ {match.venue}
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: "#388e3c", 
//                   fontWeight: "bold",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 📅 {formatDate(match.date)}
//               </Typography>
//             </Grid>

//             {/* Result (if available) */}
//             {match.result && (
//               <Grid item>
//                 <Typography 
//                   variant="caption" 
//                   sx={{ 
//                     color: "#6a1b9a", 
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   🏆 {match.result}
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </MatchCard>
//       ))}
//     </Container>
//   );
// };

// export default MatchSchedules;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Container, Paper, Typography, Grid, Chip, 
//   Avatar, Box, CircularProgress, Button 
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";

// // Styled Components
// const MatchCard = styled(Paper)({
//   padding: "16px",
//   margin: "12px 0",
//   borderRadius: "12px",
//   background: "rgba(255, 255, 255, 0.9)",
//   backdropFilter: "blur(6px)",
//   boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
//   cursor: "pointer",
//   transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
//   "&:hover": {
//     transform: "scale(1.02)",
//     boxShadow: "0 8px 14px rgba(0, 0, 0, 0.2)",
//   },
// });

// const FlagAvatar = styled(Avatar)({
//   width: "40px",
//   height: "40px",
//   objectFit: "contain",
//   marginRight: "10px",
// });

// const MatchSchedules = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchMatches = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get("https://api.cricapi.com/v1/matches?apikey=d59eacb8-2315-4627-87ab-b3bc53757263");

//       if (response.data.status === "success" && response.data.data.length > 0) {
//         setMatches(response.data.data);
//       } else {
//         setMatches([]);
//       }
//     } catch (error) {
//       setError("Failed to fetch match schedules. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB"); // Formats to dd-mm-yyyy
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="sm" sx={{
//         background: "linear-gradient(135deg, #ff8a00, #da1b60)",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         textAlign: "center",
//       }}>
//         <CircularProgress size={60} sx={{ color: "white" }} />
//         <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
//           Fetching Match Schedules... 🏏
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ 
//       background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
//       minHeight: "100vh",
//       padding: "15px",
//     }}>
//       <Typography variant="h5" sx={{ 
//         color: "white", 
//         textAlign: "center",
//         mb: 2,
//         fontWeight: "bold",
//         textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
//       }}>
//         Match Schedules 📅
//       </Typography>

//       {error && (
//         <Box textAlign="center">
//           <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
//             {error}
//           </Typography>
//           <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={fetchMatches}>
//             🔄 Try Again
//           </Button>
//         </Box>
//       )}

//       {matches.length === 0 && !error && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             minHeight: "60vh",
//             background: "rgba(255, 255, 255, 0.9)",
//             borderRadius: "12px",
//             padding: "20px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1a237e" }}>
//             🏏 No Match Schedules Found
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 3, color: "#616161" }}>
//             It looks like there are no match schedules available right now. Please check back later!
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={fetchMatches}
//             sx={{ fontWeight: "bold" }}
//           >
//             🔄 Refresh
//           </Button>
//         </Box>
//       )}

//       {matches.map((match) => (
//         <MatchCard key={match.id} onClick={() => navigate(`/scorecard/${match.id}`)}>
//           <Grid container spacing={2} direction="column">
//             {/* Teams & Flags */}
//             {match.teams.map((team, index) => (
//               <Grid item key={team}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <FlagAvatar src={`https://flagcdn.com/w320/${team.toLowerCase().slice(0, 2)}.png`} alt={team} />
//                   <Typography 
//                     variant="subtitle1" 
//                     sx={{ 
//                       fontWeight: 600, 
//                       color: "#0d47a1",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       maxWidth: "200px",
//                     }}
//                   >
//                     {team}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}

//             {/* Match Status */}
//             <Grid item>
//               <Chip
//                 label={match.status}
//                 color={match.matchStarted ? "primary" : "secondary"}
//                 sx={{ fontWeight: "bold" }}
//               />
//             </Grid>

//             {/* Venue & Date */}
//             <Grid item>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: "#ff1744", 
//                   fontWeight: "bold",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 🏟️ {match.venue}
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: "#00e676", 
//                   fontWeight: "bold",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 📅 {formatDate(match.date)}
//               </Typography>
//             </Grid>

//             {/* Result (if available) */}
//             {match.result && (
//               <Grid item>
//                 <Typography 
//                   variant="caption" 
//                   sx={{ 
//                     color: "#ff8a80", 
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   🏆 {match.result}
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </MatchCard>
//       ))}
//     </Container>
//   );
// };

// export default MatchSchedules;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Container, Paper, Typography, Grid, Chip, 
  Avatar, Box, CircularProgress, Button 
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import GoogleAdSense from "./GoogleAds"; // Import the GoogleAdSense component

// Styled Components
const MatchCard = styled(Paper)({
  padding: "16px",
  margin: "12px 0",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(6px)",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 14px rgba(0, 0, 0, 0.2)",
  },
});

const FlagAvatar = styled(Avatar)({
  width: "40px",
  height: "40px",
  objectFit: "contain",
  marginRight: "10px",
});

const MatchSchedules = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get("https://api.cricapi.com/v2/matches1?apikey=");

     // const response = await axios.get("https://api.cricapi.com/v1/matches?apikey=d59eacb8-2315-4627-87ab-b3bc53757263");

      if (response.data.status === "success" && response.data.data.length > 0) {
        setMatches(response.data.data);
      } else {
        setMatches([]);
      }
    } catch (error) {
      setError("Failed to fetch match schedules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats to dd-mm-yyyy
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{
        background: "linear-gradient(135deg, #ff8a00, #da1b60)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}>
        <CircularProgress size={60} sx={{ color: "white" }} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          Fetching Match Schedules... 🏏
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ 
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      minHeight: "100vh",
      padding: "15px",
    }}>
      <Typography variant="h5" sx={{ 
        color: "white", 
        textAlign: "center",
        mb: 2,
        fontWeight: "bold",
        textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
      }}>
        Match Schedules 📅
      </Typography>

      {error && (
        <Box textAlign="center">
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {error}
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={fetchMatches}>
            🔄 Try Again
          </Button>
          {/* Render Google AdSense when there's an error */}
          <Box sx={{ mt: 4 }}>
            <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
          </Box>
        </Box>
      )}

      {matches.length === 0 && !error && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: "60vh",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1a237e" }}>
            🏏 No Match Schedules Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#616161" }}>
            It looks like there are no match schedules available right now. Please check back later!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchMatches}
            sx={{ fontWeight: "bold" }}
          >
            🔄 Refresh
          </Button>
          {/* Render Google AdSense when there are no matches */}
          <Box sx={{ mt: 4 }}>
            <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
          </Box>
        </Box>
      )}

      {matches.map((match) => (
        <MatchCard key={match.id} onClick={() => navigate(`/scorecard/${match.id}`)}>
          <Grid container spacing={2} direction="column">
            {/* Teams & Flags */}
            {match.teams.map((team, index) => (
              <Grid item key={team}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FlagAvatar src={`https://flagcdn.com/w320/${team.toLowerCase().slice(0, 2)}.png`} alt={team} />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "#0d47a1",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                  >
                    {team}
                  </Typography>
                </Box>
              </Grid>
            ))}

            {/* Match Status */}
            <Grid item>
              <Chip
                label={match.status}
                color={match.matchStarted ? "primary" : "secondary"}
                sx={{ fontWeight: "bold" }}
              />
            </Grid>

            {/* Venue & Date */}
            <Grid item>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "#ff1744", 
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                🏟️ {match.venue}
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "#00e676", 
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                📅 {formatDate(match.date)}
              </Typography>
            </Grid>

            {/* Result (if available) */}
            {match.result && (
              <Grid item>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: "#ff8a80", 
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  🏆 {match.result}
                </Typography>
              </Grid>
            )}
          </Grid>
        </MatchCard>
      ))}
    </Container>
  );
};

export default MatchSchedules;