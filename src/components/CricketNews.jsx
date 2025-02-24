import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Paper, Typography, Grid, Card, CardContent, CardMedia, 
  Container, Box, CircularProgress 
} from "@mui/material";
import { motion } from "framer-motion";
import Toaster from "./Toaster";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CricketNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org1/v4/everything?q=cricket&apikey="
        );
        // const response = await axios.get(
        //   "https://newsapi.org/v2/everything?q=cricket&apikey=d59eacb8-2315-4627-87ab-b3bc53757263"
        // );
        if (response.data.articles && response.data.articles.length > 0) {
          setNews(response.data.articles);
        } else {
          setError("No news available. Please try again later.");
        }
      } catch (err) {
        setError("Failed to fetch cricket news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container 
      maxWidth="md" 
      sx={{
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          color: "white", 
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)"
        }}
      >
        🏏 Cricket News
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="secondary" />
        </Box>
      )}

      {error && (
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center" 
          height="50vh"
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, color: "white", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {news.map((article, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card 
                  sx={{ 
                    background: "rgba(255, 255, 255, 0.95)", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)" 
                  }}
                >
                  {article.urlToImage && (
                    <CardMedia 
                      component="img"
                      height="140"
                      image={article.urlToImage}
                      alt="Cricket News"
                      sx={{ objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {article.description || "No description available."}
                    </Typography>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1e88e5", fontWeight: "bold" }}
                    >
                      Read More →
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CricketNews;
