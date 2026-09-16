import { Btn } from "../components/ui"

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div className="eyebrow">404</div>
        <h1 style={{ maxWidth: 720 }}>That page went quiet.</h1>
        <p className="lede" style={{ marginTop: 20 }}>Nothing lives at this address. The pages that do are one tap away.</p>
        <div className="row" style={{ marginTop: 32 }}>
          <Btn to="/" arrow>Home</Btn>
          <Btn to="/features" variant="ghost">Features</Btn>
          <Btn to="/pricing" variant="ghost">Pricing</Btn>
        </div>
      </div>
    </section>
  )
}
