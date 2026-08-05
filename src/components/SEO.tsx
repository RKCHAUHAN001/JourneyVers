import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaData?: object;
}

const DEFAULT_TITLE = 'Journeyvers Travel | Royal Bespoke Journeys by Parivartya Corporation';
const DEFAULT_DESCRIPTION = 'Book budget and luxury tour packages in Hyderabad, Delhi, and Mumbai with Journeyvers by Parivartya Corporation. Custom AI itineraries, real-time tracking, and 24/7 concierge.';
const DEFAULT_KEYWORDS = 'Journeyvers, Travel, Tour with Journeyvers, Parivartya, Parivartya Corporation, Parivartya Travel, Hyderabad Tour Packages, Delhi Tour Packages, Mumbai Tour Packages, Luxury Travel India, Custom Tour Builder';
const SITE_URL = 'https://journeyvers.com';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogImage = 'https://journeyvers.com/assets/logo.png',
  schemaData,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    const fullTitle = title ? `${title} | Journeyvers - Parivartya Corporation` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to set/update meta tag
    const updateMetaTag = (nameAttr: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', 'Parivartya Corporation');

    // 3. Open Graph Tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', 'Journeyvers by Parivartya Corporation');
    updateMetaTag('property', 'og:type', 'website');

    const currUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
    updateMetaTag('property', 'og:url', currUrl);

    // 4. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currUrl);

    // 6. JSON-LD Schema
    const existingScript = document.getElementById('seo-jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, schemaData]);

  return null;
}
