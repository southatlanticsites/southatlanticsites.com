# southatlanticsites.com

Static site for South Atlantic Sites, hosted on GitHub Pages. No build step: edit the files, commit, push, and the site updates in about a minute.

## Pages

- `index.html` — homepage
- `listings.html` — property map (Google Maps) with every listing
- `css/site.css` — shared styles; brand colors are fixed at the top (`--navy #00274C`, `--gold #FFCB05`, `--gray #F1F1F1`)
- `js/listings.js` — the single source of listing data for both pages
- `js/site.js` — navigation, hero word rotation, featured cards
- `img/listings/` — property photos for featured cards
- `img/team/` — headshots

## Updating listings

Every property is one entry in `js/listings.js`. To feature a property on the homepage, set `"featured": true` and give it an `img` (a photo in `img/listings/`). The homepage shows the first six featured entries. Remove an entry when a property sells or leases.

Flyers live in the shared Google Drive folder "Flyers". Each entry's `flyer` link points at the PDF there, and `id` is the Drive file id. Drive serves a first-page preview of any flyer at `https://drive.google.com/thumbnail?id=FILE_ID&sz=w800`.

## Forms

- Subscribe box: replace the placeholder form in `index.html` with the MailerLite embedded-form HTML.
- Contact form: posts to a Google Form (`formResponse` URL + entry ids) once the form exists.

## Google Maps

`listings.html` uses a Google Maps JavaScript API key. In Google Cloud, the key's HTTP-referrer allowlist must include `southatlanticsites.com/*`, `www.southatlanticsites.com/*`, and the GitHub Pages preview address.

## Deploy

1. Push to the `main` branch of the `southatlanticsites/southatlanticsites.com` repository.
2. Repo → Settings → Pages → Source: Deploy from a branch → `main`, `/ (root)`.
3. When ready to go live: add a `CNAME` file containing `www.southatlanticsites.com`, then at name.com set four A records for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a CNAME for `www` → `southatlanticsites.github.io`. Leave the MX and TXT records for Google Workspace untouched. Turn on "Enforce HTTPS" in the Pages settings once the certificate is issued.
