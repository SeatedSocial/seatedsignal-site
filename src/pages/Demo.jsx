import { useState } from "react"
import { Btn, Reveal, Thread, FAQ, CtaBand, CALENDLY } from "../components/ui"
import { VideoCard } from "./Home"

// Illustrative conversations. Carrier and driver names are fictional.
const SCENARIOS = {
  save: {
    label: "Day 30 save", name: "Marcus R.", sub: "DRIVER · DAY 30 · NORTHFORK CARRIERS", initials: "MR",
    msgs: [
      { dir: "out", text: "Marcus, it's Julie at Northfork. First month done. On a scale of 1 to 10, how's it going?", time: "DAY 30 · 9:02 AM" },
      { dir: "in", text: "Honestly a 4. Home time keeps getting pushed. Been thinking about leaving.", time: "9:31 AM" },
      { sys: "Flag opened · At risk · Assigned to Julie", tone: "pink" },
      { dir: "out", text: "I hear you. Let me get with dispatch today and lock in your home time this week. Calling you at 3.", time: "9:40 AM" },
      { dir: "in", text: "Appreciate that. Talk at 3.", time: "9:41 AM" },
      { sys: "Resolved · Retention save", tone: "green" },
    ],
  },
  refer: {
    label: "Referral", name: "Dee W.", sub: "DRIVER · DAY 60 · NORTHFORK CARRIERS", initials: "DW",
    msgs: [
      { dir: "out", text: "Dee, two months in! How are things feeling out there?", time: "DAY 60 · 10:15 AM" },
      { dir: "in", text: "Really good. Best dispatcher I've had.", time: "10:22 AM" },
      { dir: "out", text: "Love hearing that. Know any drivers who'd fit here? Send a name and number and we'll reach out.", time: "10:25 AM" },
      { dir: "in", text: "My cousin Andre, he's got 3 years OTR. I'll send you his number.", time: "10:31 AM" },
      { sys: "Referral captured · Sent to recruiting", tone: "green" },
    ],
  },
  exit: {
    label: "Exit interview", name: "Chris P.", sub: "DRIVER · LAST DAY · NORTHFORK CARRIERS", initials: "CP",
    msgs: [
      { dir: "out", text: "Chris, thanks for driving with us. Mind if we ask one thing: what's the main reason you're moving on?", time: "LAST DAY · 4:10 PM" },
      { dir: "in", text: "Pay was fine. Just never knew my schedule week to week.", time: "4:48 PM" },
      { sys: "Exit reason logged · Schedule predictability", tone: "amber" },
      { dir: "out", text: "Thanks for being straight with us. Door's always open if things change.", time: "4:52 PM" },
      { sys: "Win-back reminder set · 60 days", tone: "green" },
    ],
  },
}

const STEPS = [
  ["Step 1", "Send us your new hires", "Name, phone, start date. Or your ATS sends them over automatically. Your ATS stays your system of record."],
  ["Step 2", "We text them for 90 days", "Check-ins in your carrier's voice, timed to the days new drivers usually quit. You approve every message before it goes out."],
  ["Step 3", "You hear about problems early", "At-risk replies open a flag and land with the right person the same day. Every Monday you get a one-screen summary."],
]

const REPORT_POINTS = [
  "Who replied, who went quiet, and whose number went dead",
  "At-risk drivers, with their exact words",
  "Themes across the fleet, like home time or pay questions",
  "Open flags your team still needs to close out",
]

const PILOT = [
  ["Length", "30 days"],
  ["Cost", "Free, no card"],
  ["Who's included", "Your new hires"],
  ["Program", "First 90"],
  ["Who runs it", "The Seated team"],
  ["What you get", "Flags plus Monday reports"],
]

const FAQS = [
  ["Who on my team has to run this?", "Nobody has to run it. We set up the texts, watch the replies, and send your team the flags that need a person. Your people just make the calls."],
  ["Does this replace my ATS?", "No. Signal works alongside your ATS. Your ATS keeps the driver records, and Signal handles the conversations after they're hired."],
  ["What do drivers actually receive?", "Short, friendly check-ins from a number that belongs to your company, spread across their first 90 days. They reply the way they'd text anyone, no app, and a real person on your side sees it."],
  ["What happens after the 30 days?", "We go over the results together. If it's worth it, you keep going month to month. If not, you walk away."],
]

export default function Demo() {
  const [key, setKey] = useState("save")
  const [run, setRun] = useState(0)
  const s = SCENARIOS[key]

  return (
    <>
      <section className="hero">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="container grid split">
          <div className="copy">
            <div className="eyebrow">Demo</div>
            <h1>Watch a driver almost quit.</h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Seated Signal texts your new drivers through their first 90 days, catches the ones thinking about leaving, and tells your team in time to do something about it. We run it for you.
            </p>
            <div className="row actions">
              <Btn to="/trial" arrow>Start your free 30-day pilot</Btn>
              <Btn to="/demo#report" variant="ghost">See the Monday report</Btn>
            </div>
            <div className="fine">FREE FOR 30 DAYS · NO CARD · LIVE IN 48 HOURS</div>
          </div>
          <div className="demo-stage">
            <Thread key={key + run} name={s.name} sub={s.sub} initials={s.initials} msgs={s.msgs} animate />
            <div className="demo-chips" role="group" aria-label="Pick a conversation">
              {Object.entries(SCENARIOS).map(([k, v]) => (
                <button key={k} className="demo-chip" aria-pressed={k === key} onClick={() => { setKey(k); setRun(run + 1) }}>{v.label}</button>
              ))}
              <button className="demo-chip" onClick={() => setRun(run + 1)}>Replay</button>
            </div>
            <div className="demo-note mono">SAMPLE CONVERSATION · NAMES ARE MADE UP</div>
          </div>
        </div>
      </section>

      <section className="section mid">
        <div className="container">
          <Reveal className="narrow" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Done for you</div>
            <h2>You don't need another tool to run.</h2>
            <p style={{ marginTop: 16 }}>Retention programs die because nobody has time to own them. So we own it.</p>
          </Reveal>
          <div className="facts">
            {STEPS.map(([n, h, b], i) => (
              <Reveal key={n} className="fact" delay={i * 60}>
                <div className="demo-step mono">{n}</div>
                <h3>{h}</h3>
                <p>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="report">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">Monday Minute</div>
            <h2>This lands in your inbox every Monday.</h2>
            <p style={{ marginTop: 16 }}>Numbers, the themes your drivers keep bringing up, who needs a call, and the best reply of the week. Read it in a minute, act on it by lunch.</p>
            <ul className="demo-list">
              {REPORT_POINTS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
          <Reveal className="demo-email" role="img" aria-label="Sample Monday Minute email for a demo carrier">
            <div className="demo-email-top"><strong>Signal's Monday Minute</strong><span className="mono">NORTHFORK CARRIERS</span></div>
            <div className="demo-email-body">
              <span className="demo-sample mono">SAMPLE DATA</span>
              <div className="demo-kpis">
                <div><b>23</b><span>drivers in First 90</span></div>
                <div><b>17</b><span>replied this week</span></div>
                <div><b>2</b><span>flagged at risk</span></div>
              </div>
              <h4>Needs a call</h4>
              <div className="demo-item"><span className="dot pink" /><div><b>Marcus R., day 30</b><div className="q">"Been thinking about leaving."</div></div></div>
              <div className="demo-item"><span className="dot amber" /><div><b>Jess R., day 12</b><div className="q">"Still waiting on my fuel card."</div></div></div>
              <h4>What drivers keep bringing up</h4>
              <div className="demo-item"><span className="dot green" /><div>Home time predictability came up in 4 replies</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mid">
        <div className="container grid split">
          <div style={{ display: "flex", justifyContent: "center" }}><VideoCard /></div>
          <Reveal>
            <div className="eyebrow">Brady Trucking</div>
            <h2>Five drivers kept who were on their way out.</h2>
            <p style={{ marginTop: 16 }}>79 percent of Brady's new drivers replied at day 7, and 71 percent at day 14. Radell Andrews runs recruiting and retention there. Hear how it went in her words.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="pilot">
        <div className="container grid split">
          <Reveal>
            <div className="eyebrow">Free pilot</div>
            <h2>Try First 90 free for 30 days.</h2>
            <p style={{ marginTop: 16 }}>Put your next batch of new hires on Signal. We set it up, we run it, and you judge it by what shows up in your Monday report. After 30 days, you decide whether to keep going.</p>
            <div className="row actions" style={{ marginTop: 28 }}>
              <Btn to="/trial" arrow>Start your free pilot</Btn>
              <Btn to={CALENDLY} variant="ghost">Book a call</Btn>
            </div>
          </Reveal>
          <Reveal className="demo-terms">
            {PILOT.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
          </Reveal>
        </div>
        <div className="container" style={{ marginTop: 72 }}>
          <FAQ items={FAQS} />
        </div>
      </section>

      <CtaBand
        title="Live in 48 hours. Month to month."
        body="Thirty days free on First 90. No card. We set it up, you approve the messages, and the first texts go out the same week."
      />
    </>
  )
}
