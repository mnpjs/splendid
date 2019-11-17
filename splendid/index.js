/** @type {import('splendid').Config} */
const config = {
  layout: 'splendid/layout/main.html',
  replacements: [
    {
      re: /{{ company }}/g,
      replacement: '[Splendid](https://www.splendid.page)',
    },
  ],
  // output: 'docs',
  // appDir: 'splendid',

  // to generate sitemaps, use either folder or domain website.
  url: 'https://www.splendid.page',
}

export default config