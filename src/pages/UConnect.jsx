import { useState, useEffect, useRef } from "react";

// Seated Signal :: UConnect26 Landing
// Pure inline styles + scoped CSS classes (no Tailwind). Matches App.jsx pattern.

const C = {
  ink: "#0A1628",
  inkMid: "#132240",
  inkSoft: "#1A2D4A",
  paper: "#F0F4F8",
  paperDim: "#C9D2E0",
  muted: "#5A6A80",
  pink: "#FF00CC",
  line: "#22324F",
  glow: "rgba(255,0,204,0.15)",
};

const fontStack = `'Outfit', sans-serif`;
const monoStack = `'DM Mono', monospace`;

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

  const scrollToTrial = () => trialRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div style={{ background: C.ink, color: C.paper, fontFamily: fontStack, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        .uc-grain { position: fixed; inset: 0; pointer-events: none; opacity: 0.04; mix-blend-mode: overlay; z-index: 1;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>"); }

        .uc-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 32px; border-bottom: 1px solid ${C.line}; }
        .uc-header-meta { display: flex; align-items: center; gap: 10px; font-family: ${monoStack}; font-size: 11px; letter-spacing: 0.12em; color: ${C.paperDim}; }

        .uc-hero { padding: 80px 32px 100px; }
        .uc-hero-inner { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: start; }
        .uc-hero-meta { display: flex; flex-wrap: wrap; gap: 28px; font-family: ${monoStack}; font-size: 11px; color: ${C.muted}; letter-spacing: 0.08em; margin-top: 40px; }
        .uc-hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; }

        .uc-section { padding: 80px 32px; }
        .uc-section-narrow { max-width: 760px; margin: 0 auto; }
        .uc-section-wide { max-width: 1180px; margin: 0 auto; }

        .uc-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        .uc-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
        .uc-form-full { grid-column: 1 / -1; }
        .uc-chapter-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${C.line}; margin-top: 56px; }
        .uc-trial-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 56px; align-items: start; }
        .uc-modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${C.line}; margin-top: 48px; }
        .uc-family-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${C.line}; margin-top: 32px; }

        .uc-btn { display: inline-block; padding: 16px 28px; font-family: ${fontStack}; font-weight: 700; font-size: 15px; cursor: pointer; border: none; transition: transform 0.18s ease, opacity 0.18s ease; text-decoration: none; }
        .uc-btn:hover { transform: translateY(-2px); }
        .uc-btn-pink { background: ${C.pink}; color: ${C.ink}; box-shadow: 0 0 30px ${C.glow}; }
        .uc-btn-outline { background: transparent; color: ${C.paper}; border: 1px solid ${C.line}; }
        .uc-btn-ghost { background: transparent; color: ${C.paper}; border: 1px solid ${C.paper}; }

        .uc-input { width: 100%; background: ${C.inkMid}; border: 1px solid ${C.line}; color: ${C.paper}; padding: 14px 16px; font-size: 15px; font-family: ${fontStack}; font-weight: 400; outline: none; box-sizing: border-box; border-radius: 0; }
        .uc-input:focus { border-color: ${C.pink}; }

        .uc-faq-row { border-bottom: 1px solid ${C.line}; }
        .uc-faq-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 22px 0; background: transparent; border: none; color: ${C.paper}; font-family: ${fontStack}; font-weight: 500; font-size: 17px; letter-spacing: -0.01em; cursor: pointer; text-align: left; }
        .uc-faq-toggle { color: ${C.pink}; font-family: ${monoStack}; font-size: 22px; transition: transform 0.2s; }
        .uc-faq-answer { padding: 0 0 22px 0; max-width: 640px; color: ${C.paperDim}; font-size: 15px; line-height: 1.6; font-weight: 300; }

        .uc-trial-tag { display: inline-block; font-family: ${monoStack}; font-size: 11px; letter-spacing: 0.18em; color: ${C.pink}; }
        .uc-h1 { font-family: ${fontStack}; font-weight: 800; font-size: clamp(38px, 6vw, 84px); letter-spacing: -0.03em; line-height: 1; margin: 24px 0 0; color: ${C.paper}; }
        .uc-h2 { font-family: ${fontStack}; font-weight: 700; font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; line-height: 1.05; margin: 18px 0 0; color: ${C.paper}; }
        .uc-h2-massive { font-family: ${fontStack}; font-weight: 800; font-size: clamp(56px, 10vw, 120px); letter-spacing: -0.04em; line-height: 0.95; margin: 18px 0 0; }
        .uc-lead { font-size: 18px; line-height: 1.55; color: ${C.paperDim}; font-weight: 300; max-width: 580px; margin: 24px 0 0; }

        @media (max-width: 768px) {
          .uc-header { padding: 14px 20px; }
          .uc-header-meta { display: none; }
          .uc-hero { padding: 48px 20px 64px; }
          .uc-hero-inner { grid-template-columns: 1fr; gap: 56px; }
          .uc-section { padding: 56px 20px; }
          .uc-stat-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .uc-form-grid { grid-template-columns: 1fr; }
          .uc-chapter-grid { grid-template-columns: 1fr; }
          .uc-trial-grid { grid-template-columns: 1fr; gap: 40px; }
          .uc-modules-grid { grid-template-columns: 1fr; }
          .uc-family-grid { grid-template-columns: 1fr; }
          .uc-mobile-center { justify-content: center !important; display: flex; }
        }
      `}</style>

      <div className="uc-grain" aria-hidden />

      {/* TOP BAR */}
      <header className="uc-header">
        <Wordmark />
        <div className="uc-header-meta">
          <span style={{ color: C.pink }}>●</span>
          <span>UCONNECT26 / BELLAGIO / MAY 4</span>
        </div>
        <button onClick={() => scrollToForm(false)} style={{
          padding: "10px 16px", border: "none", background: C.pink, color: C.ink,
          fontFamily: monoStack, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
          cursor: "pointer", fontWeight: 500,
        }}>
          Get the playbook
        </button>
      </header>

      {/* HERO */}
      <section className="uc-hero">
        <div className="uc-hero-inner">
          <div>
            <Eyebrow text="EXCLUSIVE FOR UCONNECT26 ATTENDEES" />
            <h1 className="uc-h1">
              Stop losing drivers in their <span style={{ color: C.pink }}>first 90 days.</span>
            </h1>
            <p className="uc-lead">
              The First 90 Day Retention Playbook is the field manual we use with our pilot
              carrier R&R Transportation. Take it home from Vegas. Run it yourself. Or have us
              run it for you for thirty days, for one hundred dollars.
            </p>

            <div className="uc-hero-cta">
              <button className="uc-btn uc-btn-pink" onClick={() => scrollToForm(false)}>
                Get the Playbook (free)
              </button>
              <button className="uc-btn uc-btn-outline" onClick={scrollToTrial}>
                $100 thirty-day trial →
              </button>
            </div>

            <div className="uc-hero-meta">
              <span>NO CREDIT CARD FOR THE PLAYBOOK</span>
              <span>·</span>
              <span>SHIPPED TO YOUR INBOX IN 60 SECONDS</span>
            </div>
          </div>

          <div className="uc-mobile-center" style={{ display: "flex", justifyContent: "flex-end" }}>
            <PlaybookMock />
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="uc-section" style={{ background: C.inkMid, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "56px 32px" }}>
        <div className="uc-section-wide">
          <div className="uc-stat-grid">
            <Stat label="INDUSTRY 90-DAY RETENTION" value="55%" sub="The number we are here to fix" />
            <Stat label="REPLACEMENT COST PER DRIVER" value="$8K" sub="Conservative industry midpoint" />
            <Stat label="RETURN-TO-RETENTION DELTA" value="37%" sub="When at-risk drivers actually get contacted" />
            <Stat label="SIGNAL TOUCHPOINTS IN 90 DAYS" value="9" sub="Day 1 through Day 90, automated" />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="uc-section" style={{ padding: "100px 32px" }}>
        <div className="uc-section-narrow">
          <Eyebrow text="STEP 01 / GET THE PLAYBOOK" />
          <h2 className="uc-h2">Tell us where to send it.</h2>
          <p style={{ marginTop: 18, color: C.paperDim, fontSize: 17, lineHeight: 1.55, fontWeight: 300, maxWidth: 580 }}>
            The Playbook lands in your inbox immediately. If you check the box, Alex follows up
            personally about the $100 trial within one business day.
          </p>

          {status === "success" ? (
            <SuccessCard requestedTrial={form.requestedTrial} />
          ) : (
            <form onSubmit={submit} className="uc-form-grid">
              <Field label="YOUR NAME" required>
                <input type="text" required value={form.name} onChange={update("name")} className="uc-input" placeholder="Hunter Carpenter" />
              </Field>
              <Field label="WORK EMAIL" required>
                <input type="email" required value={form.email} onChange={update("email")} className="uc-input" placeholder="hunter@carrier.com" />
              </Field>
              <Field label="CARRIER NAME" required>
                <input type="text" required value={form.carrier} onChange={update("carrier")} className="uc-input" placeholder="R&R Transportation" />
              </Field>
              <Field label="MOBILE (OPTIONAL)">
                <input type="tel" value={form.phone} onChange={update("phone")} className="uc-input" placeholder="208 555 0144" />
              </Field>
              <Field label="FLEET SIZE">
                <select value={form.fleetSize} onChange={update("fleetSize")} className="uc-input">
                  <option value="">Select range</option>
                  <option value="1-25">1 to 25 trucks</option>
                  <option value="26-100">26 to 100 trucks</option>
                  <option value="101-300">101 to 300 trucks</option>
                  <option value="301-1000">301 to 1,000 trucks</option>
                  <option value="1000+">1,000 plus</option>
                </select>
              </Field>
              <Field label="ATS (OPTIONAL)">
                <input type="text" value={form.notes} onChange={update("notes")} className="uc-input" placeholder="e.g. TenStreet" />
              </Field>

              <div className="uc-form-full" style={{ marginTop: 12 }}>
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer", padding: 22,
                  background: form.requestedTrial ? "rgba(255, 0, 204, 0.08)" : C.inkMid,
                  border: `1px solid ${form.requestedTrial ? C.pink : C.line}`,
                  transition: "all 0.18s ease",
                }}>
                  <input type="checkbox" checked={form.requestedTrial} onChange={update("requestedTrial")}
                    style={{ marginTop: 4, accentColor: C.pink, width: 18, height: 18, cursor: "pointer" }} />
                  <span>
                    <span style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.12em", color: C.pink }}>ALSO YES</span>
                    <br />
                    <span style={{ fontWeight: 600, fontSize: 17 }}>Apply for the $100 thirty-day trial</span>
                    <br />
                    <span style={{ color: C.paperDim, fontSize: 15, fontWeight: 300 }}>
                      Full access. Up to 25 drivers. All modules. Alex onboards you personally.
                    </span>
                  </span>
                </label>
              </div>

              {status === "error" && (
                <div className="uc-form-full" style={{
                  background: "rgba(255, 80, 80, 0.1)", color: "#FFB3B3",
                  fontSize: 14, padding: "14px 18px",
                }}>
                  {errorMsg}
                </div>
              )}

              <div className="uc-form-full" style={{
                display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18, marginTop: 8,
              }}>
                <button type="submit" className="uc-btn uc-btn-pink" disabled={status === "submitting"}
                  style={{ opacity: status === "submitting" ? 0.6 : 1, cursor: status === "submitting" ? "wait" : "pointer" }}>
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

      {/* WHAT'S INSIDE */}
      <section className="uc-section" style={{ background: C.inkMid }}>
        <div className="uc-section-wide">
          <Eyebrow text="WHAT'S INSIDE" />
          <h2 className="uc-h2" style={{ maxWidth: 760 }}>
            Forty-eight pages. Nine touchpoints. <span style={{ color: C.pink }}>Zero filler.</span>
          </h2>

          <div className="uc-chapter-grid">
            {[
              { n: "01", t: "The 90-Day Window", d: "Why nearly half of new hires churn before their first quarter, and the four leaks that cause it." },
              { n: "02", t: "Day-by-Day Touchpoint Map", d: "Exactly what to send on Day 1, 7, 14, 21, 30, 45, 60, 80, and 90. Copy you can lift." },
              { n: "03", t: "The Sentiment Triangle", d: "How to score driver replies on a 1 to 5 scale without an AI degree, with keyword fallbacks." },
              { n: "04", t: "Manager Intervention Playbook", d: "When to escalate, who calls, what they say, and how to log the outcome. Closed-loop or it doesn't count." },
              { n: "05", t: "The Spotlight Engine", d: "Four-layer recognition flow that turns retained drivers into recruiting content without a video crew." },
              { n: "06", t: "ROI Worksheet", d: "Plug your hire cost, your turnover rate, and your average tenure. See your annualized leak in dollars." },
            ].map((b) => (
              <div key={b.n} style={{ padding: 32, background: C.ink }}>
                <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>
                  CHAPTER {b.n}
                </div>
                <h3 style={{ marginTop: 16, fontFamily: fontStack, fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: C.paper }}>
                  {b.t}
                </h3>
                <p style={{ marginTop: 12, color: C.paperDim, fontSize: 15, lineHeight: 1.55, fontWeight: 300 }}>
                  {b.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIAL: $100 */}
      <section ref={trialRef} className="uc-section" style={{ padding: "120px 32px", borderTop: `1px solid ${C.line}` }}>
        <div className="uc-section-wide">
          <div className="uc-trial-grid">
            <div>
              <Eyebrow text="STEP 02 / OPTIONAL UPGRADE" />
              <h2 className="uc-h2-massive">
                <span style={{ color: C.pink }}>$100</span>
                <br />
                <span style={{ color: C.paperDim, fontWeight: 300, fontSize: "0.4em", letterSpacing: "-0.02em" }}>
                  for thirty days of Signal,
                </span>
                <br />
                <span style={{ color: C.paperDim, fontWeight: 300, fontSize: "0.4em", letterSpacing: "-0.02em" }}>
                  fully run for you.
                </span>
              </h2>

              <p className="uc-lead">
                We onboard you. We write the touchpoints. We stand up your dedicated SMS number.
                You watch the dashboard fill up with real driver replies, sentiment scores, and
                flags. Thirty days. One hundred dollars. No contract.
              </p>

              <div style={{ marginTop: 36 }}>
                <button className="uc-btn uc-btn-pink" onClick={() => scrollToForm(true)}>
                  Apply for the trial →
                </button>
              </div>
            </div>

            <div style={{ background: C.inkMid, border: `1px solid ${C.line}`, padding: 32 }}>
              <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>
                WHAT'S INCLUDED
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
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
                  <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                    <span style={{ color: C.pink, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.paper, fontWeight: 400 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.line}`,
                fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.1em",
              }}>
                TRIAL CAPPED AT 10 CARRIERS FROM UCONNECT26
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="uc-section" style={{ background: C.inkMid }}>
        <div className="uc-section-wide">
          <Eyebrow text="THE THREE MODULES" />
          <h2 className="uc-h2">What you actually get when you turn it on.</h2>

          <div className="uc-modules-grid">
            <ModuleCard tag="ONBOARDING" title="First 90 Days"
              body="Nine SMS touchpoints from Day 1 to Day 90, automated and tied to each driver's hire date. Page links, reply prompts, milestone celebrations." />
            <ModuleCard tag="ENGAGEMENT" title="Inside the Cab"
              body="Weekly pulse content delivered to all drivers or any segment. Leadership videos, shoutouts, company updates, open prompts. We schedule it." />
            <ModuleCard tag="RECOGNITION" title="Driver Spotlights"
              body="Four-layer recognition flow. Private SMS to the driver, fleet-wide share, Facebook auto-post, branded gallery page. Drivers feel seen." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="uc-section">
        <div className="uc-section-narrow">
          <Eyebrow text="FAQ" />
          <h2 className="uc-h2">Quick answers, no fluff.</h2>

          <div style={{ marginTop: 40 }}>
            {[
              { q: "Is the Playbook actually free?",
                a: "Yes. No card, no trial, no autoplay video sales pitch. You give us your email, we send you a forty-eight page PDF. The trial is opt-in on a separate checkbox." },
              { q: "What happens after the 30-day trial?",
                a: "Nothing automatic. We talk on day 28. If Signal earned its keep you pick a tier. If not, we shut it down clean and you keep the data export." },
              { q: "What if we already use TenStreet?",
                a: "Good. Signal pulls new hires from TenStreet automatically, so your existing stack stays put. Other ATS integrations are on the roadmap." },
              { q: "Will my drivers have to download an app?",
                a: "No. Signal is SMS-first by design. Drivers text and tap branded links. Zero app installs. Zero passwords." },
              { q: "What about A2P 10DLC compliance?",
                a: "We handle it. Each carrier gets a dedicated 10DLC number under our registered platform campaign. Consent language goes into your driver onboarding paperwork. We supply the template." },
              { q: "Can I see it before I commit $100?",
                a: "Yes. Email alex@seated-social.com and we will grab 20 minutes on a live tenant over Zoom. If you are at UConnect26, text 208 504 2701 and we will find time between sessions." },
            ].map((item, i) => <Faq key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="uc-section" style={{
        background: C.inkMid, borderTop: `1px solid ${C.line}`, padding: "100px 32px", textAlign: "center",
      }}>
        <div className="uc-section-narrow">
          <h2 style={{
            fontFamily: fontStack, fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, color: C.paper,
          }}>
            Take the Playbook home from Vegas. <br />
            <span style={{ color: C.pink }}>Or take Signal home with you.</span>
          </h2>
          <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="uc-btn uc-btn-pink" onClick={() => scrollToForm(false)}>Get the Playbook</button>
            <button className="uc-btn uc-btn-ghost" onClick={() => scrollToForm(true)}>Apply for the $100 trial</button>
          </div>
        </div>
      </section>

      {/* SEATED FAMILY */}
      <footer className="uc-section" style={{ background: C.ink, borderTop: `1px solid ${C.line}`, padding: "64px 32px" }}>
        <div className="uc-section-wide">
          <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.muted }}>
            THE SEATED FAMILY
          </div>
          <div className="uc-family-grid">
            <FamilyCard name="SEATED" name2="SOCIAL" tag="Driver recruiting marketing for trucking carriers." href="https://seated-social.com" />
            <FamilyCard name="SEATED" name2="SIGNAL" tag="SMS-first driver retention." href="https://seatedsignal.com" highlight />
            <FamilyCard name="SEATED" name2="SELECT" tag="Video lead forms for carrier recruiting." href="https://seatedselect.com" />
          </div>
          <div style={{
            marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
            fontFamily: monoStack, fontSize: 11, color: C.muted, letterSpacing: "0.08em",
          }}>
            <span>© 2026 SEATED SOCIAL LLC</span>
            <span>BUILT FOR UCONNECT26 / BELLAGIO / MAY 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- subcomponents ---------- */

function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="ucsg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF00CC" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      <path d="M2 12 C 5 6, 8 18, 11 12 C 14 6, 17 18, 22 12" stroke="url(#ucsg)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
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

function Stat({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>{label}</div>
      <div style={{
        marginTop: 12, fontFamily: fontStack, fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)",
        letterSpacing: "-0.03em", color: C.paper, lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: C.paperDim, fontWeight: 300, lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function PlaybookMock() {
  return (
    <div style={{
      width: "min(360px, 80vw)",
      aspectRatio: "3 / 4",
      transform: "perspective(1200px) rotateY(-12deg) rotateX(4deg)",
      boxShadow: "0 50px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${C.inkMid} 0%, ${C.ink} 100%)`,
        padding: "32px 28px", display: "flex", flexDirection: "column",
        justifyContent: "space-between", border: `1px solid ${C.line}`,
      }}>
        <div>
          <div style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.18em", color: C.pink }}>
            ● SEATED SIGNAL / ED. 01
          </div>
          <div style={{ marginTop: 32, fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
            FIELD MANUAL
          </div>
        </div>
        <div>
          <h3 style={{
            fontFamily: fontStack, fontWeight: 800, fontSize: 36,
            letterSpacing: "-0.03em", lineHeight: 1, color: C.paper, margin: 0,
          }}>
            The First <br />
            <span style={{ color: C.pink }}>90 Days.</span>
          </h3>
          <div style={{ marginTop: 16, width: 60, height: 2, background: C.pink }} />
          <div style={{ marginTop: 16, fontSize: 13, color: C.paperDim, fontWeight: 300, lineHeight: 1.5 }}>
            A field manual for retaining truck drivers in the window where most carriers lose them.
          </div>
        </div>
        <div style={{ fontFamily: monoStack, fontSize: 9, letterSpacing: "0.18em", color: C.muted }}>
          BY ALEX CARPENTER · UCONNECT26 EDITION
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ tag, title, body }) {
  return (
    <div style={{ padding: 32, background: C.ink }}>
      <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.15em", color: C.pink }}>{tag}</div>
      <h3 style={{
        marginTop: 16, fontFamily: fontStack, fontWeight: 700, fontSize: 24,
        letterSpacing: "-0.01em", color: C.paper,
      }}>
        {title}
      </h3>
      <p style={{ marginTop: 12, color: C.paperDim, fontSize: 15, lineHeight: 1.55, fontWeight: 300 }}>
        {body}
      </p>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="uc-faq-row">
      <button className="uc-faq-btn" onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className="uc-faq-toggle" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <p className="uc-faq-answer">{a}</p>}
    </div>
  );
}

function FamilyCard({ name, name2, tag, href, highlight }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      padding: 28, background: C.ink, textDecoration: "none", color: C.paper, display: "block",
      transition: "opacity 0.18s ease",
    }}>
      <div style={{
        fontFamily: fontStack, fontSize: 18, letterSpacing: "0.05em",
        color: highlight ? C.pink : C.paper,
      }}>
        <span style={{ fontWeight: 300 }}>{name}</span>{" "}
        <span style={{ fontWeight: 800 }}>{name2}</span>
      </div>
      <div style={{ marginTop: 12, color: C.paperDim, fontSize: 14, fontWeight: 300, lineHeight: 1.5 }}>
        {tag}
      </div>
      <div style={{ marginTop: 20, fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
        VISIT →
      </div>
    </a>
  );
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontFamily: monoStack, fontSize: 10, letterSpacing: "0.15em", color: C.muted }}>
        {label}
        {required && <span style={{ color: C.pink }}> *</span>}
      </span>
      <div style={{ marginTop: 8 }}>{children}</div>
    </label>
  );
}

function SuccessCard({ requestedTrial }) {
  return (
    <div style={{
      marginTop: 40, padding: 40,
      background: C.inkMid, border: `1px solid ${C.pink}`,
    }}>
      <div style={{ fontFamily: monoStack, fontSize: 11, letterSpacing: "0.18em", color: C.pink }}>● SENT</div>
      <h3 style={{
        marginTop: 16, fontFamily: fontStack, fontWeight: 700, fontSize: 28,
        letterSpacing: "-0.02em", color: C.paper,
      }}>
        Playbook is on its way.
      </h3>
      <p style={{ marginTop: 18, maxWidth: 580, color: C.paperDim, fontSize: 16, lineHeight: 1.55, fontWeight: 300 }}>
        Check your inbox in the next 60 seconds. The PDF is attached to the email. If it doesn't
        show up, look in spam, then email alex@seated-social.com.
      </p>
      {requestedTrial && (
        <div style={{
          marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.line}`,
          fontSize: 16, color: C.paper, lineHeight: 1.55,
        }}>
          <strong style={{ color: C.pink }}>Trial application received.</strong> Alex will reach
          out within one business day to walk you through onboarding and process the $100.
        </div>
      )}
    </div>
  );
}
