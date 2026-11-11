// Made by the SAS Listing Tool. Don't edit by hand: it's rewritten every time a listing is published.
// Add <script src="listings/listings-data.js"></script> right after js/listings.js on index.html and listings.html.
(function () {
  var TOOL = [
 {
  "name": "1548 E Williams St",
  "address": "1548 E Williams St",
  "city": "Apex, NC 27539",
  "type": "For Sale",
  "price": "Negotiable",
  "size": "6.10 AC",
  "zoning": "Planned Commercial Conditional Zoning (PC-CZ)",
  "available": "Available",
  "use": "Land",
  "broker": "Cameron Wilson",
  "highlights": "±6.1 AC Commercial Land · PC-CZ. Zoning: Planned Commercial Conditional Zoning (PC-CZ). Utilities: planned sewer from adjacent property; all others at site. Frontage: ~600' on NC-55",
  "flyer": "https://www.southatlanticsites.com/listings/1548-e-williams-st-apex/",
  "page": "https://www.southatlanticsites.com/listings/1548-e-williams-st-apex/",
  "img": "https://www.southatlanticsites.com/listings/1548-e-williams-st-apex/img/photo-1.jpg",
  "crop": 50,
  "lat": 35.706827,
  "lng": -78.837272,
  "tool": true
 },
 {
  "name": "SEC Clayton Blvd (US-70 Bus) & Gordon Rd",
  "address": "SEC Clayton Blvd (US-70 Bus) & Gordon Rd",
  "city": "Clayton, NC 27520",
  "type": "For Sale or Ground Lease",
  "price": "Sale Price: $1M/AC | Ground Lease: Negotiable",
  "size": "4.6 AC",
  "zoning": "CRM (Corridor Commercial)",
  "available": "Available",
  "use": "Retail",
  "broker": "Mike Wilen",
  "highlights": "±4.6 AC Retail Land · Divisible. Signalized hard corner on Clayton Blvd. Traffic: 22,000 VPD Clayton Blvd | 2,000 VPD Gordon Rd. Frontage: ±800' Clayton Blvd | ±225' Gordon Rd | Wise Rd",
  "flyer": "https://www.southatlanticsites.com/listings/clayton-blvd-gordon-rd-clayton/",
  "page": "https://www.southatlanticsites.com/listings/clayton-blvd-gordon-rd-clayton/",
  "img": "https://www.southatlanticsites.com/listings/clayton-blvd-gordon-rd-clayton/img/photo-1.jpg",
  "crop": 50,
  "lat": 35.607335,
  "lng": -78.415473,
  "tool": true
 }
];
  if (typeof LISTINGS === "undefined" || !Array.isArray(LISTINGS)) return;
  var STOP = { rd: 1, road: 1, st: 1, street: 1, dr: 1, drive: 1, ave: 1, ct: 1, court: 1, blvd: 1, hwy: 1, nc: 1, us: 1, suite: 1, ste: 1, of: 1, and: 1, at: 1, the: 1, nec: 1, nwc: 1, sec: 1, swc: 1 };
  var words = function (s) { return String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(function (w) { return w && !STOP[w]; }); };
  var same = function (a, b) {
    var x = words(a.address + " " + a.name), y = words(b.address + " " + b.name);
    var nx = x.filter(function (w) { return /^\d+$/.test(w); })[0], ny = y.filter(function (w) { return /^\d+$/.test(w); })[0];
    if (nx && ny && nx !== ny) return false;
    var hits = x.filter(function (w, i) { return x.indexOf(w) === i && y.indexOf(w) >= 0; }).length;
    return hits >= 2;
  };
  TOOL.forEach(function (t) {
    for (var i = LISTINGS.length - 1; i >= 0; i--) if (same(LISTINGS[i], t)) { if (LISTINGS[i].featured && !t.featured) t.featured = LISTINGS[i].featured; LISTINGS.splice(i, 1); }
    LISTINGS.push(t);
  });
})();
