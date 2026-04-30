import React from "react"

const C = {
  navy: "#0A1628", mid: "#132240", light: "#1A2D4A",
  white: "#F0F4F8", muted: "#5A6A80", pink: "#FF00CC",
}

const styles = {
  page: { backgroundColor: C.navy, color: C.white, fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "100vh", padding: "4rem 1.5rem 6rem" },
  container: { maxWidth: 780, margin: "0 auto" },
  eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.pink, marginBottom: 12, fontWeight: 600 },
  h1: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20 },
  lede: { fontSize: 17, lineHeight: 1.7, color: C.muted, marginBottom: 48, fontWeight: 300 },
  h2: { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 12, color: C.white },
  p: { fontSize: 15, lineHeight: 1.75, color: C.muted, marginBottom: 14, fontWeight: 300 },
  consentBox: { backgroundColor: C.mid, borderLeft: `3px solid ${C.pink}`, padding: "1.5rem 1.75rem", margin: "1.5rem 0", borderRadius: "0 8px 8px 0" },
  consentLabel: { fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.pink, marginBottom: 12, fontWeight: 600 },
  consentText: { fontSize: 15, lineHeight: 1.75, color: C.white, fontStyle: "italic" },
  list: { paddingLeft: 22, color: C.muted, lineHeight: 1.85, fontSize: 15, fontWeight: 300, marginBottom: 14 },
  link: { color: C.pink, textDecoration: "underline" },
  footer: { marginTop: 64, paddingTop: 24, borderTop: `1px solid ${C.light}`, fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.muted, letterSpacing: 1 },
}

export default function SmsConsent() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.eyebrow}>SMS CONSENT &amp; COMPLIANCE</div>
        <h1 style={styles.h1}>How SMS consent works on the Seated Signal platform.</h1>
        <p style={styles.lede}>
          Seated Signal is a done-for-you SMS driver retention platform operated by Seated Social LLC for trucking carrier clients. This page documents how end users (commercial truck drivers) consent to receive SMS messages, the disclosures provided at consent, and how to opt out at any time.
        </p>

        <h2 style={styles.h2}>Platform model</h2>
        <p style={styles.p}>
          Seated Social LLC operates Seated Signal as an ISV/Platform under a single A2P 10DLC campaign serving multiple trucking carrier clients. Each carrier is provisioned a dedicated 10DLC number through their own Twilio subaccount. Drivers consent to receive SMS through their employing carrier&apos;s written onboarding paperwork before any messages are sent. No driver is enrolled in the platform without signed consent on file.
        </p>

        <h2 style={styles.h2}>Verbatim consent clause</h2>
        <p style={styles.p}>
          The following clause is included in every Seated Signal carrier client&apos;s driver onboarding packet and is signed by each driver before enrollment in the platform:
        </p>
        <div style={styles.consentBox}>
          <div style={styles.consentLabel}>SIGNED BY DRIVER AT ONBOARDING</div>
          <div style={styles.consentText}>
            &ldquo;By signing below, I consent to receive text messages from [Carrier Name] sent via the Seated Signal driver retention platform. Messages may include onboarding check-ins, company updates, dispatcher communications, recognition, and retention surveys. Message frequency varies, typically 4-10 messages per month. Message and data rates may apply. Reply STOP at any time to unsubscribe. Reply HELP for help. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Privacy policy: seatedsocial.com/privacy-policy.&rdquo;
          </div>
        </div>

        <h2 style={styles.h2}>Message categories</h2>
        <ul style={styles.list}>
          <li>Onboarding check-ins during the driver&apos;s first 90 days of employment</li>
          <li>Weekly company updates, internal communications, and pulse check-ins</li>
          <li>Recognition messages and driver spotlights</li>
          <li>Retention and engagement surveys</li>
          <li>Dispatcher and operational communications initiated by the carrier</li>
        </ul>

        <h2 style={styles.h2}>Frequency</h2>
        <p style={styles.p}>
          Message frequency varies by carrier program and the driver&apos;s stage in their First 90 Days sequence. Typical volume is 4 to 10 messages per month. Message and data rates may apply.
        </p>

        <h2 style={styles.h2}>How to opt out or get help</h2>
        <p style={styles.p}>
          A driver may opt out at any time by replying <strong style={{ color: C.white }}>STOP</strong> to any message. Opt-out is immediate and permanent for that phone number on that carrier&apos;s program. Replying <strong style={{ color: C.white }}>HELP</strong> returns an automated response identifying the carrier, the Seated Signal platform, and providing support information. Drivers may also contact their employing carrier directly for assistance.
        </p>

        <h2 style={styles.h2}>Enrollment workflow</h2>
        <ol style={styles.list}>
          <li>Driver signs onboarding paperwork containing the consent clause above.</li>
          <li>Carrier&apos;s authorized administrator enrolls the driver in Seated Signal through the platform admin interface. The system requires confirmation that signed consent is on file before enrollment can proceed.</li>
          <li>Driver receives messages from the carrier&apos;s dedicated 10DLC number, identified as being sent via Seated Signal.</li>
          <li>Driver may reply STOP at any time, immediately and permanently halting messaging from that number.</li>
          <li>Drivers replying HELP receive an automated response with carrier identification, platform identification, and support information.</li>
        </ol>

        <h2 style={styles.h2}>Data handling</h2>
        <p style={styles.p}>
          Records of consent are retained by each carrier client (signed paperwork on file with the carrier). Opt-in and opt-out status is logged per phone number in the Seated Signal platform database. The carrier client is the data controller; Seated Social LLC acts as the data processor. Mobile information is not shared with third parties or affiliates for marketing or promotional purposes.
        </p>

        <h2 style={styles.h2}>Legal documents</h2>
        <p style={styles.p}>
          The Seated Signal platform is operated by Seated Social LLC. The full privacy policy and terms of service apply across all Seated properties including seatedsignal.com:
        </p>
        <ul style={styles.list}>
          <li><a href="https://seatedsocial.com/privacy-policy" style={styles.link}>Privacy Policy</a></li>
          <li><a href="https://seatedsocial.com/terms-of-service" style={styles.link}>Terms of Service</a></li>
          <li><a href="https://seatedsocial.com/disclaimers" style={styles.link}>Disclaimers</a></li>
        </ul>

        <h2 style={styles.h2}>Contact</h2>
        <p style={styles.p}>
          Seated Social LLC<br />
          Meridian, Idaho<br />
          alex@seatedsocial.com<br />
          (208) 614-0611
        </p>

        <div style={styles.footer}>
          Last updated: April 30, 2026 &middot; Operated by Seated Social LLC &middot; seatedsignal.com/sms-consent
        </div>
      </div>
    </div>
  )
}
