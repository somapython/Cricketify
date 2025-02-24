import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Toaster from "./Toaster";
import { 
  Paper, Typography, Avatar, useTheme, 
  Box, Button, List, ListItem, ListItemText 
} from "@mui/material";

const PlayerDetails = () => {
  const theme = useTheme();
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.cricapi.com/v1/players_info?apikey=d59eacb8-2315-4627-87ab-b3bc53757263&id=${playerId}`
        );
        setPlayer(response.data.data);
      } catch (error) {
        setError("Failed to fetch player details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  if (loading) return <Loader />;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
  };

  return (
    <Box
      sx={{
        padding: "10px",
        minHeight: "100vh",
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)'
          : 'linear-gradient(45deg, #f5f7fa 30%, #c3cfe2 90%)',
      }}
    >
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}
        sx={{ mb: 1, fontSize: "14px", padding: "5px 10px" }}
      >
        Back
      </Button>

      {error && <Toaster open={true} message={error} severity="error" />}

      {player && (
        <Paper
          elevation={3}
          sx={{
            padding: "10px",
            borderRadius: "5px",
            background: theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
            <Avatar
              alt={player.name}
              src={player.imageUrl || `https://ui-avatars.com/api/?name=${player.name}&size=200`}
              sx={{ 
                width: 60, 
                height: 60, 
                mr: 2,
                border: `2px solid ${theme.palette.primary.main}`
              }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }}
            >
              {player.name}
            </Typography>
          </Box>

          <List dense>
            <ListItem sx={{ padding: "4px 0" }}>
              <ListItemText primary="Role" secondary={player.role} />
            </ListItem>
            <ListItem sx={{ padding: "4px 0" }}>
              <ListItemText primary="Batting Style" secondary={player.battingStyle} />
            </ListItem>
            <ListItem sx={{ padding: "4px 0" }}>
              <ListItemText primary="Bowling Style" secondary={player.bowlingStyle} />
            </ListItem>
            <ListItem sx={{ padding: "4px 0" }}>
            <ListItemText primary="Date of Birth" secondary={formatDate(player.dateOfBirth)} />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default PlayerDetails;
