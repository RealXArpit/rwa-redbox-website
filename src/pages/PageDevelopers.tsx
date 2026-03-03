import { useState } from "react";
import {
  H1, H2, H3, Body, Btn, Card, Tag, GoldLine, Label, AccentBox,
  Divider, StepNum, FeatureItem, SectionHeader, Grid,
  TwoCol, CtaBand, HeroBg,
} from "@/components/redbox/Primitives";
import DeveloperOnboardingDialog from "@/components/redbox/DeveloperOnboardingDialog";

interface PageProps {
  setPage: (page: string) => void;
}

const PageDevelopers = ({ setPage }: PageProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <DeveloperOnboardingDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* HERO */}
      <div className="relative min-h-[55vh] flex items-center py-20">
        <HeroBg />
        <div className="container relative z-10">
          <div className="mb-6"><Tag>For Real Estate Developers</Tag></div>
          <H1>Tokenise Your Inventory.<br /><span className="text-primary">Reach More Investors.</span></H1>
          <Body lead className="max-w-[580px] mt-6 mb-10">Your own branded Property Tokenisation platform — running on your own website, backed by India's most trusted tokenisation infrastructure, live in minutes.</Body>
          <div className="flex gap-3.5 flex-wrap">
            <Btn onClick={() => setDialogOpen(true)}>Apply as Developer</Btn>
            <Btn variant="outline" onClick={() => setPage("how")}>See How It Works</Btn>
          </div>
        </div>
      </div>

      {/* MARKET PROBLEM */}
      <div className="pt-12 pb-20">
        <div className="container">
          <SectionHeader label="The Market Reality" title="Your Buyer Pool Is Smaller Than It Should Be." body="Traditional real estate investment structures limit you to a handful of bulk buyers per project." />
          <Grid cols={3}>
            {[
              ["95%", "of potential investors are locked out", "₹50L–₹5Cr entry points make your properties inaccessible to the majority of India's growing investor class."],
              ["5–20", "bulk buyers per project, typically", "Tokenisation turns this into 500–5,000+ investors per deal — same property, massively expanded market."],
              ["₹100L Cr+", "flowing to other asset classes", "Retail wealth, NRI capital, and millennial savings that could be in your projects are going to equities and digital assets."],
            ].map(([n, t, b]) => (
              <Card key={n as string} topColor="red" enableHover={false}>
                <div className="font-heading text-[2rem] text-foreground mb-2.5">{n}</div>
                <p className="font-body text-[0.88rem] font-bold text-foreground mb-1.5">{t}</p>
                <Body className="text-[0.85rem]">{b}</Body>
              </Card>
            ))}
          </Grid>
          <div className="mt-8">
            <AccentBox>The developers who launch tokenisation now will define the next decade of Indian real estate. Those who wait are already behind.</AccentBox>
          </div>
        </div>
      </div>

      <Divider />

      {/* WHAT REDBOX GIVES YOU */}
      <div className="py-20">
        <div className="container">
          <SectionHeader label="What REDbox Gives You" title="A Complete Tokenisation Platform. On Your Own Website." body="REDbox is not a marketplace listing. It is a full-featured Platform-as-a-Service — a branded tokenisation portal that lives on your own website, under your own domain." />
          <Grid cols={2}>
            {[
              ["🌐", "Your Own Portal, Your Domain", "Your REDbox platform runs on your own subdomain (e.g., invest.yourdevelopment.com). Your investors browse and invest entirely within your brand experience."],
              ["🎨", "Brand-Matched Design", "Customise the platform to reflect your brand identity and visual language. Investors see your brand, co-presented with RealX."],
              ["📊", "Full Admin Dashboard", "Manage all your tokenised listings, monitor investor activity, track sales progress, and control your platform — from one interface."],
              ["👥", "Sales Team & Channel Partner Management", "Add and manage Relationship Managers, onboard sub-distributors and Channel Partners, monitor performance, and track commissions automatically."],
              ["🌍", "National Marketplace Visibility", "Every asset on your REDbox platform is also featured on the RealX national marketplace — giving your deals visibility to a wider investor audience."],
              ["📱", "Built for Digital Investors", "Mobile-optimised, KYC-integrated, transaction-ready. The full investor journey — from discovery to ownership — happens digitally on your platform."],
            ].map(([icon, title, body]) => (
              <FeatureItem key={title as string} icon={icon as string} title={title as string} body={body as string} />
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* COMMERCIALS */}
      <div className="py-20">
        <div className="container">
          <div className="bg-surface-2 border border-gold-border rounded-[14px] p-10 flex items-center gap-8 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <GoldLine />
              <Label>Commercial Terms</Label>
              <H3 className="mb-3">Pricing & Commercial Model</H3>
              <Body>Commercial terms for REDbox are currently being finalised. Reach out to us directly and our team will walk you through the full commercial structure based on your specific use case.</Body>
            </div>
            <div className="flex-shrink-0">
              <a href="mailto:hi@RWAREDbox.com" className="no-underline">
                <Btn>Contact Us for Commercials →</Btn>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <CtaBand
            title="Ready to Tokenise Your First Property?"
            body="Six steps from application to your first live deal. The RealX team walks you through every one."
            buttons={[
              <Btn key="a" onClick={() => setDialogOpen(true)}>Apply as Developer</Btn>,
              <Btn key="h" variant="outline" onClick={() => setPage("how")}>See the 6-Step Process</Btn>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PageDevelopers;
