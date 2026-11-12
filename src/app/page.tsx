                <Field label={operationsLabel}>
                  <textarea value={a.currentOrderProcess} onChange={(e) => update("currentOrderProcess", e.target.value)} rows={3} placeholder="Describe the steps you currently follow, the tools you use and any difficulties or delays you experience." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                </Field>

                <Field label="Do you currently use any software, website or digital tools to run the business?">
                  <textarea value={a.existingTools} onChange={(e) => update("existingTools", e.target.value)} rows={2} placeholder="Mention any apps, websites, spreadsheets or business systems you currently use. If none, you can say so." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                </Field>

                <Field label="How would you prefer to receive payments, if payments are part of the solution?">
                  <select value={a.paymentPreference} onChange={(e) => update("paymentPreference", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                    <option value="">Select preference</option>
                    {[
                      "Customers pay in full online",
                      "Customers pay a deposit online",
                      "Customers request a quote first",
                      "Mobile money or bank transfer outside the platform",
                      "A combination depending on the transaction",
                      "Not applicable",
                      "Not sure yet",
                    ].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </Field>

                <ChoiceGroup title="How do customers receive your products or services, where applicable?" options={deliveryOptions} selected={a.deliveryOptions} onToggle={(v) => toggle("deliveryOptions", v)} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Field label="What budget amount have you set aside for this project?">
                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-sky-600 focus-within:ring-4 focus-within:ring-sky-100">
                        <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">GHS</span>
                        <input type="number" min="0" step="1" value={a.budget} onChange={(e) => {
                          update("budget", e.target.value);
                          if (e.target.value.trim()) update("budgetGuidance", "");
                        }} placeholder="Enter your budget amount" className="w-full min-w-0 px-4 py-3 text-sm outline-none" />
                      </div>
                    </Field>
                    <p className="mt-2 text-xs leading-5 text-slate-500">An approximate amount is fine. You can enter your estimated budget in Ghana cedis.</p>
                  </div>
                  <Field label="When would you ideally like the solution ready?">
                    <select value={a.timeline} onChange={(e) => update("timeline", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <option value="">Select a timeline</option>
                      {[
                        "As soon as possible",
                        "Within 2-4 weeks",
                        "Within 1-2 months",
                        "Within 3 months",
                        "More than 3 months",
                        "Flexible",
                      ].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                </div>

                {!a.budget.trim() && (
                  <Field label="Would you prefer us to recommend a suitable solution based on your requirements and provide a quotation?">
                    <select value={a.budgetGuidance} onChange={(e) => update("budgetGuidance", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100">
                      <option value="">Select your preference</option>
                      <option value="Yes, please recommend a suitable solution and provide a quotation">Yes, please recommend a suitable solution and provide a quotation</option>
                      <option value="No, I would prefer to discuss this during consultation">No, I would prefer to discuss this during consultation</option>
                    </select>
                  </Field>
                )}

                <Field label="Anything else we should know?">
                  <textarea value={a.extra} onChange={(e) => update("extra", e.target.value)} rows={3} placeholder="Share any ideas, requirements or questions that will help us understand your project." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                </Field>
              </>
            )}

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <button type="button" onClick={() => {
                setError("");
                setStep((current) => Math.max(0, current - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }} disabled={step === 0 || busy} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 disabled:opacity-30">
                Back
              </button>
              {step < 2 ? (
                <button type="button" onClick={next} className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm" style={{ background: navy }}>
                  Continue <span className="ml-2">→</span>
                </button>
              ) : (
                <button type="button" disabled={busy} onClick={submit} className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-60" style={{ background: navy }}>
                  {busy ? "Submitting..." : "Submit requirements"}
                </button>
              )}
            </div>

            <p className="text-center text-xs leading-5 text-slate-400">
              Your information will only be used by Illuminate Technologies to assess and discuss your project requirements.
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
