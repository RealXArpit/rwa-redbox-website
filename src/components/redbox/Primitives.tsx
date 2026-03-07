import { ButtonHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

// Gold line decorator
export const GoldLine = ({ center }: { center?: boolean }) => (
  <div className={center ? "gold-line-center" : "gold-line"} />
);

// Tag/badge
export const Tag = ({ children, variant = "gold" }: { children: React.ReactNode; variant?: "gold" | "red" }) => (
  <span className={cn(
    "inline-block px-3.5 py-1 rounded-full text-[0.72rem] font-body font-bold tracking-wider uppercase border",
    variant === "gold" ? "bg-gold-dim text-primary border-gold-border" : "bg-destructive/10 text-destructive border-destructive/20"
  )}>
    {children}
  </span>
);

// Section label
export const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-[0.72rem] font-bold tracking-wider uppercase text-primary mb-2.5">{children}</p>
);

// Headings
export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={cn("font-heading text-[clamp(2.4rem,5vw,4.4rem)] font-normal leading-[1.12] tracking-tight text-foreground", className)}>
    {children}
  </h1>
);

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("font-heading text-[clamp(1.7rem,3vw,2.8rem)] font-normal leading-[1.18] tracking-tight text-foreground", className)}>
    {children}
  </h2>
);

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("font-heading text-[clamp(1.15rem,2vw,1.5rem)] font-normal leading-snug text-foreground", className)}>
    {children}
  </h3>
);

// Body text
export const Body = ({ children, lead, className }: { children: React.ReactNode; lead?: boolean; className?: string }) => (
  <p className={cn(
    "font-body leading-[1.8]",
    lead ? "text-[1.1rem] text-foreground" : "text-[0.95rem] text-muted-foreground",
    className
  )}>
    {children}
  </p>
);

// Buttons
export const Btn = ({ children, variant = "gold", onClick, className ,...props}: {
  children: React.ReactNode;
  variant?: "gold" | "outline" | "ghost";
  onClick?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg cursor-pointer font-body text-[0.9rem] font-bold border-none transition-all duration-150 tracking-[0.01em]",
        variant === "gold" && "bg-primary text-primary-foreground hover:bg-primary-light",
        variant === "outline" && "bg-transparent text-foreground border border-gold-border hover:border-primary hover:text-primary",
        variant === "ghost" && "bg-surface-2 text-foreground border border-border hover:bg-surface-3",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Card
export const Card = ({ children, className, topColor, enableHover = true }: {
  children: React.ReactNode;
  className?: string;
  topColor?: "gold" | "red";
  enableHover?: boolean;
}) => (
  <div className={cn(
    "bg-surface border border-border rounded-[14px] p-7 transition-all duration-200",
    topColor === "gold" && "border-t-2 border-t-primary",
    topColor === "red" && "border-t-2 border-t-destructive",
    enableHover && "hover:-translate-y-0.5 hover:border-gold-border hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]",
    className
  )}>
    {children}
  </div>
);

// Accent box (blockquote style)
export const AccentBox = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-[3px] border-l-primary bg-gold-dim py-5 px-7 rounded-r-[10px]">
    <p className="font-heading text-[1.05rem] italic text-foreground leading-[1.7]">{children}</p>
  </div>
);

// Divider
export const Divider = () => <div className="h-px bg-border" />;

// Step number circle
export const StepNum = ({ n, className }: { n: string; className?: string }) => (
  <div className={cn(
    "w-10 h-10 rounded-full flex-shrink-0 bg-gold-dim border border-gold-border flex items-center justify-center font-heading text-[1.2rem] text-primary",
    className
  )}>
    {n}
  </div>
);

// Feature item
export const FeatureItem = ({ icon, title, body }: { icon: string; title: string; body: string }) => (
  <div className="flex gap-4 items-start p-4 bg-surface border border-border rounded-[10px]">
    <div className="w-[34px] h-[34px] flex-shrink-0 rounded-lg bg-gold-dim border border-gold-border flex items-center justify-center text-base">
      {icon}
    </div>
    <div>
      <p className="font-body text-[0.9rem] font-bold text-foreground mb-1">{title}</p>
      <p className="font-body text-[0.85rem] text-muted-foreground leading-relaxed">{body}</p>
    </div>
  </div>
);

// Stat card
export const StatCard = ({ num, label }: { num: string; label: string }) => (
  <Card className="text-center" topColor="gold">
    <div className="font-heading text-[2.4rem] text-primary leading-none mb-2">{num}</div>
    <p className="font-body text-[0.8rem] text-muted-foreground">{label}</p>
  </Card>
);

// Investor card
export const InvestorCard = ({ title, body, highlight }: { title: string; body: string; highlight?: boolean }) => (
  <div className={cn(
    "border rounded-[10px] p-5",
    highlight ? "bg-gold-dim border-gold-border" : "bg-surface border-border"
  )}>
    <p className={cn("font-body text-[0.88rem] font-bold mb-1.5", highlight ? "text-primary" : "text-foreground")}>{title}</p>
    <p className="font-body text-[0.83rem] text-muted-foreground leading-relaxed">{body}</p>
  </div>
);

// Process step
export const ProcessStep = ({ n, title, body, last }: { n: string; title: string; body: string; last?: boolean }) => (
  <div className={cn("grid grid-cols-[40px_1fr] gap-5", !last && "pb-6 border-b border-border mb-6")}>
    <StepNum n={n} />
    <div>
      <p className="font-body text-[0.95rem] font-bold text-foreground mb-1">{title}</p>
      <p className="font-body text-[0.88rem] text-muted-foreground leading-[1.7]">{body}</p>
    </div>
  </div>
);

// Section header
export const SectionHeader = ({ label, title, body, center }: {
  label: string; title: string; body?: string; center?: boolean;
}) => (
  <div className={cn("mb-14", center ? "max-w-[640px] mx-auto text-center" : "max-w-[680px]")}>
    {center ? <GoldLine center /> : <GoldLine />}
    <Label>{label}</Label>
    <H2 className="mb-4">{title}</H2>
    {body && <Body className="mt-3">{body}</Body>}
  </div>
);

// Grid
export const Grid = ({ cols = 3, children, className }: {
  cols?: number; children: React.ReactNode; className?: string;
}) => (
  <div className={cn(
    "grid gap-5",
    cols === 2 && "grid-cols-1 md:grid-cols-2",
    cols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    className
  )}>
    {children}
  </div>
);

// Two column layout
export const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

// CTA band
export const CtaBand = ({ title, body, buttons }: {
  title: string; body: string; buttons: React.ReactNode[];
}) => (
  <div className="bg-gradient-to-br from-surface to-gold-dim border border-gold-border rounded-2xl py-14 px-10 text-center">
    <GoldLine center />
    <H2 className="mb-4">{title}</H2>
    <Body className="max-w-[520px] mx-auto mb-8 leading-[1.8]">{body}</Body>
    <div className="flex gap-3.5 justify-center flex-wrap">{buttons}</div>
  </div>
);

// Hero background
export const HeroBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "linear-gradient(rgba(201,169,110,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.035) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 100%)",
      }}
    />
    <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.06)_0%,transparent_65%)]" />
    <div className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.04)_0%,transparent_65%)]" />
  </div>
);

// FAQ Item (inline, for homepage)
export const FaqItemInline = ({ q, a, first, last }: {
  q: string; a: string; first?: boolean; last?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
      "bg-surface overflow-hidden",
      first && "rounded-t-xl",
      last ? "rounded-b-xl" : "border-b border-border"
    )}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 bg-transparent border-none cursor-pointer text-left"
      >
        <span className="font-body text-[0.95rem] font-bold text-foreground">{q}</span>
        <span className={cn("text-primary text-xl flex-shrink-0 transition-transform duration-200", open && "rotate-45")}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <Body className="text-[0.9rem]">{a}</Body>
        </div>
      )}
    </div>
  );
};

// FAQ Item (full page)
export const FaqItem = ({ q, a, last }: { q: string; a: string; last?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(!last && "border-b border-border")}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-5 py-5 bg-transparent border-none cursor-pointer text-left"
      >
        <span className={cn("font-body text-[0.96rem] font-bold leading-relaxed transition-colors", open ? "text-primary" : "text-foreground")}>{q}</span>
        <span className={cn("text-primary text-xl flex-shrink-0 mt-0.5 transition-transform duration-200 inline-block", open && "rotate-45")}>+</span>
      </button>
      {open && (
        <div className="pb-5">
          <Body className="text-[0.9rem] leading-[1.8]">{a}</Body>
        </div>
      )}
    </div>
  );
};

// FAQ Section wrapper
export const FaqSection = ({ label, title, icon, items }: {
  label: string; title: string; icon: string; items: [string, string][];
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-2xl">{icon}</span>
      <Label>{label}</Label>
    </div>
    <H3 className="mb-1 text-[1.35rem]">{title}</H3>
    <div className="w-10 h-0.5 bg-gold-border mt-3" />
    <div className="mt-1">
      {items.map(([q, a], i) => (
        <FaqItem key={q} q={q} a={a} last={i === items.length - 1} />
      ))}
    </div>
  </div>
);
