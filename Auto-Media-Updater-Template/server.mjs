// server.mjs
// Web server for Auto Media Updater web interface
// Version: 1.1.1

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { updateMediaFiles, readDataFile } from "./update-media.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API endpoint to list available data files
app.get("/api/list-files", (req, res) => {
  try {
    const files = fs
      .readdirSync(__dirname)
      .filter(
        (file) => file.endsWith(".js") && file !== "update-media.mjs"
      );
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to update images
app.post("/api/update-images", async (req, res) => {
  const { provider, apiKey, dataFile } = req.body;

  // Validation
  if (!provider || !apiKey || !dataFile) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: provider, apiKey, or dataFile",
    });
  }

  const logs = [];
  let successCount = 0;
  let failCount = 0;
  let totalCount = 0;

  try {
    // Override console.log to capture logs
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const message = args.join(" ");
      originalLog(...args);

      // Parse log messages
      if (message.includes("✅")) {
        logs.push({ type: "success", message });
        if (message.includes("Found:")) successCount++;
      } else if (message.includes("❌")) {
        logs.push({ type: "error", message });
        failCount++;
      } else if (message.includes("⚠️")) {
        logs.push({ type: "warning", message });
        failCount++;
      } else if (message.includes("🔍")) {
        logs.push({ type: "info", message });
      } else {
        logs.push({ type: "info", message });
      }
    };

    console.error = (...args) => {
      const message = args.join(" ");
      originalError(...args);
      logs.push({ type: "error", message });
    };

    // Read data to get count
    const dataFilePath = path.join(__dirname, dataFile);
    const menuData = readDataFile(dataFilePath);
    totalCount = menuData.length;

    // Run update
    await updateMediaFiles({
      dataFile,
      provider,
      customApiKey: apiKey,
    });

    // Restore console
    console.log = originalLog;
    console.error = originalError;

    // Calculate final counts from logs
    successCount = logs.filter((log) => log.message.includes("Found:")).length;
    failCount = totalCount - successCount;

    res.json({
      success: true,
      logs,
      successCount,
      failCount,
      totalCount,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      logs,
      successCount,
      failCount,
      totalCount,
    });
  }
});

// Serve index.html for root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎬 Auto Media Updater Server v1.1.1`);
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  console.log(`📝 Open your browser to use the web interface\n`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
