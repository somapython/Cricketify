import GoogleAd from "./GoogleAd";

{news.map((article, index) => (
  <Grid item xs={12} sm={6} key={index}>
    {/* Show an ad after every 3 news items */}
    {index % 3 === 0 && <GoogleAd />}
    
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card sx={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
        {article.urlToImage && (
          <CardMedia component="img" height="140" image={article.urlToImage} alt="Cricket News" sx={{ objectFit: "cover" }} />
        )}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {article.description || "No description available."}
          </Typography>
          <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1e88e5", fontWeight: "bold" }}>
            Read More →
          </a>
        </CardContent>
      </Card>
    </motion.div>
  </Grid>
))}
