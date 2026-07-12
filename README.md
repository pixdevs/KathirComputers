# Kathir Computers & Power Electronics

Static website for Kathir Computers and Power Electronics — an engineering services and solutions provider based in Kinathukadavu, Coimbatore.

Vanilla HTML, CSS, and JavaScript. No build step, no package dependencies. Ready for [GitHub Pages](https://pages.github.com/).

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080

# Node (if available)
npx serve .
```

Then visit `http://localhost:8080`.

## Publish on GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch (site files at the repo root).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. After a minute or two, the site is live at `https://<username>.github.io/<repo>/`.

Optional: add a `CNAME` file at the root if you use a custom domain.

### Set your public site URL (SEO / social)

Open Graph, Twitter cards, canonical URL, JSON-LD, `robots.txt`, and `sitemap.xml` use the placeholder `TODO_SITE_URL`.

After Pages is live, replace **every** occurrence of `TODO_SITE_URL` with your origin (**no trailing slash**), for example:

```text
https://yourname.github.io/KathirComputers
```

Search the repo for `TODO_SITE_URL` and replace in:

- `index.html` (canonical, Open Graph, Twitter, JSON-LD)
- `robots.txt`
- `sitemap.xml`

Share previews (LinkedIn, WhatsApp, X) need absolute `og:image` URLs to work.

## Structure

```
index.html                 # Single-page site + SEO meta
css/styles.css             # Theme and layout
js/main.js                 # Nav, scroll reveal, accordion
robots.txt                 # Crawler rules
sitemap.xml                # Sitemap
assets/logo.png            # Original (white background)
assets/logo-transparent.png
assets/og-image.png        # Social / Open Graph share image
assets/kc-vector.png       # Hero visual
```
