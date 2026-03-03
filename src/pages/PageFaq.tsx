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
      ["What is REDbox?", "REDbox is a Platform-as-a-Service (PaaS) product built on RealX's infrastructure. It enables Real Estate Developers and Realtors to launch their own branded property tokenisation platform — running on their own website, without building any technology themselves. Think of it as your own tokenisation portal, provisioned and powered by RealX, delivered under your brand."],
      ["What is the difference between REDbox and RealX?", "RealX is the underlying platform, legal framework, blockchain infrastructure, and compliance engine. REDbox is the product built on top of that infrastructure — the white-label portal that Developers and Realtors use to run their own tokenisation business. When you launch on REDbox, you inherit RealX's entire legal and technology stack."],
      ["Is property tokenisation through REDbox legally valid in India?", "Yes. RealX is a global pioneer in establishing Secure and Direct Rights (SDR) within Blockchain Tokens that operate fully within India's existing legal framework. Investors hold genuine, legally enforceable ownership rights directly on the property — not financial proxies or investment scheme units. RealX has completed multiple commercial transactions across multiple Indian states."],
      ["What is a Secure and Direct Right (SDR)?", "An SDR is RealX's framework for creating a legal ownership right that is directly on the property, secured within a Blockchain Token. 'Secure' means the right is recorded on blockchain — immutable and transparent. 'Direct' means the right is on the property itself, not mediated through a fund or company structure. Token holders have all the rights, benefits, and obligations of registered co-owners."],
      ["How do investors access my REDbox platform?", "Investors visit your portal on your own website. Existing RealX investors can use their existing credentials seamlessly — no separate onboarding needed. New investors complete a digital KYC process built into the platform. All investor onboarding and compliance is handled by RealX."],
      ["Is my investor data protected?", "Yes. RealX manages investor data with full regulatory compliance, operating under a structured data governance framework. Investor data is not shared beyond what is necessary for the investment transaction. For detailed data governance questions, write to hi@RWAREDbox.com."],
      ["What does it cost to run a REDbox platform?", "Commercial terms for REDbox are currently being finalised. Please write to us at hi@RWAREDbox.com and our team will walk you through the full commercial structure based on your specific use case and transaction volumes."],
    ] as [string, string][],
  },
  {
    label: "Commercials",
    title: "Pricing & Commercial Model",
    icon: "💼",
    items: [
      ["What does it cost to use REDbox?", "Commercial terms for REDbox are currently being finalised. Please reach out to us at hi@RWAREDbox.com and our team will walk you through the full commercial structure tailored to your specific use case and transaction volumes."],
      ["Is there a setup fee?", "Details of the commercial model — including any setup, platform, or transaction components — are currently being finalised. Contact us at hi@RWAREDbox.com to discuss your situation and get the most current information."],
      ["Are there custom commercial packages for large Developers or Realtors?", "We expect the commercial model to accommodate different scales of operation. If you are a larger Developer or Realtor with significant transaction volumes, please write to us at hi@RWAREDbox.com and we will work through a commercial structure that makes sense for your business."],
      ["When will commercial terms be publicly available?", "We are working on finalising and publishing the commercial model. In the meantime, please reach out to hi@RWAREDbox.com — our team is happy to discuss terms directly with qualifying applicants."],
    ] as [string, string][],
  },
  {
    label: "For Developers",
    title: "Questions from Real Estate Developers",
    icon: "🏗️",
    items: [
      ["Do I need to build any technology to launch on REDbox?", "None at all. Once your application is approved and your portal is provisioned by RealX, you simply enable it on your own website in minutes from the Admin panel. REDbox handles all the blockchain infrastructure, KYC, compliance, and settlement."],
      ["How does the platform run on my own website?", "REDbox runs on your own subdomain. You create a subdomain on your existing website (e.g., invest.yourdevelopment.com), then point it to the dedicated IP address provided by RealX — a standard DNS configuration that your web team can complete in minutes. RealX provisions your dedicated portal at that address. Your customers browse and invest entirely within your own website, and you manage listings and deals through the REDbox Admin panel."],
      ["How long does it take to go live from application?", "The process has six steps: application, approval, portal provisioning, platform customisation, Asset Manager designation, and go live. The technology is ready — once your application is verified and your portal is provisioned by RealX, you can enable it on your own website in minutes. Most partners are live within days of approval."],
      ["What is an Asset Manager and why does every property need one?", "Asset Manager is a role defined by RealX for registered Realtors on the REDbox platform. As a Developer, your role in the tokenisation lifecycle concludes once the purchase transaction is complete. Your investors need continuity beyond that — someone responsible for property oversight, maintenance, tenancy management, income distribution, investor reporting, and the eventual end sale. When listing a property on REDbox, you simply select from the registry of accredited Asset Managers on the platform."],
      ["Can I manage my existing channel partners and RMs through REDbox?", "Yes. REDbox includes a full sales team and channel partner management dashboard. You can add and manage Relationship Managers (RMs), onboard sub-distributors and Channel Partners (CPs), monitor your entire network's performance in real time, and track commissions automatically with a quick payout system."],
      ["Can I offer preferred allocations or rates to specific distribution partners?", "Yes. The deal management capabilities in REDbox allow you to configure preferred rates and dedicated unit allocations for specific partners — so your existing distribution relationships are fully honoured within the platform."],
      ["Can I list multiple properties on my REDbox platform?", "Yes. Your REDbox platform can hold your full inventory. Each property is listed and managed as a separate deal, with its own financials, investment parameters, and designated Asset Manager. Investors on your platform see only your properties — your platform is exclusively yours."],
      ["What happens to my investors after they purchase a fraction?", "Post-purchase responsibility passes to the designated Asset Manager for that property. They handle all investor queries, property management, income distribution, reporting, and the end sale. You, as the Developer, are fully released from ongoing obligations once the purchase transaction is complete."],
    ] as [string, string][],
  },
  {
    label: "For Realtors",
    title: "Questions from Realtors",
    icon: "🤝",
    items: [
      ["What does 'Asset Manager' mean, and how is it different from what I do as a Realtor today?", "Asset Manager is a new role construct defined by RealX — it is not a regulatory designation, but a scope of business activities designed specifically for the REDbox ecosystem. As a Realtor today, your role typically ends at the point of transaction. As an Asset Manager on REDbox, your role extends through the full investment lifecycle: sourcing and listing assets, distributing to investors, managing the property post-purchase (oversight, tenancy, income distribution), providing investor reporting, and ultimately managing the end sale. REDbox is the platform that enables you to run this expanded business."],
      ["Do I need any specific accreditation to register as a Realtor on REDbox?", "REDbox is open to Realtors with established credentials and a clear business model. The RealX team reviews each application and prioritises experienced Realtors with an active client base and a defined focus area. If you are a practising Realtor with a track record, you are the right profile. Reach out to hi@RWAREDbox.com to discuss your specific situation."],
      ["What types of assets can I list on my REDbox platform?", "As an Asset Manager, you have more flexibility than Developers — you are not limited to a single developer's inventory. You can list Developer inventory (from one or multiple developer partners), resale assets, land parcels, and Built-to-Suite (BTS) commercial assets such as warehouses and industrial units. This breadth is your competitive advantage — your platform can be a genuinely diverse investment destination."],
      ["How do I get Developer inventory to list on my platform?", "Every Developer listing on REDbox must designate a registered Asset Manager for each of their assets. This creates a structured, ongoing source of deal flow for you — Developers actively need Asset Managers, and the platform facilitates that connection. As you build a track record, Developers seek you out. Some also maintain preferred partner relationships, offering dedicated allocations and preferential rates to their best Asset Managers."],
      ["What are my responsibilities after an investor completes a purchase?", "Post-purchase, you are responsible for the full asset management lifecycle: property security and maintenance, tenancy management, distribution of rental or investment income to investors, regular investor reporting and updates, and ultimately managing the end sale when the asset reaches its exit horizon. This is the full-lifecycle commitment that distinguishes the Asset Manager role from traditional brokerage."],
      ["Does my REDbox platform run on my own website?", "Yes — and this is a core part of the model. You create a subdomain on your own existing website (e.g., invest.yourrealty.com), point it to the IP address provided by RealX, and your dedicated REDbox portal goes live at that address. Your clients invest through your own website, entirely within your brand. You manage all listings and operations through the REDbox Admin panel."],
      ["What happens to investors who are already registered on RealX?", "Existing RealX investors can access your platform using their existing credentials — no new onboarding required. This means you can immediately serve investors who are already active on the broader RealX ecosystem, and your deals are also visible on the RealX national marketplace alongside your own platform."],
      ["Can I have multiple team members working under my REDbox platform?", "The REDbox platform supports team management. You can onboard and manage multiple Relationship Managers and sub-distributors under your platform — building your own network while tracking performance and managing commissions centrally through the Admin panel."],
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
