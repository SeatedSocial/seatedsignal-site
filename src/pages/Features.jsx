import { Reveal, Thread, CtaBand } from "../components/ui"
import { useFx, gsap, parallax, rise, wordReveal } from "../motion"

// Illustrative conversations. Names are fictional.
const T_FIRST90 = [
  { dir: "out", text: "Morning Marcus, Dana here. Day 3. Truck holding up? Anything missing from orientation you need before Monday?", time: "DAY 3" },
  { dir: "in", text: "Truck's good. Still don't have my fuel card though", time: "DAY 3" },
  { sys: "Flag opened · Needs follow-up · Assigned to Dana", tone: "pink" },
  { dir: "out", text: "On it. Card's at the Tulsa yard, front desk, under your name. Sorry about that.", time: "DAY 3" },
]
const T_AFTER90 = [
  { dir: "out", text: "Quick one for the whole fleet: new pay scale kicks in the 1st. Details here, 60 seconds to read. go.seatedsignal.com/x9Km2", time: "INSIDE THE CAB · BROADCAST" },
  { sys: "212 delivered · 148 opened · 31 replies", tone: "green" },
  { dir: "in", text: "Finally. Been asking about this since spring", time: "REPLY" },
  { dir: "out", text: "One year today, Marcus. Twelve months, zero drama. Glad you're here.", time: "MILE MARKER · DAY 365" },
]
const T_LAST90 = [
  { dir: "out", text: "Marcus, Dana. Sorry to see you go. Two quick questions so the next driver has it better than you did?", time: "EXIT · DAY 1" },
  { dir: "in", text: "Sure. Mostly it was the weekends. Pay was fine.", time: "" },
  { dir: "out", text: "Understood. If that ever changes on our end, would you want to hear about it?", time: "EXIT · DAY 4" },
  { dir: "in", text: "Yeah I would", time: "" },
  { sys: "Rehire flag · Would come back", tone: "green" },
]
const T_MOMENTS = [
  { sys: "Logged by dispatch · Breakdown, I-40 near Amarillo · 4:12 PM", tone: "amber" },
  { dir: "out", text: "Heard about the breakdown outside Amarillo. Not the Tuesday you planned. Road service is en route, and if you're stuck overnight the hotel's on us. Anything you need from us tonight?", time: "DRAFTED BY SIGNAL · SENT BY DANA · 4:20 PM" },
  { dir: "in", text: "Appreciate it. Should be moving by 7.", time: "4:33 PM" },
]

function Detail({ eyebrow, title, body, points, note, thread, flip }) {
  return (
    <section className="detail">
      <div className={`container grid split ${flip ? "reverse" : ""}`}>
        {flip && <Reveal style={{ display: "flex", justifyContent: "center" }}><Thread {...thread} /></Reveal>}
        <Reveal delay={flip ? 120 : 0}>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p style={{ marginTop: 18 }}>{body}</p>
          <ul className="points">{points.map((p) => <li key={p}>{p}</li>)}</ul>
          {note && <div className="note">{note}</div>}
        </Reveal>
        {!flip && <Reveal delay={120} style={{ display: "flex", justifyContent: "center" }}><Thread {...thread} /></Reveal>}
      </div>
    </section>
  )
}

function Block({ eyebrow, title, items, light }) {
  return (
    <section className={`section ${light ? "light chapter-block" : "hairline-top"}`}>
      <div className="container">
        <Reveal className="narrow" style={{ marginBottom: 40 }}>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
        </Reveal>
        <div className="facts">
          {items.map(([h, b], i) => <Reveal key={h} className="fact" delay={i * 60}><h3>{h}</h3><p>{b}</p></Reveal>)}
        </div>
      </div>
    </section>
  )
}

export default function Features() {
  const root = useFx((el) => {
    const q = gsap.utils.selector(el)
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(q(".hero .eyebrow, .hero h1, .hero .lede"), { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 })
    q(".detail .thread").forEach((t) => parallax(t, t.closest(".detail"), -10))
    q(".detail .msgs").forEach((m) => rise(m.children, { stagger: 0.12, trigger: m }))
  })
  return (
    <div ref={root}>
      <section className="hero" style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="eyebrow">Features</div>
          <h1 className="narrow" style={{ maxWidth: 820 }}>Everything Signal does, in the order a driver experiences it.</h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Four programs that text drivers, one place where replies land, and reporting that tells you what the fleet is saying. All from a number that belongs to your carrier, all read by a person before it goes out.
          </p>
        </div>
      </section>

      <Detail
        eyebrow="Days 1 to 90"
        title="First 90"
        body="The onboarding drip. Thirteen steps across the first ninety days, eleven core and two optional, written in your voice and approved by you before the first one sends."
        points={[
          "Timed to the days new drivers actually quit, not to a calendar",
          "Every reply scored; a bad one opens a flag instead of a canned answer",
          "A driver who stops replying gets a went-quiet flag, not silence",
          "Templates editable per carrier in Settings, with a live preview",
        ]}
        note="At Brady Trucking, 79 percent of drivers replied at day 7 and 71 percent at day 14."
        thread={{ name: "Marcus R.", sub: "DRIVER · DAY 3", initials: "MR", msgs: T_FIRST90 }}
      />

      <Detail
        flip
        eyebrow="Day 90 onward"
        title="Mile Marker and Inside the Cab"
        body="Retention doesn't end at day 90, so neither does Signal. Mile Marker marks the milestones. Inside the Cab keeps the whole fleet in the conversation."
        points={[
          "Milestone texts at 180, 210, 240 and 365 days, plus birthdays",
          "Fleet broadcasts for pay changes, safety notes and company news",
          "Tracked links on go.seatedsignal.com, so you see delivered, opened and replied per broadcast",
          "Pulse check-ins that ask one question and listen for the answer",
          "Referral prompts sent from your own branded domain",
        ]}
        thread={{ name: "Northfork fleet", sub: "BROADCAST · 212 DRIVERS", initials: "NF", msgs: T_AFTER90 }}
      />

      <Detail
        eyebrow="When a driver leaves"
        title="Last 90"
        body="The exit interview, by text. Two short touches after a driver leaves, an optional four-question survey that takes two minutes and asks for no name, and a rehire flag for recruiters."
        points={[
          "Exit texts on a delay, not the day the truck comes back",
          "Structured survey answers roll into theme favorability with everything else",
          "Drivers who say they would come back show up as a rehire list",
          "Off by default; you approve the messages before it runs at your carrier",
        ]}
        thread={{ name: "Marcus R.", sub: "FORMER DRIVER · EXIT", initials: "MR", msgs: T_LAST90 }}
      />

      <Detail
        flip
        eyebrow="When something happens"
        title="Moments"
        body="The texts that matter most are the ones nobody has time to write. A dispatcher or recruiter logs what just happened to a driver. Signal drafts the text. A person reads it, edits it if they want, and sends it or doesn't."
        points={[
          "Breakdowns, short settlements, missed home time, good news",
          "Drafts respect your quiet hours; anything after hours waits for the next window",
          "A bad-day text with no reply in 48 hours opens a went-quiet flag",
          "Nothing sends without a person pressing send",
        ]}
        thread={{ name: "Marcus R.", sub: "DRIVER · DAY 140 · MOMENT", initials: "MR", msgs: T_MOMENTS }}
      />

      <Block
        light
        eyebrow="Listening and routing"
        title="Every reply is read. The ones that matter reach a person."
        items={[
          ["Two-tier sentiment scoring", "Keywords first, a language model for the ambiguous ones. Scoring never acts on its own; it opens a flag."],
          ["Flags with owners", "Unhappy, went quiet, opt-out, non-responsive, milestone, rehire review. Each has a severity, an assignee and a notification."],
          ["Today queue", "One list, grouped and ranked, of what needs a human today. Empty is the goal."],
          ["AI follow-up questions", "When a reply deserves a second question, Signal drafts one. A person approves it before it goes."],
          ["Driver Inbox", "Full two-way thread per driver with photos, voicemail and an anonymous channel. Signatures and time zones per user. Export when you need it."],
          ["Driver timeline", "Every send, reply, flag, moment and event for one driver, in order, on one screen."],
        ]}
      />

      <Block
        eyebrow="Reporting"
        title="Know what the fleet is saying before it shows up in turnover."
        items={[
          ["Monday Minute", "A weekly email with the numbers, the themes that came up, the open items, and the best reply of the week."],
          ["Theme favorability", "Replies grouped by theme, pay, equipment, home time, dispatch and more, with how drivers feel about each one over time."],
          ["Executive Summary", "A monthly page and PDF with your logo. Retention saves counted in dollars, ready for the owner's inbox."],
          ["Deliverability", "Delivery rates, stops and carrier filtering in one panel, so you know the texts are landing."],
          ["Report feedback", "A helpful-or-not on every summary, so the reports get better and the bots don't count."],
          ["Overview and Today", "The two screens a recruiter opens in the morning. What happened, and what needs them."],
        ]}
      />

      <Block
        eyebrow="Setup and admin"
        title="Yours from the first login."
        items={[
          ["Roster in, drivers enrolled", "Import by spreadsheet, or sync by webhook from your ATS or onboarding system. New hires enroll on their own."],
          ["Scoped users", "A terminal manager sees only their terminal's drivers. Recruiters see what they're assigned."],
          ["Your templates", "Every program's messages are yours to edit in Settings, with a live preview before you save."],
          ["Your send window", "Quiet hours in your carrier's time zone, applied to every send from every program."],
          ["Your own front door", "A branded subdomain and login for your carrier. No shared portal."],
          ["Locked down", "Every query scoped to your carrier. Signed sessions, signed public links, and short links that can't reach the app."],
        ]}
      />

      <CtaBand
        title="See it running on your own drivers."
        body="Fourteen days free on any plan. We set it up, you approve the messages, the first texts go out the same week."
      />
    </div>
  )
}
