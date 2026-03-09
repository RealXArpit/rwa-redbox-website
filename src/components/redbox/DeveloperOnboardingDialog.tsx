import { useState ,useEffect} from "react";
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
import developerServices from '../../services/developerService'
import { title } from "process";

interface DeveloperOnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeveloperOnboardingDialog = ({ open, onOpenChange }: DeveloperOnboardingDialogProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    companyName: "",
    username: "",
    emailId: "",
    mobileNumber: "",
    developerType: "",
    experience: "",
    projects: "",
    regions: "",
    registrationNumber:""
  }); 
  const[isLoading ,setIsLoading]= useState(false);

  type FormErrors = {
  username?: string;
  companyName?: string;
  mobileNumber?: string;
  regions?: string;
  developerType?: string,
  experience?: string,
  projects?: string,
  emailId?: string,
  registrationNumber?: string,
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: string, value: string) =>{
    setForm((prev) => ({ ...prev, [field]: value }));
     
    // remove field error
    setErrors((prev) => ({
    ...prev,
    [field]: "",
    }));
   }


  const validateForm = (form: any) => {
  const errors: any = {};

  // Username
  if (!form.username?.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z_]+$/.test(form.username)) {
    errors.username = "Only letters and underscore allowed";
  }

  // Company Name
  if (!form.companyName?.trim()) {
    errors.companyName = "Company name is required";
  } else if (!/^[a-zA-Z0-9\s.,&()'-]+$/.test(form.companyName)) {
    errors.companyName = "Invalid company name";
  }

  // Mobile Number
  if (!form.mobileNumber) {
    errors.mobileNumber = "Mobile number is required";
  } else if (!/^[0-9]{10}$/.test(form.mobileNumber)) {
    errors.mobileNumber = "Mobile must be exactly 10 digits";
  }

  // City
  if (!form.regions?.trim()) {
    errors.regions = "City is required";
  } else if (!/^[a-zA-Z\s-]+$/.test(form.regions)) {
    errors.regions = "City can only contain letters";
  }

  //email id
  if (!form.emailId?.trim()) {
    errors.emailId = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
    errors.emailId = "Invalid email address";
  }

  if (!form.developerType?.trim()) {
    errors.developerType = "developer Type is required";
  }

  if (!form.experience?.trim()) {
    errors.experience = "Years in business is required";
  }

  if (!form.projects?.trim()) {
    errors.projects = "Project count is required";
  }

  if (!form.registrationNumber?.trim()) {
    errors.registrationNumber = "Registration number is required";
  } else {
    const cinRegex = /^[A-Z]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
    if (form.registrationNumber.length !== 21 || !cinRegex.test(form.registrationNumber)) {
      errors.registrationNumber = "CIN must be 21 chars, valid format (e.g. L17110MH1973PLC019786)";
    }
  }

  return errors;
  }



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);

     if (Object.keys(validationErrors).length > 0) {
     setErrors(validationErrors); // store errors in state
     return;
     }

     setErrors({}); // clear errors
    
    registerDeveloper();  
   
  };

  const registerDeveloper = async()=>{
    try{
      setIsLoading(true)
      const res = await developerServices.registerDeveloper(form);
      
      if(res && res.success){
        toast({ title: "Application submitted!", variant: "default", duration: 3000});
        onOpenChange(false);
        setForm({ companyName: "", username: "", emailId: "", mobileNumber: "", developerType: "", experience: "", projects: "", regions: "", registrationNumber:""});
      }
      else{
        toast({title:res?.message || `Somthing went wrong`, variant: "destructive", duration: 3000});
      }
    }
    catch(err){
      console.log(err);
      toast({title: "somthing went wrong", variant: "destructive", duration: 3000});  
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
  if (!open) {
    setErrors({});
    setForm({ companyName: "", username: "", emailId: "", mobileNumber: "", developerType: "", experience: "", projects: "", regions: "", registrationNumber:""});
  }
}, [open]);

  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">Developer Onboarding</DialogTitle>
          <DialogDescription className="text-primary text-sm">Complete this form to join RealX</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div>
            <Label className="text-foreground text-sm font-bold mb-1.5 block">What is the registered name of your development company?</Label>
            <Input placeholder="Company name"
             value={form.companyName} 
             onChange={(e) =>{
              const value = e.target.value.replace(/[^a-zA-Z0-9\s.,&()'-]/g, "");
              const maxLength = 100; 
              let safeValue = value.slice(0, maxLength);
              update("companyName", safeValue)}}
             className="bg-surface border-border text-foreground" />
             {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
             {errors.companyName}
            </p>)}
          </div>
          <div>
            <Label className="text-foreground text-sm font-bold mb-1.5 block">Who will be the primary administrator for this account?</Label>
            <Input placeholder="Username" 
            value={form.username} 
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z_]/g, "");
              const maxLength = 50;
              let safeValue = value.slice(0, maxLength);
              update("username", safeValue)}}
            className="bg-surface border-border text-foreground" />
            {errors.username && (
            <p className="text-red-500 text-sm mt-1">
             {errors.username}
            </p>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Business email</Label>
              <Input type="email" placeholder="email@company.com" value={form.emailId} onChange={(e) => update("emailId", e.target.value)} className="bg-surface border-border text-foreground" />
              {errors.emailId && (
               <p className="text-red-500 text-sm mt-1">
               {errors.emailId}
               </p>)}
            </div>
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Mobile number</Label>
              <Input placeholder="+91 98765 43210" 
              value={form.mobileNumber} 
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); 
                update("mobileNumber", value)}}
              className="bg-surface border-border text-foreground" />
               {errors.mobileNumber && (
               <p className="text-red-500 text-sm mt-1">
               {errors.mobileNumber}
               </p>)}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Registration number</Label>
              <Input placeholder="Enter CIN/Registration number" 
              value={form.registrationNumber} 
              onChange={(e) => {
                const value = e.target.value
                .replace(/[^A-Za-z0-9]/g, "")
                .toUpperCase()
                .slice(0, 21)
                update("registrationNumber", value)}}
              className="bg-surface border-border text-foreground" />
              {errors.registrationNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.registrationNumber}
                </p>
              )}
            </div>
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
              {errors.developerType && (
               <p className="text-red-500 text-sm mt-1">
               {errors.developerType}
               </p>)}
            </div>
            
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Completed projects/units</Label>
              <Select value={form.projects} onValueChange={(v) => update("projects", v)}>
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
            </div> */}
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Years in business</Label>
              <Select value={form.experience} onValueChange={(v) => update("experience", v)}>
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
               {errors.experience && (
               <p className="text-red-500 text-sm mt-1">
               {errors.experience}
               </p>)}
            </div>
            <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Completed projects/units</Label>
              <Input placeholder="Enter approximate number" 
              value={form.projects} 
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                const maxLength = 10; // adjust as needed
                let safeValue = value.slice(0, maxLength);
                update("projects",safeValue)}}
              className="bg-surface border-border text-foreground" />
              {errors.projects && (
               <p className="text-red-500 text-sm mt-1">
               {errors.projects}
               </p>)}
            </div>
            
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1">
          <div>
              <Label className="text-foreground text-sm font-bold mb-1.5 block">Geographic focus</Label>
              <Input placeholder="e.g., Mumbai Delhi NCR"
               value={form.regions} 
               onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s-]/g, "");
                update("regions", value)}}
               className="bg-surface border-border text-foreground" />
                {errors.regions && (
               <p className="text-red-500 text-sm mt-1">
               {errors.regions}
               </p>)}
            </div>
          </div>
          <Btn disabled={isLoading} className="w-full justify-center py-3 text-base mt-2">
            {isLoading ? (
            <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
            </span>
            ) : (
              "Submit Application"
            )}
          </Btn>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperOnboardingDialog;
