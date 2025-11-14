# Auto Image Updater Template

🖼️ **Automatically update your menu items (or any data) with beautiful images from Unsplash!**

This tool is designed to help web developers quickly populate their projects with high-quality images from Unsplash. It automatically fetches and updates image URLs in your menu data file based on item names.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- 🔍 **Automatic Image Search**: Searches Unsplash based on your menu item names
- 🎨 **High-Quality Images**: Gets professional, high-resolution images
- 📝 **Preserves Data Structure**: Updates images while maintaining all other data
- 🚀 **Easy to Use**: Simple command-line execution
- 🔒 **Secure**: Uses environment variables for API keys
- 🎯 **Customizable**: Works with any data structure by modifying the script

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Unsplash API Key** - [Get one for free](https://unsplash.com/developers)

## 📦 Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd Auto-Image-Updater-Template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Setup

### 1. Get Your Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application (or use an existing one)
3. Copy your **Access Key**

### 2. Configure Environment Variables

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Unsplash API key:
   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

### 3. Prepare Your Data

The script expects a `menu-data.js` file with a structure like this:

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

Run the script to update your menu items with Unsplash images:

```bash
node update-menu-images.mjs
```

### What happens:

1. The script reads your `menu-data.js` file
2. For each menu item, it searches Unsplash using the item's name
3. Updates the `image` field with the best matching image URL
4. Saves the updated data back to `menu-data.js`

### Expected Output:

```
Updated Acai Power Bowl with image: https://images.unsplash.com/photo-...
Updated Avocado Toast with image: https://images.unsplash.com/photo-...
Updated Green Smoothie Bowl with image: https://images.unsplash.com/photo-...
...
Menu data updated with Unsplash images.
```

## 📁 File Structure

```
Auto-Image-Updater-Template/
├── update-menu-images.mjs    # Main script
├── menu-data.js              # Your menu data (to be updated)
├── .env                      # Your API keys (not tracked by git)
├── .env.example              # Example environment file
├── .gitignore                # Git ignore file
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 🔍 How It Works

1. **Read Data**: The script reads your `menu-data.js` file and extracts the `menuItems` array
2. **Search Unsplash**: For each item, it queries the Unsplash API using the item's name
3. **Get Best Match**: Retrieves the first (most relevant) image from search results
4. **Update Data**: Updates the `image` field with the Unsplash URL
5. **Save File**: Writes the updated data back to `menu-data.js` in a browser-compatible format

## 🎨 Customization

### Change the Data File Path

Edit `update-menu-images.mjs` and modify the path:

```javascript
const menuDataPath = path.join(__dirname, "your-custom-path/menu-data.js");
```

### Modify Search Query

To get more specific images, you can modify the search query in the `getUnsplashImage` function:

```javascript
const query = `${item.name} food photography`;  // Add context to search
```

### Change Image Size

Unsplash provides different image sizes. Modify the URL parameter:

```javascript
return {
  url: img.urls.small,   // Options: raw, full, regular, small, thumb
  crop: null,
};
```

### Add More Fields

The script can update any fields in your data structure. Modify the update logic to add additional fields from Unsplash (photographer, description, etc.).

## 🔧 Troubleshooting

### "UNSPLASH_ACCESS_KEY not found"

**Problem**: The script can't find your API key.

**Solution**:
- Ensure you created a `.env` file in the root directory
- Check that your `.env` file contains `UNSPLASH_ACCESS_KEY=your_key_here`
- Make sure there are no spaces around the `=` sign

### "No image found for [item name]"

**Problem**: Unsplash doesn't have results for that search term.

**Solution**:
- Try modifying the item name to be more generic
- Check the Unsplash API usage limits (50 requests/hour for free tier)
- Manually set a placeholder image for that item

### "Could not load menu-data.js"

**Problem**: The script can't find or read your data file.

**Solution**:
- Verify the file exists in the correct location
- Check that the file path in the script is correct
- Ensure the file has proper JavaScript syntax

### Rate Limiting

Unsplash's free tier allows:
- **50 requests per hour**
- **5000 requests per month**

If you hit the limit, wait an hour or upgrade your Unsplash account.

## 📝 Notes

- The script updates the entire `menu-data.js` file, so make sure to back it up first
- Images are linked from Unsplash's CDN (not downloaded locally)
- You can run the script multiple times; it will replace existing image URLs
- Consider the Unsplash API guidelines and attribution requirements for production use

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! Contributions are welcome.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Images provided by [Unsplash](https://unsplash.com/)
- Built with Node.js

---

**Happy Coding! 🚀**

If you found this helpful, consider giving it a ⭐ on GitHub!
