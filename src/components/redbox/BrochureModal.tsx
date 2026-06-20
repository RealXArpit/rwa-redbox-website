import React, { useRef, useState } from "react";
import { useBrochureFlow, type PropertyFields } from "./useBrochureFlow";
import "./brochure-modal.css";

interface Props {
  onClose: () => void;
}

const steps = [
  { key: "upload", label: "Upload" },
  { key: "extracting", label: "AI" },
  { key: "psf_prompt", label: "Pricing" },
  { key: "preview", label: "Preview" },
  { key: "user_details", label: "You" },
  { key: "done", label: "Done" },
];
const stepOrder = steps.map((s) => s.key);

function StepBar({ step }: { step: string }) {
  const current = stepOrder.indexOf(step);
  return (
    <div className="rb-stepbar">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <div
            className={`rb-step-item ${i < current ? "done" : ""} ${i === current ? "active" : ""}`}
          >
            <div className="rb-step-dot">{i < current ? "✓" : i + 1}</div>
            <div className="rb-step-label">{s.label}</div>
          </div>
          {i < steps.length - 1 && <div className="rb-step-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export function BrochureModal({ onClose }: Props) {
  const {
    state,
    submitFile,
    confirmPsf,
    confirmPreview,
    submitLead,
    set,
    reset,
  } = useBrochureFlow();

  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [psfInput, setPsfInput] = useState("");
  const [editFields, setEditFields] = useState<PropertyFields>(state.fields);
  const [newHighlight, setNewHighlight] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  React.useEffect(() => {
    setEditFields(state.fields);
  }, [state.fields]);

  function handleFile(file: File) {
    submitFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  function addHighlight() {
    if (!newHighlight.trim()) return;
    setEditFields((f) => ({
      ...f,
      highlights: [...f.highlights, newHighlight.trim()],
    }));
    setNewHighlight("");
  }

  function removeHighlight(i: number) {
    setEditFields((f) => ({
      ...f,
      highlights: f.highlights.filter((_, idx) => idx !== i),
    }));
  }

  const totalPrice =
    state.psfPrice && editFields.areaSqft
      ? state.psfPrice * editFields.areaSqft
      : null;

  return (
    <div
      className="rb-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rb-modal" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="rb-header">
          <div className="rb-brand">
            <span className="rb-dot" />
            <span className="rb-brand-name">REDBOX</span>
            <span className="rb-brand-by">by RealX</span>
          </div>
          <button className="rb-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <StepBar step={state.step} />

        {state.error && <div className="rb-error">{state.error}</div>}

        {/* UPLOAD */}
        {state.step === "upload" && (
          <div className="rb-body">
            <h2 className="rb-title">
              See how your property looks to investors
            </h2>
            <p className="rb-sub">
              Upload your brochure and our AI extracts all key details
              instantly.
            </p>
            <div
              className={`rb-dropzone ${dragOver ? "drag" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <span className="rb-upload-icon">⬆</span>
              <p className="rb-upload-title">
                Drop your brochure here, or click to browse
              </p>
              <p className="rb-upload-sub">PDF, JPG, PNG — up to 50 MB</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
          </div>
        )}

        {/* EXTRACTING */}
        {state.step === "extracting" && (
          <div className="rb-body rb-center">
            <div className="rb-spinner" />
            <p className="rb-loading-title">AI is reading your brochure…</p>
            <ul className="rb-loading-steps">
              <li>Reading document content</li>
              <li>Extracting property details</li>
              <li>Generating investment summary</li>
            </ul>
          </div>
        )}

        {/* PSF PROMPT */}
        {state.step === "psf_prompt" && (
          <div className="rb-body">
            <h2 className="rb-title">One thing we couldn't find</h2>
            <p className="rb-sub">
              We couldn't find a per square foot price in your brochure. Please
              enter it so we can calculate the total property value.
            </p>
            <div className="rb-field">
              <label>Price per square foot (₹)</label>
              <input
                type="number"
                placeholder="e.g. 8500"
                value={psfInput}
                onChange={(e) => setPsfInput(e.target.value)}
              />
            </div>
            <div className="rb-actions">
              <button
                className="rb-btn rb-btn-primary"
                disabled={!psfInput || Number(psfInput) <= 0}
                onClick={() => confirmPsf(Number(psfInput))}
              >
                Continue to preview →
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {state.step === "preview" && (
          <div className="rb-body">
            <div className="rb-info-banner">
              AI has pre-filled these fields. Edit anything before continuing.
            </div>
            <section className="rb-section">
              <p className="rb-section-label">Property details</p>
              <div className="rb-grid-2">
                <div className="rb-field">
                  <label>Property name</label>
                  <input
                    value={editFields.propertyName}
                    onChange={(e) =>
                      setEditFields((f) => ({
                        ...f,
                        propertyName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="rb-field">
                  <label>Unit number</label>
                  <input
                    value={editFields.unitNumber}
                    onChange={(e) =>
                      setEditFields((f) => ({
                        ...f,
                        unitNumber: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="rb-grid-2">
                <div className="rb-field">
                  <label>Area (sq ft)</label>
                  <input
                    type="number"
                    value={editFields.areaSqft ?? ""}
                    onChange={(e) =>
                      setEditFields((f) => ({
                        ...f,
                        areaSqft: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="rb-field">
                  <label>Per sq ft price (₹)</label>
                  <input
                    type="number"
                    value={state.psfPrice ?? ""}
                    onChange={(e) => set({ psfPrice: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="rb-field">
                <label>Address</label>
                <input
                  value={editFields.address}
                  onChange={(e) =>
                    setEditFields((f) => ({ ...f, address: e.target.value }))
                  }
                />
              </div>
              <div className="rb-field">
                <label>Property type</label>
                <select
                  value={editFields.propertyType}
                  onChange={(e) =>
                    setEditFields((f) => ({
                      ...f,
                      propertyType: e.target.value,
                    }))
                  }
                >
                  <option value="">Select…</option>
                  {[
                    "Warehouse",
                    "Flat / Apartment",
                    "Office Space",
                    "Shop / Showroom",
                    "Industrial",
                    "Other",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              {totalPrice && (
                <div className="rb-price-preview">
                  <span className="rb-price-label">Estimated total value</span>
                  <span className="rb-price-value">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="rb-price-calc">
                    ({(editFields.areaSqft ?? 0).toLocaleString()} sq ft × ₹
                    {(state.psfPrice ?? 0).toLocaleString("en-IN")})
                  </span>
                </div>
              )}
            </section>
            <section className="rb-section">
              <p className="rb-section-label">Description</p>
              <div className="rb-field">
                <textarea
                  rows={3}
                  value={editFields.description}
                  onChange={(e) =>
                    setEditFields((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </section>
            <section className="rb-section">
              <p className="rb-section-label">Highlights</p>
              <div className="rb-tags">
                {editFields.highlights.map((h, i) => (
                  <span key={i} className="rb-tag">
                    {h}
                    <button
                      className="rb-tag-remove"
                      onClick={() => removeHighlight(i)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="rb-add-tag">
                <input
                  placeholder="Add a highlight…"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addHighlight()}
                />
                <button className="rb-btn" onClick={addHighlight}>
                  + Add
                </button>
              </div>
            </section>
            <section className="rb-section">
              <p className="rb-section-label">Why invest?</p>
              <div className="rb-field">
                <textarea
                  rows={3}
                  value={editFields.whyInvest}
                  onChange={(e) =>
                    setEditFields((f) => ({ ...f, whyInvest: e.target.value }))
                  }
                />
              </div>
            </section>
            <div className="rb-actions">
              <button
                className="rb-btn"
                onClick={() => set({ step: "upload" })}
              >
                ← Back
              </button>
              <button
                className="rb-btn rb-btn-primary"
                onClick={() => confirmPreview(editFields)}
              >
                Generate my property page →
              </button>
            </div>
          </div>
        )}

        {/* USER DETAILS */}
        {state.step === "user_details" && (
          <div className="rb-body">
            <h2 className="rb-title">Before we give you the property page…</h2>
            <p className="rb-sub">Please tell us a little about you.</p>
            <div className="rb-field">
              <label>Your name</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="rb-field">
              <label>Phone number</label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="rb-actions">
              <button
                className="rb-btn"
                onClick={() => set({ step: "preview" })}
              >
                ← Back
              </button>
              <button
                className="rb-btn rb-btn-primary"
                disabled={
                  !userName.trim() || !userPhone.trim() || state.loading
                }
                onClick={() => submitLead(userName, userPhone)}
              >
                {state.loading ? "Saving…" : "View my property page →"}
              </button>
            </div>
          </div>
        )}

        {/* DONE */}
        {state.step === "done" && (
          <div className="rb-body">
            <div className="rb-success-banner">
              ✓ Property page ready. Our team will be in touch with{" "}
              {state.userName}.
            </div>
            <div className="rb-property-card">
              <div className="rb-property-header">
                <div className="rb-property-label">Redbox Listing Preview</div>
                <h3>{state.fields.propertyName || "Your Property"}</h3>
                <p>
                  {state.fields.propertyType} · {state.fields.address}
                </p>
              </div>
              <div className="rb-property-body">
                <p className="rb-property-desc">{state.fields.description}</p>
                <div className="rb-tags" style={{ marginBottom: "1rem" }}>
                  {state.fields.highlights.map((h, i) => (
                    <span key={i} className="rb-tag">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="rb-invest-box">
                  <p className="rb-invest-label">Why invest?</p>
                  <p className="rb-invest-text">{state.fields.whyInvest}</p>
                </div>
                <div className="rb-price-grid">
                  <div>
                    <p className="rb-stat-label">Per sq ft</p>
                    <p className="rb-stat-val">
                      ₹{(state.psfPrice ?? 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="rb-stat-label">Area</p>
                    <p className="rb-stat-val">
                      {(state.fields.areaSqft ?? 0).toLocaleString()} sq ft
                    </p>
                  </div>
                  <div>
                    <p className="rb-stat-label">Total value</p>
                    <p className="rb-stat-val rb-stat-highlight">
                      ₹{(state.totalPrice ?? 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rb-actions" style={{ marginTop: "1rem" }}>
              <button className="rb-btn" onClick={reset}>
                Upload another
              </button>
              <button className="rb-btn rb-btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
