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

const TITLES = {
  "/": "Seated Signal | SMS driver retention for trucking carriers",
  "/features": "Features | Seated Signal",
  "/pricing": "Pricing | Seated Signal",
  "/trial": "Free trial | Seated Signal",
  "/playbook": "The First 90 Days Playbook | Seated Signal",
  "/sms-consent": "SMS consent | Seated Signal",
  "/integrations/double-nickel": "Double Nickel integration | Seated Signal",
}

function Page() {
  const { path, go } = useRoute()

  useEffect(() => { document.title = TITLES[path] || TITLES["/"] }, [path])

  // /uconnect was a 2026 conference landing page. Its QR codes still exist, so keep the path and send it home.
  useEffect(() => { if (path === "/uconnect") go("/") }, [path])

  if (path === "/sms-consent") return <SmsConsent />

  const body =
    path === "/features" ? <Features /> :
    path === "/pricing" ? <Pricing /> :
    path === "/trial" ? <Trial /> :
    path === "/playbook" ? <Playbook /> :
    path === "/integrations/double-nickel" ? <DoubleNickel /> :
    <Home />

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
