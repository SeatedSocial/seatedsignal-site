// After `vite build`: write one index.html per route with its own title, description, canonical and
// OG tags, a real 404.html, sitemap.xml and robots.txt. Vercel serves /features from dist/features/index.html
// and returns 404.html with a 404 status for anything else, so the catch-all rewrite is gone.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { ROUTES, SITE } from "../src/routes.js"

const dist = new URL("../dist/", import.meta.url).pathname
const base = readFileSync(join(dist, "index.html"), "utf8")
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

function render(route) {
  const url = SITE + (route.path === "/" ? "/" : route.path)
  let html = base
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(route.description)}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(route.title)}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(route.description)}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(route.title)}" />`)
  html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(route.description)}" />`)
  html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n${route.noindex ? '    <meta name="robots" content="noindex" />\n' : ""}  </head>`)
  return html
}

for (const route of ROUTES) {
  const out = route.path === "/" ? join(dist, "index.html") : join(dist, route.path.slice(1), "index.html")
  mkdirSync(join(out, ".."), { recursive: true })
  writeFileSync(out, render(route))
}

writeFileSync(join(dist, "404.html"), render({ path: "/404", title: "Page not found | Seated Signal", description: "Nothing lives at this address.", noindex: true }))

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.filter((r) => r.path !== "/sms-consent").map((r) =>
  `  <url><loc>${SITE}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join("\n")
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)

console.log(`postbuild: ${ROUTES.length} routes, 404.html, sitemap.xml, robots.txt`)
