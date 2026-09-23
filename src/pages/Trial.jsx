import { useState } from "react"
import { Btn, Reveal, FAQ, postLead, Honeypot, CALENDLY } from "../components/ui"

const INCLUDED = [
  "First 90 for your new hires, written in your voice and approved by you",
  "Your own text number, web address and login",
  "Sentiment scoring, flags and the Today queue",
  "Driver Inbox with the full thread per driver",
  "Roster import from a spreadsheet or your ATS",
  "Monday Minute reports every week, plus a written wrap-up at day 30",
]

const STEPS = [
  ["Day 1", "We set up", "Your number goes live. We load your roster and draft every program in your carrier's voice."],
  ["Day 2", "You approve", "You read the messages, change what you want, and give the word."],
  ["Day 3", "First texts", "Drivers start hearing from you. Replies land in your inbox the same day."],
  ["Day 14", "Check-in call", "We walk through what drivers said, which flags opened, and what the numbers look like."],
  ["Day 30", "You decide", "Keep going month to month, or walk away with the report and no obligation."],
]

export default function Trial() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", fleet: "", ats: "", website: "" })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.company || !form.email || !form.phone) { setErr("Name, company, email and phone are required."); return }
    setErr(null); setBusy(true)
    const ok = await postLead({ ...form, source: "seatedsignal-trial" })
    setBusy(false)
    if (ok || form.website) { setDone(true); return }
    setErr("That didn't go through. Email alex@seatedsignal.com and we'll get you set up by hand.")
  }

  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">Free 30-day pilot</div>
          <h1 style={{ maxWidth: 820 }}>Thirty days of your new drivers talking back.</h1>
          <p className="lede" style={{ marginTop: 24 }}>No card, no contract. We set it up, you approve every message, and at day 30 you have a report and a decision.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container grid split reverse" style={{ alignItems: "flex-start" }}>
          <div>
            <Reveal className="form">
              {done ? (
                <div className="done">
                  <div className="check">&#10003;</div>
                  <h3>Got it. You'll hear from us within one business day.</h3>
                  <p style={{ marginTop: 10 }}>Alex will reach out to get your number set up and your roster in. Want to skip the wait? <a className="textlink" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book the setup call now</a>.</p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <Honeypot value={form.website} onChange={set("website")} />
                  <div className="two">
                    <div className="field"><label htmlFor="t-name">Your name</label><input id="t-name" value={form.name} onChange={set("name")} placeholder="Mike Carson" autoComplete="name" /></div>
                    <div className="field"><label htmlFor="t-co">Carrier</label><input id="t-co" value={form.company} onChange={set("company")} placeholder="Northfork Carriers" autoComplete="organization" /></div>
                  </div>
                  <div className="two">
                    <div className="field"><label htmlFor="t-email">Work email</label><input id="t-email" type="email" value={form.email} onChange={set("email")} placeholder="mike@carrier.com" autoComplete="email" /></div>
                    <div className="field"><label htmlFor="t-phone">Phone</label><input id="t-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(208) 555-0134" autoComplete="tel" /></div>
                  </div>
                  <div className="two">
                    <div className="field">
                      <label htmlFor="t-fleet">Drivers</label>
                      <select id="t-fleet" value={form.fleet} onChange={set("fleet")}>
                        <option value="">How many?</option>
                        {["10 to 50", "51 to 125", "126 to 250", "251 to 500", "500+"].map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="field"><label htmlFor="t-ats">Your ATS or onboarding system</label><input id="t-ats" value={form.ats} onChange={set("ats")} placeholder="Optional" /></div>
                  </div>
                  {err && <div className="error">{err}</div>}
                  <Btn type="submit" block disabled={busy} arrow>{busy ? "Sending" : "Start my free pilot"}</Btn>
                  <p className="consent">By submitting, you agree that Seated Social may call, email or text you about your pilot. Message and data rates may apply. Reply STOP to any text to opt out. <a href="https://seatedsocial.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a>.</p>
                  <div className="fine">NO CARD. NO CONTRACT. WE REPLY WITHIN ONE BUSINESS DAY.</div>
                </form>
              )}
            </Reveal>
          </div>
          <div>
            <Reveal>
              <div className="eyebrow dim">What the 30 days look like</div>
              <div className="timeline" style={{ marginTop: 8 }}>
                {STEPS.map(([when, h, b]) => (
                  <div className="tl" key={when}><div className="when">{when}</div><h3>{h}</h3><p>{b}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section mid">
        <div className="container">
          <Reveal className="narrow" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Included</div>
            <h2>The whole product, not a demo.</h2>
          </Reveal>
          <div className="facts">
            {INCLUDED.map((t, i) => <Reveal key={t} className="fact" delay={i * 50}><p style={{ color: "var(--white)", fontSize: 15.5 }}>{t}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FAQ items={[
            ["Is it really free?", "Yes. No card, no invoice, no hidden setup fee. Thirty days."],
            ["How many drivers can we include?", "Your new hires during the pilot. We'll size the full plan with you at the 30-day review."],
            ["What happens at day 30?", "You get a written report: reply rates, the themes drivers raised, every flag and what happened to it. Then you decide. Month to month if you stay."],
            ["Can we stop early?", "Any time. Tell us and we shut the number off."],
          ]} />
        </div>
      </section>
    </>
  )
}
