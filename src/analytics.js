// Analytics: Vercel Web Analytics for page views (turn it on in the Vercel project, Analytics tab),
// plus PostHog for named events when VITE_POSTHOG_KEY is set in the Vercel project env.
import { inject, track as vercelTrack } from "@vercel/analytics"

let posthog = null
let firstView = true

// Meta Pixel is loaded in index.html. Safe no-op if it was blocked.
function fb(...args) { try { if (typeof window !== "undefined" && window.fbq) window.fbq(...args) } catch (e) { /* no-op */ } }

export async function startAnalytics() {
  if (typeof window === "undefined") return
  try { inject({ mode: import.meta.env.PROD ? "production" : "development" }) } catch (e) { /* no-op */ }
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!key) return
  try {
    const mod = await import("posthog-js")
    posthog = mod.default
    posthog.init(key, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      persistence: "localStorage+cookie",
      autocapture: false,
    })
  } catch (e) { posthog = null }
}

export function pageview(path) {
  // index.html already sent the landing PageView; send one for each in-app navigation after that.
  if (firstView) firstView = false
  else fb("track", "PageView")
  try { posthog?.capture("$pageview", { $current_url: window.location.href, path }) } catch (e) { /* no-op */ }
}

// One call site for every event on the site. Names are stable; treat them as an API.
//   trial_submitted, playbook_submitted, calendly_clicked, video_played, stripe_clicked, dn_listing_clicked
export function track(name, props = {}) {
  try { vercelTrack(name, props) } catch (e) { /* custom events need a paid Vercel plan; harmless otherwise */ }
  try { posthog?.capture(name, props) } catch (e) { /* no-op */ }
  if (name === "trial_submitted" && props.ok) fb("track", "Lead", { content_name: "pilot" })
  else if (name === "playbook_submitted" && props.ok) fb("track", "Lead", { content_name: "playbook" })
  else if (name === "calendly_clicked") fb("track", "Schedule", { content_name: props.from || "" })
  else if (name === "video_played") fb("trackCustom", "VideoPlayed", { video: props.video || "" })
}
