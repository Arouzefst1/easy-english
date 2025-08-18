# Easy English PWA

Offline English ↔ Hindi phrase helper. Edit, add, reorder phrases; works offline via service worker + localStorage.

## Quick Deploy to GitHub Pages

1. Create a new public repo on GitHub named `easy-english` (or any name).
2. Locally in this folder run:
```
git init
git add .
git commit -m "Initial PWA"
git branch -M main
git remote add origin https://github.com/Arouzefst1/easy-english.git
git push -u origin main
```
3. On GitHub: Settings → Pages → Build and deployment → Source = `Deploy from a branch`, Branch = `main` / root.
4. Wait ~1–2 minutes. Site URL: `https://Arouzefst1.github.io/easy-english/`
5. Open that URL in Chrome (desktop then phone). Chrome should offer Install.

If you use a different repo name, the URL is:
```
https://Arouzefst1.github.io/<repo-name>/
```
Ensure relative paths (you already use `manifest.webmanifest`, `icons/...` etc.).

## Updating
- Make changes
```
git add .
git commit -m "Update"
git push
```
- Clients: Hard refresh or reopen; bump `CACHE_NAME` in `service-worker.js` for guaranteed update.

## Optional Enhancements
- Export/Import custom phrases
- Offline fallback page
- Favorites/starred phrases
- Custom install button (`beforeinstallprompt`)

## License
Personal project.
