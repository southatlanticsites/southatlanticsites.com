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

Every property is one entry in `js/listings.js` and every entry has an `img` (a photo in `img/listings/`). The homepage shows all of them six at a time with arrows. Give an entry `"featured": 1` through `"featured": 6` to pin it to the first page in that order; the rest follow in file order. Remove an entry when a property sells or leases.

Flyers live in the shared Google Drive folder "Flyers". Each entry's `flyer` link points at the PDF there, and `id` is the Drive file id. Drive serves a first-page preview of any flyer at `https://drive.google.com/thumbnail?id=FILE_ID&sz=w800`.

## Forms

- Subscribe box posts to the MailerLite "Email Subscriber" embedded form (account 746528, form 198341311600788702). Double opt-in is on, so people confirm by email before they appear in the "Website Subscriber" group.
- Contact form posts to the Google Form "Tell us about the property or the requirement" through a hidden iframe. Responses appear in the form's Responses tab; turn on email notifications there to get each one in your inbox.

## Google Maps

`listings.html` uses the Google Maps JavaScript API key from the original map. It works on southatlanticsites.github.io today. Before the custom domain goes live, add `southatlanticsites.com/*` and `www.southatlanticsites.com/*` to the key's HTTP-referrer allowlist in Google Cloud (APIs & Services → Credentials).

## Deploy

1. Push to the `main` branch of the `southatlanticsites/southatlanticsites.com` repository.
2. Repo → Settings → Pages → Source: Deploy from a branch → `main`, `/ (root)`.
3. When ready to go live: add a `CNAME` file containing `www.southatlanticsites.com`, then at name.com set four A records for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a CNAME for `www` → `southatlanticsites.github.io`. Leave the MX and TXT records for Google Workspace untouched. Turn on "Enforce HTTPS" in the Pages settings once the certificate is issued.
