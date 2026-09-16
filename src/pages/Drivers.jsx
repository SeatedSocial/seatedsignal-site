import { Reveal, FAQ, CONTACT_EMAIL } from "../components/ui"

// For drivers who got a text through Signal and typed the domain in to find out what it is.
// Plain language, no selling. Linked from the footer and from go.seatedsignal.com.
export default function Drivers() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="eyebrow">For drivers</div>
          <h1 style={{ maxWidth: 760 }}>Got a text from your company through Seated Signal?</h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>
            Here's what it is, who reads your replies, and how to stop it if you want to. No sales pitch on this page.
          </p>
        </div>
      </section>

      <section className="section mid">
        <div className="container">
          <div className="facts">
            <Reveal className="fact">
              <h3>What it is</h3>
              <p>Your carrier uses Seated Signal to check in with drivers by text: how the first weeks are going, milestones, company news, and a question now and then. The number belongs to your company. We build the tool; your company decides what to send.</p>
            </Reveal>
            <Reveal className="fact" delay={80}>
              <h3>Who reads your replies</h3>
              <p>A person at your company, usually a recruiter or a manager. Replies are never read by anyone at another carrier, and Seated Social doesn't sell or share your number. If your reply sounds like something is wrong, it gets flagged so someone follows up sooner.</p>
            </Reveal>
            <Reveal className="fact" delay={160}>
              <h3>How to stop</h3>
              <p>Reply STOP to any message. You're out of every program right away, and your company sees that you opted out. Reply HELP for a reminder of who's texting. Or tell your recruiter; they can pause it from their end.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="center narrow" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Questions</div>
            <h2>The ones drivers ask.</h2>
          </Reveal>
          <FAQ items={[
            ["Why did I get this?", "Your company enrolled you when you were hired, or added you from their driver list. Most carriers start with check-ins during the first 90 days and keep a lighter schedule after that."],
            ["Is it a robot?", "The schedule is automatic, but the words were written and approved by someone at your company, and every reply goes to a person there. Nothing answers you on its own."],
            ["How many texts will I get?", "It depends on your company, but a few a month is typical. It's more often during your first few weeks and less after that."],
            ["Does it cost me anything?", "Only whatever your phone plan charges for texts. Most plans charge nothing."],
            ["Who do I talk to about it?", `Your recruiter or manager first, since they set it up. If you need to reach the company that built it, email ${CONTACT_EMAIL}.`],
          ]} />
          <p className="small center" style={{ marginTop: 32 }}>
            More detail on consent and message types is on the <a className="textlink" href="/sms-consent">SMS consent page</a>.
          </p>
        </div>
      </section>
    </>
  )
}
