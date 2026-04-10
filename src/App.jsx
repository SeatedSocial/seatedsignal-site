// ============================================================
// BRAND TOKENS
// ============================================================
const C = {
  pink: "#FF00CC", navy: "#0A1628", mid: "#132240", light: "#1A2D4A",
  white: "#F0F4F8", muted: "#5A6A80", green: "#22C55E", red: "#EF4444",
  amber: "#F59E0B", glow: "rgba(255,0,204,0.15)", glowStrong: "rgba(255,0,204,0.25)",
};

// ============================================================
// UTILITY
// ============================================================
const px = (n) => `${n}px`;
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

// ============================================================
// COMPONENTS
// ============================================================
const SignalIcon = ({ s = 28 }) => (
  <div style={{ width: s, height: s, borderRadius: s * 0.28, background: `linear-gradient(135deg, ${C.pink}, #9900AA)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width={s * 0.57} height={s * 0.57} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M2 12 C5 6, 8 18, 11 12 C14 6, 17 18, 22 12" strokeLinecap="round"/></svg>
  </div>
);

const Pill = ({ children }) => (
  <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.pink, border: `1px solid rgba(255,0,204,0.3)`, borderRadius: 20, padding: "8px 18px" }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: C.pink, marginBottom: 12 }}>{children}</div>
);

const Btn = ({ children, variant = "pink", href, onClick, style: s, disabled }) => {
  const base = { display: "inline-block", border: "none", borderRadius: 10, padding: "14px 32px", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.25s", textDecoration: "none", textAlign: "center" };
  const v = {
    pink: { ...base, background: C.pink, color: "#fff", boxShadow: `0 0 30px ${C.glow}` },
    outline: { ...base, background: "transparent", color: C.white, border: `1px solid ${C.light}` },
    green: { ...base, background: C.green, color: "#fff" },
  };
  const props = { style: { ...v[variant], ...s }, onClick, disabled };
  return href ? <a href={href} {...props}>{children}</a> : <button {...props}>{children}</button>;
};

const StatCard = ({ num, label }) => (
  <div style={{ textAlign: "center", padding: "20px 12px" }}>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 500, color: C.pink, lineHeight: 1 }}>{num}</div>
    <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontWeight: 300, lineHeight: 1.4 }}>{label}</div>
  </div>
);

const ModuleCard = ({ icon, title, desc, bullets }) => (
  <div className="ss-card" style={{ background: C.mid, border: `1px solid ${C.light}`, borderRadius: 16, padding: "32px 24px", transition: "all 0.3s", cursor: "default" }}>
    <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: C.white, margin: "0 0 10px" }}>{title}</h3>
    <p style={{ fontSize: 14, color: C.muted, fontWeight: 300, lineHeight: 1.7, margin: bullets ? "0 0 16px" : 0 }}>{desc}</p>
    {bullets && (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.muted }}>
            <span style={{ color: C.pink, flexShrink: 0, marginTop: 1 }}>→</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const TimelineStep = ({ num, title, desc }) => (
  <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.pink, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: "#fff", flexShrink: 0 }}>{num}</div>
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 14, color: C.muted, fontWeight: 300, lineHeight: 1.6 }}>{desc}</div>
    </div>
  </div>
);

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.mid, border: `1px solid ${C.light}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: C.white }}>{q}</span>
        <span style={{ color: C.pink, fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      {open && <div style={{ padding: "0 20px 16px", fontSize: 14, color: C.muted, fontWeight: 300, lineHeight: 1.7 }}>{a}</div>}
    </div>
  );
};

const PricingCard = ({ tier, price, fleet, features, popular, onTrial }) => (
  <div style={{ background: C.mid, border: popular ? `2px solid ${C.pink}` : `1px solid ${C.light}`, borderRadius: 16, overflow: "hidden", transition: "all 0.3s", boxShadow: popular ? `0 0 40px ${C.glow}` : "none" }}>
    {popular && (
      <div style={{ background: C.pink, textAlign: "center", padding: "6px 0", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fff" }}>Most Popular</div>
    )}
    <div style={{ padding: "28px 24px" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.pink, fontFamily: "'DM Mono', monospace", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{tier}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 44, fontWeight: 800, color: C.white }}>${price}</span>
        <span style={{ fontSize: 14, color: C.muted }}>/mo</span>
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>{fleet}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.muted, fontWeight: 300 }}>
            <span style={{ color: C.pink, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
      <Btn variant={popular ? "pink" : "outline"} onClick={onTrial} style={{ width: "100%", padding: "12px" }}>Start Free Trial</Btn>
    </div>
  </div>
);

const FormField = ({ label, placeholder, type = "text", options, value, onChange, mono }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>{label}</label>
    {options ? (
      <select value={value} onChange={onChange} style={{ width: "100%", background: C.navy, border: `1px solid ${C.light}`, borderRadius: 10, padding: "12px 14px", color: value ? C.white : C.muted, fontSize: 14, fontFamily: "'Outfit', sans-serif", appearance: "none", cursor: "pointer" }}>
        <option value="">{placeholder || "Select..."}</option>
        {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ width: "100%", background: C.navy, border: `1px solid ${C.light}`, borderRadius: 10, padding: "12px 14px", color: C.white, fontSize: 14, fontFamily: mono ? "'DM Mono', monospace" : "'Outfit', sans-serif", outline: "none", boxSizing: "border-box" }} />
    )}
  </div>
);

// ============================================================
// LAYOUT
// ============================================================
const Section = ({ children, bg = C.navy, style: s }) => (
  <section style={{ background: bg, padding: "80px 20px", ...s }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </section>
);

const Nav = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: C.navy, borderBottom: `1px solid ${C.light}`, backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <SignalIcon s={26} />
          <span style={{ fontWeight: 300, color: C.muted, fontSize: 14 }}>SEATED</span>
          <span style={{ fontWeight: 800, color: C.pink, fontSize: 14 }}>SIGNAL</span>
        </div>

        <div className="ss-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["home", "Features"], ["pricing", "Pricing"], ["playbook", "Free Playbook"]].map(([p, label]) => (
            <span key={p} onClick={() => setPage(p)} style={{ fontSize: 13, color: page === p ? C.pink : C.muted, fontWeight: page === p ? 600 : 400, cursor: "pointer", transition: "color 0.2s" }}>{label}</span>
          ))}
          <Btn onClick={() => setPage("trial")} style={{ padding: "10px 24px", fontSize: 13 }}>Start Free Trial</Btn>
        </div>

        <div className="ss-mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", display: "none", flexDirection: "column", gap: 4, padding: "6px 2px" }}>
          <div style={{ width: 20, height: 2, background: C.pink, borderRadius: 1 }} />
          <div style={{ width: 20, height: 2, background: C.pink, borderRadius: 1 }} />
          <div style={{ width: 20, height: 2, background: C.pink, borderRadius: 1 }} />
        </div>
      </div>

      {menuOpen && (
        <div className="ss-mobile-dropdown" style={{ background: C.mid, borderTop: `1px solid ${C.light}`, padding: "12px 20px" }}>
          {[["home", "Features"], ["pricing", "Pricing"], ["playbook", "Free Playbook"], ["trial", "Start Free Trial"]].map(([p, label]) => (
            <div key={p} onClick={() => { setPage(p); setMenuOpen(false); }} style={{ padding: "12px 0", fontSize: 14, color: p === "trial" ? C.pink : C.white, fontWeight: p === "trial" ? 700 : 400, cursor: "pointer", borderBottom: `1px solid ${C.light}` }}>{label}</div>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer style={{ background: C.navy, borderTop: `1px solid ${C.light}`, padding: "48px 20px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="ss-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <SignalIcon s={22} />
            <span style={{ fontWeight: 300, color: C.muted, fontSize: 13 }}>SEATED</span>
            <span style={{ fontWeight: 800, color: C.pink, fontSize: 13 }}>SIGNAL</span>
          </div>
          <p style={{ fontSize: 13, color: C.muted, fontWeight: 300, lineHeight: 1.6, maxWidth: 320 }}>The done-for-you SMS retention platform that keeps your drivers engaged from Day 1 to Year 10.</p>
        </div>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.pink, marginBottom: 14 }}>Product</div>
          {[["home", "Features"], ["pricing", "Pricing"], ["trial", "Free Trial"], ["playbook", "Free Playbook"]].map(([p, label]) => (
            <div key={p} onClick={() => setPage(p)} style={{ fontSize: 13, color: C.muted, marginBottom: 8, cursor: "pointer" }}>{label}</div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.pink, marginBottom: 14 }}>Contact</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>alex@seated-social.com</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Seated Social LLC</div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 11, color: C.muted }}>© 2026 Seated Social LLC. All rights reserved.</div>
        <div style={{ fontSize: 11, color: C.muted }}>Built by <span style={{ color: C.pink }}>Seated Social</span></div>
      </div>
    </div>
  </footer>
);

// ============================================================
// PAGES
// ============================================================

const HomePage = ({ setPage }) => (
  <div>
    {/* Hero */}
    <Section style={{ padding: "100px 20px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, background: `radial-gradient(circle, rgba(255,0,204,0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <Pill>Driver Retention Platform</Pill>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, color: C.white, margin: "20px 0 16px", lineHeight: 1.15 }}>
          Your drivers are talking.<br /><span style={{ color: C.pink }}>Are you listening?</span>
        </h1>
        <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: C.muted, fontWeight: 300, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.7 }}>
          The done-for-you retention platform that keeps your drivers engaged from Day 1 to Year 10. Via SMS. No app. No friction.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => setPage("trial")}>Start Free Trial</Btn>
          <Btn variant="outline" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>See How It Works</Btn>
        </div>
      </div>
    </Section>

    {/* Counter Strip */}
    <Section bg={C.mid} style={{ padding: "32px 20px" }}>
      <div className="ss-stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        <StatCard num="87%" label="of drivers say recognition matters more than pay" />
        <StatCard num="73%" label="leave in the first 90 days" />
        <StatCard num="2x" label="more likely to stay with consistent check-ins" />
        <StatCard num="$8,500" label="average cost to replace one driver" />
      </div>
    </Section>

    {/* Problem / Solution */}
    <Section>
      <div className="ss-two-col-ps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <SectionLabel>The Problem</SectionLabel>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 16px" }}>Turnover is eating your margin</h2>
          <p style={{ fontSize: 15, color: C.muted, fontWeight: 300, lineHeight: 1.8 }}>
            You spend thousands recruiting a driver. They show up on Day 1. And then... silence. No welcome message. No check-in at Week 2. No recognition at 90 days. By the time you notice they're disengaged, they're already talking to another carrier.
          </p>
        </div>
        <div>
          <SectionLabel>The Solution</SectionLabel>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 16px" }}>Automated retention that feels human</h2>
          <p style={{ fontSize: 15, color: C.muted, fontWeight: 300, lineHeight: 1.8 }}>
            Seated Signal sends the right message at the right time, every time. Your drivers feel seen. Your managers stay informed. Your turnover drops. All through SMS. No app downloads. No training. No extra work for your team.
          </p>
        </div>
      </div>
    </Section>

    {/* What Signal Catches — Flag / Intervention Story */}
    <Section bg={C.mid}>
      <div className="ss-two-col-ps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <SectionLabel>Early Warning System</SectionLabel>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 16px" }}>Signal catches problems before drivers quit</h2>
          <p style={{ fontSize: 15, color: C.muted, fontWeight: 300, lineHeight: 1.8, marginBottom: 24 }}>
            When a driver replies with negative sentiment, Signal flags them automatically — with severity scoring, the exact message that triggered it, and a direct action queue for your recruiting team. The difference between detecting a problem and losing a driver is 48 hours.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "AI scores every reply as positive, neutral, or negative",
              "High-severity flags surface instantly in the action queue",
              "One-click check-in SMS from inside the platform",
              "Every intervention is logged — outcome tracked",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.muted }}>
                <span style={{ color: C.pink, flexShrink: 0, marginTop: 2 }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Mock flag card */}
          <div style={{ background: C.navy, border: `1px solid rgba(239,68,68,0.3)`, borderRadius: 14, padding: "20px 22px", borderLeft: `4px solid ${C.red}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: C.red }}>DT</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Derek Thompson</div>
                <div style={{ fontSize: 11, color: C.muted }}>Day 75 · HIGH severity</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 8, background: "rgba(239,68,68,0.15)", color: C.red }}>FLAGGED</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, fontStyle: "italic", lineHeight: 1.5, marginBottom: 12 }}>"Thinking about looking elsewhere. Home time hasn't been what they told me."</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 8, background: C.pink, color: "#fff", cursor: "pointer" }}>Mark Resolved</div>
              <div style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 8, background: "rgba(68,136,255,0.2)", color: "#4488FF", cursor: "pointer" }}>Send Check-in</div>
            </div>
          </div>
          {/* Stat callout */}
          <div style={{ background: C.navy, border: `1px solid ${C.light}`, borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 36, fontWeight: 500, color: C.green, flexShrink: 0 }}>37%</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>better 180-day retention when at-risk drivers are contacted within 48 hours of a negative response.</div>
          </div>
        </div>
      </div>
    </Section>

    {/* Three Modules */}
    <Section>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>What You Get</SectionLabel>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>Three modules. One platform. Zero friction.</h2>
      </div>
      <div className="ss-module-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <ModuleCard
          icon="📅"
          title="First 90 Days"
          desc="Automated 9-touchpoint SMS drip from Day 1 through Day 90. New hires enroll automatically when they're marked active in TenStreet."
          bullets={[
            "Welcome, safety, milestone, and referral messages",
            "Sentiment scored on every reply",
            "Auto-pause on negative response",
            "Editable message templates per carrier",
          ]}
        />
        <ModuleCard
          icon="⭐"
          title="Driver Spotlights"
          desc="Four-layer recognition engine that turns one moment into four touchpoints — without any extra work from your team."
          bullets={[
            "Private SMS to the driver",
            "Fleet-wide SMS announcement",
            "Auto-post to your Facebook page",
            "Branded spotlight gallery page",
          ]}
        />
        <ModuleCard
          icon="🎙️"
          title="Inside the Cab"
          desc="Ongoing bi-weekly pulse checks, company updates, and referral reminders — keeping the conversation going long after First 90 ends."
          bullets={[
            "Rotating pulse question library",
            "Fleet-wide company update broadcasts",
            "Referral asks timed to positive sentiment",
            "AI-scored, manager-reviewed responses",
          ]}
        />
      </div>
    </Section>

    {/* Retention Command Center */}
    <Section bg={C.mid}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionLabel>Your Command Center</SectionLabel>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>Everything your team needs. Nothing they don't.</h2>
        <p style={{ fontSize: 16, color: C.muted, fontWeight: 300, maxWidth: 580, margin: "0 auto" }}>The Signal dashboard gives your recruiting and safety teams a single view of every driver — who's engaged, who's at risk, and what to do next.</p>
      </div>
      <div className="ss-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
        {[
          { icon: "🗺️", title: "Fleet Health Heatmap", desc: "Every driver as a color-coded tile. Green means engaged. Red means act now. Click any tile to open their full profile." },
          { icon: "🧠", title: "AI Sentiment Scoring", desc: "Every driver reply is scored automatically — positive, neutral, or negative. Ambiguous replies go to Claude for deeper analysis." },
          { icon: "📊", title: "Retention Risk Score", desc: "Each driver gets a 1-10 risk score updated in real time based on response trends, sentiment trajectory, and tenure." },
          { icon: "📋", title: "Driver Activity Timeline", desc: "A chronological log of every SMS sent, reply received, flag created, spotlight awarded, and note added — all in one view." },
          { icon: "💰", title: "In-Product ROI Card", desc: "See exactly how much Signal has saved your carrier in estimated replacement costs. Screenshot-ready for your next leadership review." },
          { icon: "🔗", title: "Referral Attribution", desc: "Track every referral from submission to hire. See which drivers are your best recruiters and what they're earning in bonuses." },
        ].map((f, i) => (
          <div key={i} style={{ background: C.navy, border: `1px solid ${C.light}`, borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: C.muted, fontWeight: 300, lineHeight: 1.7 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </Section>

    {/* How It Works */}
    <Section>
      <div id="how-it-works" style={{ scrollMarginTop: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>How It Works</SectionLabel>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>Live in 48 hours. Not 48 days.</h2>
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <TimelineStep num="1" title="Connect" desc="We sync with your ATS (TenStreet) and pull your active driver roster. New hires enroll automatically from day one — no manual uploads, ever." />
          <TimelineStep num="2" title="We handle setup" desc="We configure your sequences, write your touchpoint messages in your carrier's voice, and set your cadence. You approve before anything goes out." />
          <TimelineStep num="3" title="Launch" desc="Messages start flowing. Drivers start responding. Sentiment data populates your dashboard within the first week. Flags surface automatically." />
          <TimelineStep num="4" title="We optimize monthly" desc="We review your engagement data every month, flag at-risk drivers, and refine messaging based on what's working for your specific fleet." />
        </div>
      </div>
    </Section>

    {/* ROI Callout */}
    <Section bg={C.mid}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <SectionLabel>The Numbers</SectionLabel>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>The math works out fast.</h2>
        <p style={{ fontSize: 16, color: C.muted, fontWeight: 300, maxWidth: 520, margin: "0 auto" }}>At $8,500 per driver replacement, Signal pays for itself the moment it retains your first at-risk driver.</p>
      </div>
      <div className="ss-roi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {[
          { num: "29pts", label: "above industry average retention rate for Signal carriers" },
          { num: "$8,500", label: "average replacement cost per driver saved" },
          { num: "< 60 days", label: "average time to positive ROI for new carriers" },
        ].map((s, i) => (
          <div key={i} style={{ background: C.navy, border: `1px solid ${C.light}`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 32, fontWeight: 500, color: C.pink, marginBottom: 8 }}>{s.num}</div>
            <div style={{ fontSize: 13, color: C.muted, fontWeight: 300, lineHeight: 1.6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.navy, border: `1px solid rgba(255,0,204,0.2)`, borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>If Signal retains 2 at-risk drivers per month...</div>
          <div style={{ fontSize: 14, color: C.muted, fontWeight: 300, lineHeight: 1.6 }}>That's $17,000 in replacement costs saved. Signal's Starter plan is $997/month. The math writes itself.</div>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 44, fontWeight: 500, color: C.pink, flexShrink: 0 }}>17x</div>
      </div>
    </Section>

    {/* Bottom CTA */}
    <Section style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.white, margin: "0 0 12px" }}>Stop guessing. Start listening.</h2>
      <p style={{ fontSize: 16, color: C.muted, fontWeight: 300, marginBottom: 28 }}>14-day free trial. No credit card. No contract. Just results.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn onClick={() => setPage("trial")}>Start Free Trial</Btn>
        <Btn variant="outline" onClick={() => setPage("playbook")}>Download the Free Playbook</Btn>
      </div>
    </Section>
  </div>
);

const PricingPage = ({ setPage }) => (
  <div>
    <Section style={{ textAlign: "center", paddingBottom: 20 }}>
      <SectionLabel>Transparent Pricing</SectionLabel>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: C.white, margin: "0 0 12px" }}>Plans that scale with your fleet</h1>
      <p style={{ fontSize: 16, color: C.muted, fontWeight: 300 }}>Every plan includes a 14-day free trial. No credit card required.</p>
    </Section>

    <Section style={{ paddingTop: 20 }}>
      <div className="ss-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
        <PricingCard tier="Starter" price="997" fleet="10-50 trucks" onTrial={() => setPage("trial")} features={["All three Signal modules", "Fleet Health Heatmap", "AI sentiment scoring", "Basic dashboard", "Email support", "Monthly reporting"]} />
        <PricingCard tier="Growth" price="2,997" fleet="51-200 trucks" popular onTrial={() => setPage("trial")} features={["Everything in Starter", "Full retention risk scoring", "Driver activity timeline", "Slack/email alerts", "Dedicated account manager", "Weekly reporting", "In-product ROI card"]} />
        <PricingCard tier="Scale" price="4,497" fleet="201-500 trucks" onTrial={() => setPage("trial")} features={["Everything in Growth", "Custom messaging per terminal", "Multi-location segmentation", "Referral attribution tracking", "Executive reporting suite", "Priority support"]} />
      </div>

      {/* Trial Banner */}
      <div style={{ background: C.mid, borderLeft: `3px solid ${C.pink}`, borderRadius: 12, padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
        <p style={{ fontSize: 15, color: C.white, fontWeight: 400, margin: 0 }}>Not sure which plan? Start with a <strong>14-day free trial</strong> on any tier. No credit card. No commitment.</p>
        <Btn onClick={() => setPage("trial")} style={{ flexShrink: 0, padding: "12px 28px" }}>Start Free Trial</Btn>
      </div>

      {/* ROI */}
      <div className="ss-two-col-ps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 48 }}>
        <div>
          <SectionLabel>The Math</SectionLabel>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 16px" }}>The math is simple</h2>
          <p style={{ fontSize: 15, color: C.muted, fontWeight: 300, lineHeight: 1.8 }}>
            Replacing one driver costs $8,500 on average. If Signal keeps just 2 drivers per month from leaving, the platform pays for itself 17x over. Most carriers see positive ROI within 60 days. The in-product ROI card tracks your savings automatically — so your VP always knows exactly what Signal is worth.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.mid, borderRadius: 16, padding: "32px 40px", textAlign: "center", border: `1px solid ${C.light}` }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 48, fontWeight: 500, color: C.pink }}>17x</div>
            <div style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>ROI when Signal retains 2 drivers/month</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: 0 }}>Common questions</h2>
        </div>
        <FAQ q="How long does setup take?" a="Most carriers are live within 48 hours of signing up. You connect TenStreet, we handle everything else — message configuration, sequence setup, and onboarding." />
        <FAQ q="Do my drivers need to download an app?" a="No. Everything runs through standard SMS. Your drivers just reply to a text message. No app, no login, no friction." />
        <FAQ q="Does it integrate with TenStreet?" a="Yes. We're a TenStreet partner and sync directly with your driver data. New hires auto-enroll in the First 90 sequence the moment they're marked active." />
        <FAQ q="What if a driver opts out?" a="They can reply STOP at any time. We track opt-out rates in your dashboard and they're typically under 3%." />
        <FAQ q="Can I customize the messages?" a="Yes. We write the framework and set the cadence. You review and approve the tone before anything goes out to your drivers." />
        <FAQ q="Is there a contract?" a="No long-term contracts. Month-to-month after your free trial. Cancel anytime." />
      </div>
    </Section>
  </div>
);

const TrialPage = ({ setPage }) => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", fleet: "", ats: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!form.name || !form.company || !form.email || !form.phone) { setError("Please fill in all required fields."); return; }
    setSubmitting(true);
    setError(null);
    try {
      await fetch("https://admin.seatedsocial.com/api/leads.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "seatedsignal-trial",
          submitted_at: new Date().toISOString(),
          utm_source: new URLSearchParams(window.location?.search).get("utm_source") || "",
          utm_medium: new URLSearchParams(window.location?.search).get("utm_medium") || "",
          utm_campaign: new URLSearchParams(window.location?.search).get("utm_campaign") || "",
        }),
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Section style={{ textAlign: "center", paddingBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, background: `radial-gradient(circle, rgba(255,0,204,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Pill>14-Day Free Trial</Pill>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: C.white, margin: "20px 0 12px" }}>See what your drivers are really thinking</h1>
          <p style={{ fontSize: 16, color: C.muted, fontWeight: 300 }}>No credit card. No contract. No risk. Just 14 days of real driver engagement data.</p>
        </div>
      </Section>

      <Section bg={C.mid} style={{ padding: "48px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white, margin: 0 }}>Everything included in your trial</h2>
        </div>
        <div className="ss-included-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            "All three Signal modules — First 90, Spotlights, Inside the Cab",
            "Fleet Health Heatmap and retention risk scoring",
            "AI sentiment scoring on every driver reply",
            "TenStreet integration and auto-enrollment",
            "Dedicated onboarding — we handle setup for you",
            "End-of-trial performance report with estimated ROI",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: C.navy, borderRadius: 10 }}>
              <span style={{ color: C.pink, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: C.white, fontWeight: 400 }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section style={{ padding: "48px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionLabel>How the Trial Works</SectionLabel>
        </div>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <TimelineStep num="1" title="Day 1" desc="We connect to your ATS and configure your messaging in your carrier's voice." />
          <TimelineStep num="2" title="Days 2-3" desc="First messages go out to your drivers. Enrollment is automatic." />
          <TimelineStep num="3" title="Week 1" desc="Sentiment data starts populating your dashboard. Flags surface in real time." />
          <TimelineStep num="4" title="Week 2" desc="Full performance review with your account manager — response rates, sentiment trends, and any at-risk drivers." />
          <TimelineStep num="5" title="Day 14" desc="You decide. Upgrade or walk away with zero obligation and a full performance report." />
        </div>
      </Section>

      <Section bg={C.mid}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>Start your 14-day trial</h2>
            <p style={{ fontSize: 14, color: C.muted }}>Takes 30 seconds. We'll be in touch within 24 hours.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>You're in!</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>We'll reach out within 24 hours to get your trial set up. Check your email for next steps.</p>
            </div>
          ) : (
            <div>
              <div className="ss-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <FormField label="Full Name *" placeholder="Mike Carson" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <FormField label="Company *" placeholder="R&R Transportation" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
              <div className="ss-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <FormField label="Email *" placeholder="mike@company.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <FormField label="Phone *" placeholder="(208) 555-1234" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} mono />
              </div>
              <div className="ss-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <FormField label="Fleet Size" options={["10-50", "51-200", "201-500"]} value={form.fleet} onChange={e => setForm({ ...form, fleet: e.target.value })} />
                <FormField label="Current ATS" options={["TenStreet", "Other", "None"]} value={form.ats} onChange={e => setForm({ ...form, ats: e.target.value })} />
              </div>
              {error && <div style={{ color: C.red, fontSize: 13, marginBottom: 12 }}>{error}</div>}
              <Btn onClick={handleSubmit} style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 4 }} disabled={submitting}>
                {submitting ? "Submitting..." : "Start My Free Trial"}
              </Btn>
              <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 12 }}>No credit card required. No commitment. 14-day trial on any plan.</p>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FAQ q="Is the trial really free?" a="Yes. No credit card required. No hidden fees. Just 14 days of live driver engagement data." />
          <FAQ q="How many drivers can I include?" a="Up to 100 drivers during the trial period." />
          <FAQ q="What happens after 14 days?" a="We send you a performance report including response rates, sentiment trends, any flags, and estimated ROI. You choose to continue or not — zero pressure." />
          <FAQ q="Can I cancel during the trial?" a="Yes. Zero obligation at any point. Just let us know." />
        </div>
      </Section>
    </div>
  );
};

const PlaybookPage = ({ setPage }) => {
  const [form, setForm] = useState({ name: "", email: "", company: "", fleet: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      await fetch("https://admin.seatedsocial.com/api/leads.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "playbook-download", submitted_at: new Date().toISOString() }),
      });
    } catch (e) {}
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div>
      <Section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, background: `radial-gradient(circle, rgba(255,0,204,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div className="ss-two-col-ps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <Pill>Free Download</Pill>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: C.white, margin: "20px 0 16px" }}>The First 90 Days Playbook</h1>
            <p style={{ fontSize: 16, color: C.muted, fontWeight: 300, lineHeight: 1.7 }}>
              The exact SMS framework top carriers use to keep new drivers engaged through their most critical window. Free. No strings.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 200, height: 260, background: `linear-gradient(135deg, ${C.mid}, ${C.light})`, borderRadius: 12, border: `1px solid ${C.light}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center", boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${C.glow}` }}>
              <SignalIcon s={36} />
              <div style={{ marginTop: 12, fontWeight: 800, fontSize: 14, color: C.white }}>FIRST 90 DAYS</div>
              <div style={{ fontSize: 10, color: C.pink, fontFamily: "'DM Mono', monospace", marginTop: 4, letterSpacing: 1 }}>PLAYBOOK</div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 12 }}>by Seated Signal</div>
            </div>
          </div>
        </div>
      </Section>

      <Section bg={C.mid}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white, margin: "0 0 24px" }}>What you'll get</h2>
        <div className="ss-included-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            "The 9 critical touchpoints in the first 90 days",
            "Sample SMS templates you can use immediately",
            "Timing framework: when to send what",
            "Red flag indicators: how to spot disengagement early",
            "Real data on why drivers leave (and when)",
            "Implementation checklist for your team",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: C.navy, borderRadius: 10 }}>
              <span style={{ color: C.pink, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: 13, color: C.white, fontWeight: 400, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>Get the playbook</h2>
            <p style={{ fontSize: 14, color: C.muted }}>Enter your email and we'll send it right over.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>Check your inbox!</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>The First 90 Days Playbook is on its way to your email.</p>
              <Btn onClick={() => setPage("trial")} style={{ marginTop: 20 }}>Want to see it in action? Start a Free Trial →</Btn>
            </div>
          ) : (
            <div>
              <FormField label="Full Name *" placeholder="Mike Carson" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <FormField label="Email *" placeholder="mike@company.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <FormField label="Company" placeholder="R&R Transportation" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              <FormField label="Fleet Size" options={["Under 10", "10-50", "51-200", "201-500", "500+"]} value={form.fleet} onChange={e => setForm({ ...form, fleet: e.target.value })} />
              <Btn onClick={handleSubmit} style={{ width: "100%", padding: "16px", fontSize: 16, marginTop: 4 }} disabled={submitting}>
                {submitting ? "Sending..." : "Send Me the Playbook"}
              </Btn>
            </div>
          )}
        </div>
      </Section>

      <Section bg={C.mid} style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>Want to see it in action?</h2>
        <p style={{ fontSize: 15, color: C.muted, fontWeight: 300, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.7 }}>
          The playbook gives you the framework. Seated Signal gives you the execution. Start a 14-day free trial and let us run the entire thing for you.
        </p>
        <Btn onClick={() => setPage("trial")}>Start Free Trial</Btn>
      </Section>
    </div>
  );
};

// ============================================================
// APP
// ============================================================
export default function SeatedSignalSite() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ background: C.navy, fontFamily: "'Outfit', sans-serif", color: C.white, minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        .ss-card:hover { border-color: ${C.pink} !important; box-shadow: 0 0 30px ${C.glow}; transform: translateY(-2px); }
        select { -webkit-appearance: none; }
        input::placeholder { color: ${C.muted}; }
        button:hover { opacity: 0.92; }
        @media (max-width: 768px) {
          .ss-desktop-nav { display: none !important; }
          .ss-mobile-menu-btn { display: flex !important; }
          .ss-stat-row { grid-template-columns: repeat(2, 1fr) !important; }
          .ss-two-col-ps { grid-template-columns: 1fr !important; }
          .ss-module-row { grid-template-columns: 1fr !important; }
          .ss-features-grid { grid-template-columns: 1fr !important; }
          .ss-roi-grid { grid-template-columns: 1fr !important; }
          .ss-pricing-grid { grid-template-columns: 1fr !important; }
          .ss-footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ss-included-grid { grid-template-columns: 1fr !important; }
          .ss-form-2col { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .ss-mobile-dropdown { display: none !important; }
        }
      `}</style>
      <Nav page={page} setPage={navigate} />
      {page === "home" && <HomePage setPage={navigate} />}
      {page === "pricing" && <PricingPage setPage={navigate} />}
      {page === "trial" && <TrialPage setPage={navigate} />}
      {page === "playbook" && <PlaybookPage setPage={navigate} />}
      <Footer setPage={navigate} />
    </div>
  );
}
