import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PlanVisitCardSection } from "../../components/PlanVisitCardSection";
import { ScrollReveal } from "../../components/ScrollReveal";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-[#F8F8F8]">
        <ContactContent />
        <PlanVisitCardSection />
      </main>
      <Footer />
    </>
  );
}

function ContactContent() {
  const t = useTranslations("ContactPage");
  const tLoc = useTranslations("ContactLocation");

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="py-20 sm:py-28 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
              Get In Touch
            </div>

            <div className="max-w-3xl">
              <h1 className="text-display text-[#121212] mb-4 leading-tight">
                {t("title")}
              </h1>
              <p className="text-subheading text-[#525252] leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Form & Location Details Grid */}
      <section className="pb-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Card */}
          <ScrollReveal className="lg:col-span-7">
            <div className="rounded-lg bg-white border border-black/10 p-8 sm:p-10 shadow-sm">
              <h2 className="text-h2 text-[#121212] mb-6">{t("formTitle")}</h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                    {t("nameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-accent font-body bg-[#F8F8F8] text-[#121212]"
                    placeholder="Your Full Name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                      {t("emailLabel")}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-accent font-body bg-[#F8F8F8] text-[#121212]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-accent font-body bg-[#F8F8F8] text-[#121212]"
                      placeholder="+39 388 362 9233"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-accent font-body bg-[#F8F8F8] text-[#121212]"
                    placeholder="Write your message or prayer request..."
                  />
                </div>

                <button type="submit" className="px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-accent-light transition-all w-full sm:w-auto">
                  {t("submitButton")} →
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Right Location & Details Card */}
          <ScrollReveal delay={0.2} className="lg:col-span-5 space-y-8">
            <div className="rounded-lg bg-[#121212] text-white p-8 sm:p-10 border border-white/10 shadow-md space-y-6">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-white bg-eyebrow-gradient px-3.5 py-1 rounded-md inline-block shadow-sm">
                Contact Information
              </span>
              <h3 className="text-h2 text-white">{tLoc("title")}</h3>
              
              <div className="space-y-4 text-body text-white/80">
                <div>
                  <strong className="text-white block font-heading text-xs uppercase tracking-wider mb-1">{tLoc("addressTitle")}</strong>
                  <p className="text-sm leading-relaxed">{tLoc("addressText")}</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <strong className="text-white block font-heading text-xs uppercase tracking-wider mb-1">{tLoc("phoneTitle")}</strong>
                  <p className="text-sm">{tLoc("phoneText")}</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <strong className="text-white block font-heading text-xs uppercase tracking-wider mb-1">{tLoc("emailTitle")}</strong>
                  <p className="text-sm">{tLoc("emailText")}</p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="rounded-lg bg-white border border-black/10 p-8 text-center shadow-sm">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-white bg-eyebrow-gradient px-3.5 py-1 rounded-md inline-block mb-3 shadow-sm">
                Church Location
              </span>
              <h4 className="font-heading font-bold text-[#121212] text-lg">Via Cadamure 1/19</h4>
              <p className="text-[#525252] text-sm mt-1">31045 Motta di Livenza (TV), Italy</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
