import { Helmet } from "@dr.pogodin/react-helmet";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Plane,
  Users,
} from "lucide-react";
import EnquiryForm from "../components/EnquiryForm";

const siteUrl = "https://westerncarsadur.co.uk";
const partnerTypes = [
  {
    icon: Building2,
    title: "Hotels & guest houses",
    text: "Give guests dependable airport transfers and local taxi services.",
  },
  {
    icon: Plane,
    title: "Travel & visitor services",
    text: "Help visitors reach your destination with clear, reliable transport.",
  },
  {
    icon: CalendarDays,
    title: "Wedding & event venues",
    text: "Arrange guest transport for celebrations, conferences and special occasions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Corporate businesses",
    text: "Set up an account for staff travel, clients and regular business journeys.",
  },
];
const benefits = [
  "Local Adur operator available 24/7",
  "Gatwick, Heathrow and major UK airport transfers",
  "Local and long-distance journeys",
  "Dedicated contact for partner arrangements",
  "Group vehicles subject to availability",
  "Clear booking instructions for your team",
];

export default function BusinessPartnersPage() {
  return (
    <>
      <Helmet>
        <title>Grow With Us | Western Cars Adur Business Partnerships</title>
        <meta
          name="description"
          content="Partner with Western Cars Adur to give your customers, guests and visitors reliable local transport and airport transfers."
        />
        <link rel="canonical" href={`${siteUrl}/business-partners`} />
      </Helmet>
      <main>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-widest text-primary-foreground/70 mb-4">
              Grow With Us
            </p>
            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
              Better journeys. Stronger partnerships.
            </h1>
            <p className="mt-6 text-lg max-w-2xl text-primary-foreground/85">
              Connect your customers, guests and visitors with reliable local
              transport from Western Cars Adur.
            </p>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 mt-8 rounded bg-white px-6 py-3 text-primary font-semibold"
            >
              Become a partner <ArrowRight size={17} />
            </a>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm uppercase tracking-widest text-primary mb-2">
                  Who we work with
                </p>
                <h2 className="text-3xl font-bold">
                  Transport that supports your business
                </h2>
              </div>
              <div className="flex items-center gap-4 border border-border rounded-lg p-4 bg-white">
                <span className="text-xs text-muted-foreground">
                  Trusted transport network partner
                </span>
                <a
                  href="https://www.cmacgroup.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn.cmacgroup.com/logo2.svg"
                    alt="CMAC Group"
                    className="h-10 w-auto bg-[#003B5C] p-2 rounded"
                  />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partnerTypes.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="border border-border rounded-lg p-6"
                >
                  <Icon className="text-primary mb-5" size={28} />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-muted py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary mb-2">
                Why Western Cars Adur?
              </p>
              <h2 className="text-3xl font-bold mb-6">
                A partnership that works for both businesses
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We discuss each partnership individually, from referral links
                and booking instructions to corporate accounts and agreed
                commercial arrangements.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm">
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-7">
              <h2 className="text-2xl font-bold mb-6">How it works</h2>
              {[
                "Tell us about your organisation",
                "Discuss your transport requirements",
                "Agree the partnership arrangements",
                "Start referring your customers",
              ].map((step, index) => (
                <div key={step} className="flex gap-4 mb-5 last:mb-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="pt-1 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="enquiry" className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <Users className="mx-auto text-primary mb-3" />
              <h2 className="text-3xl font-bold">Let's work together</h2>
              <p className="mt-3 text-muted-foreground">
                Tell us how Western Cars Adur can support your customers.
              </p>
            </div>
            <EnquiryForm partnership />
          </div>
        </section>
      </main>
    </>
  );
}
