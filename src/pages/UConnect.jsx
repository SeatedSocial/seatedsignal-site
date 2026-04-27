import { useState, useEffect, useRef } from "react";

// Seated Signal :: UConnect26 Landing
// Drop in as src/pages/UConnect.jsx and wire route /uconnect
// Form posts to admin.seatedsocial.com/api/uconnect-leads.php
// Endpoint writes to contacts (source='uconnect26') and sends Playbook via Resend

const C = {
  ink: "#0A1628",
  inkMid: "#132240",
  inkSoft: "#1B2B4A",
  paper: "#F0F4F8",
  paperDim: "#C9D2E0",
  muted: "#5A6A80",
  pink: "#FF00CC",
  pinkSoft: "#FFB3F0",
  line: "#22324F",
};

const fontStack = `'Outfit', system-ui, sans-serif`;
const monoStack = `'DM Mono', 'JetBrains Mono', ui-monospace, monospace`;

export default function UConnectLanding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    carrier: "",
    phone: "",
    fleetSize: "",
    requestedTrial: false,
    notes: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const trialRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "uconnect-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const update = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const scrollToTrial = () => {
    trialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToForm = (trial = false) => {
    if (trial) setForm((f) => ({ ...f, requestedTrial: true }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.carrier) {
      setErrorMsg("Name, email, and carrier are required.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(
        "https://admin.seatedsocial.com/api/uconnect-leads.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Lead capture failed");
      setStatus("success");
    } catch (err) {
      setErrorMsg("Something broke. Email alex@seated-social.com and we will sort it.");
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        background: C.ink,
        color: C.paper,
        fontFamily: fontStack,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Grain />

      <header
        className="flex items-center justify-between px-6 py-5 md:px-12"
        style={{ borderBottom: `1px solid ${C.line}` }}
      >
        <Wordmark />
        <div
          className="hidden md:flex items-center gap-3"
          style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.12em", color: C.paperDim }}
        >
          <span style={{ color: C.pink }}>●</span>
          <span>UCONNECT26 / BELLAGIO / MAY 4</span>
        </div>
        <a
          href="#playbook-form"
          onClick={(e) => {
            e.preventDefault();
            scrollToForm(false);
          }}
          className="px-4 py-2 transition-all hover:opacity-90"
          style={{
            fontFamily: monoStack,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: C.ink,
            background: C.pink,
            textTransform: "uppercase",
          }}
        >
          Get the playbook
        </a>
      </header>

      <section className="relative px-6 md:px-12 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow text="EXCLUSIVE FOR UCONNECT26 ATTENDEES" />
            <h1
              className="mt-6 leading-none"
              style={{
                fontFamily: fontStack,
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 5.25rem)",
                letterSpacing: "-0.03em",
                color: C.paper,
              }}
            >
              Stop losing drivers in <br className="hidden md:block" />
              their <PinkSpan>first 90 days.</PinkSpan>
            </h1>
            <p
              className="mt-7 max-w-xl"
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.55,
                color: C.paperDim,
                fontWeight: 300,
              }}
            >
              The First 90 Day Retention Playbook is the field manual we use with our pilot
              carrier R&R Transportation. Take it home from Vegas. Run it yourself. Or have us run it
              for you for thirty days, for one hundred dollars.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollToForm(false)}
                className="px-7 py-4 transition-transform hover:-translate-y-0.5"
                style={{
                  background: C.pink,
                  color: C.ink,
                  fontFamily: fontStack,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  fontSize: "1rem",
                }}
              >
                Get the Playbook (free)
              </button>
              <button
                onClick={scrollToTrial}
                className="px-7 py-4 transition-all"
                style={{
                  background: "transparent",
                  color: C.paper,
                  border: `1px solid ${C.line}`,
                  fontFamily: fontStack,
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                $100 thirty-day trial →
              </button>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
              style={{ fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}
            >
              <span>NO CREDIT CARD FOR THE PLAYBOOK</span>
              <span>·</span>
              <span>SHIPPED TO YOUR INBOX IN 60 SECONDS</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PlaybookMock />
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-12"
        style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.inkMid }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat label="INDUSTRY 90-DAY RETENTION" value="55%" sub="The number we are here to fix" />
          <Stat label="REPLACEMENT COST PER DRIVER" value="$8K" sub="Conservative industry midpoint" />
          <Stat label="RETURN-TO-RETENTION DELTA" value="37%" sub="When at-risk drivers actually get contacted" />
          <Stat label="SIGNAL TOUCHPOINTS IN 90 DAYS" value="9" sub="Day 1 through Day 90, automated" />
        </div>
      </section>

      <section ref={formRef} id="playbook-form" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <Eyebrow text="STEP 01 / GET THE PLAYBOOK" />
          <h2
            className="mt-5"
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Tell us where to send it.
          </h2>
          <p
            className="mt-4 max-w-xl"
            style={{ color: C.paperDim, fontSize: "1.05rem", lineHeight: 1.55, fontWeight: 300 }}
          >
            The Playbook lands in your inbox immediately. If you check the box, Alex follows up
            personally about the $100 trial within one business day.
          </p>

          {status === "success" ? (
            <SuccessCard requestedTrial={form.requestedTrial} />
          ) : (
            <form onSubmit={submit} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="YOUR NAME" required>
                <input type="text" required value={form.name} onChange={update("name")} style={inputStyle} placeholder="Hunter Carpenter" />
              </Field>
              <Field label="WORK EMAIL" required>
                <input type="email" required value={form.email} onChange={update("email")} style={inputStyle} placeholder="hunter@carrier.com" />
              </Field>
              <Field label="CARRIER NAME" required>
                <input type="text" required value={form.carrier} onChange={update("carrier")} style={inputStyle} placeholder="R&R Transportation" />
              </Field>
              <Field label="MOBILE (OPTIONAL)">
                <input type="tel" value={form.phone} onChange={update("phone")} style={inputStyle} placeholder="208 555 0144" />
              </Field>
              <Field label="FLEET SIZE">
                <select value={form.fleetSize} onChange={update("fleetSize")} style={inputStyle}>
                  <option value="">Select range</option>
                  <option value="1-25">1 to 25 trucks</option>
                  <option value="26-100">26 to 100 trucks</option>
                  <option value="101-300">101 to 300 trucks</option>
                  <option value="301-1000">301 to 1,000 trucks</option>
                  <option value="1000+">1,000 plus</option>
                </select>
              </Field>
              <Field label="ATS (OPTIONAL)">
                <input type="text" value={form.notes} onChange={update("notes")} style={inputStyle} placeholder="e.g. TenStreet" />
              </Field>

              <div className="md:col-span-2 mt-2">
                <label
                  className="flex items-start gap-3 cursor-pointer p-5 transition-colors"
                  style={{
                    background: form.requestedTrial ? "rgba(255, 0, 204, 0.08)" : C.inkMid,
                    border: `1px solid ${form.requestedTrial ? C.pink : C.line}`,
                  }}
                >
                  <input type="checkbox" checked={form.requestedTrial} onChange={update("requestedTrial")} style={{ marginTop: 4, accentColor: C.pink }} />
                  <span>
                    <span style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.12em", color: C.pink }}>ALSO YES</span>
                    <br />
                    <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>Apply for the $100 thirty-day trial</span>
                    <br />
                    <span style={{ color: C.paperDim, fontSize: "0.95rem", fontWeight: 300 }}>
                      Full access. Up to 25 drivers. All modules. Alex onboards you personally.
                    </span>
                  </span>
                </label>
              </div>

              {status === "error" && (
                <div className="md:col-span-2 px-4 py-3" style={{ background: "rgba(255, 80, 80, 0.1)", color: "#FFB3B3", fontSize: "0.9rem" }}>
                  {errorMsg}
                </div>
              )}

              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-4 transition-transform hover:-translate-y-0.5"
                  style={{
                    background: C.pink,
                    color: C.ink,
                    fontFamily: fontStack,
                    fontWeight: 700,
                    fontSize: "1rem",
                    opacity: status === "submitting" ? 0.6 : 1,
                    cursor: status === "submitting" ? "wait" : "pointer",
                  }}
                >
                  {status === "submitting" ? "Sending..." : "Send me the Playbook →"}
                </button>
                <span style={{ fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}>
                  WE NEVER SHARE YOUR INFO. NO SPAM. EVER.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20" style={{ background: C.inkMid }}>
        <div className="max-w-6xl mx-auto">
          <Eyebrow text="WHAT'S INSIDE" />
          <h2
            className="mt-5 max-w-3xl"
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Forty-eight pages. Nine touchpoints. <br />
            <span style={{ color: C.pink }}>Zero filler.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: C.line }}>
            {[
              { n: "01", t: "The 90-Day Window", d: "Why nearly half of new hires churn before their first quarter, and the four leaks that cause it." },
              { n: "02", t: "Day-by-Day Touchpoint Map", d: "Exactly what to send on Day 1, 7, 14, 21, 30, 45, 60, 80, and 90. Copy you can lift." },
              { n: "03", t: "The Sentiment Triangle", d: "How to score driver replies on a 1 to 5 scale without an AI degree, with keyword fallbacks." },
              { n: "04", t: "Manager Intervention Playbook", d: "When to escalate, who calls, what they say, and how to log the outcome. Closed-loop or it doesn't count." },
              { n: "05", t: "The Spotlight Engine", d: "Four-layer recognition flow that turns retained drivers into recruiting content without a video crew." },
              { n: "06", t: "ROI Worksheet", d: "Plug your hire cost, your turnover rate, and your average tenure. See your annualized leak in dollars." },
            ].map((b) => (
              <div key={b.n} className="p-8" style={{ background: C.ink }}>
                <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>
                  CHAPTER {b.n}
                </div>
                <h3 className="mt-4" style={{ fontFamily: fontStack, fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.01em" }}>
                  {b.t}
                </h3>
                <p className="mt-3" style={{ color: C.paperDim, fontSize: "0.95rem", lineHeight: 1.55, fontWeight: 300 }}>
                  {b.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={trialRef} id="trial" className="relative px-6 md:px-12 py-24 md:py-32" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow text="STEP 02 / OPTIONAL UPGRADE" />
              <h2
                className="mt-6 leading-none"
                style={{
                  fontFamily: fontStack,
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <span style={{ color: C.pink }}>$100</span>
                <br />
                <span style={{ color: C.paperDim, fontWeight: 300, fontSize: "0.4em" }}>for thirty days of Signal,</span>
                <br />
                <span style={{ color: C.paperDim, fontWeight: 300, fontSize: "0.4em" }}>fully run for you.</span>
              </h2>

              <p className="mt-8 max-w-xl" style={{ color: C.paperDim, fontSize: "1.1rem", lineHeight: 1.55, fontWeight: 300 }}>
                We onboard you. We write the touchpoints. We stand up your dedicated SMS number.
                You watch the dashboard fill up with real driver replies, sentiment scores, and
                flags. Thirty days. One hundred dollars. No contract.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => scrollToForm(true)}
                  className="px-8 py-4 transition-transform hover:-translate-y-0.5"
                  style={{
                    background: C.pink,
                    color: C.ink,
                    fontFamily: fontStack,
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  Apply for the trial →
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8" style={{ background: C.inkMid, border: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>
                  WHAT'S INCLUDED
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    "Full Signal access for 30 days, all modules unlocked",
                    "Up to 25 drivers enrolled in your First 90 sequence",
                    "Dedicated 10DLC SMS number provisioned for your carrier",
                    "Personal Loom walkthrough from Alex within 24 hours",
                    "Live dashboard, sentiment scoring, flagging engine, Spotlights",
                    "Inside the Cab weekly content scheduled by us",
                    "Branded Welcome Kit shipped to your office",
                    "No contract, no auto-renew, manual close at day 30",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                      <span style={{ color: C.pink, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ color: C.paper, fontWeight: 400 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-8 pt-6"
                  style={{ borderTop: `1px solid ${C.line}`, fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.1em" }}
                >
                  TRIAL CAPPED AT 10 CARRIERS FROM UCONNECT26
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20" style={{ background: C.inkMid }}>
        <div className="max-w-6xl mx-auto">
          <Eyebrow text="THE THREE MODULES" />
          <h2
            className="mt-5"
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            What you actually get when you turn it on.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: C.line }}>
            <ModuleCard
              tag="ONBOARDING"
              title="First 90 Days"
              body="Nine SMS touchpoints from Day 1 to Day 90, automated and tied to each driver's hire date. Page links, reply prompts, milestone celebrations."
            />
            <ModuleCard
              tag="ENGAGEMENT"
              title="Inside the Cab"
              body="Weekly pulse content delivered to all drivers or any segment. Leadership videos, shoutouts, company updates, open prompts. We schedule it."
            />
            <ModuleCard
              tag="RECOGNITION"
              title="Driver Spotlights"
              body="Four-layer recognition flow. Private SMS to the driver, fleet-wide share, Facebook auto-post, branded gallery page. Drivers feel seen."
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto">
          <Eyebrow text="FAQ" />
          <h2
            className="mt-5"
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Quick answers, no fluff.
          </h2>

          <div className="mt-10">
            {[
              {
                q: "Is the Playbook actually free?",
                a: "Yes. No card, no trial, no autoplay video sales pitch. You give us your email, we send you a forty-eight page PDF. The trial is opt-in on a separate checkbox.",
              },
              {
                q: "What happens after the 30-day trial?",
                a: "Nothing automatic. We talk on day 28. If Signal earned its keep you pick a tier. If not, we shut it down clean and you keep the data export.",
              },
              {
                q: "What if we already use TenStreet?",
                a: "Good. Signal pulls new hires from TenStreet automatically, so your existing stack stays put. Other ATS integrations are on the roadmap.",
              },
              {
                q: "Will my drivers have to download an app?",
                a: "No. Signal is SMS-first by design. Drivers text and tap branded links. Zero app installs. Zero passwords.",
              },
              {
                q: "What about A2P 10DLC compliance?",
                a: "We handle it. Each carrier gets a dedicated 10DLC number under our registered platform campaign. Consent language goes into your driver onboarding paperwork. We supply the template.",
              },
              {
                q: "Can I see it before I commit $100?",
                a: "Yes. Email alex@seated-social.com and we will grab 20 minutes on a live tenant over Zoom. If you are at UConnect26, text 208 504 2701 and we will find time between sessions.",
              },
            ].map((item, i) => (
              <Faq key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-28 text-center"
        style={{ borderTop: `1px solid ${C.line}`, background: C.inkMid }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            style={{
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Take the Playbook home from Vegas. <br />
            <span style={{ color: C.pink }}>Or take Signal home with you.</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollToForm(false)}
              className="px-8 py-4"
              style={{
                background: C.pink,
                color: C.ink,
                fontFamily: fontStack,
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Get the Playbook
            </button>
            <button
              onClick={() => scrollToForm(true)}
              className="px-8 py-4"
              style={{
                background: "transparent",
                color: C.paper,
                border: `1px solid ${C.paper}`,
                fontFamily: fontStack,
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              Apply for the $100 trial
            </button>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-16" style={{ background: C.ink, borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.muted }}>
            THE SEATED FAMILY
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: C.line }}>
            <FamilyCard name="SEATED SOCIAL" tag="Driver recruiting marketing for trucking carriers." href="https://seated-social.com" />
            <FamilyCard name="SEATED SIGNAL" tag="SMS-first driver retention." href="https://seatedsignal.com" highlight />
            <FamilyCard name="SEATED SELECT" tag="Video lead forms for carrier recruiting." href="https://seatedselect.com" />
          </div>
          <div
            className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.08em" }}
          >
            <span>© 2026 SEATED SOCIAL LLC</span>
            <span>BUILT FOR UCONNECT26 / BELLAGIO / MAY 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <SignalWave />
      <span style={{ fontFamily: fontStack, fontSize: 16, letterSpacing: "0.02em" }}>
        <span style={{ fontWeight: 300, color: C.paperDim }}>SEATED</span>{" "}
        <span style={{ fontWeight: 800, color: C.pink }}>SIGNAL</span>
      </span>
    </div>
  );
}

function SignalWave() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF00CC" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      <path d="M2 12 Q 6 4, 10 12 T 18 12 T 22 12" stroke="url(#sg)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Eyebrow({ text }) {
  return (
    <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.18em", color: C.pink }}>
      <span style={{ marginRight: 10 }}>●</span>
      {text}
    </div>
  );
}

function PinkSpan({ children }) {
  return <span style={{ color: C.pink }}>{children}</span>;
}

function Stat({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
        {label}
      </div>
      <div
        className="mt-3"
        style={{
          fontFamily: fontStack,
          fontWeight: 800,
          fontSize: "2.5rem",
          letterSpacing: "-0.03em",
          color: C.paper,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div className="mt-2" style={{ fontSize: 12, color: C.paperDim, fontWeight: 300, lineHeight: 1.4 }}>
        {sub}
      </div>
    </div>
  );
}

function PlaybookMock() {
  return (
    <div
      className="relative"
      style={{
        width: "min(360px, 80vw)",
        aspectRatio: "3 / 4",
        transform: "perspective(1000px) rotateY(-12deg) rotateX(4deg)",
        transformStyle: "preserve-3d",
        boxShadow: "0 50px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${C.inkMid} 0%, ${C.ink} 100%)`,
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${C.line}`,
        }}
      >
        <div>
          <div style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.18em", color: C.pink }}>
            ● SEATED SIGNAL / ED. 01
          </div>
          <div className="mt-8" style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
            FIELD MANUAL
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: "2.25rem",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: C.paper,
            }}
          >
            The First <br />
            <span style={{ color: C.pink }}>90 Days.</span>
          </h3>
          <div className="mt-4" style={{ width: 60, height: 2, background: C.pink }} />
          <div className="mt-4" style={{ fontSize: 13, color: C.paperDim, fontWeight: 300, lineHeight: 1.5 }}>
            A field manual for retaining truck drivers in the window where most carriers lose them.
          </div>
        </div>
        <div style={{ fontFamily: monoStack, fontSize: 9, letterSpacing: "0.18em", color: C.muted }}>
          BY ALEX CARPENTER · UCONNECT26 EDITION
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: -8,
          top: 0,
          bottom: 0,
          width: 8,
          background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)",
          transform: "translateZ(-1px)",
        }}
      />
    </div>
  );
}

function ModuleCard({ tag, title, body }) {
  return (
    <div className="p-8" style={{ background: C.ink }}>
      <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>
        {tag}
      </div>
      <h3 className="mt-4" style={{ fontFamily: fontStack, fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.01em" }}>
        {title}
      </h3>
      <p className="mt-3" style={{ color: C.paperDim, fontSize: "0.95rem", lineHeight: 1.55, fontWeight: 300 }}>
        {body}
      </p>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-6 text-left transition-colors"
        style={{ background: "transparent", color: C.paper }}
      >
        <span style={{ fontFamily: fontStack, fontWeight: 500, fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
          {q}
        </span>
        <span
          style={{
            color: C.pink,
            fontFamily: monoStack,
            fontSize: "1.25rem",
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 200ms",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-6 max-w-2xl" style={{ color: C.paperDim, fontSize: "1rem", lineHeight: 1.6, fontWeight: 300 }}>
          {a}
        </p>
      )}
    </div>
  );
}

function FamilyCard({ name, tag, href, highlight }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-7 transition-colors hover:opacity-90"
      style={{ background: C.ink, textDecoration: "none", color: C.paper, display: "block" }}
    >
      <div style={{ fontFamily: fontStack, fontSize: 18, letterSpacing: "0.05em", color: highlight ? C.pink : C.paper }}>
        <span style={{ fontWeight: 300 }}>{name.split(" ")[0]}</span>{" "}
        <span style={{ fontWeight: 800 }}>{name.split(" ")[1]}</span>
      </div>
      <div className="mt-3" style={{ color: C.paperDim, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.5 }}>
        {tag}
      </div>
      <div className="mt-5" style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
        VISIT →
      </div>
    </a>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
        {label}
        {required && <span style={{ color: C.pink }}> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputStyle = {
  width: "100%",
  background: C.inkMid,
  border: `1px solid ${C.line}`,
  color: C.paper,
  padding: "14px 16px",
  fontSize: "0.95rem",
  fontFamily: fontStack,
  fontWeight: 400,
  outline: "none",
};

function SuccessCard({ requestedTrial }) {
  return (
    <div className="mt-10 p-10" style={{ background: C.inkMid, border: `1px solid ${C.pink}` }}>
      <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.18em", color: C.pink }}>
        ● SENT
      </div>
      <h3
        className="mt-4"
        style={{
          fontFamily: fontStack,
          fontWeight: 700,
          fontSize: "1.75rem",
          letterSpacing: "-0.02em",
          color: C.paper,
        }}
      >
        Playbook is on its way.
      </h3>
      <p className="mt-4 max-w-xl" style={{ color: C.paperDim, fontSize: "1rem", lineHeight: 1.55, fontWeight: 300 }}>
        Check your inbox in the next 60 seconds. The PDF is attached to the email. If it doesn't
        show up, look in spam, then email alex@seated-social.com.
      </p>
      {requestedTrial && (
        <div
          className="mt-6 pt-6"
          style={{ borderTop: `1px solid ${C.line}`, fontSize: "1rem", color: C.paper, lineHeight: 1.55 }}
        >
          <strong style={{ color: C.pink }}>Trial application received.</strong> Alex will reach out
          within one business day to walk you through onboarding and process the $100.
        </div>
      )}
    </div>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.04,
        mixBlendMode: "overlay",
        zIndex: 1,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
