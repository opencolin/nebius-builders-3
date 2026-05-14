// Weekly office-hours slots, keyed to the team in advocates.ts.
// Public office-hours events live in builder-events.ts under format=OFFICE_HOURS
// and are surfaced on this page via the events directory.

export type OfficeHoursSlot = {
  advocateSlug: string;
  cadence: string;        // "Every Tuesday"
  timeWindow: string;     // "11:00–12:00 PT"
  audience: string;       // "Bay Area + US-Pacific builders"
  scope: string[];        // bullet-list of topics in scope
};

export const officeHoursSlots: OfficeHoursSlot[] = [
  {
    advocateSlug: "colin",
    cadence: "Every Tuesday",
    timeWindow: "11:00–12:00 PT",
    audience: "Bay Area + US-Pacific builders",
    scope: [
      "Picking a Token Factory model for your use case",
      "Hackathon / workshop planning",
      "Ambassador program intake",
      "Getting unstuck on OpenClaw + Nebius deploys",
    ],
  },
];

export const officeHoursFaq: { q: string; a: string }[] = [
  {
    q: "What should I bring?",
    a: "A specific question or a repo we can look at together. Office hours work best as a working session — not a sales pitch and not a demo of our roadmap.",
  },
  {
    q: "Can my whole team join?",
    a: "Yes. Up to four people on the call is fine. If you're more than that, talk to us about a private workshop via the Ambassador program instead.",
  },
  {
    q: "Is it under NDA?",
    a: "Default no. If you need it under NDA, mention it on the booking and we'll send paperwork before the session.",
  },
  {
    q: "What's out of scope?",
    a: "Anything that requires reading code we haven't seen for hours. For deep dives, the better path is a paid Solutions Architect engagement — happy to refer you.",
  },
  {
    q: "Do you record the session?",
    a: "Only if you ask. We default to off and we don't share recordings anywhere if we do record.",
  },
  {
    q: "I missed the booking window — what now?",
    a: "Drop a question in the Discord office-hours channel. The team checks it daily and we'll route it to whichever advocate can answer fastest.",
  },
];
