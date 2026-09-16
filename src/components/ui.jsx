import { useEffect, useRef, useState, createContext, useContext } from "react"
import { startScroll, scrollToTop, scrollToId } from "../motion"
import { startAnalytics, pageview, track } from "../analytics"

export const CALENDLY = "https://calendly.com/seated-social/signal-demo"
export const CONTACT_EMAIL = "alex@seatedsignal.com"

// ---------------------------------------------------------------------------
// Tiny path router. Vercel rewrites every path to index.html (vercel.json).
// ---------------------------------------------------------------------------
const RouteCtx = createContext({ path: "/", go: () => {} })

export function useRoute() { return useContext(RouteCtx) }

export function Router({ children }) {
  const [path, setPath] = useState(() => (typeof window === "undefined" ? "/" : normalize(window.location.pathname)))
  useEffect(() => {
    startScroll()
    startAnalytics().then(() => pageview(window.location.pathname))
    const onPop = () => setPath(normalize(window.location.pathname))
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])
  const go = (to) => {
    if (to.startsWith("http") || to.startsWith("mailto:")) { window.location.href = to; return }
    const [p, hash] = to.split("#")
    const next = normalize(p || "/")
    if (next !== path) {
      window.history.pushState({}, "", next + (hash ? "#" + hash : ""))
      setPath(next)
      pageview(next)
    }
    if (hash) {
      setTimeout(() => scrollToId(hash), next !== path ? 120 : 0)
    } else {
      scrollToTop(true)
    }
  }
  return <RouteCtx.Provider value={{ path, go }}>{children}</RouteCtx.Provider>
}

function normalize(p) {
  if (!p) return "/"
  const t = p.replace(/\/+$/, "")
  return t === "" ? "/" : t
}

export function Link({ to, className, children, ...rest }) {
  const { go, path } = useRoute()
  const external = to.startsWith("http") || to.startsWith("mailto:")
  if (external) {
    const onClick = () => {
      if (to.includes("calendly.com")) track("calendly_clicked", { from: path })
      else if (to.includes("stripe.com")) track("stripe_clicked", { from: path })
      else if (to.includes("getdoublenickel.com")) track("dn_listing_clicked", { from: path })
    }
    return <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className} onClick={onClick} {...rest}>{children}</a>
  }
  const active = path === to.split("#")[0]
  return (
    <a
      href={to}
      className={[className, active ? "active" : ""].filter(Boolean).join(" ")}
      onClick={(e) => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); go(to) }}
      {...rest}
    >{children}</a>
  )
}

export function Btn({ to, variant = "primary", size, block, children, arrow, ...rest }) {
  const cls = ["btn", variant, size, block ? "block" : ""].filter(Boolean).join(" ")
  const inner = <>{children}{arrow && <span className="arrow" aria-hidden="true">&rarr;</span>}</>
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  return <button className={cls} {...rest}>{inner}</button>
}

// ---------------------------------------------------------------------------
// Reveal on scroll
// ---------------------------------------------------------------------------
export function Reveal({ children, className = "", as: Tag = "div", delay = 0, style, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { rootMargin: "0px 0px -10% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ ...(delay ? { transitionDelay: `${delay}ms` } : {}), ...(style || {}) }} {...rest}>{children}</Tag>
}

// ---------------------------------------------------------------------------
// SMS thread
// msgs: [{ dir: "out" | "in", text, time }] or [{ sys: "FLAG OPENED", tone: "pink" }]
// ---------------------------------------------------------------------------
export function Thread({ name, sub, initials, msgs, animate = false }) {
  const ref = useRef(null)
  const [play, setPlay] = useState(!animate)
  useEffect(() => {
    if (!animate) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") { setPlay(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [animate])
  return (
    <div ref={ref} className={`thread ${animate && play ? "animate" : ""}`} aria-label="Example text conversation">
      <div className="head">
        <div className="avatar" aria-hidden="true">{initials}</div>
        <div className="who">{name}<small>{sub}</small></div>
      </div>
      <div className="msgs" style={animate && !play ? { visibility: "hidden" } : undefined}>
        {msgs.map((m, i) => m.sys
          ? <div key={i} className={`sysrow ${m.tone || ""}`}><span className="dot" /> {m.sys}</div>
          : <div key={i} className={`bubble ${m.dir}`}>{m.text}{m.time && <time>{m.time}</time>}</div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Nav + Footer
// ---------------------------------------------------------------------------
const NAV = [["/features", "Features"], ["/pricing", "Pricing"], ["/playbook", "Playbook"]]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { path } = useRoute()
  useEffect(() => { setOpen(false) }, [path])
  return (
    <nav className={`nav ${open ? "open" : ""}`}>
      <div className="progress" aria-hidden="true" />
      <div className="container">
        <Link to="/" className="logo" aria-label="Seated Signal home"><img src="/brand/lockup-dark.svg" alt="Seated Signal" width="240" height="27" /></Link>
        <div className="links">
          {NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          <Btn to="/trial" size="sm">Start free trial</Btn>
        </div>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      </div>
      <div className="drawer">
        {NAV.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        <Link to="/trial">Start free trial</Link>
        <Link to={CALENDLY}>Book a call</Link>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="brand">
            <img src="/brand/lockup-dark.svg" alt="Seated Signal" width="220" height="24" />
            <p>SMS driver retention for trucking carriers. Texts that sound like a person, replies that reach one.</p>
          </div>
          <div className="col">
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/trial">Free trial</Link>
            <Link to="/playbook">First 90 playbook</Link>
            <Link to="/integrations/double-nickel">Double Nickel integration</Link>
          </div>
          <div className="col">
            <h4>Talk to us</h4>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a 30 minute call</a>
            <span>Seated Social LLC, Meridian, Idaho</span>
          </div>
          <div className="col">
            <h4>Legal</h4>
            <a href="https://seatedsocial.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a>
            <a href="https://seatedsocial.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of service</a>
            <a href="https://seatedsocial.com/disclaimers" target="_blank" rel="noopener noreferrer">Disclaimers</a>
            <Link to="/drivers">Got a text from us?</Link>
            <a href="/sms-consent">SMS consent</a>
          </div>
        </div>
        <div className="family">
          <a href="https://seatedsocial.com" target="_blank" rel="noopener noreferrer">
            <div className="fname"><span>SEATED </span>SOCIAL</div>
            <div className="ftag">Driver recruiting campaigns for carriers</div>
          </a>
          <Link to="/">
            <div className="fname"><span>SEATED </span>SIGNAL</div>
            <div className="ftag">SMS driver retention</div>
          </Link>
          <a href="https://seatedselect.com" target="_blank" rel="noopener noreferrer">
            <div className="fname"><span>SEATED </span>SELECT</div>
            <div className="ftag">Video lead forms for recruiting</div>
          </a>
        </div>
        <div className="bottom">
          <span>&copy; {new Date().getFullYear()} Seated Social LLC. All rights reserved.</span>
          <span>Built in Idaho by the people who answer the email.</span>
        </div>
      </div>
    </footer>
  )
}

export function CtaBand({ title, body, primary = ["/trial", "Start free trial"], secondary = [CALENDLY, "Book a call"] }) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="row">
          <Btn to={primary[0]} arrow>{primary[1]}</Btn>
          {secondary && <Btn to={secondary[0]} variant="ghost">{secondary[1]}</Btn>}
        </div>
      </div>
    </section>
  )
}

export function FAQ({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

// Lead form post, shared by trial + playbook. Swallows network errors the way the old site did.
export async function postLead(payload) {
  if (payload.website) return false // honeypot filled: a bot, drop it silently
  const qs = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const body = {
    ...payload,
    submitted_at: new Date().toISOString(),
    utm_source: qs.get("utm_source") || "",
    utm_medium: qs.get("utm_medium") || "",
    utm_campaign: qs.get("utm_campaign") || "",
  }
  try {
    const r = await fetch("https://admin.seatedsocial.com/api/leads.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    track(payload.source === "playbook-download" ? "playbook_submitted" : "trial_submitted", { ok: r.ok, fleet: payload.fleet || "" })
    return r.ok
  } catch (e) {
    track(payload.source === "playbook-download" ? "playbook_submitted" : "trial_submitted", { ok: false, fleet: payload.fleet || "" })
    return false
  }
}

// Hidden field bots fill in and people never see.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: -9999, top: -9999, height: 0, overflow: "hidden" }}>
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  )
}
