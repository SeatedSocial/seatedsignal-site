// Scroll engine: Lenis (inertia scroll) synced to GSAP ScrollTrigger.
// Everything here is a no-op when the visitor prefers reduced motion.
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

let lenis = null

export function startScroll() {
  if (lenis || typeof window === "undefined" || reducedMotion()) return
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: "smooth" })
}

// Run a GSAP context scoped to a ref. Reverted on unmount, so route changes are clean.
export function useFx(build, deps = []) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      build(ref.current)
    }, ref)
    // Fonts and images shift layout after first paint; refresh once they settle.
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 900)
    document.fonts?.ready?.then(() => ScrollTrigger.refresh())
    return () => { clearTimeout(t1); clearTimeout(t2); ctx.revert() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}

export { gsap, ScrollTrigger }

// ---------------------------------------------------------------------------
// Reusable effects
// ---------------------------------------------------------------------------

// Words fade from dim to full as the block scrolls through the viewport (Apple-style).
export function wordReveal(el, opts = {}) {
  const words = el.querySelectorAll(".w")
  if (!words.length) return
  gsap.fromTo(words, { opacity: 0.14 }, {
    opacity: 1, ease: "none", stagger: 0.06,
    scrollTrigger: { trigger: el, start: opts.start || "top 78%", end: opts.end || "top 28%", scrub: 0.6 },
  })
}

// Simple rise-in for a group of children.
export function rise(targets, opts = {}) {
  gsap.from(targets, {
    y: opts.y ?? 28, opacity: 0, duration: opts.duration ?? 0.9, ease: "power3.out", stagger: opts.stagger ?? 0.08,
    scrollTrigger: { trigger: opts.trigger || targets, start: opts.start || "top 84%", once: true },
  })
}

// Move an element at a fraction of scroll speed while its section is on screen.
export function parallax(target, trigger, amount = -18) {
  gsap.fromTo(target, { yPercent: -amount }, {
    yPercent: amount, ease: "none",
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
  })
}

// Count a number up from zero as it enters. Keeps prefix/suffix like "$" and "%".
export function countUp(el) {
  const raw = el.textContent.trim()
  const m = raw.match(/^([^0-9]*)([0-9][0-9,\.]*)(.*)$/)
  if (!m) return
  const [, pre, num, post] = m
  const target = parseFloat(num.replace(/,/g, ""))
  const decimals = (num.split(".")[1] || "").length
  const obj = { v: 0 }
  el.textContent = pre + (0).toFixed(decimals) + post
  gsap.to(obj, {
    v: target, duration: 1.4, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onUpdate: () => { el.textContent = pre + obj.v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + post },
  })
}

// Split text into word spans for wordReveal. Keeps a highlighted span intact.
export function Words({ text, accent, as: Tag = "h2", className = "" }) {
  const parts = text.split(" ")
  return (
    <Tag className={className}>
      {parts.map((w, i) => <span key={i} className="w">{w}{i < parts.length - 1 ? " " : ""}</span>)}
      {accent && <span className="w grad-text"> {accent}</span>}
    </Tag>
  )
}
