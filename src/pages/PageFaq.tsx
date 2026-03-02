import {
  H1, H3, Body, Btn, Tag, Divider, Label,
  CtaBand, HeroBg, FaqItem,
} from "@/components/redbox/Primitives";

interface PageProps {
  setPage: (page: string) => void;
}

const FAQ_DATA = [
  {
    label: "Platform & General",
    title: "About REDbox & RealX",
    icon: "🏛️",
    items: [
      ["What is REDbox?", "REDbox is a Platform-as-a-Service (PaaS) product built on RealX's infrastructure. It enables Real Estate Developers and Realtors to launch their own branded property tokenisation platform — running on their own website, without building any technology themselves."],
      ["What is the difference between REDbox and RealX?", "RealX is the underlying platform, legal framework, blockchain infrastructure, and compliance engine. REDbox is the product built on top of that infrastructure — the white-label portal that Developers and Realtors use to run their own tokenisation business."],
      ["Is property tokenisation through REDbox legally valid in India?", "Yes. RealX is a global pioneer in establishing Secure and Direct Rights (SDR) within Blockchain Tokens that operate fully within India's existing legal framework."],
      ["What is a Secure and Direct Right (SDR)?", "An SDR is RealX's framework for creating a legal ownership right that is directly on the property, secured within a Blockchain Token."],
      ["How do investors access my REDbox platform?", "Investors visit your portal on your own website. Existing RealX investors can use their existing credentials seamlessly — no separate onboarding needed."],
      ["Is my investor data protected?", "Yes. RealX manages investor data with full regulatory compliance, operating under a structured data governance framework."],
      ["What does it cost to run a REDbox platform?", "Commercial terms for REDbox are currently being finalised. Please write to us at hi@RWAREDbox.com."],
    ] as [string, string][],
  },
  {
    label: "Commercials",
    title: "Pricing & Commercial Model",
    icon: "💼",
    items: [
      ["What does it cost to use REDbox?", "Commercial terms for REDbox are currently being finalised. Please reach out to us at hi@RWAREDbox.com."],
      ["Is there a setup fee?", "Details of the commercial model are currently being finalised. Contact us at hi@RWAREDbox.com."],
      ["Are there custom commercial packages for large Developers or Realtors?", "We expect the commercial model to accommodate different scales of operation. Please write to us at hi@RWAREDbox.com."],
      ["When will commercial terms be publicly available?", "We are working on finalising and publishing the commercial model. In the meantime, please reach out to hi@RWAREDbox.com."],
    ] as [string, string][],
  },
  {
    label: "For Developers",
    title: "Questions from Real Estate Developers",
    icon: "🏗️",
    items: [
      ["Do I need to build any technology to launch on REDbox?", "None at all. REDbox is fully provisioned by RealX. You create a subdomain on your own website, point it to the IP address provided by RealX, and your portal is live."],
      ["How long does it take to go live from application?", "The process has six steps. Most partners are live within days of approval."],
      ["What is an Asset Manager and why does every property need one?", "Asset Manager is a role defined by RealX for registered Realtors on the REDbox platform. Your investors need continuity beyond the purchase — someone responsible for ongoing management."],
      ["Can I manage my existing channel partners and RMs through REDbox?", "Yes. REDbox includes a full sales team and channel partner management dashboard."],
      ["Can I list multiple properties on my REDbox platform?", "Yes. Your REDbox platform can hold your full inventory. Each property is managed as a separate deal."],
    ] as [string, string][],
  },
  {
    label: "For Realtors",
    title: "Questions from Realtors",
    icon: "🤝",
    items: [
      ["What does 'Asset Manager' mean?", "Asset Manager is a new role construct defined by RealX — your role extends through the full investment lifecycle: sourcing, distributing, managing, reporting, and exit."],
      ["Do I need any specific accreditation?", "REDbox is open to Realtors with established credentials and a clear business model. Reach out to hi@RWAREDbox.com."],
      ["What types of assets can I list?", "Developer inventory, resale assets, land parcels, and Built-to-Suite (BTS) commercial assets."],
      ["How do I get Developer inventory to list?", "Every Developer listing on REDbox must designate a registered Asset Manager for each asset — creating structured deal flow for you."],
      ["Does my REDbox platform run on my own website?", "Yes — you create a subdomain on your own existing website and your dedicated REDbox portal goes live at that address."],
    ] as [string, string][],
  },
];

const PageFaq = ({ setPage }: PageProps) => (
  <div>
    {/* HERO */}
    <div className="relative min-h-[38vh] flex items-center py-20">
      <HeroBg />
      <div className="container relative z-10">
        <div className="mb-6"><Tag>Frequently Asked Questions</Tag></div>
        <H1>Everything You Need<br /><span className="text-primary">to Know.</span></H1>
        <Body lead className="max-w-[600px] mt-6">
          Questions about the platform, the technology, the legal framework, and what it means to become a Developer partner or an Asset Manager. If you don't find your answer here, write to us at{" "}
          <a href="mailto:hi@RWAREDbox.com" className="text-primary">hi@RWAREDbox.com</a>.
        </Body>
      </div>
    </div>

    {/* QUICK JUMP */}
    <div className="bg-surface-2 border-b border-border py-4">
      <div className="container flex gap-3 flex-wrap items-center">
        <span className="font-body text-[0.78rem] text-text-dim font-bold tracking-wider uppercase">Jump to:</span>
        {FAQ_DATA.map(s => (
          <button
            key={s.label}
            onClick={() => document.getElementById(`faq-${s.label}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="bg-gold-dim border border-gold-border rounded-full px-3.5 py-1 font-body text-[0.78rem] font-bold text-primary cursor-pointer"
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>
    </div>

    {/* FAQ CONTENT */}
    <div className="py-20">
      <div className="container grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 items-start">

        {/* SIDEBAR */}
        <div className="hidden lg:block sticky top-20">
          <p className="font-body text-[0.72rem] font-bold tracking-wider uppercase text-text-dim mb-4">Categories</p>
          {FAQ_DATA.map(s => (
            <button
              key={s.label}
              onClick={() => document.getElementById(`faq-${s.label}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex items-center gap-2.5 w-full bg-transparent border-none cursor-pointer py-2.5 px-3.5 rounded-lg mb-1 font-body text-[0.88rem] font-semibold text-muted-foreground text-left transition-all hover:bg-surface-2 hover:text-foreground"
            >
              <span>{s.icon}</span><span>{s.label}</span>
            </button>
          ))}
          <div className="mt-8 p-5 bg-gold-dim border border-gold-border rounded-[10px]">
            <p className="font-body text-[0.82rem] font-bold text-primary mb-1.5">Still have questions?</p>
            <p className="font-body text-[0.8rem] text-muted-foreground mb-3 leading-relaxed">Our team is happy to walk you through anything in detail.</p>
            <a href="mailto:hi@RWAREDbox.com" className="font-body text-[0.82rem] font-bold text-primary no-underline">hi@RWAREDbox.com →</a>
          </div>
        </div>

        {/* FAQ SECTIONS */}
        <div>
          {FAQ_DATA.map(section => (
            <div key={section.label} id={`faq-${section.label}`} className="scroll-mt-[100px] mb-14">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-b-gold-border mb-1">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <Label>{section.label}</Label>
                  <H3 className="text-[1.3rem]">{section.title}</H3>
                </div>
              </div>
              {section.items.map(([q, a], i) => (
                <FaqItem key={q} q={q} a={a} last={i === section.items.length - 1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

    <Divider />

    {/* CTA */}
    <div className="py-20">
      <div className="container">
        <CtaBand
          title="Ready to Get Started?"
          body="Whether you're a Developer or a Realtor, the application process is straightforward."
          buttons={[
            <Btn key="d" onClick={() => setPage("developers")}>Apply as Developer</Btn>,
            <Btn key="r" variant="outline" onClick={() => setPage("realtors")}>Register as Realtor</Btn>,
          ]}
        />
        <p className="font-body text-[0.83rem] text-muted-foreground text-center mt-6">
          Questions not answered here? Write to <a href="mailto:hi@RWAREDbox.com" className="text-primary">hi@RWAREDbox.com</a>
        </p>
      </div>
    </div>
  </div>
);

export default PageFaq;
