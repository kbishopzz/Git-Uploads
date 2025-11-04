const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve CSS from dist directory
app.use("/dist", express.static(path.join(__dirname, "dist")));

// Route for the main pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/features.html", (req, res) => {
  res.sendFile(path.join(__dirname, "features.html"));
});

app.get("/pricing.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pricing.html"));
});

app.get("/testimonials.html", (req, res) => {
  res.sendFile(path.join(__dirname, "testimonials.html"));
});

app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Health check endpoint for CI/CD
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(
    `🚀 Lighthouse Tailwind server running at http://localhost:${port}`
  );
  console.log(`📊 Health check available at http://localhost:${port}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🔄 Shutting down server gracefully...");
  process.exit(0);
});
