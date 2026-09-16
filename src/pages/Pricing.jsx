import { Btn, Reveal, FAQ, CtaBand, CALENDLY } from "../components/ui"

const TIERS = [
  {
    name: "Starter", price: "997", fleet: "10 to 50 drivers",
    stripe: "https://buy.stripe.com/eVq9AT0EIbepfdJaOY2Nq00",
    features: ["All four programs: First 90, Mile Marker and Inside the Cab, Last 90, Moments", "Your own number, web address and login", "Sentiment scoring, flags and the Today queue", "Driver Inbox and driver timeline", "Monday Minute and the weekly email", "Email support"],
  },
  {
    name: "Mid", price: "1,997", fleet: "51 to 125 drivers",
    stripe: "https://buy.stripe.com/cNi8wP4UY96h5D90ak2Nq03",
    features: ["Everything in Starter, plus:", "Theme favorability", "Executive Summary, in app and PDF", "Deliverability panel"],
  },
  {
    name: "Growth", price: "2,997", fleet: "126 to 250 drivers", popular: true,
    stripe: "https://buy.stripe.com/3cI00j3QUaal0iP4qA2Nq02",
    features: ["Everything in Mid, plus:", "Logins by terminal: managers see only their own drivers", "New hires flow in from your ATS automatically", "Inbox export"],
  },
  {
    name: "Scale", price: "4,497", fleet: "251 to 500 drivers",
    stripe: "https://buy.stripe.com/dRm4gz87a82d1mTg9i2Nq01",
    features: ["Everything in Growth, plus:", "Templates per terminal", "Monthly review call", "Priority support"],
  },
  {
    name: "Enterprise", price: null, fleet: "500+ drivers",
    features: ["Everything in Scale, plus:", "Custom integrations", "White-glove onboarding", "Custom terms"],
  },
]

const FAQS = [
  ["How long does setup take?", "Most carriers are live within 48 hours. You send us a roster or connect your ATS, we draft your programs in your voice, you approve them, and the first texts go out."],
  ["Do my drivers need an app?", "No. Everything runs over normal text messages. Drivers reply the way they reply to anyone else. No login, no download."],
  ["Does it connect to our ATS?", "Yes. Rosters come in by spreadsheet, or your ATS or onboarding system sends new hires to Signal automatically, so nobody uploads anything. Ask us about yours."],
  ["Does anything send without a person seeing it?", "Programs you have approved run on their schedule. Anything Signal drafts on its own, a follow-up question or a Moments text, waits for a person to approve it. Sentiment scoring never sends; it opens a flag."],
  ["What if a driver opts out?", "They reply STOP and they're out, immediately, from every program. Opt-outs show up in your deliverability panel."],
  ["Can we change the messages?", "Every template is yours. Edit any program in Settings with a live preview. We write the first draft, you own it from there."],
  ["Is there a contract?", "Month to month after the free trial. Cancel any time."],
]

export default function Pricing() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">Pricing</div>
          <h1 style={{ maxWidth: 760 }}>Priced by fleet. Every program on every plan.</h1>
          <p className="lede" style={{ marginTop: 24 }}>Fourteen days free on any tier. No card to start. Month to month after that.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="tiers">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} className={`tier ${t.popular ? "popular" : ""}`} delay={i * 60}>
                {t.popular && <div className="badge">Most carriers</div>}
                <div className="name">{t.name}</div>
                <div className="price">{t.price ? <>${t.price}<small>/ mo</small></> : "Custom"}</div>
                <div className="fleet">{t.fleet}</div>
                <ul>{t.features.map((f) => <li key={f} className={f.endsWith(":") ? "lead" : ""}>{f}</li>)}</ul>
                {t.price
                  ? <Btn to="/trial" variant={t.popular ? "primary" : "ghost"} block>Start free trial</Btn>
                  : <Btn to={CALENDLY} variant="ghost" block>Talk to us</Btn>}
                {t.stripe && <div className="buy"><a href={t.stripe} target="_blank" rel="noopener noreferrer">Or subscribe now</a></div>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section mid">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">The math</div>
            <h2>One kept driver covers a lot of months.</h2>
            <p style={{ marginTop: 20 }}>
              Replacing a driver costs about $8,234 on average (ATA). At Brady Trucking, Signal has counted five retention saves, drivers who told us they were leaving and stayed, worth about $42,500 against that number.
            </p>
            <p style={{ marginTop: 18 }}>
              The Executive Summary keeps that count for your carrier, in dollars, so you never have to build the case yourself.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="proof" style={{ border: 0 }}>
              <div className="container" style={{ gridTemplateColumns: "1fr 1fr", padding: 0 }}>
                <div className="cell" style={{ paddingLeft: 0, borderLeft: 0 }}>
                  <div className="num grad-text">5</div>
                  <div className="label">retention saves counted at Brady Trucking</div>
                  <div className="src">Brady Trucking</div>
                </div>
                <div className="cell">
                  <div className="num grad-text">$42,500</div>
                  <div className="label">estimated replacement cost avoided</div>
                  <div className="src">At $8,234 per driver, ATA</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="center narrow" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Questions</div>
            <h2>The ones we get on every call.</h2>
          </Reveal>
          <FAQ items={FAQS} />
        </div>
      </section>

      <CtaBand title="Not sure which tier?" body="Start the trial on any plan and we'll size it with you at the two-week review. Or book a call and we'll tell you in ten minutes." />
    </>
  )
}
