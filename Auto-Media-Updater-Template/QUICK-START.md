# Auto Media Updater - Quick Start Guide

**Version:** 1.1.1  
**Last Updated:** November 14, 2025

## 🎯 What's New in v1.1.1

This version includes cleaner file naming and improved code structure, plus powerful multi-provider support!

### Major Features
- ✅ Cleaner file naming (update-media.mjs, media-providers.mjs)
- ✅ Support for 3 media providers (Unsplash, Pixabay, Envato Elements)
- ✅ Browser-based web interface
- ✅ Express.js server for web UI
- ✅ Real-time progress tracking
- ✅ Command-line interface with arguments
- ✅ Flexible API key management

---

## 🚀 Quick Start

### Method 1: Web Interface (Recommended)

```bash
npm install
npm run server
```

Then open: http://localhost:3000

**Features:**
- Visual provider selection
- Direct API key input (no .env needed)
- Real-time progress
- Detailed logging
- Success/failure statistics

### Method 2: Command Line

```bash
npm install
cp .env.example .env
# Edit .env and add your API keys
node update-menu-images.mjs --provider pixabay
```

---

## 📸 Image Providers

### Unsplash 🌅
- **Free tier**: 50 requests/hour
- **Quality**: Excellent
- **Sign up**: unsplash.com/developers

### Pixabay 📸
- **Free tier**: 5000 requests/hour
- **Quality**: Very good
- **Sign up**: pixabay.com/api/docs

### Envato Elements 💎
- **Paid**: Subscription required
- **Quality**: Premium
- **Sign up**: elements.envato.com

---

## 🎨 Usage Examples

### Web Interface
1. Start server: `npm run server`
2. Open browser to http://localhost:3000
3. Select provider
4. Enter API key
5. Choose data file
6. Click "Update Images"

### Command Line
```bash
# Use default provider (from .env)
npm start

# Use Pixabay
node update-media.mjs --provider pixabay

# Use custom file
node update-media.mjs --provider unsplash --file custom-data.js

# Get help
npm run help
```

---

## 📁 Key Files

- `media-providers.mjs` - Provider abstraction layer
- `update-media.mjs` - Main CLI script
- `server.mjs` - Web server
- `index.html` - Web interface
- `menu-data.js` - Your data file
- `.env` - API keys (optional for CLI)

---

## 🔧 Configuration

### Environment Variables (.env)
```env
IMAGE_PROVIDER=unsplash
UNSPLASH_ACCESS_KEY=your_key_here
PIXABAY_API_KEY=your_key_here
ENVATO_TOKEN=your_token_here
PORT=3000
```

### Web UI
No configuration needed! Enter API keys directly in the browser interface.

---

## 📊 What Gets Updated

The script adds these fields to your data items:

```javascript
{
  "name": "Acai Bowl",
  "image": "https://...",              // ✅ Added
  "imageSource": "pixabay",            // ✅ Added
  "imageCredit": {                     // ✅ Added
    "photographer": "John Doe",
    "photographerUrl": "https://..."
  }
}
```

---

## 🆘 Troubleshooting

### Web UI won't load
```bash
# Check if port is in use
lsof -i :3000

# Use different port
PORT=3001 npm run server
```

### API key errors
- Unsplash: Get Access Key (not Secret Key)
- Pixabay: Copy API Key from dashboard
- Envato: Need OAuth token (requires subscription)

### No images found
- Try different provider
- Check API rate limits
- Make search terms more generic

---

## 🎓 Tips

1. **Start with Pixabay** - Highest rate limit for free tier
2. **Use Web UI for testing** - Easier to experiment with providers
3. **Backup your data** - Script overwrites the original file
4. **Check attribution** - Unsplash requires photographer credit
5. **Consider rate limits** - Add delays for large datasets

---

## 📚 Full Documentation

See `README.md` for complete documentation including:
- Detailed provider comparison
- Architecture overview
- Customization guide
- Complete troubleshooting
- Contributing guidelines

---

**Created by:** Keith Bishop  
**License:** MIT  
**Repository:** github.com/kbishopzz/Git-Uploads
