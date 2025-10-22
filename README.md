# Dynamic JSON-LD Schema Generator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0-green.svg)]()

A flexible, reusable JavaScript module for automatically generating and injecting JSON-LD structured data into websites. Perfect for improving SEO and enabling rich results in search engines.

## 🚀 Features

- **Configuration-driven** - Simple setup with flexible configuration
- **Multiple schema types** - Restaurant, Product, Event, LocalBusiness, Organization, Article, Menu
- **Dynamic DOM parsing** - Extract data from HTML elements automatically
- **Auto-injection** - Automatic injection on page load or custom triggers
- **Manual control** - Full programmatic control when needed
- **Event-driven** - Inject after delays, after elements load, or on demand
- **Debugging** - Built-in logging for troubleshooting
- **No dependencies** - Pure vanilla JavaScript

## 📦 Installation

Simply include the module in your HTML:

```html
<script src="path/to/dynamic-jsonld-module.js"></script>
```

## 🏃 Quick Start

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

## 🛠️ Supported Schema Types

- Restaurant/Cafe
- Product
- Event
- LocalBusiness
- Organization
- Article
- Menu

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Node.js (for server-side use)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you find this project helpful, please give it a ⭐️ star!

---

**Version:** v1.0 - October 2025

**Created for:** Web developers looking to improve SEO with structured data
