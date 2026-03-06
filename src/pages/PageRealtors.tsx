import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1, H2, H3, Body, Btn, Card, Tag, GoldLine, Label, AccentBox,
  Divider, StepNum, FeatureItem, InvestorCard, SectionHeader, Grid,
  TwoCol, CtaBand, HeroBg,
} from "@/components/redbox/Primitives";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

const PageRealtors = () => {
  const nav = useNavigate();
  const [comingSoon, setComingSoon] = useState(false);

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-[55vh] flex items-center py-20">
        <HeroBg />
        <div className="container relative z-10">
          <div className="mb-6"><Tag>For Realtors</Tag></div>
          <H1>You're a Realtor.<br /><span className="text-primary">REDbox Makes You<br />an Asset Manager.</span></H1>
          <Body lead className="max-w-[600px] mt-6 mb-10">REDbox is built for Realtors who want to go further — sourcing tokenised assets, building an investor base, and managing client relationships through the full investment lifecycle.</Body>
          <div className="flex gap-3.5 flex-wrap">
            <Btn onClick={() => setComingSoon(true)}>Register as Realtor</Btn>
            <Btn variant="outline" onClick={() => nav("/how")}>See How It Works</Btn>
          </div>
        </div>
      </div>

      {/* MARKET OPPORTUNITY */}
      <div className="pt-12 pb-20">
        <div className="container">
          <TwoCol
            left={<>
              <GoldLine /><Label>The Market Opportunity</Label>
              <H2 className="mb-5">Real Estate is Changing. Realtors Who Adapt Will Win.</H2>
              <Body className="mb-4">Real estate has long been India's most trusted wealth-building asset. Yet the investor base is shrinking — because traditional real estate hasn't adapted to what modern investors expect.</Body>
              <Body className="mb-4">As a Realtor, you already have the market relationships, the property knowledge, and the client trust this model demands. REDbox channels that into a new, structured role — <strong className="text-foreground">Asset Manager</strong> — with a defined scope, a digital platform, and the full backing of RealX's legal and technology infrastructure behind you.</Body>
              <div className="mt-6">
                <AccentBox>The Realtors who evolve into Asset Managers now will define who manages India's real estate investment flows over the next decade.</AccentBox>
              </div>
            </>}
            right={<div className="flex flex-col gap-5">
              {[["₹100L Cr+", "Wealth flowing to equities & digital assets that tokenised real estate can compete for"], ["500–5,000+", "Potential investors per tokenised deal, versus 5–20 for traditional formats"], ["₹1–2L", "Entry point that unlocks the retail, millennial, and NRI investor base"]].map(([num, label]) => (
                <Card key={num as string} topColor="gold" enableHover={false} className="text-center">
                  <div className="font-heading text-[2rem] text-primary mb-2">{num}</div>
                  <Body className="text-[0.85rem]">{label}</Body>
                </Card>
              ))}
            </div>}
          />
        </div>
      </div>

      <Divider />

      {/* INVESTOR PROFILES */}
      <div className="py-20">
        <div className="container">
          <SectionHeader label="Your Investor Base" title="A New Generation of Investors Is Ready and Waiting." body="Understanding who your end investors are — and what they demand — is essential to building a platform that serves them well." />
          <Grid cols={3}>
            {([
              ["Millennials & Gen Z (25–40)", "Digital natives who expect to invest from an app, not a lawyer's office. India's fastest-growing wealth segment.", false],
              ["Working Professionals", "Salaried employees with ₹5–50L in investable surplus, seeking passive real estate exposure.", false],
              ["NRI & Global Investors", "Seeking transparent, digitally accessible ways to invest in Indian property.", false],
              ["Women Investors", "A rapidly growing demographic preferring passive, transparent, digitally-managed investments.", false],
              ["Retail Wealth", "Middle-class investors with ₹10–30L seeking diversification beyond gold and equities.", false],
              ["What They All Demand", "₹1–10L entry · Digital onboarding · Real-time transparency · Clear ownership · Passive management.", true],
            ] as [string, string, boolean][]).map(([t, b, h]) => (
              <InvestorCard key={t} title={t} body={b} highlight={h} />
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* THE AM ROLE */}
      <div className="py-20">
        <div className="container">
          <SectionHeader label="Your New Role: Asset Manager" title="From First Deal to Final Sale — You Own the Relationship." body="Asset Manager is a role defined by RealX — designed for Realtors ready to go beyond brokerage." />
          <Grid cols={2}>
            {[
              ["01", "Source, onboard, and distribute", "Identify assets, bring them onto your REDbox platform, structure the tokenisation deal, and distribute to your investor base."],
              ["02", "Be the bridge for Developers", "Many Developers are entirely new to tokenisation. You are the trusted professional who guides them through onboarding."],
              ["03", "Manage investor queries", "Throughout the active purchase and sale window, you are the primary point of contact — building trust."],
              ["04", "Post-purchase asset management", "Property oversight, maintenance, tenancy management, and income distribution to investors."],
              ["05", "Timely investor reporting", "Accurate, consistent reporting is how you build a loyal investor base that reinvests and grows with you."],
              ["06", "Manage the end sale", "When the asset reaches end of its investment horizon, you manage the exit professionally."],
            ].map(([n, t, b]) => (
              <Card key={n as string}>
                <StepNum n={n as string} className="mb-4" />
                <H3 className="text-[1.05rem] mb-2">{t}</H3>
                <Body className="text-[0.86rem]">{b}</Body>
              </Card>
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* DEVELOPER FLOW */}
      <div className="py-20">
        <div className="container">
          <SectionHeader center label="Working with Developers" title="Turn Developer Inventory Into Your Opportunity." body="Every Developer listing on REDbox must designate a registered Asset Manager for each asset." />
          <Grid cols={3}>
            {[
              ["Structured Deal Flow", "The platform mandates an Asset Manager for every Developer asset. You are being sought out as a required partner."],
              ["Preferred Partner Relationships", "Developers offer dedicated unit allocations and preferential rates to their best distribution partners."],
              ["Symbiotic Growth", "Developers need your expertise and continuity. You gain inventory, deal flow, and commercial upside."],
            ].map(([t, b]) => (
              <Card key={t as string} topColor="gold">
                <Label>{t as string}</Label>
                <Body className="text-[0.88rem]">{b}</Body>
              </Card>
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <CtaBand
            title="Ready to Evolve from Realtor to Asset Manager?"
            body="REDbox is open to Realtors who are ready to build a tokenisation business. Register, get onboarded, and your branded platform is live."
            buttons={[
              <Btn key="r" onClick={() => setComingSoon(true)}>Register as Realtor</Btn>,
              <Btn key="h" variant="outline" onClick={() => nav("/how")}>See How It Works</Btn>,
            ]}
          />
        </div>
      </div>
      {/* COMING SOON DIALOG */}
      <Dialog open={comingSoon} onOpenChange={setComingSoon}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">Coming Soon 🚀</DialogTitle>
            <DialogDescription className="text-base mt-3">
              Realtor registration is launching soon. For early access or enquiries, reach out to us at{" "}
              <a
                href="mailto:hi@RWAREDbox.com"
                className="text-primary font-semibold hover:underline"
              >
                hi@RWAREDbox.com
              </a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageRealtors;
