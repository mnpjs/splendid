/** @type {import('splendid').Config} */
const config = {
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[{{ trademark }}]({{ website }})',
    },
  ],
  // for sitemap and social-buttons
  url: '{{ URL }}',
}

export default config