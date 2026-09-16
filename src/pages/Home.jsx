import { useRef, useState } from "react"
import { Btn, Link, Thread, CtaBand } from "../components/ui"
import { useFx, gsap, ScrollTrigger, wordReveal, rise, parallax, countUp, Words } from "../motion"

// Illustrative conversation. Carrier and driver names are fictional.
const HERO_THREAD = [
  { dir: "out", text: "Hey Marcus, it's Dana at Northfork. Two weeks in. How's dispatch treating you?", time: "DAY 14 · 9:02 AM" },
  { dir: "in", text: "Honestly the home time isn't what I was told when I signed on.", time: "9:31 AM" },
  { sys: "Flag opened · Unhappy · Assigned to Dana", tone: "pink" },
  { dir: "out", text: "That's on us to fix. Call you at 3 today? I want to hear exactly what you were told.", time: "9:40 AM" },
  { dir: "in", text: "Yeah 3 works. Appreciate you asking.", time: "9:41 AM" },
  { sys: "Resolved · Retention save", tone: "green" },
]

const PROOF = [
  { num: "79%", label: "of drivers replied at day 7", src: "Brady Trucking" },
  { num: "71%", label: "replied at day 14", src: "Brady Trucking" },
  { num: "5", label: "drivers kept who were on their way out, about $42,500", src: "Brady Trucking · $8,234 per driver, ATA" },
  { num: "48 hrs", label: "from signed to first text", src: "Live in two days, month to month" },
]

const STEPS = [
  { idx: "01", title: "Your number", body: "Signal sets up a text number that belongs to your company. Drivers see your name, not ours.", bubble: { dir: "in", text: "Who is this?" }, bubble2: { dir: "out", text: "Dana, at Northfork. Same one you met at orientation. This is the number I'll text you from." } },
  { idx: "02", title: "We write, you approve", body: "We draft every program in your voice. Someone at your carrier reads and approves before the first text goes out, and every text after that.", sys: "Draft · First 90 · Day 7 · Awaiting Dana's approval", bubble: { dir: "out", text: "One week in, Marcus. Truck holding up? Anything from orientation you still need?" } },
  { idx: "03", title: "Replies come back to a person", body: "Every reply is read and scored. Anything that needs attention opens a flag and lands with the right person on your team, the same day.", bubble: { dir: "in", text: "Truck's fine. Still don't have my fuel card." }, sys: "Flag opened · Needs follow-up · Assigned to Dana" },
]

const PROGRAMS = [
  { tag: "Days 1 to 90", title: "First 90", body: "A 13-step onboarding drip across the first ninety days. Check-ins that sound like a person, timed to the days drivers actually quit.", sample: "Day 30, Marcus. First month done. Anything about the job that surprised you, good or bad?" },
  { tag: "Day 90 onward", title: "After day 90", body: "Mile Marker sends milestone texts at 180, 210, 240 and 365 days. Inside the Cab keeps the fleet talking with pulse check-ins and company updates, with tracked links so you know who read what.", sample: "Six months with us today. That's not nothing. Thanks for showing up every week." },
  { tag: "When a driver leaves", title: "Last 90", body: "Two exit texts and an optional two-minute survey, no names required. Recruiters see who would come back.", sample: "Sorry to see you go. Two quick questions so the next driver has it better than you did?" },
  { tag: "When something happens", title: "Moments", body: "A dispatcher logs what just happened to a driver: a breakdown, a short settlement, a missed weekend home. Signal drafts the text. A person reads it and sends it.", sample: "Heard about the breakdown outside Amarillo. Not the Tuesday you planned. Anything you need from us tonight?" },
]

export default function Home() {
  const root = useFx((el) => {
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    // Hero intro (time based, plays once)
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(q(".hero .eyebrow"), { y: 16, opacity: 0, duration: 0.6 })
      .from(q(".hero h1 .w"), { y: 40, opacity: 0, duration: 0.9, stagger: 0.05 }, "-=0.3")
      .from(q(".hero .lede, .hero .actions, .hero .fine"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
      .from(q(".hero .thread"), { y: 60, opacity: 0, scale: 0.96, duration: 1 }, "-=0.7")

    // Hero orbs drift
    parallax(q(".orb-a"), q(".hero"), -26)
    parallax(q(".orb-b"), q(".hero"), 18)

    mm.add("(min-width: 901px)", () => {
      // Pin the hero; thread messages arrive as you scroll
      const all = q(".hero .thread .msgs > *")
      const msgs = all.slice(1)
      gsap.set(msgs, { opacity: 0, y: 18 })
      gsap.timeline({
        scrollTrigger: { trigger: q(".hero")[0], start: "top top", end: "+=140%", pin: true, scrub: 0.8, anticipatePin: 1 },
      })
        .to(msgs, { opacity: 1, y: 0, stagger: 0.18, duration: 0.5, ease: "power2.out" })
        .to(q(".hero .copy"), { y: -40, opacity: 0.35, duration: 0.6 }, 0.3)
        .to(q(".hero .thread"), { y: -30, duration: 1 }, 0)

      // Horizontal "how it works"
      const track = q(".hscroll .track")[0]
      const dist = () => track.scrollWidth - window.innerWidth
      const hs = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: q(".hscroll")[0], start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      q(".hscroll .panel").forEach((p) => {
        gsap.from(p.querySelectorAll(".mini .msgs > *, .idx, h3, p, .btn"), {
          y: 24, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: p, containerAnimation: hs, start: "left 75%", once: true },
        })
      })

      // Stacked program cards: each earlier card scales back as the next slides over it
      const cards = q(".stack .program")
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return
        gsap.to(c, {
          scale: 0.94, opacity: 0.5, ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 120px", scrub: true },
        })
      })
    })

    mm.add("(max-width: 900px)", () => {
      // Mobile: no pinning, plain reveals
      gsap.set(q(".hero .thread .msgs > *"), { opacity: 1, y: 0 })
      rise(q(".hscroll .panel"), { stagger: 0.12 })
      rise(q(".stack .program"), { stagger: 0.1 })
    })

    // Proof numbers count up
    q(".proof .num").forEach(countUp)
    rise(q(".proof .cell"), { stagger: 0.1, trigger: q(".proof")[0] })

    // Word reveals on statement chapters
    q(".statement").forEach((s) => wordReveal(s))
    q(".light .orb").forEach((o) => parallax(o, o.closest("section"), -30))

    // Queue rows slide in
    rise(q(".loop .qitem"), { stagger: 0.14, trigger: q(".loop .queue")[0] })
    rise(q(".loop .copy > *"), { trigger: q(".loop .copy")[0] })
    gsap.to(q(".loop .sev.high"), { scale: 1.35, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" })

    // Reporting bars fill
    q(".report .bar i").forEach((b) => {
      gsap.from(b, { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 88%", once: true } })
    })
    rise(q(".report .copy > *"), { trigger: q(".report .copy")[0] })
    parallax(q(".report .queue"), q(".report")[0], -8)

    // Testimonial + walled off + generic reveals
    rise(q(".testimonial .copy > *"), { trigger: q(".testimonial")[0] })
    rise(q(".testimonial .phone"), { y: 40, trigger: q(".testimonial")[0] })
    rise(q(".works .works-row > *"), { stagger: 0.1, trigger: q(".works")[0] })
    rise(q(".facts .fact"), { stagger: 0.1, trigger: q(".facts")[0] })
    rise(q(".walled .head > *"), { trigger: q(".walled")[0] })

    return () => mm.revert()
  })

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="hero scene">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="container grid split">
          <div className="copy">
            <div className="eyebrow">SMS driver retention for trucking carriers</div>
            <Words as="h1" text="Your drivers are telling you everything." accent="Are you listening?" />
            <p className="lede" style={{ marginTop: 24 }}>
              Seated Signal texts your drivers from a number that belongs to your company, reads every reply, and puts the ones that need a person in front of one. Drivers never download anything. Nothing goes out that someone at your carrier didn't write or approve.
            </p>
            <div className="row actions">
              <Btn to="/trial" arrow>Start free trial</Btn>
              <Btn to="/#how" variant="ghost">See how it works</Btn>
            </div>
            <div className="fine">14 DAYS FREE · NO CARD · LIVE IN 48 HOURS</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Thread name="Marcus R." sub="DRIVER · DAY 14 · NORTHFORK CARRIERS" initials="MR" msgs={HERO_THREAD} />
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true"><span /></div>
      </section>

      {/* Proof strip */}
      <section className="proof">
        <div className="container">
          {PROOF.map((p) => (
            <div key={p.num} className="cell">
              <div className="num">{p.num}</div>
              <div className="label">{p.label}</div>
              <div className="src">{p.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Works with */}
      <section className="works">
        <div className="container">
          <div className="works-row">
            <div className="works-logos">
              <img src="/brand/double-nickel-dark.png" alt="Double Nickel" height="26" />
              <span className="plus" aria-hidden="true">+</span>
              <img src="/brand/mark.svg" alt="" height="22" />
            </div>
            <p>A listed Double Nickel integration partner. When a recruiter marks a driver hired, the driver is in Signal and the first check-in is scheduled. No export, no spreadsheet.</p>
            <Link to="/integrations/double-nickel" className="textlink">See how it works &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Problem, light chapter */}
      <section className="section light chapter">
        <div className="orb orb-c" />
        <div className="container">
          <div className="eyebrow">The problem</div>
          <Words className="statement" text="The first text most drivers get from their carrier is about a problem. A new driver shows up, gets a truck, and then hears nothing until something goes wrong. Ninety days later a recruiter finds out he's gone from the ATS." />
          <div className="grid three chapter-facts">
            <div><div className="big">90%+</div><p>annual driver turnover in trucking</p><div className="src">ATA</div></div>
            <div><div className="big">1 in 3</div><p>new hires leave inside their first 90 days</p><div className="src">Stay Metrics</div></div>
            <div><div className="big">$8,234</div><p>to replace one driver</p><div className="src">ATA</div></div>
          </div>
          <p className="closer">Most of them said something before they left. Nobody was listening on the other end.</p>
        </div>
      </section>

      {/* How it works, horizontal */}
      <section className="hscroll" id="how">
        <div className="track">
          <div className="panel intro">
            <div className="eyebrow">How it works</div>
            <h2>Your number.<br />Your words.<br />A person on every reply.</h2>
            <div className="hint mono">SCROLL &rarr;</div>
          </div>
          {STEPS.map((s) => (
            <div className="panel" key={s.idx}>
              <div className="idx mono">{s.idx}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="mini thread">
                <div className="msgs">
                  {s.bubble && s.bubble.dir === "in" && <div className="bubble in">{s.bubble.text}</div>}
                  {s.sys && s.idx === "02" && <div className="sysrow amber"><span className="dot" />{s.sys}</div>}
                  {s.bubble && s.bubble.dir === "out" && <div className="bubble out">{s.bubble.text}</div>}
                  {s.bubble2 && <div className="bubble out">{s.bubble2.text}</div>}
                  {s.sys && s.idx === "03" && <div className="sysrow"><span className="dot" />{s.sys}</div>}
                </div>
              </div>
            </div>
          ))}
          <div className="panel outro">
            <h2>Live in 48 hours.</h2>
            <p>We set it up. You approve the messages. The first texts go out the same week.</p>
            <Btn to="/trial" arrow>Start free trial</Btn>
          </div>
        </div>
      </section>

      {/* Programs, stacked cards */}
      <section className="section stack-section">
        <div className="container">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div className="narrow">
              <div className="eyebrow">What runs</div>
              <h2>Four programs. One number. Every day of a driver's time with you.</h2>
            </div>
            <Link to="/features" className="textlink">See every feature &rarr;</Link>
          </div>
          <div className="stack">
            {PROGRAMS.map((p, i) => (
              <div key={p.title} className="program" style={{ "--i": i }}>
                <div className="grid split">
                  <div>
                    <div className="tag">{p.tag}</div>
                    <h3 className="h2">{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  <div className="sample"><div className="bubble out">{p.sample}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autopilot statement, light chapter */}
      <section className="section light chapter">
        <div className="orb orb-d" />
        <div className="container">
          <div className="eyebrow">A person is always in the loop</div>
          <Words className="statement" text="Nothing here runs on autopilot. Signal reads every reply and scores it, keyword first, then a model for the ambiguous ones. It never acts on its own." />
        </div>
      </section>

      {/* Today queue */}
      <section className="section loop">
        <div className="container grid split reverse">
          <div className="queue" aria-label="Example Today queue">
            <div className="qhead"><span>Today</span><span>3 open</span></div>
            <div className="qitem">
              <span className="sev high" />
              <div><div className="name">Marcus R.</div><div className="meta">UNHAPPY · HIGH · DAY 14</div><div className="quote">"the home time isn't what I was told"</div></div>
              <div className="who">DANA</div>
            </div>
            <div className="qitem">
              <span className="sev med" />
              <div><div className="name">Luis T.</div><div className="meta">WENT QUIET · MED · DAY 62</div><div className="quote">No reply to the last two check-ins</div></div>
              <div className="who">DANA</div>
            </div>
            <div className="qitem">
              <span className="sev low" />
              <div><div className="name">Kendra W.</div><div className="meta">MILESTONE · 1 YEAR · TODAY</div><div className="quote">Draft ready for your approval</div></div>
              <div className="who">MIKE</div>
            </div>
          </div>
          <div className="copy">
            <div className="eyebrow">The Today queue</div>
            <h2>A flag, a severity, and a name on it.</h2>
            <p style={{ marginTop: 20 }}>A negative reply opens a flag with a type and a severity, assigns it to someone on your team, and puts it in their Today queue. When a reply deserves a second question, Signal drafts one and waits for a person to approve it.</p>
            <p style={{ marginTop: 18 }}>Your recruiters spend their time on the drivers who need them, not on reading every text.</p>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="section mid report">
        <div className="container grid split">
          <div className="copy">
            <div className="eyebrow">Reporting</div>
            <h2>Monday morning, you know who's slipping.</h2>
            <p style={{ marginTop: 20 }}>The Monday Minute email groups last week's replies into themes: pay, equipment, home time, dispatch. Theme favorability shows how drivers feel about each one over time.</p>
            <p style={{ marginTop: 18 }}>The monthly Executive Summary, in the app and as a PDF with your logo, counts retention saves in dollars so the number that matters is already in front of your owner.</p>
          </div>
          <div className="queue" aria-label="Example weekly themes">
            <div className="qhead"><span>Monday Minute · themes</span><span>last 7 days</span></div>
            {[["Home time", "high", 0.82, "Slipping"], ["Equipment", "med", 0.55, "Mixed"], ["Dispatch", "low", 0.4, "Steady"], ["Pay", "low", 0.34, "Steady"]].map(([t, s, w, lbl]) => (
              <div className="qitem" key={t}>
                <span className={`sev ${s}`} />
                <div><div className="name">{t}</div><div className="bar"><i style={{ width: `${w * 100}%` }} /></div></div>
                <div className="who">{lbl.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial: Radell, clip 10 */}
      <section className="section testimonial">
        <div className="container grid split reverse">
          <VideoCard />
          <div className="copy">
            <div className="eyebrow">From a carrier</div>
            <blockquote className="big-quote">"Signal has opened a door for the drivers to get in contact with me."</blockquote>
            <cite className="mono">Radell Andrews · Recruiting and Retention Manager · Brady Trucking</cite>
            <p style={{ marginTop: 26 }}>Seventy seconds on the driver who was one phone call from turning in his truck at day 30, and why he's still driving.</p>
          </div>
        </div>
      </section>

      {/* Walled off */}
      <section className="section mid walled">
        <div className="container">
          <div className="narrow head" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Walled off</div>
            <h2>Your drivers, your number, your data.</h2>
          </div>
          <div className="facts">
            <div className="fact"><h3>Your own front door</h3><p>Every carrier gets its own subdomain, its own login, and its own text number. No shared portal.</p></div>
            <div className="fact"><h3>Scoped to the person</h3><p>A terminal manager sees only their terminal's drivers. Recruiters see what they're assigned.</p></div>
            <div className="fact"><h3>Nobody else's fleet</h3><p>Nothing about your drivers is visible to any other carrier on Signal. Every query is scoped to you.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Live in 48 hours. Month to month."
        body="Fourteen days free. No card. We set it up, you approve the messages, and the first texts go out the same week."
      />
    </div>
  )
}

function VideoCard() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }
  return (
    <div className="phone">
      <video
        ref={ref}
        className="phone-video"
        src="/video/radell-day30.mp4"
        poster="/video/radell-day30-poster.jpg"
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onClick={toggle}
      />
      {!playing && (
        <button className="play" onClick={toggle} aria-label="Play Radell's story">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </button>
      )}
      <div className="phone-label mono">RADELL ANDREWS · BRADY TRUCKING · 1:13</div>
    </div>
  )
}
