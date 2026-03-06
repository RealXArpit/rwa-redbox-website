import { useState } from "react";
import { Btn } from "./Primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DeveloperOnboardingDialog from "@/components/redbox/DeveloperOnboardingDialog";

interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

const NAV_ITEMS = [
  { id: "developers", label: "For Developers" },
  { id: "realtors", label: "For Realtors" },
  { id: "how", label: "How It Works" },
  { id: "about", label: "About RealX" },
  { id: "faq", label: "FAQs" },
];

export const Nav = ({ page, setPage }: NavProps) => {
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [devDialogOpen, setDevDialogOpen] = useState(false);
  const [realtorSoon, setRealtorSoon] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-background/92 border-b border-border backdrop-blur-[16px]">
        <div className="container flex items-center justify-between h-[60px]">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setPage("home")}>
            <div className="w-[30px] h-[30px] bg-primary rounded-md flex items-center justify-center font-heading text-base font-bold text-primary-foreground">R</div>
            <div>
              <div className="font-heading text-[1.1rem] text-foreground leading-none">REDbox</div>
              <div className="font-body text-[0.6rem] text-primary tracking-wider uppercase">by RealX</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`bg-transparent border-none cursor-pointer py-2 px-3.5 rounded-md font-body text-[0.85rem] font-semibold transition-all ${
                  page === item.id ? "text-primary bg-primary/[0.08]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Btn className="ml-2 py-2 px-4 text-[0.82rem]" onClick={() => setGetStartedOpen(true)}>Get Started →</Btn>
          </div>
        </div>
      </nav>

      {/* Get Started chooser modal */}
      <Dialog open={getStartedOpen} onOpenChange={setGetStartedOpen}>
        <DialogContent className="sm:max-w-[480px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-foreground text-center">Ready to Lead the Tokenisation Wave?</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm text-center mt-2">
              REDbox is available to qualifying Real Estate Developers and Realtors. Register, get approved, and your branded tokenisation platform is live on your own website.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 justify-center mt-6">
            <Btn onClick={() => { setGetStartedOpen(false); setDevDialogOpen(true); }}>Apply as Developer</Btn>
            <Btn variant="outline" onClick={() => { setGetStartedOpen(false); setRealtorSoon(true); }}>Register as Realtor</Btn>
          </div>
        </DialogContent>
      </Dialog>

      {/* Developer onboarding dialog */}
      <DeveloperOnboardingDialog open={devDialogOpen} onOpenChange={setDevDialogOpen} />

      {/* Realtor coming soon dialog */}
      <Dialog open={realtorSoon} onOpenChange={setRealtorSoon}>
        <DialogContent className="sm:max-w-[420px] bg-background border-border text-center">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-foreground">Coming Soon 🚀</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mt-2">
              Realtor registration is launching soon. Reach out to us at{" "}
              <a href="mailto:hi@RWAREDbox.com" className="text-primary font-bold hover:underline">hi@RWAREDbox.com</a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const Footer = ({ setPage }: { setPage: (page: string) => void }) => (
  <footer className="bg-surface border-t border-border py-10">
    <div className="container flex items-center justify-between flex-wrap gap-5">
      <p className="font-body text-[0.8rem] text-text-dim">
        <a href="mailto:hi@RWAREDbox.com" className="text-primary no-underline hover:underline">hi@RWAREDbox.com</a>
      </p>
      <p className="font-body text-[0.78rem] text-text-dim flex items-center gap-1.5">
        © 2026 RWAREDbox.com | Powered by RealX
      </p>
    </div>
  </footer>
);
