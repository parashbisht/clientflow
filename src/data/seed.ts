import type { AppDatabase } from "@/types";

export const seed: AppDatabase = {
  currentUserId: "u_alex",
  team: [
    { id: "u_alex", name: "Alex Rivera", email: "alex@northline.studio", role: "Owner", title: "Founder", initials: "AR", color: "#3D5C4A" },
    { id: "u_maya", name: "Maya Chen", email: "maya@northline.studio", role: "Client Partner", title: "Client Partner", initials: "MC", color: "#8A5A3A" },
    { id: "u_julian", name: "Julian Park", email: "julian@northline.studio", role: "Design Lead", title: "Design Lead", initials: "JP", color: "#3F5C7A" },
    { id: "u_priya", name: "Priya Shah", email: "priya@northline.studio", role: "Project Manager", title: "Project Manager", initials: "PS", color: "#6B4E71" },
    { id: "u_owen", name: "Owen Blake", email: "owen@northline.studio", role: "Engineer", title: "Product Engineer", initials: "OB", color: "#4A5B3A" },
  ],
  leads: [
    {
      id: "ld_01", company: "Bright Harbor Hotels", contactName: "Leah Whitmore", email: "leah.whitmore@brightharbor.com", phone: "+1 (305) 442-1180", source: "Referral", status: "new", value: 48000, assigneeId: "u_maya", lastActivityAt: "2026-09-11T10:20:00.000Z", createdAt: "2026-09-11T09:40:00.000Z", website: "brightharbor.com", industry: "Hospitality",
      notes: [{ id: "ln1", body: "Referred by Elena Voss. Interested in a booking site refresh.", authorId: "u_maya", createdAt: "2026-09-11T09:45:00.000Z" }],
      timeline: [{ id: "lt1", title: "Lead created", detail: "Inbound referral from Harbor & Pine.", createdAt: "2026-09-11T09:40:00.000Z", authorId: "u_maya" }],
      messages: [{ id: "lm1", subject: "Intro from Elena", preview: "Leah would like to talk about a coastal properties microsite.", createdAt: "2026-09-11T09:42:00.000Z" }],
    },
    {
      id: "ld_02", company: "Fieldnote Labs", contactName: "Ravi Mehta", email: "ravi@fieldnote.lab", phone: "+1 (650) 228-9011", source: "Website", status: "new", value: 32000, assigneeId: "u_alex", lastActivityAt: "2026-09-10T21:00:00.000Z", createdAt: "2026-09-10T20:48:00.000Z", website: "fieldnote.lab", industry: "Climate tech", notes: [],
      timeline: [{ id: "lt2", title: "Form submitted", detail: "Requested a product design retainer.", createdAt: "2026-09-10T20:48:00.000Z" }], messages: [],
    },
    {
      id: "ld_03", company: "Sable Credit", contactName: "Ines Duarte", email: "ines.duarte@sablecredit.com", phone: "+1 (646) 330-7721", source: "LinkedIn", status: "contacted", value: 72000, assigneeId: "u_maya", lastActivityAt: "2026-09-09T16:30:00.000Z", createdAt: "2026-09-04T11:00:00.000Z", website: "sablecredit.com", industry: "Fintech",
      notes: [{ id: "ln3", body: "Needs SOC2-ready vendor onboarding packet.", authorId: "u_maya", createdAt: "2026-09-09T16:32:00.000Z" }],
      timeline: [
        { id: "lt3a", title: "Outreach sent", detail: "Intro email + case study on Atlas Freight.", createdAt: "2026-09-05T13:10:00.000Z", authorId: "u_maya" },
        { id: "lt3b", title: "Reply received", detail: "Asked for a 30-min discovery on Sep 14.", createdAt: "2026-09-09T16:30:00.000Z", authorId: "u_maya" },
      ], messages: [{ id: "lm3", subject: "Discovery next week", preview: "Can we cover onboarding flows and collections UX?", createdAt: "2026-09-09T16:30:00.000Z" }],
    },
    {
      id: "ld_04", company: "Northwind Ceramics", contactName: "Hugo Bell", email: "hugo@northwindceramics.com", phone: "+1 (503) 219-6640", source: "Conference", status: "contacted", value: 18000, assigneeId: "u_julian", lastActivityAt: "2026-09-08T19:00:00.000Z", createdAt: "2026-08-28T17:00:00.000Z", website: "northwindceramics.com", industry: "DTC retail", notes: [],
      timeline: [{ id: "lt4", title: "Met at Craft Commerce", detail: "Exchanged cards after the packaging panel.", createdAt: "2026-08-28T17:00:00.000Z", authorId: "u_julian" }], messages: [],
    },
    {
      id: "ld_05", company: "Helios Grid", contactName: "Yara Solano", email: "yara.solano@heliosgrid.energy", phone: "+1 (720) 441-2288", source: "Inbound", status: "qualified", value: 96000, assigneeId: "u_priya", lastActivityAt: "2026-09-10T12:10:00.000Z", createdAt: "2026-08-19T09:00:00.000Z", website: "heliosgrid.energy", industry: "Energy",
      notes: [{ id: "ln5", body: "Budget approved by COO. Decision by Oct 3.", authorId: "u_priya", createdAt: "2026-09-10T12:12:00.000Z" }],
      timeline: [{ id: "lt5", title: "Qualified", detail: "Need dashboard + field ops mobile in 16 weeks.", createdAt: "2026-09-02T15:00:00.000Z", authorId: "u_priya" }],
      messages: [{ id: "lm5", subject: "Technical constraints", preview: "Existing stack is React + Python. Prefer keeping both.", createdAt: "2026-09-10T12:10:00.000Z" }],
    },
    {
      id: "ld_06", company: "Marrow Books", contactName: "Felix Orduña", email: "felix@marrowbooks.com", phone: "+1 (503) 880-2219", source: "Partner", status: "qualified", value: 24000, assigneeId: "u_julian", lastActivityAt: "2026-09-06T11:22:00.000Z", createdAt: "2026-08-22T10:00:00.000Z", website: "marrowbooks.com", industry: "Publishing", notes: [],
      timeline: [{ id: "lt6", title: "Partner intro", detail: "Introduced by Driftwave Media.", createdAt: "2026-08-22T10:00:00.000Z" }], messages: [],
    },
    {
      id: "ld_07", company: "Quarry Bank", contactName: "Helena Frost", email: "helena.frost@quarrybank.com", phone: "+1 (704) 512-3390", source: "Website", status: "proposal", value: 88000, assigneeId: "u_alex", lastActivityAt: "2026-09-11T07:55:00.000Z", createdAt: "2026-08-04T08:30:00.000Z", website: "quarrybank.com", industry: "Private banking",
      notes: [{ id: "ln7", body: "Proposal v2 sent with phased rollout.", authorId: "u_alex", createdAt: "2026-09-11T07:55:00.000Z" }],
      timeline: [{ id: "lt7", title: "Proposal sent", detail: "Brand system + client portal, 20 weeks.", createdAt: "2026-09-07T18:00:00.000Z", authorId: "u_alex" }],
      messages: [{ id: "lm7", subject: "Proposal feedback", preview: "Legal wants a clause on data residency.", createdAt: "2026-09-11T07:50:00.000Z" }],
    },
    {
      id: "ld_08", company: "Cinder Athletics", contactName: "Jonah Ellis", email: "jonah@cinderathletics.com", phone: "+1 (720) 998-1143", source: "LinkedIn", status: "proposal", value: 41000, assigneeId: "u_maya", lastActivityAt: "2026-09-05T14:00:00.000Z", createdAt: "2026-07-29T16:00:00.000Z", website: "cinderathletics.com", industry: "Consumer fitness", notes: [],
      timeline: [{ id: "lt8", title: "Proposal shared", detail: "Campaign site + product photography direction.", createdAt: "2026-09-01T11:00:00.000Z" }], messages: [],
    },
    {
      id: "ld_09", company: "Redwood Clinics", contactName: "Dr. Iris Chen", email: "iris.chen@redwoodclinics.org", phone: "+1 (415) 770-2218", source: "Referral", status: "won", value: 64000, assigneeId: "u_priya", lastActivityAt: "2026-09-03T09:00:00.000Z", createdAt: "2026-07-10T12:00:00.000Z", website: "redwoodclinics.org", industry: "Healthcare",
      notes: [{ id: "ln9", body: "Won. Convert to client after kickoff on Sep 16.", authorId: "u_priya", createdAt: "2026-09-03T09:00:00.000Z" }],
      timeline: [{ id: "lt9", title: "Closed won", detail: "Signed 12-week patient intake redesign.", createdAt: "2026-09-03T09:00:00.000Z", authorId: "u_priya" }], messages: [],
    },
    {
      id: "ld_10", company: "Parcel & Co", contactName: "Greta Holm", email: "greta@parcelandco.com", phone: "+1 (612) 440-1182", source: "Inbound", status: "lost", value: 22000, assigneeId: "u_maya", lastActivityAt: "2026-08-21T10:00:00.000Z", createdAt: "2026-07-02T15:20:00.000Z", website: "parcelandco.com", industry: "E-commerce",
      notes: [{ id: "ln10", body: "Went with an in-house hire. Keep warm for 2027 catalog.", authorId: "u_maya", createdAt: "2026-08-21T10:05:00.000Z" }],
      timeline: [{ id: "lt10", title: "Closed lost", detail: "Budget moved internally.", createdAt: "2026-08-21T10:00:00.000Z" }], messages: [],
    },
    {
      id: "ld_11", company: "Orchard Mutual", contactName: "Seth Okonkwo", email: "seth.okonkwo@orchardmutual.com", phone: "+1 (402) 331-0094", source: "Conference", status: "new", value: 54000, assigneeId: "u_alex", lastActivityAt: "2026-09-11T14:05:00.000Z", createdAt: "2026-09-11T14:00:00.000Z", website: "orchardmutual.com", industry: "Insurance", notes: [],
      timeline: [{ id: "lt11", title: "Lead created", detail: "Met at Midwest InsurTech.", createdAt: "2026-09-11T14:00:00.000Z", authorId: "u_alex" }], messages: [],
    },
    {
      id: "ld_12", company: "Lumen Press", contactName: "Ada Moreau", email: "ada@lumenpress.co", phone: "+1 (514) 882-4410", source: "Partner", status: "contacted", value: 29000, assigneeId: "u_julian", lastActivityAt: "2026-09-07T08:40:00.000Z", createdAt: "2026-09-01T12:00:00.000Z", website: "lumenpress.co", industry: "Publishing", notes: [],
      timeline: [{ id: "lt12", title: "Intro call", detail: "Need a subscription storefront.", createdAt: "2026-09-07T08:40:00.000Z" }],
      messages: [{ id: "lm12", subject: "Storefront brief", preview: "We reprint archives and want a quieter checkout.", createdAt: "2026-09-07T08:40:00.000Z" }],
    },
  ],
  activities: [
    { id: "a_02", type: "lead_created", title: "New lead: Bright Harbor Hotels", detail: "Elena Voss referred Leah Whitmore.", createdAt: "2026-09-11T09:40:00.000Z", actorId: "u_maya", entityType: "lead", entityId: "ld_01" },
    { id: "a_07", type: "lead_created", title: "New lead: Orchard Mutual", detail: "Met Seth Okonkwo at Midwest InsurTech.", createdAt: "2026-09-11T14:00:00.000Z", actorId: "u_alex", entityType: "lead", entityId: "ld_11" },
  ],
};
