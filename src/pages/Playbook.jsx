import { useState } from "react"
import { Btn, Reveal, postLead, CtaBand } from "../components/ui"

const GETS = [
  "The touchpoints that matter in a driver's first ninety days, and why those days",
  "Sample texts you can send tomorrow, with your own number",
  "A timing framework: what to send, when, and what to listen for in the reply",
  "The early signs a new driver is already looking",
  "A one-page checklist for whoever owns onboarding at your carrier",
]

export default function Playbook() {
  const [form, setForm] = useState({ name: "", email: "", company: "", fleet: "" })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) { setErr("Name and email are required."); return }
    setErr(null); setBusy(true)
    await postLead({ ...form, source: "playbook-download" })
    setBusy(false); setDone(true)
  }

  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container grid split">
          <div>
            <div className="eyebrow">Free download</div>
            <h1>The First 90 Days Playbook</h1>
            <p className="lede" style={{ marginTop: 24 }}>The SMS framework we run for carriers, written down so you can run it yourself. What to send, when, and what to do with the replies. No strings.</p>
          </div>
          <Reveal style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 240, aspectRatio: "3 / 4", borderRadius: 16, background: "linear-gradient(160deg, var(--navy-mid), var(--navy-light))", border: "1px solid var(--line-strong)", boxShadow: "0 30px 80px rgba(0,0,0,.45)", padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <img src="/brand/mark.svg" alt="" width="56" height="28" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 24, lineHeight: 1.05, letterSpacing: "-0.02em" }}>The First 90 Days</div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--pink)", marginTop: 10 }}>PLAYBOOK · EDITION 02</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mid">
        <div className="container grid split" style={{ alignItems: "flex-start" }}>
          <Reveal>
            <div className="eyebrow">Inside</div>
            <h2>Short enough to read on a Friday.</h2>
            <ul className="points" style={{ marginTop: 26, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {GETS.map((g) => <li key={g} style={{ display: "flex", gap: 14, color: "var(--white)", fontSize: 15.5, lineHeight: 1.5 }}><span style={{ flex: "0 0 8px", width: 8, height: 8, borderRadius: "50%", background: "var(--grad)", marginTop: 8 }} />{g}</li>)}
            </ul>
          </Reveal>
          <Reveal className="form" delay={120}>
            {done ? (
              <div className="done">
                <div className="check">&#10003;</div>
                <h3>Check your inbox.</h3>
                <p style={{ marginTop: 10 }}>The playbook is on its way. If it isn't there in a few minutes, look in spam, then email us.</p>
                <div style={{ marginTop: 22 }}><Btn to="/trial" arrow>Want us to run it for you?</Btn></div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field"><label htmlFor="p-name">Your name</label><input id="p-name" value={form.name} onChange={set("name")} placeholder="Mike Carson" autoComplete="name" /></div>
                <div className="field"><label htmlFor="p-email">Work email</label><input id="p-email" type="email" value={form.email} onChange={set("email")} placeholder="mike@carrier.com" autoComplete="email" /></div>
                <div className="field"><label htmlFor="p-co">Carrier</label><input id="p-co" value={form.company} onChange={set("company")} placeholder="Optional" autoComplete="organization" /></div>
                <div className="field">
                  <label htmlFor="p-fleet">Drivers</label>
                  <select id="p-fleet" value={form.fleet} onChange={set("fleet")}>
                    <option value="">Optional</option>
                    {["Under 10", "10 to 50", "51 to 125", "126 to 250", "251 to 500", "500+"].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {err && <div className="error">{err}</div>}
                <Btn type="submit" block disabled={busy} arrow>{busy ? "Sending" : "Send me the playbook"}</Btn>
                <div className="fine">ONE EMAIL WITH THE PDF. THAT'S IT.</div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="The playbook is the framework. Signal is the crew that runs it."
        body="Fourteen days free. Your number, your words, a person on every reply."
      />
    </>
  )
}
