
"use client";

import { useState } from "react";

type Answers = {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  businessType: string;
  challenge: string[];
  otherChallenge: string;
  products: string[];
  otherProducts: string;
  printMethods: string[];
  printMethodOther: string;
  customerTypes: string[];
  features: string[];
  otherFeature: string;
  orderChannels: string[];
  currentOrderProcess: string;
  paymentPreference: string;
  deliveryOptions: string[];
  budget: string;
  budgetGuidance: string;
  timeline: string;
  extra: string;
};

const initial: Answers = {
  contactName: "",
  businessName: "",
  email: "",
  phone: "",
  location: "",
  businessType: "",
  challenge: [],
  otherChallenge: "",
  products: [],
  otherProducts: "",
  printMethods: [],
  printMethodOther: "",
  customerTypes: [],
  features: [],
  otherFeature: "",
  orderChannels: [],
  currentOrderProcess: "",
  paymentPreference: "",
  deliveryOptions: [],
  budget: "",
  budgetGuidance: "",
  timeline: "",
  extra: ""
};

const navy = "#142B45";

const groups = [
  {
    key: "challenge",
    title: "What would you like to improve?",
    options: [
      "Keeping track of customer orders",
      "Receiving orders online",
      "Managing deadlines and production",
      "Reducing back-and-forth with customers",
      "Presenting products and designs professionally",
      "Managing payments and balances",
      "Reaching more customers"
    ]
  },
  {
    key: "products",
    title: "What products do you offer?",
    options: [
      "T-shirts",
      "Polo shirts",
      "Shirts",
      "Hoodies and sweatshirts",
      "Caps",
      "Mugs and cups",
      "Tote bags",
      "Other printable items"
    ]
  },
  {
    key: "printMethods",
    title: "Which printing or branding methods do you use?",
    options: [
      "DTF printing",
      "Screen printing",
      "Sublimation",
      "Heat transfer / vinyl",
      "Embroidery",
      "Not sure / multiple methods"
    ]
  },
  {
    key: "customerTypes",
    title: "Who do you mainly serve?",
    options: [
      "Individuals",
      "Businesses and corporate clients",
      "Churches and religious organizations",
      "Schools and universities",
      "Events and organizers",
      "Resellers / bulk buyers"
    ]
  },
  {
    key: "features",
    title: "Which features would be useful?",
    options: [
      "Browse products and prices",
      "Choose product colours and sizes",
      "Upload logos or artwork",
      "Add text and customize designs",
      "Preview a design on a product",
      "Choose print position (front, back, sleeve)",
      "Order in bulk with size breakdowns",
      "Request a quotation before ordering",
      "Pay online",
      "Track order progress",
      "Reorder previous designs"
    ]
  },
  {
    key: "orderChannels",
    title: "Where do orders currently come from?",
    options: [
      "WhatsApp",
      "Phone calls",
      "Walk-in customers",
      "Social media",
      "Referrals",
      "Existing website"
    ]
  },
  {
    key: "deliveryOptions",
    title: "How do customers receive their orders?",
    options: [
      "Collect from our location",
      "Local delivery",
      "Courier / nationwide delivery",
      "Dispatch rider",
      "Depends on the order"
    ]
  }
] as const;

const labels: Record<string, string> = {
  contactName: "Your name",
  businessName: "Business name",
  email: "Email address",
  phone: "Phone / WhatsApp number",
  location: "Business location",
  businessType: "What best describes your business?",
  otherChallenge: "Any other challenge?",
  otherProducts: "Other products (optional)",
  printMethodOther: "Other printing method (optional)",
  otherFeature: "Other feature (optional)",
  currentOrderProcess: "How do you currently record and follow up on orders?",
  paymentPreference: "How would you prefer customers to pay?",
  budget: "What budget amount have you set aside for this project?",
  timeline: "When would you ideally like the platform ready?",
  extra: "Anything else we should know?"
};

function Field({
  label,
  children,
  required = false
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && <i className="text-orange-500 not-italic"> *</i>}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder = "",
  type = "text"
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
    />
  );
}

function ChoiceGroup({
  title,
  options,
  selected,
  onToggle
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-800">
        {title}{" "}
        <span className="font-normal text-slate-400">
          (Select all that apply)
        </span>
      </h3>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(o => (
          <button
            type="button"
            key={o}
            onClick={() => onToggle(o)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
              selected.includes(o)
                ? "border-sky-700 bg-sky-50 text-sky-900"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                selected.includes(o)
                  ? "border-sky-700 bg-sky-700 text-white"
                  : "border-slate-300"
              }`}
            >
              {selected.includes(o) ? "✓" : ""}
            </span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const update = (k: keyof Answers, v: any) =>
    setA(p => ({ ...p, [k]: v }));

  const toggle = (k: keyof Answers, v: string) =>
    update(
      k,
      (a[k] as string[]).includes(v)
        ? (a[k] as string[]).filter(x => x !== v)
        : [...(a[k] as string[]), v]
    );

  const next = () => {
    setError("");

    if (
      step === 0 &&
      (!a.contactName.trim() ||
        !a.businessName.trim() ||
        !a.phone.trim())
    ) {
      return setError(
        "Please complete your name, business name and phone number."
      );
    }

    if (
      step === 0 &&
      a.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)
    ) {
      return setError("Please enter a valid email address.");
    }

    setStep(s => Math.min(2, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setBusy(true);
    setError("");

    try {
      const r = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a)
      });

      const d = await r.json();

      if (!r.ok) {
        throw new Error(
          d.error || "Submission failed. Please try again."
        );
      }

      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong."
      );
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-xl rounded-3xl bg-white p-9 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-700">
            ✓
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-sky-700">
            Submission received
          </p>

          <h1
            className="mb-3 text-3xl font-bold"
            style={{ color: navy }}
          >
            Thank you, {a.contactName}.
          </h1>

          <p className="leading-7 text-slate-600">
            Your information has been sent to Illuminate Technologies.
            We’ll review your requirements and get in touch to discuss
            the next steps.
          </p>

          <p className="mt-7 text-sm font-semibold text-slate-500">
            ILLUMINATE TECHNOLOGIES
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">

        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div
              className="text-lg font-black tracking-[.12em]"
              style={{ color: navy }}
            >
              ILLUMINATE<span className="text-sky-700">.</span>
            </div>
            <div className="text-[10px] font-semibold tracking-[.24em] text-slate-500">
              TECHNOLOGIES
            </div>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500">
            CLIENT DISCOVERY
          </span>
        </header>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

          <div
            className="px-6 py-8 sm:px-10 sm:py-10"
            style={{ background: navy }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-orange-300">
              Let’s build something that works
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tell us about your business.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              A few details will help us understand your operations,
              challenges and the digital platform you need. It should
              take about 5 minutes.
            </p>
          </div>

          <div className="px-6 pt-7 sm:px-10">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>STEP {step + 1} OF 3</span>
              <span>{Math.round(((step + 1) / 3) * 100)}% complete</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-700 transition-all"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-7 px-6 py-8 sm:px-10">

            {step === 0 && (
              <>
                <div>
                  <h2
                    className="mb-1 text-xl font-bold"
                    style={{ color: navy }}
                  >
                    01. Business information
                  </h2>
                  <p className="text-sm text-slate-500">
                    First, tell us who we’ll be working with.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={labels.contactName} required>
                    <TextInput
                      value={a.contactName}
                      onChange={v => update("contactName", v)}
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field label={labels.businessName} required>
                    <TextInput
                      value={a.businessName}
                      onChange={v => update("businessName", v)}
                      placeholder="Business or brand name"
                    />
                  </Field>

                  <Field label={labels.phone} required>
                    <TextInput
                      value={a.phone}
                      onChange={v => update("phone", v)}
                      placeholder="e.g. 024 000 0000"
                    />
                  </Field>

                  <Field label={labels.email}>
                    <TextInput
                      type="email"
                      value={a.email}
                      onChange={v => update("email", v)}
                      placeholder="name@example.com"
                    />
                  </Field>

                  <Field label={labels.location}>
                    <TextInput
                      value={a.location}
                      onChange={v => update("location", v)}
                      placeholder="Town / city"
                    />
                  </Field>

                  <Field label={labels.businessType}>
                    <select
                      value={a.businessType}
                      onChange={e => update("businessType", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    >
                      <option value="">Select business type</option>
                      {[
                        "Apparel printing and branding",
                        "Custom merchandise",
                        "Garment manufacturing",
                        "Printing and promotional products",
                        "Other"
                      ].map(x => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <ChoiceGroup
                  title={groups[0].title}
                  options={groups[0].options}
                  selected={a.challenge}
                  onToggle={v => toggle("challenge", v)}
                />

                <Field label={labels.otherChallenge}>
                  <TextInput
                    value={a.otherChallenge}
                    onChange={v => update("otherChallenge", v)}
                    placeholder="Tell us briefly (optional)"
                  />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2
                    className="mb-1 text-xl font-bold"
                    style={{ color: navy }}
                  >
                    02. Products and platform features
                  </h2>
                  <p className="text-sm text-slate-500">
                    Help us understand what customers should be able to do.
                  </p>
                </div>

                <ChoiceGroup
                  title={groups[1].title}
                  options={groups[1].options}
                  selected={a.products}
                  onToggle={v => toggle("products", v)}
                />

                <Field label={labels.otherProducts}>
                  <TextInput
                    value={a.otherProducts}
                    onChange={v => update("otherProducts", v)}
                    placeholder="List any other products"
                  />
                </Field>

                <ChoiceGroup
                  title={groups[2].title}
                  options={groups[2].options}
                  selected={a.printMethods}
                  onToggle={v => toggle("printMethods", v)}
                />

                <Field label={labels.printMethodOther}>
                  <TextInput
                    value={a.printMethodOther}
                    onChange={v => update("printMethodOther", v)}
                    placeholder="Specify if applicable"
                  />
                </Field>

                <ChoiceGroup
                  title={groups[3].title}
                  options={groups[3].options}
                  selected={a.customerTypes}
                  onToggle={v => toggle("customerTypes", v)}
                />

                <ChoiceGroup
                  title={groups[4].title}
                  options={groups[4].options}
                  selected={a.features}
                  onToggle={v => toggle("features", v)}
                />

                <Field label={labels.otherFeature}>
                  <TextInput
                    value={a.otherFeature}
                    onChange={v => update("otherFeature", v)}
                    placeholder="Any other feature you have in mind?"
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2
                    className="mb-1 text-xl font-bold"
                    style={{ color: navy }}
                  >
                    03. Orders, budget and timeline
                  </h2>
                  <p className="text-sm text-slate-500">
                    A little about how your business operates today.
                  </p>
                </div>

                <ChoiceGroup
                  title={groups[5].title}
                  options={groups[5].options}
                  selected={a.orderChannels}
                  onToggle={v => toggle("orderChannels", v)}
                />

                <Field label={labels.currentOrderProcess}>
                  <textarea
                    value={a.currentOrderProcess}
                    onChange={e => update("currentOrderProcess", e.target.value)}
                    rows={3}
                    placeholder="For example, WhatsApp messages, notebooks, spreadsheets..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                  />
                </Field>

                <Field label={labels.paymentPreference}>
                  <select
                    value={a.paymentPreference}
                    onChange={e => update("paymentPreference", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">Select preference</option>
                    {[
                      "Customers pay in full online",
                      "Customers pay a deposit online",
                      "Customers request a quote first",
                      "A combination depending on the order",
                      "Not sure yet"
                    ].map(x => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>

                <ChoiceGroup
                  title={groups[6].title}
                  options={groups[6].options}
                  selected={a.deliveryOptions}
                  onToggle={v => toggle("deliveryOptions", v)}
                />

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <Field label={labels.budget}>
                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-sky-600 focus-within:ring-4 focus-within:ring-sky-100">
                        <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
                          GHS
                        </span>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={a.budget}
                          onChange={e => {
                            update("budget", e.target.value);
                            if (e.target.value.trim()) {
                              update("budgetGuidance", "");
                            }
                          }}
                          placeholder="Enter your budget amount"
                          className="w-full min-w-0 px-4 py-3 text-sm outline-none"
                        />
                      </div>
                    </Field>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      An approximate amount is fine. You can enter your
                      estimated budget in Ghana cedis.
                    </p>
                  </div>

                  <Field label={labels.timeline}>
                    <select
                      value={a.timeline}
                      onChange={e => update("timeline", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    >
                      <option value="">Select a timeline</option>
                      {[
                        "As soon as possible",
                        "Within 2-4 weeks",
                        "Within 1-2 months",
                        "Within 3 months",
                        "Flexible"
                      ].map(x => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </Field>

                </div>

                {!a.budget.trim() && (
                  <Field label="Would you prefer us to recommend a suitable solution based on your requirements and provide a quotation?">
                    <select
                      value={a.budgetGuidance}
                      onChange={e => update("budgetGuidance", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                    >
                      <option value="">Select your preference</option>
                      <option value="Yes, please recommend a suitable solution and provide a quotation">
                        Yes, please recommend a suitable solution and provide a quotation
                      </option>
                      <option value="No, I would prefer to discuss this during consultation">
                        No, I would prefer to discuss this during consultation
                      </option>
                    </select>
                  </Field>
                )}

                <Field label={labels.extra}>
                  <textarea
                    value={a.extra}
                    onChange={e => update("extra", e.target.value)}
                    rows={3}
                    placeholder="Share any ideas, requirements or questions..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                  />
                </Field>
              </>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep(s => Math.max(0, s - 1));
                }}
                disabled={step === 0 || busy}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 disabled:opacity-30"
              >
                Back
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ background: navy }}
                >
                  Continue <span className="ml-2">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={submit}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
                  style={{ background: navy }}
                >
                  {busy ? "Submitting..." : "Submit requirements"}
                </button>
              )}
            </div>

            <p className="text-center text-xs leading-5 text-slate-400">
              Your information will only be used by Illuminate Technologies
              to assess and discuss your project requirements.
            </p>

          </div>
        </section>

        <footer className="py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Illuminate Technologies. All rights reserved.
        </footer>

      </div>
    </main>
  );
}
