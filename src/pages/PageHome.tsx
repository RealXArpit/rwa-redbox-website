import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1, H2, H3, Body, Btn, Card, Tag, GoldLine, Label, AccentBox,
  Divider, StepNum, FeatureItem, StatCard, SectionHeader, Grid,
  TwoCol, CtaBand, HeroBg, FaqItemInline,
} from "@/components/redbox/Primitives";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import DeveloperOnboardingDialog from "@/components/redbox/DeveloperOnboardingDialog";

const PageHome = () => {
  const nav = useNavigate();
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [realtorSoon, setRealtorSoon] = useState(false);

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-[92vh] flex items-center py-20">
        <HeroBg />
        <div className="container relative z-10">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 bg-surface-2 border border-gold-border rounded-full px-4 py-1 mb-7">
              <div className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]" />
              <span className="font-body text-[0.78rem] text-muted-foreground">Powered by RealX — India's Pioneer in Property Tokenisation</span>
            </div>
            <H1>
              Your Own Property<br />
              <span className="text-primary">Tokenisation Platform.</span><br />
              Live in Minutes.
            </H1>
            <Body lead className="max-w-[580px] mt-6 mb-10">
              REDbox is the Platform-as-a-Service built for Real Estate Developers and Realtors who want to offer tokenised property investment through their own website — without building any technology from scratch.
            </Body>
            <div className="flex gap-3.5 flex-wrap">
              <Btn onClick={() => nav("/developers")}>I'm a Developer →</Btn>
              <Btn variant="outline" onClick={() => nav("/realtors")}>I'm a Realtor →</Btn>
            </div>
            <div className="flex gap-10 flex-wrap mt-12 pt-10 border-t border-border">
              {[["₹1L", "Minimum investment entry point"], ["5,000+", "Potential investors per deal"], ["SDR", "Legally enforceable ownership rights"], ["Multi-state", "Transactions completed in India"]].map(([num, label]) => (
                <div key={num as string}>
                  <div className="font-heading text-[1.9rem] text-primary leading-none">{num}</div>
                  <div className="font-body text-[0.78rem] text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AUDIENCE SPLIT */}
      <div className="py-8">
        <div className="container">
          <SectionHeader center label="Who is REDbox for?" title="Two Roles. One Ecosystem." body="REDbox is purpose-built for two types of registered entities, each with a clearly defined role in the tokenisation lifecycle." />
          <Grid cols={2}>
            {[
              { tag: "Real Estate Developer", icon: "🏗️", title: "Tokenise Your Inventory. Reach More Investors.", body: "Launch a branded tokenisation platform for your projects — running directly on your own website. Reach retail investors across India and accelerate absorption without building any technology.", cta: "Explore for Developers", page: "/developers" },
              { tag: "Realtor → Asset Manager", icon: "🤝", title: "You're a Realtor. REDbox Makes You an Asset Manager.", body: "REDbox is built for Realtors who want to go further — sourcing tokenised assets, building an investor base, and managing client relationships through the full investment lifecycle.", cta: "Explore for Realtors", page: "/realtors" },
            ].map(item => (
              <div
                key={item.page}
                onClick={() => nav(item.page)}
                className="cursor-pointer bg-surface border border-border border-t-2 border-t-primary rounded-[14px] p-9 transition-all duration-200 hover:-translate-y-1 hover:border-gold-border hover:shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
              >
                <div className="text-3xl mb-5">{item.icon}</div>
                <Tag>{item.tag}</Tag>
                <H3 className="mt-4 mb-3">{item.title}</H3>
                <Body className="mb-6">{item.body}</Body>
                <span className="font-body text-[0.85rem] font-bold text-primary">{item.cta} →</span>
              </div>
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* MARKET PROBLEM */}
      <div className="py-20">
        <div className="container">
          <TwoCol
            left={<>
              <GoldLine /><Label>The Market Reality</Label>
              <H2 className="mb-5">Real Estate is Losing Investors. Tokenisation is the Fix.</H2>
              <Body className="mb-4">Real estate has long been India's most trusted wealth-building asset. Yet it faces a structural crisis: the investor base is shrinking. While stocks, mutual funds, and digital assets have modernised with frictionless digital experiences, real estate remains locked in processes that belong to another era.</Body>
              <Body>₹100+ Lakh Crore in wealth is flowing towards other asset classes — because those instruments are accessible, transparent, and digital. Tokenisation gives real estate a way to compete for that capital. REDbox gives you the platform to capture it.</Body>
            </>}
            right={<div className="flex flex-col gap-4">
              {[
                ["High minimum ticket sizes lock out 95% of investors", "₹50L–₹5Cr entry points mean most wealth holders simply cannot participate in real estate investment."],
                ["Friction at every step drives investors away", "Months of due diligence, complex paperwork, illiquid holdings — modern investors won't tolerate this."],
                ["Geography unnecessarily limits your buyer pool", "NRI investors, millennials, and retail wealth across India remain out of reach without a modern digital channel."],
              ].map(([title, body]) => (
                <Card key={title as string} topColor="red" enableHover={false}>
                  <p className="font-body text-[0.88rem] font-bold text-foreground mb-1.5">{title}</p>
                  <Body className="text-[0.85rem]">{body}</Body>
                </Card>
              ))}
            </div>}
          />
        </div>
      </div>

      <Divider />

      {/* WHY TOKENISATION */}
      <div className="py-20">
        <div className="container">
          <SectionHeader center label="Why Tokenisation" title="From 5 Bulk Buyers to 5,000 Investors. Same Property." body="Tokenisation doesn't just add a new sales channel. It transforms who can invest in your property — and how." />
          <Grid cols={3}>
            {[
              ["01", "100× Market Expansion", "Entry points drop from ₹50L minimums to ₹1–2L. A single property moves from being accessible to dozens to being open to thousands of investors across India."],
              ["02", "Friction Removed", "Digital onboarding in minutes. Standardised legal frameworks. Automated documentation. No months-long processes, no stacks of paperwork."],
              ["03", "Modern Expectations Met", "Transparent ownership. Portfolio diversification. Passive management. Future liquidity. Everything modern investors demand — delivered."],
              ["04", "New Segments Unlocked", "Reach NRI investors globally, millennials and Gen Z digitally, and retail wealth that was previously priced out — without expanding your team."],
              ["05", "Capital Recaptured", "Tap into ₹100+ Lakh Crore in wealth flowing to stocks and digital assets. Tokenisation lets real estate compete on equal terms."],
            ].map(([n, title, body]) => (
              <Card key={n as string} topColor="gold">
                <StepNum n={n as string} className="mb-4" />
                <H3 className="text-[1.1rem] mb-2.5">{title}</H3>
                <Body className="text-[0.88rem]">{body}</Body>
              </Card>
            ))}
            <Card className="bg-gold-dim border-gold-border" topColor="gold">
              <StepNum n="✓" className="bg-primary text-primary-foreground border-none mb-4" />
              <H3 className="text-[1.1rem] text-primary mb-2.5">REDbox Delivers All of This</H3>
              <Body className="text-[0.88rem]">Your own branded platform, powered by RealX infrastructure, live on your website in minutes. No tech to build. No compliance to figure out.</Body>
            </Card>
          </Grid>
        </div>
      </div>

      <Divider />

      {/* POWERED BY REALX */}
      <div className="py-20">
        <div className="container">
          <TwoCol
            left={<>
              <GoldLine /><Label>Powered by RealX</Label>
              <H2 className="mb-5">India's Pioneer in Property Tokenisation</H2>
              <Body className="mb-4">RealX is India's leading platform for fractional ownership of properties through Tokenisation — a global pioneer in establishing legally enforceable <strong className="text-foreground">Secure and Direct Rights (SDR)</strong> on properties within Blockchain Tokens.</Body>
              <Body className="mb-8">RealX has already closed multiple commercial transactions across multiple states in India. When you launch on REDbox, you inherit this credibility from day one.</Body>
              <Btn variant="outline" onClick={() => nav("/about")}>About RealX →</Btn>
            </>}
            right={<div className="flex flex-col gap-4">
              {[
                ["⚖️", "Legally Enforceable SDR", "Secure and Direct Rights within Blockchain Tokens — operating within India's existing legal framework."],
                ["🔗", "Battle-Tested Blockchain Infrastructure", "Production-ready: blockchain, DLT, KYC, e-sign, compliance — all handled by RealX."],
                ["🏛️", "Completed Transactions", "Multiple commercial deals closed across multiple Indian states. Real track record, not theory."],
                ["📋", "Investor Compliance & Onboarding", "RealX handles full investor KYC, onboarding workflows, and compliance infrastructure."],
              ].map(([icon, title, body]) => (
                <FeatureItem key={title as string} icon={icon as string} title={title as string} body={body as string} />
              ))}
            </div>}
          />
        </div>
      </div>

      <Divider />

      {/* FAQ TEASER */}
      <div className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <GoldLine />
              <Label>Common Questions</Label>
              <H2>Quick Answers.</H2>
            </div>
            <Btn variant="outline" onClick={() => nav("/faq")}>See All FAQs →</Btn>
          </div>
          <div className="flex flex-col">
            {[
              ["What is the difference between REDbox and RealX?", "RealX is the underlying platform, legal framework, and infrastructure. REDbox is the white-label PaaS product built on top of it — enabling Developers and Realtors to run their own branded tokenisation platform on their own website, powered by RealX's technology and legal rails."],
              ["Do I need to build any technology to get started?", "None at all. Once your application is approved and your portal is provisioned by RealX, you simply enable it on your own website in minutes from the Admin panel. REDbox handles all the blockchain infrastructure, KYC, compliance, and settlement."],
              ["Is property tokenisation through REDbox legally valid in India?", "Yes. RealX is a global pioneer in establishing Secure and Direct Rights (SDR) within Blockchain Tokens that operate fully within India's existing legal framework. Investors hold genuine, legally enforceable ownership rights on the property."],
            ].map(([q, a], i, arr) => (
              <FaqItemInline key={q as string} q={q as string} a={a as string} first={i === 0} last={i === arr.length - 1} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Btn variant="ghost" onClick={() => nav("/faq")}>View All FAQs — Developers, Realtors & Platform →</Btn>
          </div>
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <CtaBand
            title="Ready to Lead the Tokenisation Wave?"
            body="REDbox is available to qualifying Real Estate Developers and Realtors. Register, get approved, and your branded tokenisation platform is live on your own website."
            buttons={[
              <Btn key="d" onClick={() => setDevDialogOpen(true)}>Apply as Developer</Btn>,
              <Btn key="r" variant="outline" onClick={() => setRealtorSoon(true)}>Register as Realtor</Btn>,
            ]}
          />
          <p className="font-body text-[0.83rem] text-muted-foreground text-center mt-6">
            Questions? Write to us at <a href="mailto:hi@RWAREDbox.com" className="text-primary">hi@RWAREDbox.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
