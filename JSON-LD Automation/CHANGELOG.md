# Changelog

All notable changes to the JSON-LD Schema Automation project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-04

### Added
- Initial release of Dynamic JSON-LD Schema Generator Module
- Core `DynamicJSONLD` class with full API
- Pre-built schema templates for:
  - Restaurant/Café/Coffee Shop
  - Product/E-commerce
  - Event
  - Local Business
  - Organization
  - Article/Blog Post
  - Menu (for restaurants)
- Automatic schema injection on page load
- DOM parsing utilities for dynamic content extraction
- Configuration-driven setup
- Multiple injection modes (immediate, delayed, after element)
- Debug mode for development
- Comprehensive documentation (README.md, DYNAMIC-JSONLD-GUIDE.md)
- Real-world usage examples
- MIT License

### Features
- **Auto-injection**: Based on page type indicator
- **DOM Parsing**: Extract data from HTML elements automatically
- **Event-driven**: Inject after delays or specific elements load
- **Multiple Schemas**: Restaurant, Product, Event, and more
- **No Dependencies**: Pure vanilla JavaScript
- **Browser Support**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

### Documentation
- Complete API reference
- Pre-built schema template examples
- Real-world implementation examples
- Integration guide for CI/CD templates
- Best practices and troubleshooting
- License information

---

## Future Enhancements

### Planned for v1.1.0
- [ ] Additional schema types (Recipe, FAQ, HowTo)
- [ ] Schema validation utility
- [ ] Batch injection for multiple schemas
- [ ] TypeScript definitions
- [ ] Better error handling and reporting
- [ ] Schema relationship management (nested schemas)

### Under Consideration
- [ ] React/Vue component wrappers
- [ ] WordPress plugin
- [ ] Shopify integration
- [ ] Visual schema builder UI
- [ ] A/B testing support
- [ ] Schema performance analytics

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-11-04 | Initial release |

---

**Maintained by:** Keith Bishop  
**Repository:** https://github.com/kbishopzz/Git-Uploads  
**License:** MIT
