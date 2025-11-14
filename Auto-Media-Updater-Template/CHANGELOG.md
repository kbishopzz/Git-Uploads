# Changelog

All notable changes to the Auto Image Updater Template project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] - 2025-11-14

### Changed
- **File Naming**: Renamed `update-menu-images.mjs` to `update-media.mjs` for clarity
- **File Naming**: Renamed `image-providers.mjs` to `media-providers.mjs` for consistency
- **Function Names**: Updated `updateMenuImages()` to `updateMediaFiles()` for better semantics
- **Function Names**: Updated `createImageProvider()` to `createMediaProvider()`
- **Class Names**: Renamed `ImageProvider` to `MediaProvider` base class
- **Method Names**: Updated `searchImage()` to `searchMedia()` across all providers
- **Code Quality**: Improved naming conventions throughout codebase
- **Documentation**: Updated all references to reflect new file and function names

### Technical Details
- More intuitive function and file naming
- Better alignment with multi-media capabilities
- Cleaner API for developers
- No breaking changes to data structure or output format

---

## [1.0.2] - 2025-11-14

### Added
- **Multi-Provider Support**: Integrated Pixabay and Envato Elements alongside Unsplash
- **Web Interface**: Beautiful HTML/CSS/JS interface for browser-based image updates
- **Express.js Server**: Backend API server for web interface functionality
- **Provider Abstraction Layer**: New `media-providers.mjs` module with factory pattern
- **Real-time Progress Tracking**: Live updates and detailed logging in web UI
- **CLI Arguments**: Command-line options for provider and file selection
- **Provider Selection**: Visual provider cards in web interface
- **File Selection Dropdown**: Choose target data file from web UI
- **Statistics Display**: Success/failure counts in web interface
- **API Key Flexibility**: Enter keys via web UI or environment variables
- **Quick Start Guide**: New `QUICK-START.md` for rapid onboarding

### Changed
- **Refactored Main Script**: `update-media.mjs` now supports multiple providers
- **Enhanced package.json**: Added Express dependency and new npm scripts
  - `npm run server` - Start web interface
  - `npm run web` - Alias for server
  - `npm run help` - Display CLI help
- **Expanded .env.example**: Added configuration for Pixabay and Envato
- **Updated README**: Comprehensive documentation for multi-provider usage
- **Improved Logging**: Better formatted output with emojis and progress indicators
- **Data Structure**: Added `imageSource` and `imageCredit` fields to updated items

### Technical Details
- Provider abstraction using object-oriented design
- Factory pattern for provider instantiation
- REST API endpoints for web interface
- Log capturing and forwarding to frontend
- Modular architecture for easy extensibility

### Supported Providers
1. **Unsplash** - Free HD photos (50-5000 req/hr)
2. **Pixabay** - Free stock media (5000-20000 req/hr)
3. **Envato Elements** - Premium content (subscription required)

---

## [1.0.1] - 2025-11-14

### Changed
- **Version Numbering**: Updated to semantic versioning (1.0.1)
- **Documentation Dates**: Updated all documentation to November 14, 2025
- **Author Attribution**: Corrected author name to Keith Bishop
- **Consistency Updates**: Standardized version numbers across all documentation
- **License Attribution**: Updated copyright to Keith Bishop in all LICENSE files

### Fixed
- Author name inconsistency (corrected from Kyle to Keith)
- Date stamps updated to current month

---

## [1.0.0] - 2025-11-14 (Initial Release)

### Added
- **Unsplash Integration**: Automatic image fetching from Unsplash API
- **CLI Interface**: Command-line script for updating data files
- **Environment Variables**: Secure API key management via .env
- **Data Preservation**: Updates images while maintaining data structure
- **Menu Data Support**: Works with JavaScript object arrays
- **Error Handling**: Graceful handling of missing images and API errors
- **Rate Limiting**: Built-in delays to respect API limits
- **Documentation**: Comprehensive README with setup and usage instructions

### Features
- Automatic image search based on item names
- High-quality professional photos from Unsplash
- Simple command-line execution
- Preserves all existing data fields
- Customizable for any data structure
- ES Module support

### Files Included
- `update-media.mjs` - Main script
- `menu-data.js` - Example data file
- `package.json` - Dependencies and scripts
- `.env.example` - Environment configuration template
- `.gitignore` - Git ignore patterns
- `README.md` - Full documentation

### Dependencies
- `dotenv` (^16.3.1) - Environment variable management
- `node-fetch` (^3.3.2) - HTTP requests to APIs

### Requirements
- Node.js >= 14.0.0
- npm >= 6.0.0
- Unsplash API key (free tier available)

---

## Version Comparison

| Version | Providers | Interface | Key Feature |
|---------|-----------|-----------|-------------|
| 1.0.0 | 1 (Unsplash) | CLI only | Initial release |
| 1.0.1 | 1 (Unsplash) | CLI only | Documentation updates |
| 1.0.2 | 3 (Unsplash, Pixabay, Envato) | CLI + Web UI | Multi-provider + Web interface |
| 1.1.0 | 3 (Unsplash, Pixabay, Envato) | CLI + Web UI | Rebranded to Media Updater |
| 1.1.1 | 3 (Unsplash, Pixabay, Envato) | CLI + Web UI | Cleaner file/function naming |

---

## Upgrade Guide

### From 1.0.0/1.0.1 to 1.0.2

1. **Install new dependencies:**
   ```bash
   npm install
   ```

2. **Update .env file** (optional for CLI):
   ```env
   # Add these new variables
   IMAGE_PROVIDER=unsplash
   PIXABAY_API_KEY=your_key_here
   ENVATO_TOKEN=your_token_here
   ```

3. **Use new features:**
   ```bash
   # Web interface (recommended)
   npm run server
   
   # CLI with provider selection
   node update-media.mjs --provider pixabay
   ```

4. **No breaking changes** - Existing scripts will continue to work with default Unsplash provider

---

## Roadmap

### Future Enhancements (Planned)
- [ ] Additional providers (Pexels, Getty Images, Adobe Stock)
- [ ] Image caching and local storage
- [ ] Batch processing with progress bars
- [ ] Image quality analysis and selection
- [ ] Desktop application wrapper (Electron)
- [ ] Docker containerization
- [ ] Image preprocessing options (resize, crop, optimize)
- [ ] Database integration
- [ ] REST API for integration with other tools
- [ ] Webhook support for automated updates

### Under Consideration
- [ ] AI-powered image selection
- [ ] Multiple image variants per item
- [ ] Image CDN integration
- [ ] Automatic image optimization
- [ ] A/B testing support
- [ ] Analytics integration

---

## Credits

**Author:** Keith Bishop  
**License:** MIT  
**Repository:** [github.com/kbishopzz/Git-Uploads](https://github.com/kbishopzz/Git-Uploads)

**Image Providers:**
- [Unsplash](https://unsplash.com/) - Beautiful free images
- [Pixabay](https://pixabay.com/) - Free stock media
- [Envato Elements](https://elements.envato.com/) - Premium content

**Technologies:**
- Node.js & npm
- Express.js
- ES Modules
- dotenv

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
```bash
git clone <repo-url>
cd Auto-Image-Updater-Template
npm install
npm run server  # Start development server
```

### Adding a New Provider
1. Create provider class in `media-providers.mjs`
2. Extend `MediaProvider` base class
3. Implement `searchMedia()` method
4. Add to factory function
5. Update documentation

---

**Last Updated:** November 14, 2025  
**Current Version:** 1.1.1
