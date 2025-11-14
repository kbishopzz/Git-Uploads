# 📊 Dynamic JSON-LD Schema Generator

A flexible, reusable JavaScript module for automatically generating and injecting JSON-LD structured data into websites. Perfect for improving SEO and enabling rich results in search engines.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.3-green.svg)]()
[![Last Updated](https://img.shields.io/badge/updated-November%2014%2C%202025-orange.svg)]()

---

## � Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Supported Schema Types](#supported-schema-types)
- [Browser Support](#browser-support)
- [Documentation](#documentation)
- [Examples](#examples)
- [License](#license)

---

## ✨ Features

- **Configuration-driven** - Simple setup with flexible configuration
- **Multiple schema types** - Restaurant, Product, Event, LocalBusiness, Organization, Article, Menu
- **Dynamic DOM parsing** - Extract data from HTML elements automatically
- **Auto-injection** - Automatic injection on page load or custom triggers
- **Manual control** - Full programmatic control when needed
- **Event-driven** - Inject after delays, after elements load, or on demand
- **Debugging** - Built-in logging for troubleshooting
- **No dependencies** - Pure vanilla JavaScript

---

## 📦 Installation

Simply include the module in your HTML:

```html
<script src="path/to/dynamic-jsonld-module.js"></script>
```

No npm installation required - it's a standalone module!

---

## 🚀 Quick Start

### Initialize the Module

```javascript
const jsonld = new DynamicJSONLD({
  autoInject: true,
  pageIndicator: "data-page",
  debug: true, // Set to false in production
});
```

### Register a Schema

```javascript
jsonld.registerSchema("restaurant", () =>
  JSONLDSchemas.restaurant({
    name: "My Restaurant",
    telephone: "+1-555-1234",
    url: "https://myrestaurant.com",
    address: {
      street: "123 Main St",
      city: "Anytown",
      region: "CA",
      zip: "12345",
      country: "US",
    },
    cuisines: ["Italian", "Mediterranean"],
    hours: ["Mo-Fr 11:00-22:00", "Sa-Su 10:00-23:00"],
  })
);
```

### Inject Schema

**Auto-inject on page load:**

```html
<body data-page="restaurant">
  <!-- Content -->
</body>
```

**Manual injection:**

```javascript
const schema = jsonld.generate("restaurant");
jsonld.inject(schema);
```

## 📚 Documentation

For comprehensive documentation, examples, and API reference, see:

- **[Complete Guide](DYNAMIC-JSONLD-GUIDE.md)** - Detailed documentation with examples
- **API Reference** - All methods and configuration options
- **Real-world Examples** - Restaurant, e-commerce, events, and more

---

## 🛠️ Supported Schema Types

| Schema Type | Use Case | Documentation |
|------------|----------|---------------|
| Restaurant/Café | Food & beverage establishments | [See Guide](DYNAMIC-JSONLD-GUIDE.md#restaurant) |
| Product | E-commerce items | [See Guide](DYNAMIC-JSONLD-GUIDE.md#product) |
| Event | Conferences, concerts, webinars | [See Guide](DYNAMIC-JSONLD-GUIDE.md#event) |
| LocalBusiness | Service businesses | [See Guide](DYNAMIC-JSONLD-GUIDE.md#localbusiness) |
| Organization | Companies & nonprofits | [See Guide](DYNAMIC-JSONLD-GUIDE.md#organization) |
| Article | Blog posts & news | [See Guide](DYNAMIC-JSONLD-GUIDE.md#article) |
| Menu | Restaurant menus | [See Guide](DYNAMIC-JSONLD-GUIDE.md#menu) |
| Review | Customer reviews & ratings | [See Guide](DYNAMIC-JSONLD-GUIDE.md#review) |

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |
| Node.js | All versions (for server-side use) |

---

## � Documentation

- **[DYNAMIC-JSONLD-GUIDE.md](DYNAMIC-JSONLD-GUIDE.md)** - Complete guide with examples
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and updates
- **[LICENSE](LICENSE)** - MIT License details

---

## 💡 Examples

See the [DYNAMIC-JSONLD-GUIDE.md](DYNAMIC-JSONLD-GUIDE.md) for:
- Real-world implementation examples
- Restaurant with dynamic menu parsing
- E-commerce product pages
- Event pages with structured data
- Complete API reference

---

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📞 Support

If you find this project helpful:
- ⭐ Star the repository
- 🐛 Report issues on GitHub
- 💬 Share with others

---

## 🙏 Acknowledgments

- Schema.org community
- Google Structured Data team
- Web developers who provided feedback

---

**Version:** v1.0.0 - November 2025  
**Last Updated:** November 4, 2025

**Created for:** Web developers looking to improve SEO with structured data
