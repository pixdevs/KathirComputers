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

## Structure

```
index.html      # Single-page site
css/styles.css  # Theme and layout
js/main.js      # Nav, scroll reveal, active section
assets/logo.png             # Original (white background)
assets/logo-transparent.png # Transparent mark used on the site
```
