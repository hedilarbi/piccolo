import sanitizeHtml from "sanitize-html";

export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["p", "h2", "h3", "strong", "em", "a", "blockquote", "figure", "img", "figcaption", "ul", "ol", "li", "br"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: { a: (_tag, attrs) => ({ tagName: "a", attribs: { ...attrs, rel: "noopener noreferrer", ...(attrs.href?.startsWith("http") ? { target: "_blank" } : {}) } }) },
  });
}

export function storedArticleImages(html: string) {
  return [...html.matchAll(/src=["'](\/img\/articles\/[a-zA-Z0-9._-]+)["']/g)].map(match => match[1]);
}
