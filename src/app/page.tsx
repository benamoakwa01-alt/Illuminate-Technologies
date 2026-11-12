"use client";

import { useState } from "react";

type Answers = {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  businessType: string;
  businessDescription: string;
  businessGoals: string[];
  challenge: string[];
  otherChallenge: string;
  solutionTypes: string[];
  otherSolution: string;
  generalFeatures: string[];
  solutionSpecificNeeds: string[];
  solutionSpecificDetails: string;
  existingTools: string;
  products: string[];
  otherProducts: string;
  printMethods: string[];
  printMethodOther: string;
  customerTypes: string[];
  features: string[];
  otherFeature: string;
  industrySpecificNeeds: string[];
  industrySpecificDetails: string;
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
  businessDescription: "",
  businessGoals: [],
  challenge: [],
  otherChallenge: "",
  solutionTypes: [],
  otherSolution: "",
  generalFeatures: [],
  solutionSpecificNeeds: [],
  solutionSpecificDetails: "",
  existingTools: "",
  products: [],
  otherProducts: "",
  printMethods: [],
  printMethodOther: "",
  customerTypes: [],
  features: [],
  otherFeature: "",
  industrySpecificNeeds: [],
  industrySpecificDetails: "",
  orderChannels: [],
  currentOrderProcess: "",
  paymentPreference: "",
  deliveryOptions: [],
  budget: "",
  budgetGuidance: "",
  timeline: "",
  extra: "",
};

const navy = "#142B45";

const businessTypes = [
  "Apparel printing and branding",
  "Custom merchandise",
  "Garment manufacturing",
  "Printing and promotional products",
  "Retail and wholesale",
  "Food and beverage",
  "Restaurant, catering and hospitality",
  "Professional services and consulting",
  "Education and training",
  "Health and wellness",
  "Construction and real estate",
  "Transport and logistics",
  "Beauty and personal care",
  "Nonprofit or community organization",
  "Marketing and advertising agency",
  "Creative and design agency",
  "Digital agency / technology services",
  "Media and communications agency",
  "Events and entertainment",
  "Agriculture and agribusiness",
  "Other",
];

const businessGoals = [
  "Reach more customers and grow sales",
  "Establish a stronger online presence",
  "Make it easier for customers to buy or book",
  "Improve customer service and communication",
  "Organize business operations and records",
  "Reduce manual work through automation",
  "Track orders, tasks or projects more effectively",
  "Improve reporting and decision-making",
  "Launch a new product, service or business idea",
];

const challenges = [
  "Keeping track of customers and enquiries",
  "Receiving and managing orders or bookings",
  "Managing deadlines, tasks and daily operations",
  "Reducing repetitive manual work",
  "Managing payments, invoices and balances",
  "Presenting products or services professionally",
  "Reaching more customers and generating sales",
  "Keeping business information organized",
  "Following up with customers",
  "Getting useful reports about business performance",
];

const solutionTypes = [
  "Business website or landing page",
  "E-commerce or online ordering platform",
  "Business management system or dashboard",
  "Customer relationship management (CRM)",
  "Order, inventory or production management system",
  "Booking and appointment system",
  "Online payment or checkout integration",
  "Workflow automation and business process improvement",
  "Custom web application or portal",
  "Website redesign or improvement",
  "Not sure yet. I would like a recommendation",
  "Other digital solution",
];

const generalFeatures = [
  "Company information and service pages",
  "Product or service catalogue",
  "Online enquiries and quotation requests",
  "Online ordering and payments",
  "Customer accounts and order history",
  "Booking, scheduling or appointment management",
  "Customer records and follow-up reminders",
  "Staff accounts and role-based access",
  "Inventory, stock or resource tracking",
  "Invoices, receipts and payment records",
  "Reports and business analytics",
  "Automated email, SMS or WhatsApp notifications",
  "Admin dashboard to manage the platform",
];

const solutionFeatureSets: Record<string, string[]> = {
  "Business website or landing page": [
    "Mobile-friendly pages that explain the business and its services",
    "Contact forms and enquiry submissions",
    "Portfolio, testimonials or case studies",
    "Search engine visibility (SEO)",
    "WhatsApp or live chat contact",
    "News, articles or content management",
  ],
  "E-commerce or online ordering platform": [
    "Product or menu catalogue with images and prices",
    "Shopping cart and checkout",
    "Product options, variations or add-ons",
    "Order confirmation and status updates",
    "Customer accounts and order history",
    "Delivery fees, zones or collection scheduling",
  ],
  "Business management system or dashboard": [
    "Central dashboard showing business activity",
    "Staff accounts and permissions",
    "Task assignment and deadline tracking",
    "Records and document management",
    "Operational reports and summaries",
    "Multiple branches or departments",
  ],
  "Customer relationship management (CRM)": [
    "Central customer and contact records",
    "Lead and enquiry tracking",
    "Customer interaction history",
    "Follow-up reminders and task assignment",
    "Customer categories and segmentation",
    "Sales pipeline and conversion tracking",
  ],
  "Order, inventory or production management system": [
    "Order records and workflow stages",
    "Stock, inventory or material tracking",
    "Production or fulfilment scheduling",
    "Deadline alerts and overdue indicators",
    "Supplier and purchase records",
    "Order history and repeat orders",
  ],
  "Booking and appointment system": [
    "Service, session or appointment selection",
    "Staff, resource or room availability",
    "Calendar and schedule management",
    "Booking confirmation and reminders",
    "Rescheduling and cancellation management",
    "Deposits or payments when booking",
  ],
  "Online payment or checkout integration": [
    "Mobile Money payments",
    "Debit or credit card payments",
    "Full payment or deposit options",
    "Payment confirmation and receipts",
    "Outstanding balance tracking",
    "Refund or payment status records",
  ],
  "Workflow automation and business process improvement": [
    "Automatic notifications and reminders",
    "Approval and review workflows",
    "Automatic assignment of tasks or requests",
    "Data transfer between existing tools",
    "Scheduled reports and summaries",
    "Reduce repetitive data entry",
  ],
  "Custom web application or portal": [
    "Secure user login and role-based access",
    "Different dashboards for different user types",
    "File uploads and document sharing",
    "User-submitted forms and requests",
    "Activity history and status tracking",
    "Custom workflows based on our operations",
  ],
  "Website redesign or improvement": [
    "Improve the current website's appearance and usability",
    "Improve mobile experience and loading speed",
    "Update content, images or service information",
    "Improve enquiry or conversion flow",
    "Add new pages or functionality",
    "Improve search visibility and accessibility",
  ],
};

const customerTypes = [
  "Individuals / everyday consumers",
  "Businesses and corporate clients",
  "Churches and religious organizations",
  "Schools and universities",
  "Government and institutions",
  "Events and organizers",
  "Resellers / bulk buyers",
  "Other organizations",
];

const apparelProducts = [
  "T-shirts",
  "Polo shirts",
  "Shirts",
  "Hoodies and sweatshirts",
  "Caps",
  "Mugs and cups",
  "Tote bags",
  "Other printable items",
];

const printMethods = [
  "DTF printing",
  "Screen printing",
  "Sublimation",
  "Heat transfer / vinyl",
  "Embroidery",
  "Not sure / multiple methods",
];

const apparelFeatures = [
  "Choose product colours and sizes",
  "Upload logos or artwork",
  "Add text and customize designs",
  "Preview a design on a product",
  "Choose print position (front, back, sleeve)",
  "Order in bulk with size breakdowns",
  "Request a quotation before ordering",
  "Track order progress through production",
  "Reorder previous designs",
];

const industryQuestionSets: Record<
  string,
  { title: string; intro: string; options: string[]; detailsLabel: string; detailsPlaceholder: string }
> = {
  "Retail and wholesale": {
    title: "Retail and wholesale requirements",
    intro: "Tell us how you manage products, stock and sales across your channels.",
    options: [
      "Online product catalogue with prices and images",
      "Stock and inventory tracking",
      "Product sizes, colours or other variations",
      "Retail and wholesale pricing",
      "Bulk orders and minimum order quantities",
      "Customer accounts and order history",
      "Low-stock alerts and purchase records",
      "Multiple branches or sales locations",
    ],
    detailsLabel: "How do you currently manage products, stock and sales?",
    detailsPlaceholder: "For example, how many products you carry, how stock is recorded, and whether you sell retail, wholesale or both.",
  },
  "Food and beverage": {
    title: "Food and beverage requirements",
    intro: "Tell us how customers discover, order and receive your food or beverage products.",
    options: [
      "Digital menu or product catalogue",
      "Online ordering",
      "Scheduled or advance orders",
      "Pickup and collection time selection",
      "Delivery options and delivery zones",
      "Order status updates",
      "Product options, add-ons or custom requests",
      "Recurring orders or subscriptions",
      "Stock or ingredient tracking",
    ],
    detailsLabel: "How do customers currently place and receive orders?",
    detailsPlaceholder: "Tell us about your menu or product range, order process, delivery or collection arrangements, and busy periods.",
  },
  "Restaurant, catering and hospitality": {
    title: "Restaurant and hospitality requirements",
    intro: "Help us understand your menu, bookings and service operations.",
    options: [
      "Online menu with prices and photos",
      "Table reservations",
      "Online food ordering",
      "Takeaway and pickup scheduling",
      "Delivery management",
      "Catering or event enquiries",
      "Special requests and dietary notes",
      "Order tracking and kitchen notifications",
      "Customer loyalty or repeat-order features",
    ],
    detailsLabel: "How do you currently manage orders, reservations or catering enquiries?",
    detailsPlaceholder: "Describe your menu, reservation process, order channels, delivery arrangements or catering workflow.",
  },
  "Professional services and consulting": {
    title: "Professional services requirements",
    intro: "Tell us how clients discover your services, engage your team and receive support.",
    options: [
      "Professional service pages and service catalogue",
      "Client enquiry and consultation request forms",
      "Appointment scheduling and calendar management",
      "Staff or consultant availability",
      "Client profiles and interaction history",
      "Quotation, proposal or document requests",
      "Client portal for updates and shared documents",
      "Project or case progress tracking",
      "Follow-up reminders and automated communication",
      "Recurring service or retainer management",
    ],
    detailsLabel: "How do clients currently enquire, book or work with your team?",
    detailsPlaceholder: "Describe your services, consultation process, how you manage client information, appointments and ongoing work.",
  },
  "Education and training": {
    title: "Education and training requirements",
    intro: "Tell us how learners enrol, access learning and interact with your institution.",
    options: [
      "Course or programme catalogue",
      "Online applications and student registration",
      "Class or session scheduling",
      "Learning materials and video lessons",
      "Assignments, quizzes or assessments",
      "Student progress tracking",
      "Teacher, trainer or student accounts",
      "Course fees and online payments",
      "Certificates and completion records",
      "Announcements and learner communication",
    ],
    detailsLabel: "How do learners currently register and participate in your programmes?",
    detailsPlaceholder: "Tell us about your courses, class format, enrolment process, learning materials and how you track progress.",
  },
  "Health and wellness": {
    title: "Health and wellness requirements",
    intro: "Focus on service access and administration. Please do not include private patient or medical information here.",
    options: [
      "Service and practitioner profiles",
      "Appointment booking and rescheduling",
      "Practitioner availability and calendars",
      "Appointment reminders",
      "Client registration and non-sensitive intake forms",
      "Secure client communication",
      "Service packages or membership plans",
      "Online payments",
      "Appointment and service administration reports",
    ],
    detailsLabel: "How do clients currently find, book and access your services?",
    detailsPlaceholder: "Describe your services, booking process, team scheduling and administrative workflow. Do not include personal medical details.",
  },
  "Construction and real estate": {
    title: "Construction and real estate requirements",
    intro: "Tell us how you present properties or projects and manage enquiries and work.",
    options: [
      "Property or project listings with photos",
      "Property search and filtering",
      "Viewing or site-visit requests",
      "Customer and lead management",
      "Quotation or estimate requests",
      "Project milestones and progress tracking",
      "Document and file sharing",
      "Contractor or team task coordination",
      "Payment schedules and invoice records",
    ],
    detailsLabel: "How do you currently manage property enquiries, quotations or projects?",
    detailsPlaceholder: "Tell us whether you focus on sales, rentals, construction or project services, and how enquiries and work are followed up.",
  },
  "Transport and logistics": {
    title: "Transport and logistics requirements",
    intro: "Tell us how customers request services and how jobs or deliveries are coordinated.",
    options: [
      "Transport or service booking requests",
      "Shipment or delivery status tracking",
      "Dispatch and driver assignment",
      "Pickup and destination details",
      "Delivery confirmation or proof of delivery",
      "Customer notifications",
      "Fleet, vehicle or resource records",
      "Pricing estimates and quotations",
      "Job scheduling and operational reports",
    ],
    detailsLabel: "How do you currently receive, assign and track jobs or deliveries?",
    detailsPlaceholder: "Describe your service area, booking process, dispatch workflow and how customers receive updates.",
  },
  "Beauty and personal care": {
    title: "Beauty and personal care requirements",
    intro: "Tell us how customers discover services, book appointments and choose staff or packages.",
    options: [
      "Service menu and pricing",
      "Online appointment booking",
      "Staff or specialist selection",
      "Staff availability and calendars",
      "Deposits or online payments",
      "Appointment reminders",
      "Product catalogue and sales",
      "Customer profiles and visit history",
      "Packages, memberships or loyalty rewards",
    ],
    detailsLabel: "How do customers currently book and access your services?",
    detailsPlaceholder: "Describe your services, appointment process, staff scheduling and any products you also sell.",
  },
  "Nonprofit or community organization": {
    title: "Nonprofit and community organization requirements",
    intro: "Tell us how people learn about your work and participate in your programmes.",
    options: [
      "Organization information and programme pages",
      "Online donations or fundraising",
      "Volunteer registration and coordination",
      "Event registration",
      "Membership or beneficiary registration",
      "Campaign and announcement updates",
      "Resource or document library",
      "Impact reports and programme updates",
      "Sponsor or partner enquiries",
    ],
    detailsLabel: "How do people currently support or participate in your work?",
    detailsPlaceholder: "Describe your programmes, beneficiaries or members, events, fundraising and volunteer coordination.",
  },
};

const agencyQuestionSet = {
  title: "Agency and client-service requirements",
  intro: "Tell us how your agency attracts clients, manages projects and delivers work.",
  options: [
    "Service pages and portfolio or case studies",
    "Client enquiry and project brief forms",
    "Lead tracking and client relationship management",
    "Consultation or discovery call scheduling",
    "Project timelines, tasks and milestones",
    "Client review, feedback and approval workflows",
    "File sharing and deliverable handover",
    "Team collaboration and staff assignments",
    "Quotes, proposals and invoices",
    "Retainer, subscription or recurring client management",
    "Project status updates and client portal",
    "Performance reports and campaign analytics",
  ],
  detailsLabel: "How do you currently manage client enquiries and deliver projects?",
  detailsPlaceholder: "Describe your agency services, how clients brief you, how work is assigned, reviewed and delivered, and where delays or manual work occur.",
};

industryQuestionSets["Marketing and advertising agency"] = agencyQuestionSet;
industryQuestionSets["Creative and design agency"] = agencyQuestionSet;
industryQuestionSets["Digital agency / technology services"] = agencyQuestionSet;
industryQuestionSets["Media and communications agency"] = agencyQuestionSet;

const generalIndustryQuestions = {
  title: "Additional business requirements",
  intro: "Choose the capabilities that best describe what your business needs. You can explain anything not listed below.",
  options: [
    "Showcase products or services",
    "Receive and manage enquiries",
    "Accept orders, requests or bookings",
    "Manage customers, members or users",
    "Manage staff, tasks or internal processes",
    "Record payments, invoices or transactions",
    "Share information, files or updates",
    "Track progress and generate reports",
    "Automate reminders and routine communication",
  ],
  detailsLabel: "What specific process or activity should the solution support?",
  detailsPlaceholder: "Describe the work your business does and what you would like the digital solution to make easier.",
};

const orderChannels = [
  "WhatsApp",
  "Phone calls",
  "Walk-in customers",
  "Social media",
  "Referrals",
  "Existing website",
  "Email",
  "Other channels",
];

const deliveryOptions = [
  "Customer collects from our location",
  "Local delivery",
  "Courier / nationwide delivery",
  "Dispatch rider",
  "Digital delivery (online or by email)",
  "Not applicable",
  "Depends on the product or service",
];

function Field({
  label,
  children,
  required = false,
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
  type = "text",
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
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
    />
  );
}

function ChoiceGroup({
  title,
  options,
  selected,
  onToggle,
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
        <span className="font-normal text-slate-400">(Select all that apply)</span>
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onToggle(option)}
            aria-pressed={selected.includes(option)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
              selected.includes(option)
                ? "border-sky-700 bg-sky-50 text-sky-900"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                selected.includes(option)
                  ? "border-sky-700 bg-sky-700 text-white"
                  : "border-slate-300"
              }`}
            >
              {selected.includes(option) ? "✓" : ""}
            </span>
            {option}
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

  const update = (key: keyof Answers, value: string | string[]) => {
    setA((previous) => ({ ...previous, [key]: value } as Answers));
  };

  const changeBusinessType = (value: string) => {
    setA((previous) => ({
      ...previous,
      businessType: value,
      industrySpecificNeeds: [],
      industrySpecificDetails: "",
      products: [],
      otherProducts: "",
      printMethods: [],
      printMethodOther: "",
      features: [],
      otherFeature: "",
    }));
  };

  const toggle = (key: keyof Answers, value: string) => {
    const current = a[key] as string[];
    const nextValues = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    if (key === "solutionTypes") {
      const allowedNeeds = new Set(nextValues.flatMap((solution) => solutionFeatureSets[solution] || []));
      setA((previous) => ({
        ...previous,
        solutionTypes: nextValues,
        solutionSpecificNeeds: previous.solutionSpecificNeeds.filter((item) => allowedNeeds.has(item)),
      }));
      return;
    }

    update(key, nextValues);
  };

  const isApparelRelated =
    a.businessType === "Apparel printing and branding" ||
    a.businessType === "Custom merchandise" ||
    a.businessType === "Garment manufacturing" ||
    a.businessType === "Printing and promotional products";

  const industryQuestions = a.businessType
    ? industryQuestionSets[a.businessType] || (isApparelRelated ? null : generalIndustryQuestions)
    : null;

  const selectedSolutionNeeds = Array.from(new Set(a.solutionTypes.flatMap((solution) => solutionFeatureSets[solution] || [])));
  const hasSpecificSolution = a.solutionTypes.some((solution) => solutionFeatureSets[solution]);

  const operationsLabel = isApparelRelated
    ? "How do you currently receive, record and follow up on customer orders?"
    : a.businessType.includes("Restaurant") || a.businessType === "Food and beverage"
      ? "How do you currently manage customer orders, reservations or fulfilment?"
      : a.businessType.includes("agency") || a.businessType.includes("Agency")
        ? "How do you currently manage client enquiries, projects and deliverables?"
        : a.businessType === "Professional services and consulting"
          ? "How do you currently manage client enquiries, appointments and ongoing work?"
          : "How do you currently manage customers, requests, bookings or daily operations?";

  const next = () => {
    setError("");

    if (step === 0 && (!a.contactName.trim() || !a.businessName.trim() || !a.phone.trim() || !a.businessType.trim())) {
      setError("Please complete your name, business name, phone number and business type.");
      return;
    }

    if (step === 0 && a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStep((current) => Math.min(2, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
          <h1 className="mb-3 text-3xl font-bold" style={{ color: navy }}>
            Thank you, {a.contactName}.
          </h1>
          <p className="leading-7 text-slate-600">
            Your information has been sent to Illuminate Technologies. We’ll
            review your requirements and get in touch to discuss the next steps.
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
            <div className="text-lg font-black tracking-[.12em]" style={{ color: navy }}>
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
          <div className="px-6 py-8 sm:px-10 sm:py-10" style={{ background: navy }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-orange-300">
              Let’s build something that works
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tell us about your business.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Tell us about your goals, challenges and the digital solution you
              have in mind. If you are not sure what you need, we can help you
              identify a suitable approach. It should take about 5 to 7 minutes.
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
                  <h2 className="mb-1 text-xl font-bold" style={{ color: navy }}>
                    01. About your business
                  </h2>
                  <p className="text-sm text-slate-500">
                    Help us understand your business and what you want to achieve.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" required>
                    <TextInput value={a.contactName} onChange={(v) => update("contactName", v)} placeholder="Your full name" />
                  </Field>
                  <Field label="Business name" required>
                    <TextInput value={a.businessName} onChange={(v) => update("businessName", v)} placeholder="Business or brand name" />
                  </Field>
                  <Field label="Phone / WhatsApp number" required>
                    <TextInput value={a.phone} onChange={(v) => update("phone", v)} placeholder="e.g. 024 000 0000" />
                  </Field>
                  <Field label="Email address">
                    <TextInput type="email" value={a.email} onChange={(v) => update("email", v)} placeholder="name@example.com" />
                  </Field>
                  <Field label="Business location">
                    <TextInput value={a.location} onChange={(v) => update("location", v)} placeholder="Town / city" />
                  </Field>
                  <Field label="What best describes your business?" required>
                    <select value={a.businessType} onChange={(e) => changeBusinessType(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <option value="">Select your industry or business type</option>
                      {businessTypes.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Briefly describe what your business does">
                  <textarea value={a.businessDescription} onChange={(e) => update("businessDescription", e.target.value)} rows={3} placeholder="Tell us about your products, services and how your business operates." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                </Field>

                <ChoiceGroup title="What would you like your business to achieve?" options={businessGoals} selected={a.businessGoals} onToggle={(v) => toggle("businessGoals", v)} />

                <ChoiceGroup title="What challenges would you like to address?" options={challenges} selected={a.challenge} onToggle={(v) => toggle("challenge", v)} />
                <Field label="Any other challenge?">
                  <TextInput value={a.otherChallenge} onChange={(v) => update("otherChallenge", v)} placeholder="Tell us briefly (optional)" />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <h2 className="mb-1 text-xl font-bold" style={{ color: navy }}>
                    02. Your digital solution
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select the solution types and capabilities that would be useful. You can select more than one.
                  </p>
                </div>

                <ChoiceGroup title="What kind of digital solution are you interested in?" options={solutionTypes} selected={a.solutionTypes} onToggle={(v) => toggle("solutionTypes", v)} />
                <Field label="Other solution (if applicable)">
                  <TextInput value={a.otherSolution} onChange={(v) => update("otherSolution", v)} placeholder="Describe the solution you have in mind" />
                </Field>

                <ChoiceGroup title="Which features or capabilities would be useful across your business?" options={generalFeatures} selected={a.generalFeatures} onToggle={(v) => toggle("generalFeatures", v)} />

                {hasSpecificSolution && selectedSolutionNeeds.length > 0 && (
                  <div className="space-y-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-700">Based on your selected solution</p>
                      <h3 className="mt-1 text-base font-bold" style={{ color: navy }}>Which specific capabilities do you need?</h3>
                      <p className="mt-1 text-sm text-slate-600">These options change when you select or remove solution types above. Select all that apply.</p>
                    </div>
                    <ChoiceGroup title="Solution-specific requirements" options={selectedSolutionNeeds} selected={a.solutionSpecificNeeds} onToggle={(v) => toggle("solutionSpecificNeeds", v)} />
                    <Field label="Anything specific about how these features should work?">
                      <textarea value={a.solutionSpecificDetails} onChange={(e) => update("solutionSpecificDetails", e.target.value)} rows={3} placeholder="Describe any important workflows, rules, integrations or user experiences you have in mind." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                    </Field>
                  </div>
                )}

                <ChoiceGroup title="Who are your main customers or users?" options={customerTypes} selected={a.customerTypes} onToggle={(v) => toggle("customerTypes", v)} />

                {isApparelRelated && (
                  <div className="space-y-6 rounded-2xl border border-orange-200 bg-orange-50/50 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em] text-orange-700">Apparel and merchandise details</p>
                      <h3 className="mt-1 text-base font-bold" style={{ color: navy }}>Let’s understand your products and customization process.</h3>
                      <p className="mt-1 text-sm text-slate-600">These additional questions are shown because you selected an apparel, garment or printing-related business.</p>
                    </div>
                    <ChoiceGroup title="What products do you offer?" options={apparelProducts} selected={a.products} onToggle={(v) => toggle("products", v)} />
                    <Field label="Other products (optional)">
                      <TextInput value={a.otherProducts} onChange={(v) => update("otherProducts", v)} placeholder="List any other products" />
                    </Field>
                    <ChoiceGroup title="Which printing or branding methods do you use?" options={printMethods} selected={a.printMethods} onToggle={(v) => toggle("printMethods", v)} />
                    <Field label="Other printing method (optional)">
                      <TextInput value={a.printMethodOther} onChange={(v) => update("printMethodOther", v)} placeholder="Specify if applicable" />
                    </Field>
                    <ChoiceGroup title="Which customer-facing features would be useful?" options={apparelFeatures} selected={a.features} onToggle={(v) => toggle("features", v)} />
                    <Field label="Other apparel or customization feature (optional)">
                      <TextInput value={a.otherFeature} onChange={(v) => update("otherFeature", v)} placeholder="Any other feature you have in mind?" />
                    </Field>
                  </div>
                )}

                {industryQuestions && !isApparelRelated && (
                  <div className="space-y-6 rounded-2xl border border-sky-200 bg-sky-50/40 p-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em] text-sky-700">Industry-specific discovery</p>
                      <h3 className="mt-1 text-base font-bold" style={{ color: navy }}>{industryQuestions.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{industryQuestions.intro}</p>
                    </div>
                    <ChoiceGroup title="Which of these capabilities would be useful to your business?" options={industryQuestions.options} selected={a.industrySpecificNeeds} onToggle={(v) => toggle("industrySpecificNeeds", v)} />
                    <Field label={industryQuestions.detailsLabel}>
                      <textarea value={a.industrySpecificDetails} onChange={(e) => update("industrySpecificDetails", e.target.value)} rows={3} placeholder={industryQuestions.detailsPlaceholder} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
                    </Field>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="mb-1 text-xl font-bold" style={{ color: navy }}>
                    03. Current operations and project details
                  </h2>
                  <p className="text-sm text-slate-500">
                    Tell us how things work today and what you have in mind for the project.
                  </p>
                </div>

                <ChoiceGroup title="How do customers currently contact you or make enquiries?" options={orderChannels} selected={a.orderChannels} onToggle={(v) => toggle("orderChannels", v)} />

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
