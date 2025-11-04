# Changelog

All notable changes to the Async Boot Loader Template project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-04

### Added
- Initial release of Async Boot Loader Template
- `loader.js` - Promise-based asset loader with async/await support
- `bootstrap-loader.js` - Configurable bootstrap system
- Support for parallel script fetch with ordered execution
- CSP-friendly implementation using blob URLs
- Fallback mechanisms for strict CSP environments
- Preload link swapping for CSS optimization
- Configuration-driven setup via `window.BOOTSTRAP_LOADER_CONFIG`
- Comprehensive documentation (BOOTSTRAP_LOADER_README.md, LOADER_SETUP.md)
- Example index.html with project-specific implementation
- Generic index-template.html for reusable projects
- MIT License

### Features
- **Performance**: Parallel fetch + sequential execution
- **Compatibility**: Works without JavaScript (noscript fallback)
- **Flexibility**: Fully configurable script and CSS loading
- **Size**: ~5KB total (minified)
- **Browser Support**: Modern browsers + graceful degradation

### Documentation
- Quick usage guide in BOOTSTRAP_LOADER_README.md
- Detailed setup instructions in LOADER_SETUP.md
- Integration examples and best practices
- License information

---

## Future Enhancements

### Planned for v1.1.0
- [ ] TypeScript definitions
- [ ] ES6 module version
- [ ] Webpack/Vite plugin
- [ ] Additional configuration options
- [ ] Performance metrics logging
- [ ] More examples for different frameworks

### Under Consideration
- [ ] Service Worker integration
- [ ] HTTP/2 push support
- [ ] Resource prioritization hints
- [ ] Loading progress callbacks
- [ ] Error recovery strategies

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-11-04 | Initial release |

---

**Maintained by:** Keith Bishop  
**Repository:** https://github.com/kbishopzz/Git-Uploads  
**License:** MIT
