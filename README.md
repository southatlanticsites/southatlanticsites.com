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

`listings.html` uses the "New Maps Platform API Key" in the Google Cloud project "South Atlantic Sites Listings" (APIs & Services → Credentials). Its application restriction is set to None, so it works on any domain. If you ever restrict it to specific websites, list every site that uses the key (this site and the older property map on github.io included), or the maps on the sites left out will stop loading.

## Deploy

Push to the `main` branch of the `southatlanticsites/southatlanticsites.com` repository. GitHub Pages rebuilds in about a minute.

- Pages source: Deploy from a branch → `main`, `/ (root)`.
- Custom domain: `www.southatlanticsites.com`, set by the `CNAME` file in this repo. Don't delete that file.
- Enforce HTTPS is on, so `http://` visits redirect to `https://`.

Live since October 6, 2026. The previous site was on Wix.

## Domain and DNS

The domain is registered at name.com, and DNS is hosted there on name.com's default nameservers. Manage records at name.com → southatlanticsites.com → Manage DNS Records.

| Type | Host | Value | Purpose |
|---|---|---|---|
| A ×4 | @ | 185.199.108.153, .109.153, .110.153, .111.153 | GitHub Pages |
| CNAME | www | southatlanticsites.github.io | GitHub Pages |
| MX | @ | smtp.google.com (priority 1) | Google Workspace mail |
| TXT | @ | `v=spf1 include:_spf.google.com include:_spf.mlsend.com ~all` | SPF for Gmail and MailerLite |
| TXT | google._domainkey | `v=DKIM1; k=rsa; p=…` | Gmail DKIM (key generated in Google Admin → Apps → Gmail → Authenticate email) |
| CNAME | litesrv._domainkey | litesrv._domainkey.mlsend.com | MailerLite DKIM |

If you add another service that sends email as @southatlanticsites.com, add its `include:` to the SPF record rather than creating a second SPF record.
