/** @type {import('splendid').Config} */
const config = {
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[{{ org }}]({{ url }})',
    },
  ],
  // for sitemap and social-buttons
  url: '{{ url }}',
}

export default config