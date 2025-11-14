/**
 * Dynamic JSON-LD Schema Generator Module
 * A reusable, configurable module for auto-generating and injecting JSON-LD structured data
 *
 * Features:
 * - Multiple schema types (Restaurant, LocalBusiness, Product, Event, etc.)
 * - Dynamic DOM parsing
 * - Configuration-driven setup
 * - Multiple injection modes
 * - Event-driven updates
 *
 * Usage:
 * 1. Initialize: const jsonld = new DynamicJSONLD(config);
 * 2. Generate: const schema = jsonld.generate(type);
 * 3. Inject: jsonld.inject(schema);
 */

class DynamicJSONLD {
  /**
   * Initialize the Dynamic JSON-LD module
   * @param {Object} config - Configuration object
   */
  constructor(config = {}) {
    this.config = {
      context: "https://schema.org",
      autoInject: config.autoInject !== false,
      pageIndicator: config.pageIndicator || "data-page",
      debug: config.debug || false,
      ...config,
    };
    this.schemas = {};
    this._log("DynamicJSONLD initialized", this.config);

    if (this.config.autoInject) {
      this._setupAutoInjection();
    }
  }

  /**
   * Setup auto-injection based on page type
   */
  _setupAutoInjection() {
    document.addEventListener("DOMContentLoaded", () => {
      const pageType = document.body.getAttribute(this.config.pageIndicator);
      if (pageType && this.config[pageType]) {
        const schema = this.generate(pageType);
        if (schema) {
          this.inject(schema);
          this._log(`Auto-injected schema for page type: ${pageType}`);
        }
      }
    });
  }

  /**
   * Register a custom schema generator
   * @param {string} type - Schema type name
   * @param {Function} generator - Function that returns schema object
   */
  registerSchema(type, generator) {
    this.schemas[type] = generator;
    this._log(`Schema registered: ${type}`);
  }

  /**
   * Generate a schema of specified type
   * @param {string} type - Schema type
   * @param {Object} overrides - Override properties
   * @returns {Object} Generated schema
   */
  generate(type, overrides = {}) {
    if (!this.schemas[type]) {
      this._warn(`Schema type not found: ${type}`);
      return null;
    }
    const schema = this.schemas[type]();
    return { ...schema, ...overrides };
  }

  /**
   * Inject JSON-LD script into document head
   * @param {Object} data - Schema data to inject
   * @param {Object} options - Injection options
   */
  inject(data, options = {}) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data, null, 2);
    script.setAttribute("data-source", options.source || "dynamic-jsonld");
    document.head.appendChild(script);
    this._log("Schema injected into document head");
  }

  /**
   * Inject after delay (useful for async content loading)
   * @param {string} type - Schema type
   * @param {number} delay - Delay in milliseconds
   */
  injectAfterDelay(type, delay = 1000) {
    setTimeout(() => {
      const schema = this.generate(type);
      if (schema) this.inject(schema);
    }, delay);
  }

  /**
   * Inject after DOM element appears
   * @param {string} type - Schema type
   * @param {string} selector - CSS selector to wait for
   * @param {number} timeout - Max wait time in milliseconds
   */
  injectAfterElement(type, selector, timeout = 5000) {
    const startTime = Date.now();
    const checkElement = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(checkElement);
        const schema = this.generate(type);
        if (schema) this.inject(schema);
        this._log(`Schema injected after element found: ${selector}`);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkElement);
        this._warn(`Timeout waiting for element: ${selector}`);
      }
    }, 100);
  }

  /**
   * Parse and extract data from DOM elements
   * @param {Object} selectors - CSS selectors for data extraction
   * @returns {Object} Extracted data
   */
  parseDOM(selectors) {
    const data = {};
    for (const [key, selector] of Object.entries(selectors)) {
      const element = document.querySelector(selector);
      if (element) {
        data[key] = element.textContent.trim();
      }
    }
    return data;
  }

  /**
   * Extract array of items from DOM
   * @param {string} selector - CSS selector for container
   * @param {Object} itemSelectors - Selectors for item properties
   * @returns {Array} Array of extracted items
   */
  parseItems(selector, itemSelectors) {
    const items = [];
    document.querySelectorAll(selector).forEach((element) => {
      const item = {};
      for (const [key, itemSelector] of Object.entries(itemSelectors)) {
        const el = element.querySelector(itemSelector);
        if (el) {
          item[key] = el.textContent.trim();
        }
      }
      if (Object.keys(item).length > 0) {
        items.push(item);
      }
    });
    return items;
  }

  /**
   * Get all injected JSON-LD scripts
   * @returns {Array} Array of JSON-LD data
   */
  getInjectedSchemas() {
    const schemas = [];
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => {
        try {
          schemas.push(JSON.parse(script.textContent));
        } catch (e) {
          this._warn("Failed to parse injected schema", e);
        }
      });
    return schemas;
  }

  /**
   * Remove all injected JSON-LD scripts
   */
  clearInjected() {
    document
      .querySelectorAll(
        'script[type="application/ld+json"][data-source="dynamic-jsonld"]'
      )
      .forEach((script) => {
        script.remove();
      });
    this._log("Cleared all injected schemas");
  }

  /**
   * Update an existing schema and re-inject
   * @param {string} type - Schema type
   * @param {Object} updates - Properties to update
   */
  update(type, updates) {
    this.clearInjected();
    const schema = this.generate(type, updates);
    if (schema) this.inject(schema);
    this._log(`Schema updated: ${type}`);
  }

  /**
   * Logging utility
   */
  _log(message, data = "") {
    if (this.config.debug) {
      console.log(`[DynamicJSONLD] ${message}`, data);
    }
  }

  /**
   * Warning utility
   */
  _warn(message, data = "") {
    console.warn(`[DynamicJSONLD] ${message}`, data);
  }
}

/**
 * Pre-built Schema Templates
 * Reusable templates for common business types
 */
const JSONLDSchemas = {
  /**
   * Restaurant/CafeOrCoffeeShop schema
   */
  restaurant: (config) => ({
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    name: config.name || "Your Restaurant",
    description: config.description || "A great place to eat",
    url: config.url || window.location.origin,
    telephone: config.telephone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address?.street || "",
      addressLocality: config.address?.city || "",
      addressRegion: config.address?.region || "",
      postalCode: config.address?.zip || "",
      addressCountry: config.address?.country || "US",
    },
    geo: config.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: config.coordinates.lat,
          longitude: config.coordinates.lng,
        }
      : undefined,
    hasMenu: config.menu ? { "@type": "Menu", ...config.menu } : undefined,
    servesCuisine: config.cuisines || [],
    priceRange: config.priceRange || "$$",
    openingHours: config.hours || [],
    image: config.image || "",
    aggregateRating: config.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: config.rating.value,
          reviewCount: config.rating.count,
        }
      : undefined,
    review: config.reviews || [],
  }),

  /**
   * Product schema
   */
  product: (config) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name || "Product Name",
    description: config.description || "",
    image: config.image || "",
    brand: {
      "@type": "Brand",
      name: config.brand || "",
    },
    offers: {
      "@type": "Offer",
      url: config.url || window.location.href,
      priceCurrency: config.currency || "USD",
      price: config.price || "0",
      availability: config.availability || "https://schema.org/InStock",
    },
    aggregateRating: config.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: config.rating.value,
          reviewCount: config.rating.count,
        }
      : undefined,
    review: config.reviews || [],
  }),

  /**
   * Event schema
   */
  event: (config) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: config.name || "Event Name",
    description: config.description || "",
    image: config.image || "",
    startDate: config.startDate || new Date().toISOString(),
    endDate: config.endDate || new Date().toISOString(),
    eventStatus: config.status || "https://schema.org/EventScheduled",
    eventAttendanceMode:
      config.mode || "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: config.location?.name || "",
      address: {
        "@type": "PostalAddress",
        streetAddress: config.location?.street || "",
        addressLocality: config.location?.city || "",
        addressRegion: config.location?.region || "",
        postalCode: config.location?.zip || "",
        addressCountry: config.location?.country || "US",
      },
    },
    offers: config.offers
      ? {
          "@type": "Offer",
          url: config.offers.url || window.location.href,
          price: config.offers.price || "0",
          priceCurrency: config.offers.currency || "USD",
          availability:
            config.offers.availability || "https://schema.org/InStock",
        }
      : undefined,
  }),

  /**
   * LocalBusiness schema
   */
  localBusiness: (config) => ({
    "@context": "https://schema.org",
    "@type": config.type || "LocalBusiness",
    name: config.name || "Business Name",
    description: config.description || "",
    url: config.url || window.location.origin,
    telephone: config.telephone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address?.street || "",
      addressLocality: config.address?.city || "",
      addressRegion: config.address?.region || "",
      postalCode: config.address?.zip || "",
      addressCountry: config.address?.country || "US",
    },
    image: config.image || "",
    priceRange: config.priceRange || "",
    openingHours: config.hours || [],
  }),

  /**
   * Organization schema
   */
  organization: (config) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name || "Organization Name",
    url: config.url || window.location.origin,
    logo: config.logo || "",
    description: config.description || "",
    contactPoint: config.contact
      ? {
          "@type": "ContactPoint",
          telephone: config.contact.phone || "",
          contactType: config.contact.type || "Customer Service",
        }
      : undefined,
    sameAs: config.socials || [],
  }),

  /**
   * Article schema
   */
  article: (config) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title || "Article Title",
    description: config.description || "",
    image: config.image || "",
    datePublished: config.published || new Date().toISOString(),
    dateModified: config.modified || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: config.author || "Author Name",
    },
    mainEntity: {
      "@type": "WebPage",
      "@id": config.url || window.location.href,
    },
  }),

  /**
   * Menu schema (for restaurants)
   */
  menu: (config) => ({
    "@context": "https://schema.org",
    "@type": "Menu",
    name: config.name || "Menu",
    description: config.description || "",
    hasMenuSection: config.sections || [],
  }),

  /**
   * Review schema
   */
  review: (config) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": config.itemType || "LocalBusiness",
      name: config.itemName || "Business Name",
      image: config.itemImage || "",
      url: config.itemUrl || window.location.origin,
    },
    author: {
      "@type": "Person",
      name: config.author || "Reviewer Name",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: config.rating?.value || "5",
      bestRating: config.rating?.best || "5",
      worstRating: config.rating?.worst || "1",
    },
    reviewBody: config.body || "Review text goes here",
    datePublished: config.published || new Date().toISOString(),
    publisher: config.publisher
      ? {
          "@type": "Organization",
          name: config.publisher,
        }
      : undefined,
  }),
};

// Export for use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DynamicJSONLD, JSONLDSchemas };
}
