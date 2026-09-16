import { Btn, Link, Reveal, Thread, CtaBand, CALENDLY } from "../components/ui"

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

const PROGRAMS = [
  {
    tag: "Days 1 to 90", title: "First 90",
    body: "A 13-step onboarding drip across the first ninety days. Check-ins that sound like a person, timed to the days drivers actually quit.",
    sample: { dir: "out", text: "Day 30, Marcus. First month done. Anything about the job that surprised you, good or bad?" },
  },
  {
    tag: "Day 90 onward", title: "After day 90",
    body: "Mile Marker sends milestone texts at 180, 210, 240 and 365 days. Inside the Cab keeps the fleet talking with pulse check-ins and company updates, with tracked links so you know who read what.",
    sample: { dir: "out", text: "Six months with us today. That's not nothing. Thanks for showing up every week." },
  },
  {
    tag: "When a driver leaves", title: "Last 90",
    body: "Two exit texts and an optional two-minute survey, no names required. Recruiters see who would come back.",
    sample: { dir: "out", text: "Sorry to see you go. Two quick questions so the next driver has it better than you did?" },
  },
  {
    tag: "When something happens", title: "Moments",
    body: "A dispatcher logs what just happened to a driver: a breakdown, a short settlement, a missed weekend home. Signal drafts the text. A person reads it and sends it.",
    sample: { dir: "out", text: "Heard about the breakdown outside Amarillo. Not the Tuesday you planned. Anything you need from us tonight?" },
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container grid split">
          <div>
            <div className="eyebrow">SMS driver retention for trucking carriers</div>
            <h1>Your drivers are telling you everything. <span className="grad-text">Are you listening?</span></h1>
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
            <Thread name="Marcus R." sub="DRIVER · DAY 14 · NORTHFORK CARRIERS" initials="MR" msgs={HERO_THREAD} animate />
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="proof">
        <div className="container">
          {PROOF.map((p) => (
            <Reveal key={p.num} className="cell">
              <div className="num">{p.num}</div>
              <div className="label">{p.label}</div>
              <div className="src">{p.src}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow dim">The problem</div>
            <h2>The first text most drivers get from their carrier is about a problem.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p>
              A new driver shows up, gets a truck, and then hears nothing until something goes wrong. Ninety days later a recruiter finds out he's gone from the ATS.
            </p>
            <p style={{ marginTop: 18 }}>
              Turnover in trucking runs above 90 percent a year (ATA), and about a third of new hires leave inside their first 90 days (Stay Metrics). Every one of them costs about $8,234 to replace (ATA). Most of them said something before they left. Nobody was listening on the other end.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section mid" id="how">
        <div className="container">
          <Reveal className="narrow">
            <div className="eyebrow">How it works</div>
            <h2>Your number. Your words. A person on every reply.</h2>
          </Reveal>
          <div className="steps" style={{ marginTop: 48 }}>
            <Reveal className="step">
              <div className="idx">01</div>
              <h3>Your number</h3>
              <p>Signal sets up a text number that belongs to your company. Drivers see your name, not ours.</p>
            </Reveal>
            <Reveal className="step" delay={100}>
              <div className="idx">02</div>
              <h3>We write, you approve</h3>
              <p>We draft every program in your voice. Someone at your carrier reads and approves before the first text goes out, and every text after that.</p>
            </Reveal>
            <Reveal className="step" delay={200}>
              <div className="idx">03</div>
              <h3>Replies come back to a person</h3>
              <p>Every reply is read and scored. Anything that needs attention opens a flag and lands with the right person on your team, the same day.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section">
        <div className="container">
          <Reveal className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div className="narrow">
              <div className="eyebrow">What runs</div>
              <h2>Four programs. One number. Every day of a driver's time with you.</h2>
            </div>
            <Link to="/features" className="textlink">See every feature &rarr;</Link>
          </Reveal>
          <div className="programs">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} className="program" delay={i * 80}>
                <div className="tag">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="sample"><div className="bubble out">{p.sample.text}</div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Human in the loop */}
      <section className="section mid">
        <div className="container grid split reverse">
          <Reveal>
            <div className="queue" aria-label="Example Today queue">
              <div className="qhead"><span>Today</span><span>3 open</span></div>
              <div className="qitem">
                <span className="sev high" />
                <div>
                  <div className="name">Marcus R.</div>
                  <div className="meta">UNHAPPY · HIGH · DAY 14</div>
                  <div className="quote">"the home time isn't what I was told"</div>
                </div>
                <div className="who">DANA</div>
              </div>
              <div className="qitem">
                <span className="sev med" />
                <div>
                  <div className="name">Luis T.</div>
                  <div className="meta">WENT QUIET · MED · DAY 62</div>
                  <div className="quote">No reply to the last two check-ins</div>
                </div>
                <div className="who">DANA</div>
              </div>
              <div className="qitem">
                <span className="sev low" />
                <div>
                  <div className="name">Kendra W.</div>
                  <div className="meta">MILESTONE · 1 YEAR · TODAY</div>
                  <div className="quote">Draft ready for your approval</div>
                </div>
                <div className="who">MIKE</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow">A person is always in the loop</div>
            <h2>Nothing here runs on autopilot.</h2>
            <p style={{ marginTop: 20 }}>
              Signal reads every reply and scores it, keyword first, then a model for the ambiguous ones. It never acts on its own. A negative reply opens a flag with a type and a severity, assigns it to someone on your team, and puts it in their Today queue.
            </p>
            <p style={{ marginTop: 18 }}>
              When a reply deserves a second question, Signal drafts one and waits for a person to approve it. Your recruiters spend their time on the drivers who need them, not on reading every text.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Reporting */}
      <section className="section">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">Reporting</div>
            <h2>Monday morning, you know who's slipping.</h2>
            <p style={{ marginTop: 20 }}>
              The Monday Minute email groups last week's replies into themes: pay, equipment, home time, dispatch. Theme favorability shows how drivers feel about each one over time.
            </p>
            <p style={{ marginTop: 18 }}>
              The monthly Executive Summary, in the app and as a PDF with your logo, counts retention saves in dollars so the number that matters is already in front of your owner.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="queue" aria-label="Example weekly themes">
              <div className="qhead"><span>Monday Minute · last 7 days</span><span>41 replies</span></div>
              {[
                ["Home time", "12 replies", "sev high", "Slipping"],
                ["Dispatch", "9 replies", "sev low", "Steady"],
                ["Equipment", "8 replies", "sev med", "Mixed"],
                ["Pay", "7 replies", "sev low", "Steady"],
              ].map(([t, n, s, w]) => (
                <div className="qitem" key={t}>
                  <span className={s} />
                  <div><div className="name">{t}</div><div className="meta">{n.toUpperCase()}</div></div>
                  <div className="who">{w.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section mid">
        <div className="container">
          <Reveal className="quote-block">
            <img className="mark" src="/brand/mark.svg" alt="" width="44" height="22" />
            {/* TESTIMONIAL PLACEHOLDER. Replace with Radell's exact wording before production. */}
            <div className="placeholder">Radell Andrews, Recruiting and Retention Manager at Brady Trucking. Exact quote to be supplied by Alex.</div>
          </Reveal>
        </div>
      </section>

      {/* Walled off */}
      <section className="section">
        <div className="container">
          <Reveal className="narrow" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Walled off</div>
            <h2>Your drivers, your number, your data.</h2>
          </Reveal>
          <div className="facts">
            <Reveal className="fact"><h3>Your own front door</h3><p>Every carrier gets its own subdomain, its own login, and its own text number. No shared portal.</p></Reveal>
            <Reveal className="fact" delay={80}><h3>Scoped to the person</h3><p>A terminal manager sees only their terminal's drivers. Recruiters see what they're assigned.</p></Reveal>
            <Reveal className="fact" delay={160}><h3>Nobody else's fleet</h3><p>Nothing about your drivers is visible to any other carrier on Signal. Every query is scoped to you.</p></Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Live in 48 hours. Month to month."
        body="Fourteen days free. No card. We set it up, you approve the messages, and the first texts go out the same week."
      />
    </>
  )
}
