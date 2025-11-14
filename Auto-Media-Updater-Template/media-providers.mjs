// media-providers.mjs
// Multi-provider media service module supporting Unsplash, Pixabay, and Envato Elements
// Version: 1.1.1

import fetch from "node-fetch";

/**
 * Abstract base class for media providers
 */
class MediaProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async searchMedia(query) {
    throw new Error("searchMedia must be implemented by subclass");
  }

  validateApiKey() {
    if (!this.apiKey || this.apiKey.trim() === "") {
      throw new Error(`API key is required for ${this.constructor.name}`);
    }
  }
}

/**
 * Unsplash Media Provider
 * API Docs: https://unsplash.com/documentation
 */
class UnsplashProvider extends MediaProvider {
  constructor(apiKey) {
    super(apiKey);
    this.baseUrl = "https://api.unsplash.com";
  }

  async searchImage(query) {
    this.validateApiKey();
    
    const url = `${this.baseUrl}/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${this.apiKey}&per_page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const img = data.results[0];
        return {
          url: img.urls.regular,
          thumbnailUrl: img.urls.small,
          fullUrl: img.urls.full,
          photographer: img.user.name,
          photographerUrl: img.user.links.html,
          source: "unsplash",
          downloadLocation: img.links.download_location,
        };
      }
      return null;
    } catch (error) {
      console.error(`Unsplash API Error: ${error.message}`);
      throw error;
    }
  }
}

/**
 * Pixabay Media Provider
 * API Docs: https://pixabay.com/api/docs/
 */
class PixabayProvider extends MediaProvider {
  constructor(apiKey) {
    super(apiKey);
    this.baseUrl = "https://pixabay.com/api/";
  }

  async searchMedia(query) {
    this.validateApiKey();

    const url = `${this.baseUrl}?key=${this.apiKey}&q=${encodeURIComponent(
      query
    )}&image_type=photo&per_page=3&safesearch=true`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.hits && data.hits.length > 0) {
        const img = data.hits[0];
        return {
          url: img.webformatURL,
          thumbnailUrl: img.previewURL,
          fullUrl: img.largeImageURL,
          photographer: img.user,
          photographerUrl: `https://pixabay.com/users/${img.user}-${img.user_id}/`,
          source: "pixabay",
          tags: img.tags,
          downloads: img.downloads,
        };
      }
      return null;
    } catch (error) {
      console.error(`Pixabay API Error: ${error.message}`);
      throw error;
    }
  }
}

/**
 * Envato Elements Provider
 * Note: Envato Elements requires OAuth 2.0 authentication and has specific licensing requirements
 * API Docs: https://build.envato.com/api/
 * This is a simplified implementation - production use requires proper OAuth flow
 */
class EnvatoProvider extends MediaProvider {
  constructor(apiKey) {
    super(apiKey);
    this.baseUrl = "https://api.envato.com/v3";
  }

  async searchMedia(query) {
    this.validateApiKey();

    // Note: Envato API requires OAuth token, not a simple API key
    // This implementation assumes the apiKey is a personal token
    const url = `${this.baseUrl}/market/catalog/search?site=elements.envato.com&type=photo&term=${encodeURIComponent(
      query
    )}`;

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "User-Agent": "Auto-Media-Updater/1.1.1",
        },
      });

      if (!res.ok) {
        throw new Error(`Envato API returned status ${res.status}`);
      }

      const data = await res.json();

      if (data.matches && data.matches.length > 0) {
        const img = data.matches[0];
        return {
          url: img.previews?.icon_preview?.icon_url || img.thumbnail_url,
          thumbnailUrl: img.thumbnail_url,
          fullUrl: img.previews?.landscape_preview?.landscape_url || img.url,
          photographer: img.author_username || "Envato Elements",
          photographerUrl: img.author_url || "https://elements.envato.com",
          source: "envato",
          itemUrl: img.url,
          title: img.name,
        };
      }
      return null;
    } catch (error) {
      console.error(`Envato API Error: ${error.message}`);
      throw error;
    }
  }
}

/**
 * Factory function to create appropriate provider
 * @param {string} providerName - 'unsplash', 'pixabay', or 'envato'
 * @param {string} apiKey - API key for the provider
 * @returns {MediaProvider}
 */
export function createMediaProvider(providerName, apiKey) {
  const providers = {
    unsplash: UnsplashProvider,
    pixabay: PixabayProvider,
    envato: EnvatoProvider,
  };

  const ProviderClass = providers[providerName.toLowerCase()];
  if (!ProviderClass) {
    throw new Error(
      `Unknown provider: ${providerName}. Supported providers: ${Object.keys(
        providers
      ).join(", ")}`
    );
  }

  return new ProviderClass(apiKey);
}

/**
 * Get list of available providers with their details
 */
export function getAvailableProviders() {
  return {
    unsplash: {
      name: "Unsplash",
      description: "Free high-resolution photos",
      signupUrl: "https://unsplash.com/developers",
      rateLimit: "50 requests/hour (demo), 5000/hour (production)",
      requiresAttribution: true,
    },
    pixabay: {
      name: "Pixabay",
      description: "Free stock photos and vectors",
      signupUrl: "https://pixabay.com/api/docs/",
      rateLimit: "5000 requests/hour (free), 20000/hour (premium)",
      requiresAttribution: false,
    },
    envato: {
      name: "Envato Elements",
      description: "Premium stock photos (subscription required)",
      signupUrl: "https://elements.envato.com/",
      rateLimit: "Varies by subscription",
      requiresAttribution: false,
      requiresSubscription: true,
      note: "Requires active Envato Elements subscription and OAuth token",
    },
  };
}

export { UnsplashProvider, PixabayProvider, EnvatoProvider };
