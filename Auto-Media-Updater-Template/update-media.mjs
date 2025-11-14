// update-media.mjs
// Multi-provider utility to update data files with media from Unsplash, Pixabay, or Envato Elements
// Version: 1.1.1

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createMediaProvider } from "./media-providers.mjs";

// Load environment variables
dotenv.config();

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEFAULT_DATA_FILE = "menu-data.js";
const DEFAULT_PROVIDER = process.env.IMAGE_PROVIDER || "unsplash";

/**
 * Read and parse a JavaScript data file
 * @param {string} filePath - Path to the data file
 * @returns {Array} Parsed menu items array
 */
function readDataFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    // Use eval to execute the JS file in a sandboxed context
    const sandboxGlobal = { menuItems: null };
    const wrappedCode = fileContent.replace(
      'console.log("Menu data loaded successfully");',
      ""
    );
    eval(wrappedCode + "; sandboxGlobal.menuItems = menuItems;");
    
    if (!sandboxGlobal.menuItems) {
      throw new Error("Could not find menuItems array in data file");
    }
    
    return sandboxGlobal.menuItems;
  } catch (err) {
    console.error(`Could not load data file (${filePath}):`, err.message);
    throw err;
  }
}

/**
 * Write updated data back to file
 * @param {string} filePath - Path to the data file
 * @param {Array} menuData - Updated menu items array
 */
function writeDataFile(filePath, menuData) {
  const outputContent = `/* ==========================================
   MENU DATA
   Updated: ${new Date().toISOString()}
   ========================================== */

const menuItems = ${JSON.stringify(menuData, null, 2)};

console.log("Menu data loaded successfully");
`;

  fs.writeFileSync(filePath, outputContent);
}

/**
 * Get API key for specified provider
 * @param {string} provider - Provider name (unsplash, pixabay, envato)
 * @returns {string} API key
 */
function getApiKey(provider) {
  const keyMap = {
    unsplash: process.env.UNSPLASH_ACCESS_KEY,
    pixabay: process.env.PIXABAY_API_KEY,
    envato: process.env.ENVATO_TOKEN,
  };

  const apiKey = keyMap[provider.toLowerCase()];
  
  if (!apiKey) {
    throw new Error(
      `API key not found for ${provider}. Please add ${Object.keys(keyMap)
        .find((k) => k === provider.toLowerCase())
        ?.toUpperCase()
        .replace("UNSPLASH_ACCESS", "UNSPLASH_ACCESS")
        .replace("PIXABAY_API", "PIXABAY_API")
        .replace("ENVATO", "ENVATO")}_KEY to your .env file.`
    );
  }
  
  return apiKey;
}

/**
 * Update media files using specified provider
 * @param {Object} options - Configuration options
 */
async function updateMediaFiles(options = {}) {
  const {
    dataFile = DEFAULT_DATA_FILE,
    provider = DEFAULT_PROVIDER,
    customApiKey = null,
  } = options;

  console.log(`\n🎬 Auto Media Updater v1.1.1`);
  console.log(`📦 Provider: ${provider.toUpperCase()}`);
  console.log(`📄 Data File: ${dataFile}\n`);

  // Resolve file path
  const dataFilePath = path.isAbsolute(dataFile)
    ? dataFile
    : path.join(__dirname, dataFile);

  // Check if file exists
  if (!fs.existsSync(dataFilePath)) {
    throw new Error(`Data file not found: ${dataFilePath}`);
  }

  // Read menu data
  const menuData = readDataFile(dataFilePath);
  console.log(`✅ Loaded ${menuData.length} menu items\n`);

  // Get API key
  const apiKey = customApiKey || getApiKey(provider);

  // Create media provider
  const mediaProvider = createMediaProvider(provider, apiKey);

  // Update media
  let successCount = 0;
  let failCount = 0;

  for (const item of menuData) {
    try {
      console.log(`🔍 Searching for: ${item.name}...`);
      const mediaData = await mediaProvider.searchMedia(item.name);
      
      if (mediaData) {
        item.image = mediaData.url;
        item.imageSource = mediaData.source;
        item.imageCredit = {
          photographer: mediaData.photographer,
          photographerUrl: mediaData.photographerUrl,
        };
        
        console.log(`   ✅ Found: ${mediaData.url.substring(0, 60)}...`);
        successCount++;
      } else {
        console.log(`   ⚠️  No image found for ${item.name}`);
        failCount++;
      }
    } catch (error) {
      console.error(`   ❌ Error for ${item.name}: ${error.message}`);
      failCount++;
    }
    
    // Add small delay to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // Write back to file
  writeDataFile(dataFilePath, menuData);

  // Summary
  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Data saved to: ${dataFilePath}`);
  console.log(`${"=".repeat(50)}\n`);
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--provider" && args[i + 1]) {
      options.provider = args[i + 1];
      i++;
    } else if (args[i] === "--file" && args[i + 1]) {
      options.dataFile = args[i + 1];
      i++;
    } else if (args[i] === "--help") {
      console.log(`
Auto Media Updater v1.1.1
Usage: node update-media.mjs [options]

Options:
  --provider <name>    Media provider: unsplash, pixabay, or envato (default: unsplash)
  --file <path>        Path to data file (default: menu-data.js)
  --help               Show this help message

Examples:
  node update-media.mjs
  node update-media.mjs --provider pixabay
  node update-media.mjs --provider unsplash --file my-data.js

Environment Variables:
  UNSPLASH_ACCESS_KEY  API key for Unsplash
  PIXABAY_API_KEY      API key for Pixabay
  ENVATO_TOKEN         OAuth token for Envato Elements
  IMAGE_PROVIDER       Default provider (unsplash, pixabay, or envato)
`);
      process.exit(0);
    }
  }

  updateMediaFiles(options).catch((error) => {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  });
}

export { updateMediaFiles, readDataFile, writeDataFile };
