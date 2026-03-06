import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1, Body, Btn, Tag, Divider, FeatureItem,
  SectionHeader, TwoCol, CtaBand, HeroBg, ProcessStep,
} from "@/components/redbox/Primitives";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import DeveloperOnboardingDialog from "@/components/redbox/DeveloperOnboardingDialog";

const PageHow = () => {
  const [tab, setTab] = useState<"dev" | "rel">("dev");
  const nav = useNavigate();
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [realtorSoon, setRealtorSoon] = useState(false);

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-[40vh] flex items-center py-20">
        <HeroBg />
        <div className="container relative z-10">
          <div className="mb-6"><Tag>How It Works</Tag></div>
          <H1>From Application to<br /><span className="text-primary">First Live Deal.</span></H1>
          <Body lead className="max-w-[580px] mt-6">A straightforward process for both Developers and Realtors. Fully supported by the RealX team at every step.</Body>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-20">
        <div className="container">
          {/* PILL NAV */}
          <div className="flex justify-center mb-14">
            <div className="inline-flex bg-surface-2 border border-border rounded-full p-1 gap-1">
              {([["dev", "For Developers"], ["rel", "For Realtors"]] as const).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`py-2 px-6 rounded-full border-none cursor-pointer font-body text-[0.88rem] font-bold transition-all ${
                    tab === id ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {tab === "dev" ? (
            <TwoCol
              left={<>
                <SectionHeader label="Developer Onboarding" title="Six Steps to Your First Tokenised Deal." />
                {[
                  ["1", "Apply for Access", "Visit RWAREDbox.com and complete the Developer registration form with your company and project details."],
                  ["2", "Get Approved", "The RealX team reviews and verifies your company and project credentials."],
                  ["3", "Enable on Your Website", "Once your portal is provisioned by RealX, enable it on your own website from the Admin panel — in minutes."],
                  ["4", "Customise Your Platform", "Match the portal to your brand identity with theme and visual customisation."],
                  ["5", "Designate an Asset Manager", "Select a registered Asset Manager (Realtor) from the REDbox registry for each property."],
                  ["6", "Go Live", "List your first property, set your deal parameters, and start accepting investments."],
                ].map(([n, t, b], i, arr) => (
                  <ProcessStep key={n as string} n={n as string} title={t as string} body={b as string} last={i === arr.length - 1} />
                ))}
              </>}
              right={<>
                <SectionHeader label="What RealX Handles" title="You Focus on Deals. We Handle the Rest." />
                <div className="flex flex-col gap-3.5">
                  {[
                    ["⚖️", "Legal Framework", "SDR within Blockchain Tokens, fully compliant with Indian law."],
                    ["🔒", "KYC & Compliance", "Full investor onboarding, identity verification, and end-to-end compliance — handled by RealX."],
                    ["⛓️", "Blockchain Settlement", "Token issuance, blockchain recording, and transaction settlement — automated."],
                    ["🌐", "Marketplace Visibility", "Every deal on your platform is simultaneously featured on the RealX national marketplace."],
                  ].map(([icon, title, body]) => (
                    <FeatureItem key={title as string} icon={icon as string} title={title as string} body={body as string} />
                  ))}
                </div>
              </>}
            />
          ) : (
            <TwoCol
              left={<>
                <SectionHeader label="Realtor Onboarding" title="From Realtor to Asset Manager — Your Path." />
                {[
                  ["1", "Apply for Access", "Visit RWAREDbox.com and complete the Realtor registration form with your company credentials."],
                  ["2", "Review & Approval", "The RealX team verifies your credentials. Experienced Realtors with an established client base are prioritised."],
                  ["3", "Launch on Your Own Website", "Once provisioned, enable your REDbox portal on your own website from the Admin panel in minutes."],
                  ["4", "Customise & Brand", "Match the platform to your brand identity. Your investors see your brand, co-presented with RealX."],
                  ["5", "Onboard Your First Asset", "List your first property — Developer inventory, resale, land, or BTS."],
                  ["6", "Manage the Full Lifecycle", "Manage investor queries, oversee the property, distribute income, report regularly, and manage the eventual exit."],
                ].map(([n, t, b], i, arr) => (
                  <ProcessStep key={n as string} n={n as string} title={t as string} body={b as string} last={i === arr.length - 1} />
                ))}
              </>}
              right={<>
                <SectionHeader label="Your Ongoing Lifecycle" title="The Asset Manager Journey." />
                <div className="flex flex-col gap-3.5">
                  {[
                    ["🔍", "Pre-Sale", "Source assets, structure deals, and distribute to investors through your platform and the RealX marketplace."],
                    ["💬", "During Sale", "Primary contact for investor queries, managing the purchase journey."],
                    ["🏠", "Post-Purchase", "Property oversight, maintenance, tenancy management, and income distribution."],
                    ["📈", "Ongoing", "Regular investor updates, performance reporting, and portfolio communications."],
                    ["🏁", "End Sale", "Manage the eventual exit — protecting investor returns professionally."],
                  ].map(([icon, title, body]) => (
                    <FeatureItem key={title as string} icon={icon as string} title={title as string} body={body as string} />
                  ))}
                </div>
              </>}
            />
          )}
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="py-20">
        <div className="container">
          <CtaBand
            title="Ready to Get Started?"
            body="The RealX team is ready to walk you through the process and answer any questions."
            buttons={[
              <Btn key="d" onClick={() => nav("/developers")}>I'm a Developer</Btn>,
              <Btn key="r" variant="outline" onClick={() => nav("/realtors")}>I'm a Realtor</Btn>,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHow;
