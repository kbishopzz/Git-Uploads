# 🎬 Auto Media Updater Template

Multi-provider media updater for your data files - supports images, videos, and audio from Unsplash, Pixabay, and Envato Elements.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.1.1-green.svg)]()
[![Last Updated](https://img.shields.io/badge/updated-November%2014%2C%202025-orange.svg)]()

---

This tool helps web developers quickly populate their projects with high-quality images, videos, and audio from multiple media providers. It automatically fetches and updates media URLs in your data files based on item names.

## ✨ New in Version 1.1.1

- 📝 **Renamed Files**: Cleaner naming convention (update-media.mjs, media-providers.mjs)
- 🔄 **Improved Code**: Updated function names for clarity (updateMediaFiles, searchMedia)
- 🎬 **Multi-Provider Support**: Choose between Unsplash, Pixabay, and Envato Elements
- 🌐 **Web Interface**: Beautiful web UI for easy configuration and updates
- 🖥️ **Express Server**: Built-in web server for browser-based updates
- 📊 **Real-time Feedback**: Live progress tracking and detailed logs
- 🔄 **Flexible API Keys**: Enter API keys through web UI or environment variables
- 📁 **File Selection**: Choose which data file to update from dropdown
- 🎥 **Media Support**: Images, videos, and audio files from supported providers

## 📋 Table of Contents

- [Features](#features)
- [Supported Providers](#supported-providers)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Web Interface (Recommended)](#web-interface-recommended)
  - [Command Line](#command-line)
- [File Structure](#file-structure)
- [How It Works](#how-it-works)
- [Provider Comparison](#provider-comparison)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- 🎨 **Multi-Provider Support**: Unsplash, Pixabay, and Envato Elements
- 🌐 **Web Interface**: User-friendly browser-based UI
- 🖥️ **CLI Support**: Command-line interface for automation
- 🔍 **Automatic Image Search**: Searches based on your data item names
- 🎨 **High-Quality Images**: Professional, high-resolution images
- 📝 **Preserves Data Structure**: Updates images while maintaining all other data
- 🚀 **Easy to Use**: Simple web or command-line execution
- 🔒 **Secure**: Uses environment variables or secure input for API keys
- 📊 **Real-time Progress**: Live updates and detailed logging
- 🎯 **Customizable**: Works with any data structure

## 🌍 Supported Providers

### 🌅 Unsplash
- **Type**: Free
- **Quality**: High-resolution professional photos
- **Media Types**: Images only
- **Rate Limit**: 50 requests/hour (demo), 5000/hour (production)
- **Attribution**: Required
- **Sign Up**: [unsplash.com/developers](https://unsplash.com/developers)

### 📸 Pixabay
- **Type**: Free
- **Quality**: Stock photos, vectors, illustrations, videos
- **Media Types**: Images, videos, audio
- **Rate Limit**: 5000 requests/hour (free), 20000/hour (premium)
- **Attribution**: Not required
- **Sign Up**: [pixabay.com/api/docs](https://pixabay.com/api/docs/)

### 💎 Envato Elements
- **Type**: Premium (Subscription required)
- **Quality**: Premium stock media
- **Media Types**: Images, videos, audio, templates
- **Rate Limit**: Varies by subscription
- **Attribution**: Not required
- **Sign Up**: [elements.envato.com](https://elements.envato.com/)
- **Note**: Requires OAuth token and active subscription

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **API Key** from at least one provider (see [Supported Providers](#supported-providers))

## 📦 Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd Auto-Media-Updater-Template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Setup

### 1. Get Your API Keys

Choose one or more providers and get your API keys:

- **Unsplash**: [unsplash.com/developers](https://unsplash.com/developers) - Create app, copy Access Key
- **Pixabay**: [pixabay.com/api/docs](https://pixabay.com/api/docs/) - Sign up, copy API Key
- **Envato**: [build.envato.com/api](https://build.envato.com/api/) - Get OAuth token (requires subscription)

### 2. Configure Environment Variables (Optional)

### 2. Configure Environment Variables (Optional)

If you plan to use the command-line interface, create a `.env` file:

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API keys:
   ```
   # Choose your default provider
   IMAGE_PROVIDER=unsplash

   # Add API keys for the providers you want to use
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   PIXABAY_API_KEY=your_pixabay_api_key_here
   ENVATO_TOKEN=your_envato_oauth_token_here
   ```

**Note**: The web interface allows you to enter API keys directly, so this step is optional if you only use the web UI.

### 3. Prepare Your Data

The script expects a data file (e.g., `menu-data.js`) with a structure like this:

```javascript
const menuItems = [
  {
    "id": 1,
    "name": "Acai Power Bowl",
    "category": "breakfast",
    "description": "Organic acai base with granola, berries, coconut, and honey drizzle",
    "price": 12.99,
    "image": "",
    "crop": null
  },
  // ... more items
];
```

**Note**: The `image` field will be automatically populated by the script.

## 🚀 Usage

### Web Interface (Recommended)

The easiest way to use the Auto Media Updater is through the web interface:

1. **Start the web server**:
   ```bash
   npm run server
   ```
   Or:
   ```bash
   node server.mjs
   ```

2. **Open your browser**:
   ```
   http://localhost:3000
   ```

3. **Use the interface**:
   - Select your image provider (Unsplash, Pixabay, or Envato)
   - Enter your API key
   - Select the data file to update
   - Click "Update Images"
   - Watch real-time progress and results!

**Benefits**:
- ✅ No need to configure .env file
- ✅ Visual provider selection
- ✅ Real-time progress updates
- ✅ Detailed logging
- ✅ Success/failure statistics
- ✅ File selection dropdown

### Command Line

For automation or scripting, use the command-line interface:

**Basic usage** (uses default provider from .env):
```bash
npm start
```
Or:
```bash
node update-media.mjs
```

**Specify provider**:
```bash
node update-media.mjs --provider pixabay
```

**Specify custom data file**:
```bash
node update-media.mjs --provider unsplash --file my-custom-data.js
```

**Get help**:
```bash
npm run help
```
Or:
```bash
node update-media.mjs --help
```

### What Happens:

1. The script reads your data file
2. For each item, it searches the selected provider using the item's name
3. Updates the `image` field with the best matching image URL
4. Adds `imageSource` and `imageCredit` fields with attribution info
5. Saves the updated data back to the file

### Expected Output:

```
🎬 Auto Media Updater v1.1.1
📦 Provider: PIXABAY
📄 Data File: menu-data.js

✅ Loaded 10 menu items

🔍 Searching for: Acai Power Bowl...
   ✅ Found: https://pixabay.com/get/...
🔍 Searching for: Avocado Toast...
   ✅ Found: https://pixabay.com/get/...
...

==================================================
✅ Successfully updated: 9
❌ Failed: 1
📁 Data saved to: /path/to/menu-data.js
==================================================
```

## 📁 File Structure

```
Auto-Media-Updater-Template/
├── media-providers.mjs       # Multi-provider abstraction layer
├── update-media.mjs          # Main CLI script
├── server.mjs                # Express web server
├── index.html                # Web interface UI
├── menu-data.js              # Your data file (to be updated)
├── .env                      # Your API keys (not tracked by git)
├── .env.example              # Example environment file
├── .gitignore                # Git ignore file
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 🔍 How It Works

### Architecture

The tool uses a modular architecture with three main components:

1. **Image Providers Module** (`image-providers.mjs`):
   - Abstract base class for providers
   - Individual provider classes (Unsplash, Pixabay, Envato)
   - Factory function for creating providers
   - Unified API across all providers

2. **Update Script** (`update-menu-images.mjs`):
   - CLI interface with argument parsing
   - Data file reading/writing
   - Progress tracking and logging
   - Exportable functions for server use

3. **Web Server** (`server.mjs`):
   - Express.js server
   - REST API endpoints
   - Static file serving
   - Log capturing and forwarding

### Process Flow

1. **Provider Selection**: Choose image provider (Unsplash/Pixabay/Envato)
2. **Authentication**: Validate API key with provider
3. **Data Loading**: Read and parse data file
4. **Image Search**: For each item, query provider's search API
5. **Result Processing**: Extract image URL and metadata
6. **Data Update**: Update item with image URL and credits
7. **File Writing**: Save updated data back to file
8. **Reporting**: Display success/failure statistics

## 📊 Provider Comparison

| Feature | Unsplash | Pixabay | Envato Elements |
|---------|----------|---------|-----------------|
| **Cost** | Free | Free | Subscription |
| **Quality** | Excellent | Very Good | Excellent |
| **Variety** | Photos only | Photos, Vectors, Videos | Photos, Graphics |
| **Rate Limit** | 50/hr (demo) | 5000/hr | Varies |
| **Attribution** | Required | Optional | Not required |
| **Best For** | Editorial, Lifestyle | General purpose | Commercial projects |
| **Sign Up** | Easy | Easy | Requires subscription |

## 🎨 Customization

### Change the Data File Path

Edit the file selection in web UI or use CLI:

```bash
node update-menu-images.mjs --file path/to/your-data.js
```

### Modify Search Query

To get more specific images, edit `image-providers.mjs`:

```javascript
async searchImage(query) {
  // Add context to search
  const enhancedQuery = `${query} food photography`;
  // ... rest of search logic
}
```

### Change Image Size

Different providers offer different sizes. Modify in `image-providers.mjs`:

```javascript
return {
  url: img.urls.small,   // Unsplash: raw, full, regular, small, thumb
  // or
  url: img.webformatURL, // Pixabay: webformatURL, largeImageURL
  // ...
};
```

### Add Rate Limiting

To respect API limits, adjust the delay in `update-menu-images.mjs`:

```javascript
// Current delay: 200ms between requests
await new Promise((resolve) => setTimeout(resolve, 200));

// For stricter limits, increase delay:
await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second
```

### Custom Data Structures

The tool works with any JavaScript object array. Modify `readDataFile` and `writeDataFile` functions in `update-media.mjs` to match your structure.

## 🔧 Troubleshooting

### "API key not found"

**Problem**: The script can't find your API key.

**Solution**:
- **Web UI**: Enter the API key directly in the interface
- **CLI**: Ensure you created a `.env` file with the correct key name:
  - `UNSPLASH_ACCESS_KEY` for Unsplash
  - `PIXABAY_API_KEY` for Pixabay
  - `ENVATO_TOKEN` for Envato
- Make sure there are no spaces around the `=` sign

### "No image found for [item name]"

**Problem**: Provider doesn't have results for that search term.

**Solution**:
- Try a different provider
- Modify the item name to be more generic
- Check the provider's website to see if they have content for that topic
- Check API usage limits

### "Could not load data file"

**Problem**: The script can't find or read your data file.

**Solution**:
- Verify the file exists in the correct location
- Check that the file path is correct
- Ensure the file has proper JavaScript syntax
- Make sure the file exports a `menuItems` array

### Server won't start / Port in use

**Problem**: Port 3000 is already in use.

**Solution**:
```bash
# Use a different port
PORT=3001 node server.mjs

# Or add to .env file:
PORT=3001
```

### Rate Limiting Issues

**Provider Limits**:
- **Unsplash**: 50 requests/hour (demo), 5000/hour (production)
- **Pixabay**: 5000 requests/hour (free)
- **Envato**: Varies by subscription

**Solutions**:
- Wait for the limit window to reset
- Upgrade your API plan
- Use a different provider
- Process items in smaller batches

### Envato Authentication Errors

**Problem**: Envato requires OAuth 2.0 token, not a simple API key.

**Solution**:
1. Sign up for Envato Elements subscription
2. Register your application at [build.envato.com](https://build.envato.com)
3. Complete OAuth flow to get access token
4. Use the access token as your API key

**Note**: Envato integration is more complex and may require additional setup.

## 📝 Notes

- The script updates the entire data file, so back it up first
- Images are linked from provider CDNs (not downloaded locally)
- You can run the script multiple times; it will replace existing URLs
- Consider provider API guidelines and attribution requirements for production
- Web UI does not store your API keys (they're used once per session)
- For production use, implement proper API key management and error handling

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! Contributions are welcome.

**Ideas for contributions**:
- Add more image providers (Pexels, Getty Images, etc.)
- Implement image caching
- Add image preprocessing options
- Create desktop application wrapper
- Add batch processing with progress bars
- Implement image quality analysis

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Images provided by [Unsplash](https://unsplash.com/), [Pixabay](https://pixabay.com/), and [Envato Elements](https://elements.envato.com/)
- Built with Node.js and Express.js
- Created by Keith Bishop

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start web interface (recommended)
npm run server

# Update images via CLI
npm start

# Use specific provider
node update-menu-images.mjs --provider pixabay

# Get help
npm run help
```

---

**Happy Coding! 🚀**

If you found this helpful, consider giving it a ⭐ on GitHub!

**Version:** 1.1.0  
**Repository:** [github.com/kbishopzz/Git-Uploads](https://github.com/kbishopzz/Git-Uploads)
