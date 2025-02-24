// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // For navigation
// import Loader from "./Loader";
// import Toaster from "./Toaster";
// import { 
//   Paper, 
//   Typography, 
//   Grid, 
//   Avatar, 
//   useTheme,
//   Box,
//   keyframes
// } from "@mui/material";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// // Function to get country-specific colors
// const getCountryColor = (country) => {
//   // switch (country) {
//   //   case "India":
//   //     return "#FF9933"; // Saffron
//   //   case "Australia":
//   //     return "#00008B"; // Dark Blue
//   //   case "England":
//   //     return "#CE1124"; // Red
//   //   case "South Africa":
//   //     return "#007A4D"; // Green
//   //   case "New Zealand":
//   //     return "#000000"; // Black
//   //   case "Pakistan":
//   //     return "#006600"; // Green
//   //   case "Sri Lanka":
//   //     return "#FFBE29"; // Yellow
//   //   case "West Indies":
//   //     return "#7B004F"; // Maroon
//   //   default:
//   //     return "#808080"; // Gray for other countries
//   // }
//   switch (country) {
//     case "India":
//       return "#1D6FB6"; // Sky Blue
//     case "Australia":
//       return "#FFBE29"; // Yellow
//     case "England":
//       return "#CE1124"; // Red
//     case "South Africa":
//       return "#007A4D"; // Green
//     case "New Zealand":
//       return "#000000"; // Black
//     case "Pakistan":
//       return "#006600"; // Green
//     case "Sri Lanka":
//       return "#0A3D91"; // Dark Blue
//     case "West Indies":
//       return "#7B004F"; // Maroon
//     case "Bangladesh":
//       return "#126800"; // Dark Green
//     case "Afghanistan":
//       return "#0085CA"; // Light Blue
//     case "Zimbabwe":
//       return "#DA291C"; // Bright Red
//     case "Ireland":
//       return "#009A44"; // Bright Green
//     default:
//       return "#808080"; // Gray for unknown countries
// }
// };

// // Function to get test player badge color
// const getTestPlayerColor = (isTestPlayer) => {
//   return isTestPlayer ? "#D4AF37" : "#808080"; // Gold for test players, gray for others
// };

// const PlayerProfiles = () => {
//   const theme = useTheme();
//   const navigate = useNavigate(); // For navigation
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.cricapi.com/v1/players?apikey=d59eacb8-2315-4627-87ab-b3bc53757263&offset=0"
//         );
//         setPlayers(response.data.data);
//       } catch (error) {
//         setError("Failed to fetch player profiles. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlayers();
//   }, []);

//   // Handle card click to navigate to player details
//   const handlePlayerClick = (playerId) => {
//     navigate(`/player/${playerId}`); // Navigate to player details page
//   };

//   if (loading) return <Loader />;

//   return (
//     <Box
//       sx={{
//         padding: 2, // Reduced padding
//         minHeight: "100vh",
//         background: theme.palette.mode === 'dark' 
//           ? 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)'
//           : 'linear-gradient(45deg, #f5f7fa 30%, #c3cfe2 90%)',
//       }}
//     >
//       <Typography 
//         variant="h5" // Smaller header
//         gutterBottom 
//         sx={{ 
//           textAlign: 'center',
//           color: theme.palette.text.primary,
//           mb: 1, // Reduced margin
//           fontWeight: 'bold',
//           textTransform: 'uppercase',
//           letterSpacing: 1
//         }}
//       >
//         Player Profiles
//       </Typography>
      
//       {error && <Toaster open={true} message={error} severity="error" />}

//       <Grid container spacing={2} justifyContent="center"> {/* Reduced spacing */}
//         {players.map((player, index) => {
//           const countryColor = getCountryColor(player.country); // Get country-specific color
//           const testPlayerColor = getTestPlayerColor(player.isTestPlayer); // Get test player badge color

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
//               <Paper
//                 elevation={4}
//                 onClick={() => handlePlayerClick(player.id)} // Navigate on click
//                 sx={{
//                   p: 1, // Reduced padding
//                   borderRadius: 2, // Smaller border radius
//                   animation: `${fadeIn} 0.5s ease-out forwards`,
//                   animationDelay: `${index * 0.1}s`,
//                   opacity: 0,
//                   transform: 'translateY(20px)',
//                   background: theme.palette.mode === 'dark'
//                     ? `linear-gradient(45deg, ${countryColor} 30%, #000000 90%)`
//                     : `linear-gradient(45deg, ${countryColor} 30%, #FFFFFF 90%)`,
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   cursor: 'pointer', // Add pointer cursor
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: theme.shadows[6]
//                   },
//                 }}
//               >
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 2 // Space between avatar and text
//                   }}
//                 >
//                   <Avatar
//                     alt={player.name}
//                     src={player.imageUrl || `https://ui-avatars.com/api/?name=${player.name}&size=200`}
//                     sx={{ 
//                       width: 60, // Smaller avatar
//                       height: 60, 
//                       border: `2px solid ${testPlayerColor}`, // Border color based on test player status
//                       boxShadow: theme.shadows[2] // Smaller shadow
//                     }}
//                   />
//                   <Box sx={{ flex: 1, minWidth: 0 }}> {/* Ensure text truncation works */}
//                     <Typography 
//                       variant="subtitle1" // Smaller text
//                       sx={{ 
//                         fontWeight: 'bold',
//                         color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
//                         whiteSpace: 'nowrap', // Prevent text wrapping
//                         overflow: 'hidden', // Hide overflow
//                         textOverflow: 'ellipsis', // Add ellipsis
//                         maxWidth: '150px' // Truncate after 20 characters
//                       }}
//                     >
//                       {player.name}
//                     </Typography>
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
//                         whiteSpace: 'nowrap', // Prevent text wrapping
//                         overflow: 'hidden', // Hide overflow
//                         textOverflow: 'ellipsis', // Add ellipsis
//                         maxWidth: '150px' // Truncate after 20 characters
//                       }}
//                     >
//                       {player.role}
//                     </Typography>
//                     <Typography 
//                       variant="caption" 
//                       sx={{ 
//                         color: testPlayerColor, // Color based on test player status
//                         fontWeight: 'bold',
//                         fontStyle: 'italic'
//                       }}
//                     >
//                       {player.isTestPlayer ? "Test Player" : "Non-Test Player"}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default PlayerProfiles;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // For navigation
// import Loader from "./Loader";
// import Toaster from "./Toaster";
// import GoogleAdSense from "./GoogleAds"; 
// import { 
//   Paper, 
//   Typography, 
//   Grid, 
//   Avatar, 
//   useTheme,
//   Box,
//   keyframes
// } from "@mui/material";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// // Function to get country-specific colors
// const getCountryColor = (country) => {
//   switch (country) {
//     case "India":
//       return "#1D6FB6"; // Sky Blue
//     case "Australia":
//       return "#FFBE29"; // Yellow
//     case "England":
//       return "#CE1124"; // Red
//     case "South Africa":
//       return "#007A4D"; // Green
//     case "New Zealand":
//       return "#000000"; // Black
//     case "Pakistan":
//       return "#006600"; // Green
//     case "Sri Lanka":
//       return "#0A3D91"; // Dark Blue
//     case "West Indies":
//       return "#7B004F"; // Maroon
//     case "Bangladesh":
//       return "#126800"; // Dark Green
//     case "Afghanistan":
//       return "#0085CA"; // Light Blue
//     case "Zimbabwe":
//       return "#DA291C"; // Bright Red
//     case "Ireland":
//       return "#009A44"; // Bright Green
//     default:
//       return "#808080"; // Gray for unknown countries
//   }
// };

// // Function to get test player badge color
// const getTestPlayerColor = (isTestPlayer) => {
//   return isTestPlayer ? "#D4AF37" : "#808080"; // Gold for test players, gray for others
// };

// const PlayerProfiles = () => {
//   const theme = useTheme();
//   const navigate = useNavigate(); // For navigation
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.cricapi.com/v2/players?apikey="
//         );
//         // const response = await axios.get(
//         //   "https://api.cricapi.com/v1/players?apikey=d59eacb8-2315-4627-87ab-b3bc53757263&offset=0"
//         // );
//         setPlayers(response.data.data);
//       } catch (error) {
//         setError("Failed to fetch player profiles. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlayers();
//   }, []);

//   // Handle card click to navigate to player details
//   const handlePlayerClick = (playerId) => {
//     navigate(`/player/${playerId}`); // Navigate to player details page
//   };

//   if (loading) return <Loader />;

//   return (
//     <Box
//       sx={{
//         padding: 2, // Reduced padding
//         minHeight: "100vh",
//         background: theme.palette.mode === 'dark' 
//           ? 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)'
//           : 'linear-gradient(45deg, #f5f7fa 30%, #c3cfe2 90%)',
//       }}
//     >
//       <Typography 
//         variant="h5" // Smaller header
//         gutterBottom 
//         sx={{ 
//           textAlign: 'center',
//           color: theme.palette.text.primary,
//           mb: 1, // Reduced margin
//           fontWeight: 'bold',
//           textTransform: 'uppercase',
//           letterSpacing: 1
//         }}
//       >
//         Player Profiles
//       </Typography>
      
//       {error && (
//         <>
//           <Toaster open={true} message={error} severity="error" />
//           {/* Render Google AdSense when there's an error */}
//           <Box sx={{ mt: 4, textAlign: 'center' }}>
//           <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
//           </Box>
//         </>
//       )}

//       {players.length === 0 && !error && (
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             textAlign: 'center',
//             minHeight: '60vh',
//             background: theme.palette.mode === 'dark' 
//               ? 'rgba(0, 0, 0, 0.7)' 
//               : 'rgba(255, 255, 255, 0.9)',
//             borderRadius: 2,
//             padding: 2,
//             boxShadow: theme.shadows[2],
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
//             🏏 No Player Profiles Found
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
//             It looks like there are no player profiles available right now. Please check back later!
//           </Typography>
//           {/* Render Google AdSense when there are no players */}
//           <Box sx={{ mt: 4 }}>
//             <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
//           </Box>
//         </Box>
//       )}

//       <Grid container spacing={2} justifyContent="center"> {/* Reduced spacing */}
//         {players.map((player, index) => {
//           const countryColor = getCountryColor(player.country); // Get country-specific color
//           const testPlayerColor = getTestPlayerColor(player.isTestPlayer); // Get test player badge color

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
//               <Paper
//                 elevation={4}
//                 onClick={() => handlePlayerClick(player.id)} // Navigate on click
//                 sx={{
//                   p: 1, // Reduced padding
//                   borderRadius: 2, // Smaller border radius
//                   animation: `${fadeIn} 0.5s ease-out forwards`,
//                   animationDelay: `${index * 0.1}s`,
//                   opacity: 0,
//                   transform: 'translateY(20px)',
//                   background: theme.palette.mode === 'dark'
//                     ? `linear-gradient(45deg, ${countryColor} 30%, #000000 90%)`
//                     : `linear-gradient(45deg, ${countryColor} 30%, #FFFFFF 90%)`,
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   cursor: 'pointer', // Add pointer cursor
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: theme.shadows[6]
//                   },
//                 }}
//               >
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 2 // Space between avatar and text
//                   }}
//                 >
//                   <Avatar
//                     alt={player.name}
//                     src={player.imageUrl || `https://ui-avatars.com/api/?name=${player.name}&size=200`}
//                     sx={{ 
//                       width: 60, // Smaller avatar
//                       height: 60, 
//                       border: `2px solid ${testPlayerColor}`, // Border color based on test player status
//                       boxShadow: theme.shadows[2] // Smaller shadow
//                     }}
//                   />
//                   <Box sx={{ flex: 1, minWidth: 0 }}> {/* Ensure text truncation works */}
//                     <Typography 
//                       variant="subtitle1" // Smaller text
//                       sx={{ 
//                         fontWeight: 'bold',
//                         color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
//                         whiteSpace: 'nowrap', // Prevent text wrapping
//                         overflow: 'hidden', // Hide overflow
//                         textOverflow: 'ellipsis', // Add ellipsis
//                         maxWidth: '150px' // Truncate after 20 characters
//                       }}
//                     >
//                       {player.name}
//                     </Typography>
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
//                         whiteSpace: 'nowrap', // Prevent text wrapping
//                         overflow: 'hidden', // Hide overflow
//                         textOverflow: 'ellipsis', // Add ellipsis
//                         maxWidth: '150px' // Truncate after 20 characters
//                       }}
//                     >
//                       {player.role}
//                     </Typography>
//                     <Typography 
//                       variant="caption" 
//                       sx={{ 
//                         color: testPlayerColor, // Color based on test player status
//                         fontWeight: 'bold',
//                         fontStyle: 'italic'
//                       }}
//                     >
//                       {player.isTestPlayer ? "Test Player" : "Non-Test Player"}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default PlayerProfiles;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Toaster from "./Toaster";
import GoogleAdSense from "./GoogleAds";
import { 
  Paper, 
  Typography, 
  Grid, 
  Avatar, 
  useTheme,
  Box,
  keyframes
} from "@mui/material";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const getCountryColor = (country) => {
  const colors = {
    India: "#1D6FB6",
    Australia: "#FFBE29",
    England: "#CE1124",
    "South Africa": "#007A4D",
    "New Zealand": "#000000",
    Pakistan: "#006600",
    "Sri Lanka": "#0A3D91",
    "West Indies": "#7B004F",
    Bangladesh: "#126800",
    Afghanistan: "#0085CA",
    Zimbabwe: "#DA291C",
    Ireland: "#009A44",
  };
  return colors[country] || "#808080"; // Default gray
};

const getTestPlayerColor = (isTestPlayer) => (isTestPlayer ? "#D4AF37" : "#808080");

const PlayerProfiles = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("https://api.cricapi.com/v2/players?apikey=");
        setPlayers(response.data.data);
      } catch (error) {
        setError("Failed to fetch player profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handlePlayerClick = (playerId) => navigate(`/player/${playerId}`);

  if (loading) return <Loader />;

  return (
    <Box
      sx={{
        padding: 2,
        minHeight: "100vh",
        background: theme.palette.mode === "dark"
          ? "linear-gradient(45deg, #2c3e50 30%, #3498db 90%)"
          : "linear-gradient(45deg, #f5f7fa 30%, #c3cfe2 90%)",
      }}
    >
      {/* Title */}
      <Typography 
        variant="h5"
        gutterBottom
        sx={{ 
          textAlign: "center",
          color: theme.palette.text.primary,
          mb: 2, 
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 1
        }}
      >
        Player Profiles
      </Typography>

      {/* Error & Empty Data UI at the Top */}
      {(error || players.length === 0) && (
        <Box
          sx={{
            textAlign: "center",
            borderRadius: 2,
            padding: 3,
            background: theme.palette.mode === "dark" 
              ? "rgba(0, 0, 0, 0.7)" 
              : "rgba(255, 255, 255, 0.9)",
            boxShadow: theme.shadows[3],
            mb: 4,
          }}
        >
          {error ? (
            <>
              {/* <Toaster open={true} message={error} severity="error" /> */}
              <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
                ⚠️ Error Loading Player Data
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                🏏 No Player Profiles Found
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                It looks like there are no player profiles available right now. Please check back later!
              </Typography>
            </>
          )}

          {/* Google AdSense */}
          <Box sx={{ mt: 3 }}>
            <GoogleAdSense adSlot="YOUR_AD_SLOT_ID" />
          </Box>
        </Box>
      )}

      {/* Player Cards */}
      {players.length > 0 && (
        <Grid container spacing={2} justifyContent="center">
          {players.map((player, index) => {
            const countryColor = getCountryColor(player.country);
            const testPlayerColor = getTestPlayerColor(player.isTestPlayer);

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
                <Paper
                  elevation={4}
                  onClick={() => handlePlayerClick(player.id)}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    animation: `${fadeIn} 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    transform: "translateY(20px)",
                    background: theme.palette.mode === "dark"
                      ? `linear-gradient(45deg, ${countryColor} 30%, #000000 90%)`
                      : `linear-gradient(45deg, ${countryColor} 30%, #FFFFFF 90%)`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      alt={player.name}
                      src={player.imageUrl || `https://ui-avatars.com/api/?name=${player.name}&size=200`}
                      sx={{
                        width: 60,
                        height: 60,
                        border: `2px solid ${testPlayerColor}`,
                        boxShadow: theme.shadows[2],
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {player.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                      >
                        {player.role}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: testPlayerColor,
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {player.isTestPlayer ? "Test Player" : "Non-Test Player"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default PlayerProfiles;
