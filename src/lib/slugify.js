export const slugify = (text) => {
  return text
    .toString()                           // Convert to string
    .toLowerCase()                        // Convert to lowercase
    .trim()                              // Trim whitespace from both ends
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w\-]+/g, '')            // Remove all non-word chars
    .replace(/\-\-+/g, '-')              // Replace multiple - with single -
    .replace(/^-+/, '')                  // Trim - from start of text
    .replace(/-+$/, '');
}