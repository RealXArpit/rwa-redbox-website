import { useState } from "react";

export type Step =
  | "upload"
  | "extracting"
  | "psf_prompt"
  | "preview"
  | "user_details"
  | "done";

export interface PropertyFields {
  propertyName: string;
  unitNumber: string;
  areaSqft: number | null;
  address: string;
  propertyType: string;
  description: string;
  highlights: string[];
  whyInvest: string;
}

export interface FlowState {
  step: Step;
  file: File | null;
  submissionId: string | null;
  fields: PropertyFields;
  psfPrice: number | null;
  psfSource: "ai_extracted" | "user_provided" | null;
  totalPrice: number | null;
  userName: string;
  userPhone: string;
  error: string | null;
  loading: boolean;
}

const emptyFields: PropertyFields = {
  propertyName: "",
  unitNumber: "",
  areaSqft: null,
  address: "",
  propertyType: "",
  description: "",
  highlights: [],
  whyInvest: "",
};

const BACKEND_URL =
  "https://rwa-redbox-mockproperty-backend-production.up.railway.app";

export function useBrochureFlow() {
  const [state, setState] = useState<FlowState>({
    step: "upload",
    file: null,
    submissionId: null,
    fields: emptyFields,
    psfPrice: null,
    psfSource: null,
    totalPrice: null,
    userName: "",
    userPhone: "",
    error: null,
    loading: false,
  });

  function set(partial: Partial<FlowState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  async function submitFile(file: File) {
    set({ file, step: "extracting", error: null, loading: true });

    const form = new FormData();
    form.append("brochure", file);

    try {
      const res = await fetch(`${BACKEND_URL}/api/redbox/upload`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      const { submissionId, extraction } = data;

      const fields: PropertyFields = {
        propertyName: extraction.propertyName,
        unitNumber: extraction.unitNumber,
        areaSqft: extraction.areaSqft,
        address: extraction.address,
        propertyType: extraction.propertyType,
        description: extraction.description,
        highlights: extraction.highlights,
        whyInvest: extraction.whyInvest,
      };

      set({
        submissionId,
        fields,
        psfPrice: extraction.psfPrice,
        psfSource: extraction.psfMissing ? null : "ai_extracted",
        loading: false,
        step: extraction.psfMissing ? "psf_prompt" : "preview",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      set({ step: "upload", error: msg, loading: false });
    }
  }

  function confirmPsf(psf: number) {
    set({ psfPrice: psf, psfSource: "user_provided", step: "preview" });
  }

  function confirmPreview(updatedFields: PropertyFields) {
    set({ fields: updatedFields, step: "user_details" });
  }

  async function submitLead(name: string, phone: string) {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${BACKEND_URL}/api/redbox/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: state.submissionId,
          psfPrice: state.psfPrice,
          psfSource: state.psfSource,
          userName: name,
          userPhone: phone,
          fields: state.fields,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submit failed");

      set({
        totalPrice: data.totalPrice,
        userName: name,
        userPhone: phone,
        loading: false,
        step: "done",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      set({ loading: false, error: msg });
    }
  }

  function reset() {
    setState({
      step: "upload",
      file: null,
      submissionId: null,
      fields: emptyFields,
      psfPrice: null,
      psfSource: null,
      totalPrice: null,
      userName: "",
      userPhone: "",
      error: null,
      loading: false,
    });
  }

  return {
    state,
    submitFile,
    confirmPsf,
    confirmPreview,
    submitLead,
    set,
    reset,
  };
}
