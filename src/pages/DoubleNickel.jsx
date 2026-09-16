import { Btn, Reveal, CtaBand, CALENDLY } from "../components/ui"
import { useFx, gsap, rise, parallax } from "../motion"

export const DN_URL = "https://www.getdoublenickel.com/integrations/seated-social"
const DN_HOME = "https://www.getdoublenickel.com"

const FLOW = [
  { who: "Double Nickel", cls: "dn", text: "New lead from Seated Social. Campaign attached." },
  { who: "Double Nickel", cls: "dn", text: "Driver marked hired." },
  { who: "Seated Signal", cls: "out", text: "Got him. Day 1 check-in is scheduled." },
]

const STEPS = [
  ["01", "A lead comes in", "Exclusive Seated Social leads land in your Double Nickel pipeline the moment they arrive, with the campaign and creative attached. Your recruiters call while the driver is still interested, not three days later."],
  ["02", "A recruiter marks the driver hired", "That's the whole action. Nothing else to click, nothing to export."],
  ["03", "Signal takes it from there", "The driver shows up in your Signal account, First 90 starts on their hire date, and the Day 1 check-in is scheduled. No spreadsheet. No \"did anyone add the new guys to the list?\""],
  ["04", "One line you can trace", "Lead source, hire, day 90. The campaign that found the driver stays attached the whole way, so recruiting and retention are finally reading from the same page."],
]

export default function DoubleNickel() {
  const root = useFx((el) => {
    const q = gsap.utils.selector(el)
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(q(".hero .partners > *"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 })
      .from(q(".hero .eyebrow, .hero h1, .hero .lede, .hero .actions"), { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.3")
    rise(q(".flow .bubble, .flow .who"), { stagger: 0.14, trigger: q(".flow")[0] })
    rise(q(".steps .step"), { stagger: 0.1, trigger: q(".steps")[0] })
    parallax(q(".orb-a"), q(".hero"), -20)
  })

  return (
    <div ref={root}>
      <section className="hero" style={{ paddingBottom: 56 }}>
        <div className="orb orb-a" />
        <div className="container">
          <div className="partners">
            <a href={DN_HOME} target="_blank" rel="noopener noreferrer" aria-label="Double Nickel"><img src="/brand/double-nickel-dark.png" alt="Double Nickel" height="34" /></a>
            <span className="plus" aria-hidden="true">+</span>
            <img src="/brand/lockup-dark.svg" alt="Seated Signal" height="30" />
          </div>
          <div className="eyebrow">Integration</div>
          <h1 style={{ maxWidth: 860 }}>Recruiting and retention, finally talking to each other.</h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            Seated Signal is a listed integration partner of Double Nickel. Leads come in on one side, hires go out the other, and nobody re-types a driver's name in between.
          </p>
          <div className="row actions" style={{ marginTop: 32 }}>
            <Btn to={CALENDLY} arrow>Book a 15-minute walkthrough</Btn>
            <Btn to={DN_URL} variant="ghost">See the listing on Double Nickel</Btn>
          </div>
        </div>
      </section>

      <section className="section mid">
        <div className="container grid split">
          <div>
            <div className="eyebrow">What happens, in order</div>
            <h2>Hired in Double Nickel. Enrolled in Signal.</h2>
            <div className="steps vertical" style={{ marginTop: 36 }}>
              {STEPS.map(([n, h, b]) => (
                <div className="step" key={n}>
                  <div className="idx">{n}</div>
                  <h3>{h}</h3>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="thread flow" aria-label="The handoff, shown as messages">
              <div className="msgs" style={{ gap: 16 }}>
                {FLOW.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.cls === "out" ? "flex-end" : "flex-start", gap: 6 }}>
                    <div className="who mono">{m.who.toUpperCase()}</div>
                    <div className={`bubble ${m.cls}`}>{m.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">Already on Double Nickel?</div>
            <h2>Setup is on our side.</h2>
            <p style={{ marginTop: 20 }}>
              Double Nickel tells Signal the moment a driver is marked hired. We set up the connection; there is nothing for you to install. You approve your First 90 messages, and from then on every new hire enrolls without anyone touching a list.
            </p>
            <p style={{ marginTop: 18 }}>
              Quiet hours, terminal logins and everything else in Signal apply to drivers who arrive this way, same as any other. Built, tested, first carriers coming online now.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="fact" style={{ padding: 32 }}>
              <img src="/brand/double-nickel-dark.png" alt="Double Nickel" height="28" style={{ marginBottom: 20 }} />
              <h3 style={{ fontSize: 20 }}>About Double Nickel</h3>
              <p style={{ marginTop: 8 }}>
                Double Nickel is a driver recruitment platform for trucking carriers, with applicant tracking, communications, background checks and analytics in one place. Seated Signal picks up where their pipeline ends, at "hired."
              </p>
              <a className="textlink" href={DN_HOME} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 18 }}>getdoublenickel.com &rarr;</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mid">
        <div className="container">
          <Reveal className="quote-block">
            <blockquote>"Retaining those drivers over the first 90 to 180 days is as important, and Alex is tackling this challenge head on."</blockquote>
            <cite>Francisco Lopez Roualdes · Co-Founder, Double Nickel</cite>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="See the handoff on your own account."
        body="Fifteen minutes, screen share, no slides. If you run Double Nickel today, bring a recent hire and we'll show you where they'd land."
        primary={[CALENDLY, "Book the walkthrough"]}
        secondary={["/features", "See everything Signal does"]}
      />
    </div>
  )
}
