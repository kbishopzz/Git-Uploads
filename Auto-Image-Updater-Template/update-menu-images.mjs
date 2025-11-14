// update-menu-images.mjs
// Utility to update menu items with Unsplash image URLs

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read menu-data.js as text and extract menuItems
const menuDataPath = path.join(__dirname, "menu-data.js");
let menuData;
try {
  const fileContent = fs.readFileSync(menuDataPath, "utf-8");
  // Use eval to execute the JS file in a sandboxed context
  const sandboxGlobal = { menuItems: null };
  const wrappedCode = fileContent.replace(
    'console.log("Menu data loaded successfully");',
    ""
  );
  eval(wrappedCode + "; sandboxGlobal.menuItems = menuItems;");
  menuData = sandboxGlobal.menuItems;

  if (!menuData) {
    throw new Error("Could not find menuItems array in menu-data.js");
  }
} catch (err) {
  console.error("Could not load menu-data.js:", err);
  process.exit(1);
}

// Get Unsplash API key from environment variable
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.error(
    "Error: UNSPLASH_ACCESS_KEY not found in environment variables."
  );
  console.error("Please create a .env file with your Unsplash API key.");
  console.error('Example: UNSPLASH_ACCESS_KEY=your_api_key_here');
  process.exit(1);
}

async function getUnsplashImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const img = data.results[0];
    return {
      url: img.urls.regular,
      crop: null, // Unsplash does not provide crop info directly
    };
  }
  return null;
}

async function updateMenuImages() {
  for (const item of menuData) {
    const imageData = await getUnsplashImage(item.name);
    if (imageData) {
      item.image = imageData.url;
      item.crop = imageData.crop;
      console.log(`Updated ${item.name} with image: ${imageData.url}`);
    } else {
      console.log(`No image found for ${item.name}`);
    }
  }

  // Write back in browser-compatible format
  const outputContent = `/* ==========================================
   MENU DATA
   ========================================== */

const menuItems = ${JSON.stringify(menuData, null, 2)};

console.log("Menu data loaded successfully");
`;

  fs.writeFileSync(menuDataPath, outputContent);
  console.log("Menu data updated with Unsplash images.");
}

updateMenuImages();
