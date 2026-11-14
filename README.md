# ARIAGH.SEOLITY

AI SEO operating system for WordPress and WooCommerce (Persian/RTL first, English included).

- **Product page:** https://ariagh1386atomv1.github.io/Seolity/
- **Live dashboard demo:** https://ariagh1386atomv1.github.io/Seolity/demo/

## Repository layout

| Path | What it is |
| --- | --- |
| `seolity/` | The WordPress plugin (v1.19.2). See `seolity/README.md` and `seolity/docs/`. |
| `site/` | Product page (`index.html`) published with GitHub Pages. |
| `site/demo/` | The plugin's real admin interface running in the browser against sample data. |
| `backup/`, `PROJECT_MAP.md` | Project notes and map. |

## About the live demo

`site/demo/` loads the unmodified admin assets from `seolity/assets/admin/` and answers
their REST calls with an in-browser mock (`mock-*.js`). The shop, numbers and AI answers
shown there are fictional sample data; nothing is sent to a server and no site is changed.

When the plugin's admin assets change, copy them again:

```
cp seolity/assets/admin/{app.css,editor.css,charts.js,ui.js,app.js,pages-*.js} site/demo/assets/admin/
```
