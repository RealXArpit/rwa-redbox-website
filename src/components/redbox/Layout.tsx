import { Btn } from "./Primitives";

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

export const Nav = ({ page, setPage }: NavProps) => (
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
        <Btn className="ml-2 py-2 px-4 text-[0.82rem]">Get Started →</Btn>
      </div>
    </div>
  </nav>
);

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
