import React, { useRef, useState } from "react";
import { useBrochureFlow, type PropertyFields } from "./useBrochureFlow";
import "./brochure-modal.css";

interface Props {
  onClose: () => void;
}

const FRAX_PER_SQFT = 144;

const DS = {
  pageBg: "#080B12",
  cardBg: "#111827",
  elevatedBg: "#151E2E",
  innerBg: "#0D1320",
  border: "#263244",
  textStrong: "#F8FAFC",
  textBody: "#CBD5E1",
  textMuted: "#94A3B8",
  textHelper: "#64748B",
  accent: "#3B82F6",
  accentHover: "#2563EB",
  successBg: "#1F3A2E",
  successText: "#BBF7D0",
  warnBg: "#3A2F16",
  warnText: "#FDE68A",
};

function chip(
  text: string,
  color = DS.accent,
  bg?: string,
): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: 500,
    background: bg ?? `${color}18`,
    color,
    border: `1px solid ${color}30`,
  };
}

const card: React.CSSProperties = {
  background: DS.cardBg,
  border: `1px solid ${DS.border}`,
  borderRadius: "16px",
  padding: "20px 24px",
  marginBottom: "20px",
};

const elevatedCard: React.CSSProperties = {
  background: DS.elevatedBg,
  border: `1px solid ${DS.border}`,
  borderRadius: "16px",
  padding: "20px 24px",
  marginBottom: "20px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  color: DS.textHelper,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "16px",
};

const metricLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 500,
  color: DS.textMuted,
  marginBottom: "6px",
};

const metricValue: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: DS.textStrong,
  lineHeight: 1.2,
};

const rowDivider: React.CSSProperties = {
  borderBottom: `1px solid ${DS.border}`,
  padding: "11px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
};

// ── Sub-components ───────────────────────────────────────────────────────────

function InfoTooltip({ tip }: { tip: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "help",
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{ fontSize: "12px", color: DS.textHelper, lineHeight: 1 }}>
        ⓘ
      </span>
      {show && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1E293B",
            color: DS.textBody,
            fontSize: "11px",
            padding: "6px 10px",
            borderRadius: "6px",
            border: `1px solid ${DS.border}`,
            whiteSpace: "normal",
            zIndex: 999,
            width: "200px",
            textAlign: "center",
            lineHeight: 1.5,
            pointerEvents: "none",
          }}
        >
          {tip}
        </span>
      )}
    </span>
  );
}

function MinInvestCalculator({
  pricePerFrax,
  totalFrax,
  totalPrice,
}: {
  pricePerFrax: number;
  totalFrax: number;
  totalPrice: number;
}) {
  const [minInvest, setMinInvest] = useState(100000);
  const capped = Math.min(minInvest, totalPrice);
  const fraxReceived = Math.floor(capped / pricePerFrax);
  const ownershipPct = (fraxReceived / totalFrax) * 100;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: DS.textMuted,
            flexShrink: 0,
          }}
        >
          ₹
        </span>
        <input
          type="number"
          value={minInvest}
          min={1}
          max={totalPrice}
          step={1000}
          onChange={(e) => setMinInvest(Number(e.target.value))}
          style={{
            flex: 1,
            padding: "9px 12px",
            borderRadius: "8px",
            border: `1px solid ${DS.border}`,
            background: DS.innerBg,
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "inherit",
            color: DS.textStrong,
            outline: "none",
          }}
        />
      </div>
      {minInvest > totalPrice && (
        <p
          style={{
            fontSize: "11px",
            color: "#EF4444",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Cannot exceed ₹{totalPrice.toLocaleString("en-IN")}
        </p>
      )}
      <div
        style={{
          background: DS.innerBg,
          borderRadius: "10px",
          padding: "14px",
          border: `1px solid ${DS.border}`,
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: DS.textMuted }}>
            FRAX received
          </span>
          <span
            style={{ fontSize: "18px", fontWeight: 700, color: DS.textStrong }}
          >
            {fraxReceived.toLocaleString("en-IN")} FRAX
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: DS.textMuted }}>
            Ownership share
          </span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: DS.accent }}>
            {ownershipPct.toFixed(4)}%
          </span>
        </div>
      </div>
      <p
        style={{
          fontSize: "12px",
          color: DS.textHelper,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Indicative calculation based on current price per FRAX of ₹
        {pricePerFrax.toFixed(2)}.
      </p>
    </>
  );
}

// ── Step bar (for modal steps 1–5) ───────────────────────────────────────────

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

// ── Main component ────────────────────────────────────────────────────────────

export function BrochureModal({ onClose }: Props) {
  const {
    state,
    submitFile,
    confirmPsf,
    confirmPreview,
    submitLead,
    requestOutreach,
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
  const [editedPhone, setEditedPhone] = useState(state.userPhone);
  const [outreachSent, setOutreachSent] = useState(false);
  const [phoneEditing, setPhoneEditing] = useState(false);

  React.useEffect(() => {
    setEditFields(state.fields);
  }, [state.fields]);
  React.useEffect(() => {
    setEditedPhone(state.userPhone);
  }, [state.userPhone]);

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

  // FRAX
  const area = state.fields.areaSqft ?? 0;
  const psf = state.psfPrice ?? 0;
  const totalFrax = area * FRAX_PER_SQFT;
  const pricePerFrax = psf > 0 ? psf / FRAX_PER_SQFT : 0;
  const finalTotalPrice = state.totalPrice ?? 0;
  const hasFrax = totalFrax > 0 && pricePerFrax > 0;

  // ── DONE — full-page property view ────────────────────────────────────────
  if (state.step === "done") {
    const initials = state.userName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const txRows = [
      ...(finalTotalPrice > 0
        ? [
            {
              label: "Sale price (base)",
              value: `₹${finalTotalPrice.toLocaleString("en-IN")}`,
              blue: false,
            },
          ]
        : []),
      ...(psf > 0
        ? [
            {
              label: "Per sq ft (saleable area)",
              value: `₹${psf.toLocaleString("en-IN")}`,
              blue: false,
            },
          ]
        : []),
      ...(hasFrax
        ? [
            {
              label: "Total FRAX in property",
              value: `${totalFrax.toLocaleString("en-IN")} FRAX`,
              blue: true,
              tip: "1 sq ft = 144 FRAX.",
            },
            {
              label: "Price per FRAX",
              value: `₹${pricePerFrax.toFixed(2)}`,
              blue: true,
              tip: "PSF ÷ 144.",
            },
          ]
        : []),
    ];

    const docs = [
      {
        name: "Property brochure",
        status: "Available",
        icon: "ti-file-description",
      },
      {
        name: "Title / legal documents",
        status: "Pending verification",
        icon: "ti-file-certificate",
      },
      {
        name: "Valuation note",
        status: "To be added",
        icon: "ti-report-money",
      },
      {
        name: "Risk disclosures",
        status: "To be added",
        icon: "ti-shield-check",
      },
    ];

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: DS.pageBg,
          zIndex: 1000,
          overflowY: "auto",
          fontFamily: "inherit",
          color: DS.textBody,
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            background: DS.cardBg,
            borderBottom: `1px solid ${DS.border}`,
            height: "52px",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
            }}
          >
            <span style={{ color: DS.textHelper }}>Properties</span>
            <span style={{ color: DS.textHelper }}>›</span>
            <span style={{ color: DS.textBody, fontWeight: 500 }}>
              {state.fields.propertyName || "Property Preview"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span
              style={{ ...chip(DS.successText, DS.successText, DS.successBg) }}
            >
              ✓ Saved to Redbox
            </span>
            <button
              onClick={reset}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: `1px solid ${DS.border}`,
                background: "transparent",
                fontSize: "13px",
                cursor: "pointer",
                color: DS.textMuted,
              }}
            >
              Upload another
            </button>
            <button
              onClick={onClose}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: `1px solid ${DS.border}`,
                background: DS.innerBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "15px",
                color: DS.textMuted,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Page body ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "28px 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* ══ LEFT ══ */}
          <div>
            {/* Hero */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              {/* Image placeholder */}
              <div
                style={{
                  background: DS.innerBg,
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: `1px solid ${DS.border}`,
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: DS.elevatedBg,
                    border: `1px solid ${DS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: DS.accent,
                    marginBottom: "10px",
                  }}
                >
                  {initials}
                </div>
                <p
                  style={{ fontSize: "12px", color: DS.textHelper, margin: 0 }}
                >
                  No property image uploaded
                </p>
              </div>

              {/* Hero info */}
              <div style={{ padding: "20px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "12px",
                  }}
                >
                  {state.fields.propertyType && (
                    <span style={chip(state.fields.propertyType, DS.accent)}>
                      {state.fields.propertyType}
                    </span>
                  )}
                  <span style={chip("✓ Redbox Preview", "#4ADE80")}>
                    ✓ Redbox Preview
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: DS.textStrong,
                    lineHeight: 1.2,
                    margin: "0 0 6px 0",
                  }}
                >
                  {state.fields.propertyName}
                  {state.fields.unitNumber
                    ? ` — ${state.fields.unitNumber}`
                    : ""}
                </h1>
                {state.fields.address && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: DS.textMuted,
                      margin: "0 0 14px 0",
                    }}
                  >
                    📍 {state.fields.address}
                  </p>
                )}
                {state.fields.description && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: DS.textBody,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {state.fields.description}
                  </p>
                )}
              </div>
            </div>

            {/* Key metrics strip */}
            {(area > 0 || psf > 0 || hasFrax || finalTotalPrice > 0) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {area > 0 && (
                  <div
                    style={{
                      background: DS.elevatedBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div style={metricLabel}>Total area</div>
                    <div style={metricValue}>
                      {area.toLocaleString("en-IN")}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: DS.textHelper,
                        marginTop: "2px",
                      }}
                    >
                      sq ft
                    </div>
                  </div>
                )}
                {finalTotalPrice > 0 && (
                  <div
                    style={{
                      background: DS.elevatedBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div style={metricLabel}>Estimated value</div>
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: DS.textStrong,
                        lineHeight: 1.2,
                      }}
                    >
                      ₹{finalTotalPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
                {psf > 0 && (
                  <div
                    style={{
                      background: DS.elevatedBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div style={metricLabel}>Per sq ft</div>
                    <div style={metricValue}>
                      ₹{psf.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
                {hasFrax && (
                  <div
                    style={{
                      background: DS.elevatedBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        ...metricLabel,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Total FRAX{" "}
                      <InfoTooltip tip="FRAX is the smallest unit of ownership. 1 sq ft = 144 FRAX." />
                    </div>
                    <div style={{ ...metricValue, color: DS.accent }}>
                      {totalFrax.toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
                {hasFrax && (
                  <div
                    style={{
                      background: DS.elevatedBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        ...metricLabel,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Price / FRAX{" "}
                      <InfoTooltip tip="PSF ÷ 144. Minimum unit price on RealX." />
                    </div>
                    <div style={{ ...metricValue, color: DS.accent }}>
                      ₹{pricePerFrax.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Property highlights */}
            {state.fields.highlights.length > 0 && (
              <div style={card}>
                <div style={sectionLabel}>★ Property highlights</div>
                {state.fields.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "10px 0",
                      borderBottom:
                        i < state.fields.highlights.length - 1
                          ? `1px solid ${DS.border}`
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
                        background: DS.innerBg,
                        border: `1px solid ${DS.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: DS.accent,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        color: DS.textBody,
                        lineHeight: 1.65,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Why invest */}
            {state.fields.whyInvest && (
              <div style={card}>
                <div style={sectionLabel}>↗ Why should I invest?</div>
                <p
                  style={{
                    fontSize: "14px",
                    color: DS.textBody,
                    lineHeight: 1.75,
                    margin: hasFrax ? "0 0 16px 0" : "0",
                  }}
                >
                  {state.fields.whyInvest}
                </p>
                {hasFrax && (
                  <div
                    style={{
                      background: DS.innerBg,
                      border: `1px solid ${DS.border}`,
                      borderRadius: "10px",
                      padding: "16px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          ...metricLabel,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Total FRAX{" "}
                        <InfoTooltip tip="Total FRAX = Area × 144. Represents all ownership units in this property." />
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: DS.accent,
                        }}
                      >
                        {totalFrax.toLocaleString("en-IN")}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: DS.textHelper,
                          marginTop: "2px",
                        }}
                      >
                        units in this property
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          ...metricLabel,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Price per FRAX{" "}
                        <InfoTooltip tip="Price per FRAX = PSF ÷ 144. The minimum unit investors buy." />
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: DS.accent,
                        }}
                      >
                        ₹{pricePerFrax.toFixed(2)}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: DS.textHelper,
                          marginTop: "2px",
                        }}
                      >
                        per FRAX unit
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Transaction details */}
            {finalTotalPrice > 0 && (
              <div style={card}>
                <div style={sectionLabel}>₹ Transaction details</div>
                {txRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      ...rowDivider,
                      borderBottom: `1px solid ${DS.border}`,
                    }}
                  >
                    <span
                      style={{
                        color: row.blue ? DS.accent : DS.textMuted,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {row.label}
                      {row.tip && <InfoTooltip tip={row.tip} />}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: row.blue ? DS.accent : DS.textBody,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    ...rowDivider,
                    borderBottom: "none",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: DS.textStrong,
                    }}
                  >
                    Total estimated value
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: DS.accent,
                    }}
                  >
                    ₹{finalTotalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            {/* Documents & due diligence */}
            <div style={card}>
              <div style={sectionLabel}>Documents &amp; due diligence</div>
              {docs.map((doc, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "11px 0",
                    borderBottom:
                      i < docs.length - 1 ? `1px solid ${DS.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: DS.innerBg,
                      border: `1px solid ${DS.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`ti ${doc.icon}`}
                      aria-hidden="true"
                      style={{ fontSize: "16px", color: DS.textMuted }}
                    ></i>
                  </div>
                  <span
                    style={{ fontSize: "14px", color: DS.textBody, flex: 1 }}
                  >
                    {doc.name}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      padding: "3px 9px",
                      borderRadius: "100px",
                      background:
                        doc.status === "Available" ? DS.successBg : DS.innerBg,
                      color:
                        doc.status === "Available"
                          ? DS.successText
                          : DS.textHelper,
                      border: `1px solid ${doc.status === "Available" ? "#4ADE8030" : DS.border}`,
                    }}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div style={{ position: "sticky", top: "68px" }}>
            {/* Price summary + CTA */}
            {finalTotalPrice > 0 && (
              <div style={elevatedCard}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={metricLabel}>Estimated total value</div>
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: 700,
                      color: DS.textStrong,
                      lineHeight: 1.2,
                    }}
                  >
                    ₹{finalTotalPrice.toLocaleString("en-IN")}
                  </div>
                  {psf > 0 && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: DS.textMuted,
                        marginTop: "4px",
                      }}
                    >
                      ₹{psf.toLocaleString("en-IN")} per sq ft
                    </div>
                  )}
                </div>
                {hasFrax && (
                  <div
                    style={{
                      background: DS.innerBg,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      marginBottom: "14px",
                      border: `1px solid ${DS.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        padding: "3px 0",
                        borderBottom: `1px solid ${DS.border}`,
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ color: DS.textMuted }}>Total FRAX</span>
                      <span style={{ color: DS.accent, fontWeight: 500 }}>
                        {totalFrax.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        padding: "3px 0",
                      }}
                    >
                      <span style={{ color: DS.textMuted }}>
                        Price per FRAX
                      </span>
                      <span style={{ color: DS.accent, fontWeight: 500 }}>
                        ₹{pricePerFrax.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    background: DS.accent,
                    color: "#fff",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = DS.accentHover)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = DS.accent)
                  }
                >
                  List on Redbox →
                </button>
              </div>
            )}

            {/* Investment simulator */}
            {hasFrax && (
              <div style={elevatedCard}>
                <div style={sectionLabel}>Minimum investment simulator</div>
                <p
                  style={{
                    fontSize: "13px",
                    color: DS.textMuted,
                    lineHeight: 1.5,
                    margin: "0 0 14px 0",
                  }}
                >
                  Your customers will invest a minimum of this amount. See how
                  many FRAX they receive.
                </p>
                <MinInvestCalculator
                  pricePerFrax={pricePerFrax}
                  totalFrax={totalFrax}
                  totalPrice={finalTotalPrice}
                />
              </div>
            )}

            {/* Submitted by + outreach */}
            <div style={elevatedCard}>
              <div style={sectionLabel}>Submitted by</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  background: DS.innerBg,
                  borderRadius: "10px",
                  border: `1px solid ${DS.border}`,
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: `${DS.accent}20`,
                    border: `1px solid ${DS.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: DS.accent,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: DS.textStrong,
                    }}
                  >
                    {state.userName}
                  </div>
                  {phoneEditing ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        marginTop: "4px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="tel"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: `1px solid ${DS.border}`,
                          background: DS.innerBg,
                          fontSize: "12px",
                          color: DS.textStrong,
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => setPhoneEditing(false)}
                        style={{
                          fontSize: "11px",
                          color: DS.textMuted,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: DS.textMuted }}>
                        {editedPhone}
                      </span>
                      <button
                        onClick={() => setPhoneEditing(true)}
                        style={{
                          fontSize: "11px",
                          color: DS.accent,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          textDecoration: "underline",
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <span
                  style={{
                    padding: "3px 8px",
                    background: DS.successBg,
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: DS.successText,
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ Saved
                </span>
              </div>

              <div
                style={{
                  borderTop: `1px solid ${DS.border}`,
                  paddingTop: "14px",
                }}
              >
                {outreachSent ? (
                  <div
                    style={{
                      background: DS.successBg,
                      borderRadius: "10px",
                      padding: "12px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>✓</span>
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: DS.successText,
                          margin: "0 0 2px 0",
                        }}
                      >
                        Request received!
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#86EFAC",
                          margin: 0,
                        }}
                      >
                        Our team will reach out to {editedPhone} shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: DS.textStrong,
                        margin: "0 0 4px 0",
                      }}
                    >
                      I want to list my property
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: DS.textMuted,
                        lineHeight: 1.5,
                        margin: "0 0 12px 0",
                      }}
                    >
                      Our team will call you to discuss listing this property on
                      the Redbox platform.
                    </p>
                    <button
                      onClick={async () => {
                        const success = await requestOutreach(editedPhone);
                        if (success) setOutreachSent(true);
                      }}
                      disabled={state.loading}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "10px",
                        background: "transparent",
                        border: `1px solid ${DS.accent}`,
                        color: DS.accent,
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity: state.loading ? 0.6 : 1,
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = `${DS.accent}15`;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {state.loading ? "Saving…" : "Reach out to me →"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Key highlights compact */}
            {state.fields.highlights.length > 0 && (
              <div style={elevatedCard}>
                <div style={sectionLabel}>Key highlights</div>
                {state.fields.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "7px 0",
                      borderBottom:
                        i < state.fields.highlights.length - 1
                          ? `1px solid ${DS.border}`
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "4px",
                        background: `${DS.accent}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: DS.accent,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: DS.textBody,
                        lineHeight: 1.5,
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Redbox footer */}
            <div style={{ textAlign: "center", padding: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: DS.accent,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: DS.accent,
                    letterSpacing: "0.08em",
                  }}
                >
                  REDBOX
                </span>
                <span style={{ fontSize: "12px", color: DS.textHelper }}>
                  by RealX
                </span>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: DS.textHelper,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Preview generated from your brochure. Data is indicative and
                subject to verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Steps 1–5: modal wrapper ───────────────────────────────────────────────
  return (
    <div
      className="rb-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rb-modal" role="dialog" aria-modal="true">
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
      </div>
    </div>
  );
}
