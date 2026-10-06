import { useState } from "react"
import { Btn, Reveal, FAQ, CtaBand, postLead, Honeypot, CALENDLY } from "../components/ui"

// Landing page for listeners of Trucking Sense with Charles Gracey (Road Dog Trucking Radio, SiriusXM).
// Alex was a guest on October 6, 2026. Listener offer: a 60-day First 90 pilot instead of the standard 30.
// The offer ends October 31, 2026. After that the page points at the standard pilot on /trial, so
// nothing has to be taken down by hand. Show logos come from the show's approved media kit.
const OFFER_ENDS = new Date("2026-11-01T07:00:00Z") // midnight Mountain, end of October 31
const DEADLINE = "October 31, 2026"

const HOW = [
  ["Texts, not an app", "New drivers get short check-ins from a number that belongs to the carrier. Day 3, day 7, two weeks, and on through the first 90 days. No app, no login, no password."],
  ["It keeps going past day 90", "Mile Marker picks up at day 100 and runs as long as the carrier wants. Is the job matching what you were told? What would you fix first?"],
  ["A person on every reply", "Replies land with a real person at the carrier. If one sounds like trouble, it gets flagged so somebody picks up the phone that day."],
]

const TERMS = [
  ["Length", "60 days (standard is 30)"],
  ["Cost", "Free, no card"],
  ["Who's included", "Your new hires"],
  ["Program", "First 90"],
  ["Who runs it", "The Seated team"],
  ["Sign up by", DEADLINE],
]

const FAQS = [
  ["Is the 60 days really free?", "Yes. No card, no invoice, no setup fee. The standard pilot is 30 days. Trucking Sense listeners get 60."],
  ["What happens at day 60?", "You get a written report: reply rates, what drivers brought up, every flag and what happened to it. Then you decide. Month to month if you stay, and you can walk away if you don't."],
  ["Who has to run it on our side?", "Nobody has to run it. We set up the texts and watch the replies. Your people make the phone calls when a driver needs one."],
  ["Will this fix our turnover?", "Not by itself. Signal tells you which driver needs a call today. Somebody at your carrier still has to make it."],
  ["I'm a driver. Can I sign up?", "Signal is set up by the carrier, so you can't join on your own. You can send this page to your recruiter or whoever runs retention where you drive."],
]

const SHARE = "mailto:?subject=" + encodeURIComponent("Heard this on Trucking Sense") +
  "&body=" + encodeURIComponent("I heard about this on Trucking Sense on Road Dog Trucking Radio. It's a text check-in for new drivers, and they're running a free 60-day pilot for carriers through " + DEADLINE + ".\n\nhttps://www.seatedsignal.com/truckingsense")

export default function TruckingSense() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", fleet: "", ats: "", website: "" })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const open = Date.now() < OFFER_ENDS.getTime()

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.company || !form.email || !form.phone) { setErr("Name, company, email and phone are required."); return }
    setErr(null); setBusy(true)
    // Same source as /trial so the lead lands where pilot leads always land. The promo fields say which offer.
    const ok = await postLead({ ...form, source: "seatedsignal-trial", promo: "truckingsense-60day", notes: "Trucking Sense listener. 60-day pilot offer." })
    setBusy(false)
    if (ok || form.website) { setDone(true); return }
    setErr("That didn't go through. Email alex@seatedsignal.com and we'll get you set up by hand.")
  }

  return (
    <>
      <section className="hero">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="container grid split">
          <div className="copy">
            <div className="eyebrow">Trucking Sense listeners</div>
            <h1>Heard us on Trucking Sense?</h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Thanks for listening. Seated Signal checks in with a carrier's drivers by text, so somebody hears about the small stuff while there's still time to fix it.
              {open
                ? ` Carriers who heard the show get 60 days free, twice the standard pilot, through ${DEADLINE}.`
                : " The listener offer has ended, and the standard 30-day pilot is still free."}
            </p>
            <div className="row actions">
              {open
                ? <Btn to="/truckingsense#claim" arrow>Claim the 60-day pilot</Btn>
                : <Btn to="/trial" arrow>Start the free 30-day pilot</Btn>}
              <Btn to="/truckingsense#drivers" variant="ghost">I'm a driver</Btn>
            </div>
            <div className="fine">{open ? `FREE FOR 60 DAYS · NO CARD · SIGN UP BY ${DEADLINE.toUpperCase()}` : "FREE FOR 30 DAYS · NO CARD · MONTH TO MONTH"}</div>
          </div>
          <Reveal style={{ border: "1px solid var(--line-strong)", borderRadius: 18, background: "rgba(19, 34, 64, 0.55)", padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--pink)" }}>AS HEARD ON</div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "14px 20px", marginTop: 16, display: "flex", justifyContent: "center" }}>
              <img src="/brand/trucking-sense/trucking-sense-blue.png" alt="Trucking Sense with Charles Gracey" width="360" height="146" style={{ width: "100%", maxWidth: 360, height: "auto" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, marginTop: 24 }}>
              <img src="/brand/trucking-sense/siriusxm-white.png" alt="SiriusXM" width="60" height="74" />
              <img src="/brand/trucking-sense/road-dog-white.png" alt="Road Dog Trucking Radio" width="170" height="73" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--line)" }}>
              <img src="/brand/alex-carpenter.jpg" alt="" width="52" height="52" style={{ borderRadius: "50%", objectFit: "cover", flex: "0 0 52px" }} />
              <div style={{ fontSize: 14.5, lineHeight: 1.45, color: "var(--white)" }}>
                Alex Carpenter, founder of Seated Signal, with host Charles Gracey
                <div className="mono" style={{ fontSize: 11, letterSpacing: ".12em", color: "var(--slate)", marginTop: 4 }}>OCTOBER 6, 2026</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mid">
        <div className="container">
          <Reveal className="narrow" style={{ marginBottom: 40 }}>
            <div className="eyebrow">The short version</div>
            <h2>We're the smoke detector. Somebody still has to get up and deal with the fire.</h2>
            <p style={{ marginTop: 16 }}>Most drivers don't quit over one big thing. They quit over a small thing nobody asked about. Signal asks, by text, and tells the carrier who needs a phone call today.</p>
          </Reveal>
          <div className="facts">
            {HOW.map(([h, b], i) => (
              <Reveal key={h} className="fact" delay={i * 60}>
                <h3>{h}</h3>
                <p>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="claim">
        <div className="container grid split reverse" style={{ alignItems: "flex-start" }}>
          <div>
            {open ? (
              <Reveal className="form">
                {done ? (
                  <div className="done">
                    <div className="check">&#10003;</div>
                    <h3>Got it. Your 60 days are locked in.</h3>
                    <p style={{ marginTop: 10 }}>Alex will reach out within one business day to get your number set up and your roster in. Want to skip the wait? <a className="textlink" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book the setup call now</a>.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <Honeypot value={form.website} onChange={set("website")} />
                    <div className="two">
                      <div className="field"><label htmlFor="ts-name">Your name</label><input id="ts-name" value={form.name} onChange={set("name")} placeholder="Mike Carson" autoComplete="name" /></div>
                      <div className="field"><label htmlFor="ts-co">Carrier</label><input id="ts-co" value={form.company} onChange={set("company")} placeholder="Northfork Carriers" autoComplete="organization" /></div>
                    </div>
                    <div className="two">
                      <div className="field"><label htmlFor="ts-email">Work email</label><input id="ts-email" type="email" value={form.email} onChange={set("email")} placeholder="mike@carrier.com" autoComplete="email" /></div>
                      <div className="field"><label htmlFor="ts-phone">Phone</label><input id="ts-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(208) 555-0134" autoComplete="tel" /></div>
                    </div>
                    <div className="two">
                      <div className="field">
                        <label htmlFor="ts-fleet">Drivers</label>
                        <select id="ts-fleet" value={form.fleet} onChange={set("fleet")}>
                          <option value="">How many?</option>
                          {["10 to 50", "51 to 125", "126 to 250", "251 to 500", "500+"].map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div className="field"><label htmlFor="ts-ats">Your ATS or onboarding system</label><input id="ts-ats" value={form.ats} onChange={set("ats")} placeholder="Optional" /></div>
                    </div>
                    {err && <div className="error">{err}</div>}
                    <Btn type="submit" block disabled={busy} arrow>{busy ? "Sending" : "Claim my 60-day pilot"}</Btn>
                    <p className="consent">By submitting, you agree that Seated Social may call, email or text you about your pilot. Message and data rates may apply. Reply STOP to any text to opt out. <a href="https://seatedsocial.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a>.</p>
                    <div className="fine">NO CARD. NO CONTRACT. WE REPLY WITHIN ONE BUSINESS DAY.</div>
                  </form>
                )}
              </Reveal>
            ) : (
              <Reveal className="form">
                <div className="done">
                  <h3>The listener offer ended {DEADLINE}.</h3>
                  <p style={{ marginTop: 10 }}>The standard pilot is still free for 30 days, with no card and no contract.</p>
                  <div style={{ marginTop: 22 }}><Btn to="/trial" arrow>Start the free 30-day pilot</Btn></div>
                </div>
              </Reveal>
            )}
          </div>
          <Reveal>
            <div className="eyebrow">For carriers</div>
            <h2>{open ? "Sixty days of your new drivers talking back." : "Thirty days of your new drivers talking back."}</h2>
            <p style={{ marginTop: 16 }}>Put your next batch of new hires on Signal. We set it up, you approve every message, and you judge it by what your drivers say.</p>
            {open && (
              <div className="demo-terms" style={{ marginTop: 24 }}>
                {TERMS.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section mid" id="drivers">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">For drivers</div>
            <h2>Wish your company asked how it's going?</h2>
            <p style={{ marginTop: 16 }}>You can't sign up for Signal yourself. Your carrier sets it up. But you can put it in front of the person who decides, and it means more coming from a driver than from us.</p>
            <div className="row actions" style={{ marginTop: 28 }}>
              <Btn to={SHARE} arrow>Email this to your company</Btn>
              <Btn to="/drivers" variant="ghost">Got a text from us?</Btn>
            </div>
          </Reveal>
          <div className="facts" style={{ gridTemplateColumns: "1fr" }}>
            <Reveal className="fact">
              <h3>Nothing watches you</h3>
              <p>It's a text. Nothing happens unless you choose to answer, and replying STOP ends it right away.</p>
            </Reveal>
            <Reveal className="fact" delay={80}>
              <h3>A person reads it</h3>
              <p>The schedule is automatic. The words are written and approved by someone at your company, and your reply goes to a person there.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="center narrow" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Questions</div>
            <h2>What listeners ask.</h2>
          </Reveal>
          <FAQ items={open ? FAQS : FAQS.slice(2)} />
        </div>
      </section>

      {open ? (
        <CtaBand
          title={`60 days free through ${DEADLINE}.`}
          body="First 90 for your new hires. No card. We set it up, you approve the messages, and the first texts go out the same week."
          primary={["/truckingsense#claim", "Claim the 60-day pilot"]}
        />
      ) : (
        <CtaBand
          title="Live in 48 hours. Month to month."
          body="Thirty days free on First 90. No card. We set it up, you approve the messages, and the first texts go out the same week."
        />
      )}
    </>
  )
}
