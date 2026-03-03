import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Btn } from "@/components/redbox/Primitives";
import { useToast } from "@/hooks/use-toast";

interface DeveloperOnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeveloperOnboardingDialog = ({ open, onOpenChange }: DeveloperOnboardingDialogProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    mobile: "",
    developerType: "",
    yearsInBusiness: "",
    completedProjects: "",
    geographicFocus: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.fullName || !form.email || !form.mobile) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted!", description: "Our team will reach out to you shortly." });
    onOpenChange(false);
    setForm({ companyName: "", fullName: "", email: "", mobile: "", developerType: "", yearsInBusiness: "", completedProjects: "", geographicFocus: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">Developer Onboarding</DialogTitle>
          <DialogDescription className="text-primary text-sm">Complete this form to join RealX</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div>
            <Label className="text-foreground text-sm font-bold mb-1.5 block">What is the registered name of your development company?</Label>
            <Input placeholder="Company name" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="bg-surface border-border text-foreground" />
          </div>
          <div>
            <Label className="text-foreground text-sm font-bold mb-1.5 block">Who will be the primary administrator for this account?</Label>
            <Input placeholder="Full name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="bg-surface border-border text-foreground" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Business email</Label>
              <Input type="email" placeholder="email@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="bg-surface border-border text-foreground" />
            </div>
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Mobile number</Label>
              <Input placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} className="bg-surface border-border text-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Developer type</Label>
              <Select value={form.developerType} onValueChange={(v) => update("developerType", v)}>
                <SelectTrigger className="bg-surface border-border text-foreground">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  <SelectItem value="plotted">Plotted Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Years in business</Label>
              <Select value={form.yearsInBusiness} onValueChange={(v) => update("yearsInBusiness", v)}>
                <SelectTrigger className="bg-surface border-border text-foreground">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0–2 years</SelectItem>
                  <SelectItem value="3-5">3–5 years</SelectItem>
                  <SelectItem value="6-10">6–10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Completed projects/units</Label>
              <Select value={form.completedProjects} onValueChange={(v) => update("completedProjects", v)}>
                <SelectTrigger className="bg-surface border-border text-foreground">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1–5 projects</SelectItem>
                  <SelectItem value="6-20">6–20 projects</SelectItem>
                  <SelectItem value="21-50">21–50 projects</SelectItem>
                  <SelectItem value="50+">50+ projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Geographic focus</Label>
              <Input placeholder="e.g., Mumbai, Delhi NCR" value={form.geographicFocus} onChange={(e) => update("geographicFocus", e.target.value)} className="bg-surface border-border text-foreground" />
            </div>
          </div>
          <Btn className="w-full justify-center py-3 text-base mt-2">Submit Application</Btn>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperOnboardingDialog;
