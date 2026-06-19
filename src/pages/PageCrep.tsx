import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  GraduationCap,
  UserCheck,
  Rocket,
  Sparkles,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";
import {
  H1, H2, H3, Body, Btn, Label, SectionHeader, CtaBand, HeroBg, Divider,
} from "@/components/redbox/Primitives";
import { cn } from "@/lib/utils";
import { ecosystemPartnerServices } from "@/services/ecosystemPartner";
import { toast } from "sonner";

/* -------------------------------------------------- */
/* Hero                                                */
/* -------------------------------------------------- */
function Hero({ onApply }: { onApply: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const cards = [
    { icon: GraduationCap, label: "Platform Training", delay: 0 },
    { icon: UserCheck, label: "Evaluation Round", delay: 0.6 },
    { icon: ShieldCheck, label: "KYC Verification", delay: 1.2 },
    { icon: Rocket, label: "Commercial Activation", delay: 1.8 },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <HeroBg />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[40%] h-[520px] w-[520px] rounded-full bg-primary/8 blur-[140px]" />
        <div
          className="absolute h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mouse.x - 150}px, ${mouse.y - 150}px)` }}
        />
      </div>

      <div className="container relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold-border bg-surface-2 px-4 py-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="font-body text-[0.78rem] text-muted-foreground">Ecosystem Partner Onboarding</span>
          </div>
          <H1>
            REDbox Ecosystem{" "}
            <span className="text-primary">Partner Certification</span> Program
          </H1>
          <Body lead className="mt-6 max-w-xl">
            A structured onboarding and certification process designed to activate ecosystem
            partners through training, evaluation, compliance, and operational enablement.
          </Body>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Btn onClick={onApply}>Apply for Certification →</Btn>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 font-body text-[0.72rem] font-bold uppercase tracking-wider text-muted-foreground">
            <div>4-Day Program</div>
            <div className="h-px w-8 bg-border" />
            <div>Compliance Verified</div>
            <div className="h-px w-8 bg-border" />
            <div>Commercial Ready</div>
          </div>
        </motion.div>

        <div className="relative h-[460px] lg:col-span-5">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const positions = [
              "top-0 left-0",
              "top-10 right-0",
              "bottom-20 left-8",
              "bottom-0 right-4",
            ];
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${positions[i]} w-[240px]`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: c.delay,
                  }}
                  className="rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-border hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-gold-border bg-gold-dim">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-body text-[0.72rem] font-bold uppercase tracking-wider text-muted-foreground">
                        Step 0{i + 1}
                      </div>
                      <div className="font-body text-[0.85rem] font-bold text-foreground">{c.label}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(i + 1) * 25}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* Certification Journey                               */
/* -------------------------------------------------- */
const STEPS = [
  {
    icon: GraduationCap,
    title: "Platform Demonstration",
    points: [
      "End-to-end REDbox platform walkthrough",
      "Operational ecosystem understanding",
      "Documentation flow explanation",
      "Sale deed process overview",
    ],
  },
  {
    icon: UserCheck,
    title: "One-on-One Evaluation",
    points: [
      "Practical interaction with leadership team",
      "Developer-side simulation exercise",
      "Communication and representation assessment",
      "Ecosystem pitching evaluation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Onboarding & KYC",
    points: [
      "Partner onboarding process",
      "Compliance verification",
      "KYC documentation",
    ],
  },
  {
    icon: Rocket,
    title: "Certified Commercial Activation",
    points: [
      "Official certification issuance",
      "Go-live confirmation",
      "Commercial participation enablement",
      "Operational ecosystem access",
    ],
  },
];

function CertificationJourney() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);


  return (
    <section id="process" className="relative overflow-hidden py-20">
      <div className="container">
        <SectionHeader
          center
          label="The Process"
          title="Certification Journey"
          body="Four structured stages that move qualified partners from training to operational activation."
        />

        <div className="relative mt-20 px-1 pt-6 pb-10">
          {/* Curved flowing SVG connectors (desktop) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-12 hidden h-24 w-full lg:block"
            viewBox="0 0 1200 96"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(38, 40%, 55%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(38, 40%, 55%)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(38, 40%, 55%)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="connFlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(38, 40%, 55%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(38, 52%, 71%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(38, 40%, 55%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => {
              const startX = 150 + i * 300;
              const endX = startX + 300;
              const midX = (startX + endX) / 2;
              const curve = i % 2 === 0 ? -36 : 36;
              const d = `M ${startX} 48 C ${midX} ${48 + curve}, ${midX} ${48 - curve}, ${endX} 48`;
              return (
                <g key={i}>
                  <path
                    d={d}
                    stroke="url(#connGrad)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                  <motion.path
                    d={d}
                    stroke="url(#connFlow)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="0.15 0.85"
                    initial={{ strokeDashoffset: 1 }}
                    animate={{ strokeDashoffset: [1, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.6,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Vertical curved connectors (mobile/tablet) */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 lg:hidden"
            viewBox="0 0 96 1200"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 48 0 Q 20 300 48 600 Q 76 900 48 1200"
              stroke="hsl(38, 40%, 55%)"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "relative flex h-full flex-col",
                    i % 2 === 1 && "lg:mt-10"
                  )}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setActiveIdx(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setActiveIdx(i)}
                >
                  <motion.div
                    animate={
                      isActive
                        ? { y: -16, scale: 1.02 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full cursor-pointer flex-col"
                  >
                    <div className="relative mx-auto mb-8 grid h-24 w-24 place-items-center">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                        animate={
                          isActive
                            ? { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }
                            : { opacity: 0.25, scale: 1 }
                        }
                        transition={{
                          duration: 2.4,
                          ease: "easeInOut",
                          repeat: isActive ? Infinity : 0,
                        }}
                      />
                      <motion.div
                        animate={
                          isActive
                            ? { scale: 1.08 }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "relative grid h-24 w-24 place-items-center rounded-full border bg-surface",
                          isActive ? "border-primary/50" : "border-gold-border"
                        )}
                      >
                        <div
                          className={cn(
                            "grid h-14 w-14 place-items-center rounded-full transition-colors duration-500",
                            isActive ? "bg-primary" : "bg-gold-dim"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-6 w-6 transition-colors duration-500",
                              isActive ? "text-primary-foreground" : "text-primary"
                            )}
                          />
                        </div>
                        <div
                          className={cn(
                            "absolute -top-2 right-1 rounded-full border px-2 py-0.5 font-body text-[0.65rem] font-bold tracking-wider transition-colors duration-500",
                            isActive
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-border bg-surface-2 text-muted-foreground"
                          )}
                        >
                          0{i + 1}
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      layout
                      className={cn(
                        "flex min-h-[260px] flex-1 flex-col rounded-2xl border p-6",
                        isActive
                          ? "border-primary/40 bg-surface shadow-[0_8px_32px_-8px_hsl(38_40%_55%_/_0.25)]"
                          : "border-border bg-surface"
                      )}
                    >
                      <H3
                        className={cn(
                          "text-[1.05rem] transition-colors duration-500",
                          isActive && "text-primary"
                        )}
                      >
                        {s.title}
                      </H3>
                      <ul className="mt-4 space-y-2.5">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className={cn(
                              "flex items-start gap-2.5 font-body text-[0.85rem] leading-relaxed transition-colors duration-500",
                              isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500",
                                isActive ? "bg-primary scale-125" : "bg-primary/50"
                              )}
                            />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}





/* -------------------------------------------------- */
/* Final CTA                                           */
/* -------------------------------------------------- */
function FinalCTA({ onApply }: { onApply: () => void }) {
  return (
    <section id="apply" className="py-20">
      <div className="container">
        <CtaBand
          title="Complete Your Certification Journey"
          body="Participate in the REDbox ecosystem onboarding and activation process."
          buttons={[<Btn key="apply" onClick={onApply}>Apply Now →</Btn>]}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* Apply Modal                                         */
/* -------------------------------------------------- */
const MAX_DEVELOPER_NAMES = 10;

type FormState = {
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  city: string;
  area: string;
  state: string;
  orgname: string;
  orgtype: string;
  directtDeveloper: string;
  developerNames: string[];
  joinAsChannelPartner: boolean;
};

const INITIAL_FORM: FormState = {
  fname: "",
  lname: "",
  mobile: "",
  email: "",
  city: "",
  area: "",
  state: "",
  orgname: "",
  orgtype: "",
  directtDeveloper: "",
  developerNames: [""],
  joinAsChannelPartner: false,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-[0.72rem] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 font-body text-[0.9rem] text-foreground placeholder:text-text-dim outline-none transition-colors focus:border-primary/50 focus:bg-surface-3";

function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateDeveloperName = (index: number, value: string) =>
    setForm((f) => {
      const developerNames = [...f.developerNames];
      developerNames[index] = value;
      return { ...f, developerNames };
    });

  const addDeveloperName = () => {
    if (form.developerNames.length >= MAX_DEVELOPER_NAMES) return;
    setForm((f) => ({ ...f, developerNames: [...f.developerNames, ""] }));
  };

  const removeDeveloperName = (index: number) => {
    if (form.developerNames.length <= 1) return;
    setForm((f) => ({
      ...f,
      developerNames: f.developerNames.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    setEmailError(emailOk ? "" : "Enter a valid email");
    if (!emailOk) return;

    const developerNames = form.developerNames.map((n) => n.trim()).filter(Boolean);
    if (developerNames.length === 0) return;

    const payload = {
      name: `${form.fname} ${form.lname}`.trim(),
      mobileNo: form.mobile,
      email: form.email,
      location: { city: form.city, area: form.area, state: form.state },
      organisation: { name: form.orgname, type: form.orgtype },
      miscDetails: {
        directDeveloper: form.directtDeveloper,
        developerNames,
        joinAsChannelPartner: form.joinAsChannelPartner,
        source: "REDBOX",
      },
    };

    // Hook your API call here.
    // eslint-disable-next-line no-console
    setSubmitted(true);
    try {
      const res = await ecosystemPartnerServices.registerEcosystemPartner(payload);
      if (res && res.success) {
        toast.success("Application submitted!");
        onClose();
      } else {
        toast.error(res?.message || `Somthing went wrong`);
      }
    } catch (err) {
      console.log(err);
    }finally{
      setSubmitted(false);
    }
  };



  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/70 px-4 py-10 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="scrollbar-subtle relative max-h-[min(90vh,calc(100vh-5rem))] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="pointer-events-none absolute -top-32 inset-x-0 h-72 rounded-full bg-primary/10 blur-[120px]" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition-colors hover:border-gold-border hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative px-8 py-16 text-center md:px-12"
              >
                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center">
                  <div className="absolute h-16 w-16 rounded-full bg-primary/20 blur-2xl" />
                  <div className="relative grid h-16 w-16 place-items-center rounded-full bg-primary">
                    <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>
                <Label>Received</Label>
                <H2 className="text-[1.75rem] md:text-[2rem]">
                  Application Submitted{" "}
                  <span className="text-primary">Successfully</span>
                </H2>
                <Body className="mx-auto mt-4 max-w-md text-[0.9rem]">
                  Our partnerships team will review your application and reach out at your
                  preferred contact time.
                </Body>
                <Btn onClick={onClose} className="mt-8">
                  Close
                </Btn>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative px-8 py-9 md:px-10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <Label>Partner Application</Label>
                </div>
                <H2 className="text-[1.5rem] md:text-[1.75rem]">
                  Apply for <span className="text-primary">Certification</span>
                </H2>
                <Body className="mt-2 text-[0.88rem]">
                  Share a few details — our team will guide you through the onboarding process.
                </Body>

                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="First Name *">
                    <input
                      required
                      maxLength={60}
                      className={inputClass}
                      value={form.fname}
                      onChange={(e) => update("fname", e.target.value)}
                      placeholder="First name"
                    />
                  </Field>
                  <Field label="Last Name *">
                    <input
                      required
                      maxLength={60}
                      className={inputClass}
                      value={form.lname}
                      onChange={(e) => update("lname", e.target.value)}
                      placeholder="Last name"
                    />
                  </Field>
                  <Field label="Email ID *">
                    <input
                      required
                      type="email"
                      maxLength={255}
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="name@company.com"
                    />
                  </Field>
                  <Field label="Mobile Number *">
                    <input
                      required
                      type="tel"
                      maxLength={20}
                      className={inputClass}
                      value={form.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length > 10) {
                          return;
                        }
                        update("mobile", value)}
                      }
                      placeholder="Mobile number"
                    />
                  </Field>

                  <Field label="City *">
                    <input
                      required
                      maxLength={80}
                      className={inputClass}
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="City"
                    />
                  </Field>
                  <Field label="Area / Location *">
                    <input
                      required
                      maxLength={80}
                      className={inputClass}
                      value={form.area}
                      onChange={(e) => update("area", e.target.value)}
                      placeholder="Area / location"
                    />
                  </Field>
                  <Field label="State *">
                    <input
                      required
                      maxLength={80}
                      className={inputClass}
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      placeholder="State"
                    />
                  </Field>
                  <Field label="Organization name, if any *">
                    <input
                      required
                      maxLength={150}
                      className={inputClass}
                      value={form.orgname}
                      onChange={(e) => update("orgname", e.target.value)}
                      placeholder="Organization name"
                    />
                  </Field>

                  <Field label="Organization Type *">
                    <select
                      required
                      className={`${inputClass} appearance-none`}
                      value={form.orgtype}
                      onChange={(e) => update("orgtype", e.target.value)}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="LLP">LLP</option>
                      <option value="Pvt Ltd">Pvt Ltd</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>

                  <Field label="Number of Developers in your direct network *">
                    <input
                      required
                      className={inputClass}
                      value={form.directtDeveloper}
                      onChange={(e) => update("directtDeveloper", e.target.value)}
                      placeholder="Enter value"
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Mention your top developers — minimum one is necessary *">
                      <div className="space-y-3">
                        {form.developerNames.map((name, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              required={index === 0}
                              className={inputClass}
                              value={name}
                              onChange={(e) => updateDeveloperName(index, e.target.value)}
                              placeholder={`Developer name ${index + 1}`}
                            />
                            {form.developerNames.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeDeveloperName(index)}
                                aria-label={`Remove developer ${index + 1}`}
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        {form.developerNames.length < MAX_DEVELOPER_NAMES && (
                          <Btn
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={addDeveloperName}
                          >
                            <Plus className="h-4 w-4" />
                            Add Developer
                          </Btn>
                        )}
                      </div>
                      <span className="mt-2 block font-body text-[0.75rem] text-muted-foreground">
                        You can add up to {MAX_DEVELOPER_NAMES} developer names
                      </span>
                    </Field>
                  </div>
                </div>

                {emailError ? (
                  <div className="mt-3 font-body text-[0.8rem] font-bold text-destructive">
                    {emailError}
                  </div>
                ) : null}

                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface-2 p-4">
                  <input
                    type="checkbox"
                    checked={form.joinAsChannelPartner}
                    onChange={(e) => update("joinAsChannelPartner", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                  />
                  <span className="font-body text-[0.88rem] leading-relaxed text-muted-foreground">
                    Do you want to join as a Channel Partner?
                  </span>
                </label>

                <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
                  <Btn type="button" variant="outline" onClick={onClose}>
                    Close
                  </Btn>
                  <Btn type="submit">
                    Submit Application →
                  </Btn>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------- */
/* Page                                                */
/* -------------------------------------------------- */
function PageCrep() {
  const [applyOpen, setApplyOpen] = useState(false);
  const openApply = () => setApplyOpen(true);
  const closeApply = () => setApplyOpen(false);

  return (
    <div>
      <Hero onApply={openApply} />
      <Divider />
      <CertificationJourney />
      <Divider />
      <FinalCTA onApply={openApply} />
      <ApplyModal open={applyOpen} onClose={closeApply} />
    </div>
  );
}

export default PageCrep;