/** @type {import('splendid').Config} */
const config = {
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[{{ trademark }}]({{ website }})',
    },
  ],
  pages: '~/pages',
  elements: ['elements', '../help/elements'],
  // for sitemap and social-buttons
  url: '{{ URL }}',
  // which prefixes to keep in the main CSS
  prefixes: ['-webkit-hyphens', '-ms-hyphens'],
}

export default config