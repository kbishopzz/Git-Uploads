# Dynamic JSON-LD Schema Generator Module

**Version:** 1.0.2  
**Last Updated:** November 14, 2025  
**License:** MIT

A flexible, reusable JavaScript module for automatically generating and injecting JSON-LD structured data into websites. Perfect for improving SEO and enabling rich results in search engines.

## Features

✅ **Configuration-driven** - Simple setup with flexible configuration  
✅ **Multiple schema types** - Restaurant, Product, Event, LocalBusiness, Organization, Article, Menu  
✅ **Dynamic DOM parsing** - Extract data from HTML elements automatically  
✅ **Auto-injection** - Automatic injection on page load or custom triggers  
✅ **Manual control** - Full programmatic control when needed  
✅ **Event-driven** - Inject after delays, after elements load, or on demand  
✅ **Debugging** - Built-in logging for troubleshooting  
✅ **No dependencies** - Pure vanilla JavaScript

---

## Installation

1. **Add to your project:**

```html
<script src="path/to/dynamic-jsonld-module.js"></script>
```

2. **Or use in CI/CD template:**

```
/assets/js/dynamic-jsonld-module.js
```

---

## Quick Start

### 1. Initialize the Module

```javascript
const jsonld = new DynamicJSONLD({
  autoInject: true,
  pageIndicator: "data-page",
  debug: true, // Set to false in production
});
```

### 2. Register a Schema

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

### 3. Inject

**Option A: Auto-inject on page load**

```html
<body data-page="restaurant">
  <!-- Content -->
</body>
```

**Option B: Manual injection**

```javascript
const schema = jsonld.generate("restaurant");
jsonld.inject(schema);
```

---

## API Reference

### Constructor

```javascript
const jsonld = new DynamicJSONLD(config);
```

**Config Options:**

- `autoInject` (boolean): Enable auto-injection on DOMContentLoaded (default: true)
- `pageIndicator` (string): HTML attribute for page type detection (default: "data-page")
- `debug` (boolean): Enable console logging (default: false)
- Any schema type configuration objects

### Methods

#### `registerSchema(type, generator)`

Register a custom schema generator function.

```javascript
jsonld.registerSchema("custom", () => ({
  "@context": "https://schema.org",
  "@type": "CustomType",
  // ... properties
}));
```

#### `generate(type, overrides)`

Generate a schema of specified type with optional property overrides.

```javascript
const schema = jsonld.generate("restaurant", {
  name: "Override Name",
});
```

#### `inject(data, options)`

Inject schema into document head.

```javascript
jsonld.inject(schema, { source: "my-app" });
```

#### `injectAfterDelay(type, delay)`

Inject schema after specified delay (useful for async content).

```javascript
jsonld.injectAfterDelay("restaurant", 2000); // Inject after 2 seconds
```

#### `injectAfterElement(type, selector, timeout)`

Inject schema after specific DOM element appears.

```javascript
jsonld.injectAfterElement("restaurant", ".menu-container", 5000);
```

#### `parseDOM(selectors)`

Extract data from DOM elements.

```javascript
const data = jsonld.parseDOM({
  name: ".restaurant-name",
  phone: ".restaurant-phone",
  address: ".restaurant-address",
});
```

#### `parseItems(selector, itemSelectors)`

Extract array of items from DOM.

```javascript
const menuItems = jsonld.parseItems(".menu-item", {
  name: ".item-name",
  price: ".item-price",
  description: ".item-description",
});
```

#### `getInjectedSchemas()`

Retrieve all injected JSON-LD scripts.

```javascript
const schemas = jsonld.getInjectedSchemas();
console.log(schemas);
```

#### `clearInjected()`

Remove all injected schemas.

```javascript
jsonld.clearInjected();
```

#### `update(type, updates)`

Update and re-inject a schema.

```javascript
jsonld.update("restaurant", { name: "New Name" });
```

---

## Pre-built Schema Templates

The module includes templates for common schema types.

### Restaurant

```javascript
JSONLDSchemas.restaurant({
  name: "Restaurant Name",
  description: "Description",
  url: "https://example.com",
  telephone: "+1-555-1234",
  address: {
    street: "123 Main St",
    city: "Anytown",
    region: "CA",
    zip: "12345",
    country: "US",
  },
  coordinates: { lat: 34.052235, lng: -118.243683 },
  cuisines: ["Italian", "Mediterranean"],
  hours: ["Mo-Fr 11:00-22:00", "Sa-Su 10:00-23:00"],
  priceRange: "$$",
  image: "https://example.com/image.jpg",
  rating: { value: 4.8, count: 127 },
  reviews: [
    /* Review objects */
  ],
});
```

### Product

```javascript
JSONLDSchemas.product({
  name: "Product Name",
  description: "Description",
  image: "https://example.com/product.jpg",
  brand: "Brand Name",
  price: "99.99",
  currency: "USD",
  url: "https://example.com/product",
  availability: "https://schema.org/InStock",
  rating: { value: 4.5, count: 100 },
  reviews: [
    /* Review objects */
  ],
});
```

### Event

```javascript
JSONLDSchemas.event({
  name: "Event Name",
  description: "Event description",
  image: "https://example.com/event.jpg",
  startDate: "2025-12-25T10:00:00",
  endDate: "2025-12-25T18:00:00",
  status: "https://schema.org/EventScheduled",
  mode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    name: "Venue Name",
    street: "123 Main St",
    city: "Anytown",
    region: "CA",
    zip: "12345",
    country: "US",
  },
  offers: {
    price: "50.00",
    currency: "USD",
    url: "https://example.com/tickets",
  },
});
```

### LocalBusiness

```javascript
JSONLDSchemas.localBusiness({
  type: "PlumberService", // or other business type
  name: "Business Name",
  description: "Description",
  url: "https://example.com",
  telephone: "+1-555-1234",
  address: {
    /* Address object */
  },
  image: "https://example.com/image.jpg",
  priceRange: "$$",
  hours: [
    /* Hours */
  ],
});
```

### Organization

```javascript
JSONLDSchemas.organization({
  name: "Organization Name",
  url: "https://example.com",
  logo: "https://example.com/logo.png",
  description: "Description",
  contact: {
    phone: "+1-555-1234",
    type: "Customer Service",
  },
  socials: ["https://facebook.com/...", "https://twitter.com/..."],
});
```

### Article

```javascript
JSONLDSchemas.article({
  title: "Article Title",
  description: "Article description",
  image: "https://example.com/article.jpg",
  author: "Author Name",
  published: "2025-10-22T10:00:00Z",
  modified: "2025-10-22T14:00:00Z",
  url: "https://example.com/article",
});
```

### Menu

```javascript
JSONLDSchemas.menu({
  name: "Menu Name",
  description: "Menu description",
  sections: [
    /* MenuSection objects */
  ],
});
```

---

## Real-World Examples

### Example 1: Restaurant with Dynamic Menu

**HTML:**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="dynamic-jsonld-module.js"></script>
  </head>
  <body data-page="restaurant">
    <div class="restaurant-name">Italian Trattoria</div>
    <div class="restaurant-phone">+1-555-1234</div>

    <div class="menu-container">
      <div class="menu-item">
        <span class="item-name">Pasta Carbonara</span>
        <span class="item-price">$18.99</span>
      </div>
      <!-- More items -->
    </div>

    <script>
      const jsonld = new DynamicJSONLD({ debug: true });

      jsonld.registerSchema("restaurant", () => {
        const data = jsonld.parseDOM({
          name: ".restaurant-name",
          phone: ".restaurant-phone",
        });

        const menuItems = jsonld.parseItems(".menu-item", {
          name: ".item-name",
          price: ".item-price",
        });

        return JSONLDSchemas.restaurant({
          ...data,
          url: window.location.href,
          address: {
            street: "456 Pasta Lane",
            city: "Rome",
            region: "Italy",
          },
          cuisines: ["Italian"],
          hours: ["Mo-Su 11:00-23:00"],
          menu: {
            name: "Main Menu",
            hasMenuSection: [
              {
                "@type": "MenuSection",
                name: "Pasta",
                hasMenuItem: menuItems.map((item) => ({
                  "@type": "MenuItem",
                  name: item.name,
                  offers: {
                    "@type": "Offer",
                    price: item.price.replace("$", ""),
                    priceCurrency: "USD",
                  },
                })),
              },
            ],
          },
        });
      });
    </script>
  </body>
</html>
```

### Example 2: E-commerce Product Page

**HTML:**

```html
<body data-page="product">
  <h1 class="product-name">Premium Headphones</h1>
  <span class="product-price">$199.99</span>
  <img src="headphones.jpg" class="product-image" />

  <script>
    const jsonld = new DynamicJSONLD();

    jsonld.registerSchema("product", () => {
      const data = jsonld.parseDOM({
        name: ".product-name",
        price: ".product-price",
        image: ".product-image",
      });

      return JSONLDSchemas.product({
        ...data,
        brand: "AudioBrand",
        url: window.location.href,
        rating: { value: 4.7, count: 245 },
      });
    });
  </script>
</body>
```

### Example 3: Event Page

**HTML:**

```html
<body data-page="event">
  <h1 class="event-name">Tech Conference 2025</h1>
  <p class="event-date">2025-11-15</p>

  <script>
    const jsonld = new DynamicJSONLD();

    jsonld.registerSchema("event", () =>
      JSONLDSchemas.event({
        name: "Tech Conference 2025",
        startDate: "2025-11-15T09:00:00",
        endDate: "2025-11-15T17:00:00",
        location: {
          name: "Convention Center",
          city: "San Francisco",
          region: "CA",
        },
        offers: {
          price: "299.99",
          currency: "USD",
        },
      })
    );
  </script>
</body>
```

---

## Integration with CI/CD Template

### Project Structure

```
/template/
├── /assets/
│   └── /js/
│       └── dynamic-jsonld-module.js
├── /config/
│   └── jsonld-config.json (Optional schema configurations)
├── layouts/
│   ├── base.html
│   └── page.html
└── pages/
    ├── restaurant.html
    ├── product.html
    └── event.html
```

### Usage in Template

**In your layout file:**

```html
<script src="/assets/js/dynamic-jsonld-module.js"></script>
<script src="/config/jsonld-config.json"></script>
<script>
  // Load config and initialize
  const jsonld = new DynamicJSONLD(window.jsonldConfig || {});

  // Auto-inject based on page type
  // or manually inject as needed
</script>
```

---

## Best Practices

1. **Always validate** - Test your JSON-LD at https://schema.org/
2. **Keep it accurate** - Update schema data when content changes
3. **Use appropriate types** - Choose the most specific schema type
4. **Include images** - Rich results with images get more clicks
5. **Test on pages** - Use Google Search Console to validate
6. **Monitor performance** - Debug mode should be off in production
7. **Regular updates** - Stay current with schema.org recommendations

---

## Troubleshooting

### Schema not appearing in search results

1. Validate JSON-LD at https://schema.org/
2. Check browser console for errors
3. Ensure schema is properly formatted
4. Wait for Google to re-index (can take days)

### Multiple schemas being injected

1. Check if auto-injection is conflicting with manual injection
2. Use `jsonld.clearInjected()` before injecting new schema
3. Verify `autoInject` is set correctly

### Data not being parsed from DOM

1. Check CSS selectors match your HTML
2. Use `debug: true` to see what's being parsed
3. Verify elements exist before parsing
4. Use `injectAfterElement()` if content loads asynchronously

### Performance issues

1. Disable `debug` mode in production
2. Use `injectAfterDelay()` for non-critical schemas
3. Parse only necessary elements
4. Minify the module for production

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Node.js (for server-side use)

---

## License

This module is ready for use in your CI/CD projects. Customize and distribute as needed.

---

## Version

**v1.0.0** - November 2025

**Created for:** Web developers and automation projects
**Adapted from:** Production-tested implementation
**Ready for:** CI/CD project template integration
