// One table for the app router, the per-route meta at build time, and the sitemap.
export const SITE = "https://www.seatedsignal.com"

export const ROUTES = [
  { path: "/", title: "Seated Signal | SMS driver retention for trucking carriers", description: "Seated Signal texts your drivers from a number that belongs to your carrier, reads every reply, and puts the ones that need a person in front of one. Live in 48 hours. Month to month.", priority: "1.0" },
  { path: "/demo", title: "See Seated Signal in action | Free 30-day pilot", description: "Watch Seated Signal catch an at-risk driver by text, see the Monday report your team gets, and start a free 30-day First 90 pilot.", priority: "0.9" },
  { path: "/features", title: "Features | Seated Signal", description: "First 90, Mile Marker and Inside the Cab, Last 90, Moments. Every reply read and routed to a person. Monday Minute and Executive Summary reporting.", priority: "0.9" },
  { path: "/pricing", title: "Pricing | Seated Signal", description: "Priced by fleet size, every program on every plan. First 90 free for 30 days, no card, month to month.", priority: "0.9" },
  { path: "/trial", title: "Free 30-day pilot | Seated Signal", description: "Thirty days of First 90 for your new hires, free. No card, no contract. We set it up, you approve every message.", priority: "0.8" },
  { path: "/playbook", title: "The First 90 Days Playbook | Seated Signal", description: "The SMS framework we run for carriers, written down so you can run it yourself. Free download.", priority: "0.7" },
  { path: "/integrations/double-nickel", title: "Double Nickel integration | Seated Signal", description: "Seated Signal is a listed Double Nickel integration partner. A driver marked hired in Double Nickel is in Signal with the Day 1 check-in scheduled. No export, no spreadsheet.", priority: "0.8" },
  { path: "/drivers", title: "Got a text from us? | Seated Signal", description: "What Seated Signal is, who reads your replies, and how to stop the texts. For drivers.", priority: "0.5" },
  { path: "/sms-consent", title: "SMS consent | Seated Signal", description: "How SMS consent works on the Seated Signal platform.", priority: "0.3" },
]
