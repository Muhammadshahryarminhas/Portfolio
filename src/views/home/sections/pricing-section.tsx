import { ArrowRight, Check, Gift, ShieldCheck } from "lucide-react";
import { BookCallButton } from "@/components/book-call-button";

const mvpFeatures = [
  "Complete high-fidelity UI/UX redesign in Figma",
  "Optimized core flows (Onboarding, Value Prop & Key Actions)",
  "Instant clarity - users understand your product in <30-60 seconds",
  "Professional dashboard & data visualization polish",
  "Scalable design system foundations (2x faster future iterations)",
  "Full dev-ready handover (clean files, specs & assets)",
];

const retainerFeatures = [
  "40 hours of dedicated design work",
  "Full feature design, flows & onboarding improvements",
  "Dashboard & product polish that actually moves metrics",
  "Design system maintenance & updates",
  "2 strategy calls + priority Slack support",
  "Fast priority turnaround (48-72 hours)",
];

const retainerInclusions = [
  "Unlimited revisions within monthly hours",
  "Weekly progress updates",
  "Up to 20% unused hours rollover",
  "Easy pause or cancel (30-days notice)",
];

const enterpriseBenefits = [
  "Dedicated full-time commitment",
  "Embedded in your team and culture",
  "Long-term product ownership and consistency",
  "Priority access to all design and strategy skills",
  "Seamless handoff and onboarding support",
  "Direct access via Slack & daily standups",
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#ecf7ff] px-4 py-14 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <h2 className="type-h2">
          Choose your path to a better product
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col justify-between rounded-[32px] bg-white p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[32px] font-semibold leading-none tracking-[-1px] text-black">
                    Launch-Ready MVP
                  </p>
                  <p className="type-caption text-[#666]">One-Time Fixed Price</p>
                  <p className="type-body">
                    Transform your rough MVP into a polished, launch-ready product users
                    instantly understand and investors take seriously in just 8 weeks.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <p className="text-[56px] font-semibold leading-none tracking-[-1px] text-black">
                      $1,499
                    </p>
                    <p className="type-caption text-[#666]">USD · FLAT</p>
                  </div>
                  <p className="type-caption-xs font-semibold uppercase tracking-[1px] text-[#1f85ff]">
                    0-8 WEEKS SPRINT
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="type-body font-semibold tracking-[1px] text-black">What You Get</p>
                  <div className="flex flex-col gap-3">
                    {mvpFeatures.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <ArrowRight className="size-[18px] shrink-0 text-[#1f85ff]" />
                        <p className="type-body flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="type-body font-semibold tracking-[1px] text-black">
                    Zero-Risk Guarantees
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-[14px] shrink-0 text-[#1f85ff]" />
                      <p className="type-body flex-1">
                        <span className="font-semibold text-black">On-Time Delivery:</span> 100%
                        refund if not delivered in 8 weeks
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-[14px] shrink-0 text-[#1f85ff]" />
                      <p className="type-body flex-1">
                        <span className="font-semibold text-black">Unlimited Revisions:</span>{" "}
                        Until you&apos;re 100% satisfied
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-[rgba(31,133,255,0.03)] p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center">
                    <Gift className="size-6 text-[#1f85ff]" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="type-body font-semibold tracking-[-1px] text-[#1f85ff]">
                      Free Bonus (Worth $997)
                    </p>
                    <p className="type-body text-black">
                      48-Hour Recorded UX Teardown + Prioritized Roadmap
                    </p>
                    <p className="type-caption">
                      (Fully deducted if you proceed with the revamp)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex pt-10">
                <BookCallButton variant="hero-dark" size="pill-lg" className="h-14 flex-1">
                  BOOK FREE 30-MIN STRATEGY CALL
                </BookCallButton>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between rounded-[32px] bg-white p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[32px] font-semibold leading-none tracking-[-1px] text-black">
                      Monthly Design Retainer
                    </p>
                    <div className="shrink-0 rounded-full border border-[#1f85ff] p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#1f85ff]">
                        Most Popular
                      </p>
                    </div>
                  </div>
                  <p className="type-caption text-[#666]">Your Dedicated Product Design Partner</p>
                  <p className="type-body">
                    Best for founders who want consistent design momentum without hiring a
                    full-time designer.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <p className="text-[56px] font-semibold leading-none tracking-[-1px] text-black">
                      $800
                    </p>
                    <p className="type-caption text-[#666]">USD · MONTH</p>
                  </div>
                  <p className="type-caption-xs font-semibold uppercase tracking-[1px] text-[#1f85ff]">
                    DEDICATED PRODUCT DESIGN PARTNER
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="type-body font-semibold tracking-[1px] text-black">
                    What You Get Every Month
                  </p>
                  <div className="flex flex-col gap-3">
                    {retainerFeatures.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <ArrowRight className="size-[18px] shrink-0 text-[#1f85ff]" />
                        <p className="type-body flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="type-body font-semibold tracking-[1px] text-black">All Inclusions</p>
                  <div className="flex flex-col gap-3">
                    {retainerInclusions.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <Check className="size-[14px] shrink-0 text-[#1f85ff]" />
                        <p className="type-body flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex pt-10">
                <BookCallButton variant="lime" size="pill-lg" className="h-14 flex-1">
                  BOOK FREE 30-MIN STRATEGY CALL
                </BookCallButton>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-20 rounded-[32px] border border-white/8 bg-[#121212] p-8 md:flex-row md:items-center">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[32px] font-semibold leading-none tracking-[-1px] text-white">
                  Full-Time Hire / Dedicated In-House Designer
                </p>
                <p className="type-body-lg text-[#a1a1a1]">
                  Direct integration into your product organization for long-term growth and
                  high-impact scaling.
                </p>
              </div>
              <div className="flex pt-3">
                <BookCallButton variant="lime" size="pill-lg" className="h-14 w-[320px] max-w-full">
                  SCHEDULE AN INTERVIEW
                </BookCallButton>
              </div>
            </div>

            <div className="flex w-full flex-col gap-5 rounded-3xl border border-white/8 bg-black p-8 md:w-[641px]">
              <p className="type-body font-semibold tracking-[1px] text-white">Enterprise Benefits</p>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {enterpriseBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <ArrowRight className="size-[18px] shrink-0 text-[#1f85ff]" />
                    <p className="type-body flex-1 text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
