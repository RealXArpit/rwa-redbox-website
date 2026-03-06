import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1, H2, Body, Btn, Card, Tag, GoldLine, Label, AccentBox,
  Divider, FeatureItem, StatCard, SectionHeader, Grid,
  TwoCol, CtaBand, HeroBg,
} from "@/components/redbox/Primitives";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import DeveloperOnboardingDialog from "@/components/redbox/DeveloperOnboardingDialog";

const PageAbout = () => {
  const nav = useNavigate();
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [realtorSoon, setRealtorSoon] = useState(false);

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-[50vh] flex items-center py-20">
        <HeroBg />
        <div className="container relative z-10">
          <div className="mb-6"><Tag>About RealX</Tag></div>
          <H1>India's Pioneer in<br /><span className="text-primary">Property Tokenisation.</span></H1>
          <Body lead className="max-w-[640px] mt-6">RealX is not just the platform powering REDbox. It is the organisation that built the legal, technical, and operational foundation that makes property tokenisation in India real, enforceable, and trusted.</Body>
        </div>
      </div>

      {/* WHO IS REALX */}
      <div className="pt-12 pb-20">
        <div className="container">
          <TwoCol
            left={<>
              <GoldLine /><Label>Who is RealX</Label>
              <H2 className="mb-5">Built to Make Property Ownership Truly Accessible.</H2>
              <Body className="mb-4">RealX is India's leading platform for fractional ownership of properties through Tokenisation. Founded with the conviction that property ownership should be accessible to all — not just those with crores to invest.</Body>
              <Body className="mb-4">It operates within India's existing legal framework, using trust-based ownership structures and blockchain technology to create ownership rights that are genuine, enforceable, and transparent.</Body>
              <Body>Today, RealX is the operating layer that partners, developers, and asset managers build on. REDbox is the expression of that infrastructure as a product for the ecosystem.</Body>
            </>}
            right={<div className="flex flex-col gap-5">
              {[["Multi-state", "Commercial transactions completed across India"], ["SDR", "Global pioneer in Secure & Direct Rights on blockchain"]].map(([num, label]) => (
                <StatCard key={num as string} num={num as string} label={label as string} />
              ))}
            </div>}
          />
        </div>
      </div>

      <Divider />

      {/* SDR FRAMEWORK */}
      <div className="py-20">
        <div className="container">
          <SectionHeader center label="The SDR Framework" title="Legally Enforceable Ownership in a Token." body="Most 'tokenisation' platforms give investors a financial instrument. RealX gives investors something far more powerful — a legal right directly on the property itself." />
          <Grid cols={3}>
            {[
              ["Secure", "The ownership right is documented and secured within a blockchain token — creating an immutable, transparent record that cannot be altered or disputed."],
              ["Direct", "The right is directly on the property, not mediated through a company or fund. Investors hold genuine beneficial ownership."],
              ["Rights", "These are real, enforceable legal rights — not a promise. Token holders have all the rights, benefits, and obligations of registered co-owners."],
            ].map(([t, b]) => (
              <Card key={t as string} topColor="gold">
                <Label>{t as string}</Label>
                <Body className="text-[0.9rem]">{b}</Body>
              </Card>
            ))}
          </Grid>
          <div className="mt-8">
            <AccentBox>RealX is a global pioneer in establishing legally enforceable Secure and Direct Rights (SDR) on properties within Blockchain Tokens — operating fully within India's existing legal and regulatory structures.</AccentBox>
          </div>
        </div>
      </div>

      <Divider />

      {/* INFRASTRUCTURE */}
      <div className="py-20">
        <div className="container">
          <SectionHeader label="The Infrastructure Behind REDbox" title="What You Inherit When You Launch on REDbox." body="Every partner on REDbox inherits the full RealX stack." />
          <Grid cols={2}>
            {[
              ["⚖️", "Legal Framework", "Trust-based ownership structures and property token models established within Indian law."],
              ["🔗", "Blockchain Infrastructure", "Production-ready DLT, token issuance, immutable recording of ownership rights, and on-chain transaction settlement."],
              ["✅", "KYC & Onboarding", "Digital investor onboarding with full KYC. Existing RealX investors use their credentials seamlessly across all REDbox platforms."],
              ["📋", "Compliance Rails", "End-to-end compliance workflows built into every transaction — tested and validated through real completed deals."],
              ["🌐", "Aggregated Marketplace", "The RealX national marketplace surfaces deals from all REDbox partners, giving every deal branded exposure."],
            ].map(([icon, title, body]) => (
              <FeatureItem key={title as string} icon={icon as string} title={title as string} body={body as string} />
            ))}
          </Grid>
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <CtaBand
            title="Build Your Platform on India's Most Trusted Tokenisation Infrastructure."
            body="Register for REDbox and go live with your branded tokenisation platform — backed by RealX's legal framework, technology, and track record."
            buttons={[
              <Btn key="d" onClick={() => nav("/developers")}>I'm a Developer</Btn>,
              <Btn key="r" variant="outline" onClick={() => nav("/realtors")}>I'm a Realtor</Btn>,
            ]}
          />
          <p className="font-body text-[0.83rem] text-muted-foreground text-center mt-6">
            <a href="mailto:hi@RWAREDbox.com" className="text-primary">hi@RWAREDbox.com</a>
            {" · "}
            <a href="https://RWAREDbox.com" className="text-primary">RWAREDbox.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
