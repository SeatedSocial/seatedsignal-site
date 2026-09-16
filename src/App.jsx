import { useEffect } from "react"
import "./styles.css"
import { Router, Nav, Footer, useRoute } from "./components/ui"
import Home from "./pages/Home"
import Features from "./pages/Features"
import Pricing from "./pages/Pricing"
import Trial from "./pages/Trial"
import Playbook from "./pages/Playbook"
import SmsConsent from "./pages/SmsConsent"
import DoubleNickel from "./pages/DoubleNickel"
import Drivers from "./pages/Drivers"
import NotFound from "./pages/NotFound"
import { ROUTES } from "./routes"

const TITLES = Object.fromEntries(ROUTES.map((r) => [r.path, r.title]))

function Page() {
  const { path, go } = useRoute()

  useEffect(() => { document.title = TITLES[path] || "Page not found | Seated Signal" }, [path])

  // /uconnect was a 2026 conference landing page. Its QR codes still exist, so keep the path and send it home.
  useEffect(() => { if (path === "/uconnect") go("/") }, [path])

  if (path === "/sms-consent") return <SmsConsent />

  const body =
    path === "/features" ? <Features /> :
    path === "/pricing" ? <Pricing /> :
    path === "/trial" ? <Trial /> :
    path === "/playbook" ? <Playbook /> :
    path === "/integrations/double-nickel" ? <DoubleNickel /> :
    path === "/drivers" ? <Drivers /> :
    path === "/" || path === "/uconnect" ? <Home /> :
    <NotFound />

  return (
    <>
      <Nav />
      <main>{body}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Page />
    </Router>
  )
}
