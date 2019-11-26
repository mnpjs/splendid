# CSS

This folder is for auto-generated styles. It is read-only and
should not be used by the user of _Splendid_. Any stylesheets
should be included in the `styles` directory.

## Combined And Prefixes

The combined CSS are put in here. _Splendid_ will generate
a stylesheet with modern rules (without prefixes), but it
will also create another CSS file with vendor prefixes.
When a page is loaded, there's a small JS algorithm used to
find out if any of the rules which have prefixes are not
supported by the browser. If this is the case, the prefixed
CSS is also loaded.

This strategy allows to generate smallest possible CSS files
without including any prefixes. These files will be suitable
for the majority of modern browsers. When this is true, the
message is displayed in the console:

```s
💽 Browser supports all modern CSS properties.
```

To specify which prefixes should be included in the main CSS,
and not in the prefixes CSS, the `prefixes` option is used in
the config:

```js
{
  prefixes: ['-webkit-hyphens', '-ms-hyphens'],
}
```

For example, because the adoption of hyphens is quite low
(e.g., _Safari_ does not support it at all), it is better
to include those prefixes in the main CSS. Otherwise, the
whole prefixes file would have to be downloaded just because
of hyphens.