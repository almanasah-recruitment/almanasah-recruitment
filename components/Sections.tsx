import Link from "next/link";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact, countries, faqs, features, services, steps, testimonials } from "@/lib/data";
import { Container, PrimaryButton, SectionHeading } from "@/components/ui";
import { MotionDiv, MotionSection, reveal } from "@/components/Motion";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";

const officeMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7418.073016431557!2d39.207418!3d21.623501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9dd42fa6edeb8d75!2z2KfZhNmF2YbYtdipINin2YTYsNmH2KjZitipINmE2YTYpdiz2KrZgtiv2KfZhQ!5e0!3m2!1sar!2sus!4v1656880675871!5m2!1sar!2sus";
const officeMapOpenUrl = "https://share.google/k5oktwqY9Y4l20ZM0";

function OfficeMapCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-soft">
      <iframe
        title="موقع شركة المنصة الذهبية على الخريطة"
        src={officeMapEmbedUrl}
        className={compact ? "h-72 w-full border-0" : "h-[28rem] w-full border-0"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <Link
        href={officeMapOpenUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/78 px-5 py-4 text-sm font-black text-ink-950 transition hover:bg-gold-200"
      >
        فتح الموقع في خرائط Google
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <MotionSection {...reveal} className="section-pad surface-light">
      <Container>
        <SectionHeading
          eyebrow="لماذا المنصة"
          title="تفاصيل صغيرة تصنع تجربة استقدام أكثر طمأنينة"
          body="نقدم خدمة هادئة ومنظمة، تجمع بين المتابعة الرقمية، الخبرة العملية، والوضوح في كل مرحلة."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div key={item.title} className="luxury-border rounded-[2rem] bg-white/[0.045] p-8 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
              <item.icon className="h-12 w-12 text-gold-200" />
              <h3 className="arabic-heading mt-7 max-w-sm text-xl font-black text-white md:text-2xl">{item.title}</h3>
              <p className="mt-5 text-lg leading-10 text-white/62">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  const supportWhatsAppUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("مرحبًا، أريد التواصل مع الدعم والمتابعة")}`;

  return (
    <MotionSection {...reveal} className={compact ? "py-10 surface-light" : "section-pad bg-ink-950"}>
      <Container>
        {!compact ? (
          <SectionHeading
            eyebrow="خدماتنا"
            title="حلول استقدام مصممة لاحتياج الأسرة"
            body="بطاقات خدمة واضحة تساعدك على اختيار المسار المناسب بسرعة."
          />
        ) : null}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const isSupportService = service.title === "الدعم والمتابعة";
            const href = isSupportService ? supportWhatsAppUrl : service.href;

            return (
            <Link
              key={service.title}
              href={href}
              target={isSupportService ? "_blank" : undefined}
              rel={isSupportService ? "noreferrer" : undefined}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold-200/35"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-200/12 text-gold-100 transition group-hover:bg-gold-200 group-hover:text-ink-950">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="arabic-heading mt-8 max-w-sm text-xl font-black text-white md:text-2xl">{service.title}</h3>
              <p className="mt-5 text-lg leading-10 text-white/62">{service.body}</p>
            </Link>
          )})}
        </div>
      </Container>
    </MotionSection>
  );
}

export function StepsTimeline() {
  return (
    <MotionSection {...reveal} className="section-pad bg-gradient-to-b from-ink-900 to-ink-850">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            align="start"
            eyebrow="رحلة الاستقدام"
            title="خطوات مختصرة ومتابعة واضحة"
            body="صممنا رحلة الطلب لتكون مفهومة، بلا ازدحام في التفاصيل، وبقرارات واضحة في الوقت المناسب."
          />
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-5 rounded-3xl border border-white/10 bg-ink-950/72 p-5">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold-200 text-ink-950">
                  <step.icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-sm font-black text-gold-100">0{index + 1}</span>
                  <h3 className="arabic-heading mt-2 text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 leading-9 text-white/62">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}

export function CountriesSection({ compact = false }: { compact?: boolean }) {
  const buildCountryWhatsAppUrl = (countryName: string) => {
    const message = `مرحبًا، أريد طلب استقدام\nالجنسية: ${countryName}`;
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <MotionSection {...reveal} className={compact ? "py-10 surface-light" : "section-pad surface-light"}>
      <Container>
        {!compact ? (
          <SectionHeading
            eyebrow="دول الاستقدام"
            title="خيارات متعددة وسير ذاتية بعناية"
            body="نعرض لك الدول المتاحة مع مدة تقريبية ومسار طلب واضح حسب الأنظمة والتوفر."
          />
        ) : null}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {countries.map((country) => (
            <div
              key={country.en}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.68] shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold-200/50 hover:shadow-gold"
            >
              <div className="relative h-60 overflow-hidden bg-gradient-to-br from-ink-950 via-ink-850 to-ink-800">
                <img
                  src={country.flag}
                  alt={`علم ${country.name}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/18 via-transparent to-white/8" />
              </div>
              <div className="p-7 text-center">
                <h3 className="arabic-heading text-2xl font-black text-white md:text-[1.75rem]">{country.name}</h3>
                <p className="mt-3 text-sm font-black uppercase tracking-normal text-gold-100">{country.en}</p>
                <p className="mx-auto mt-4 max-w-xs text-base leading-8 text-white/62">
                  جنسية متاحة للاستقدام، مدة الاستقدام {country.duration}
                </p>
                <Link
                  href={buildCountryWhatsAppUrl(country.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex rounded-full bg-gold-200 px-6 py-3 text-sm font-black text-ink-950 transition hover:bg-white"
                >
                  اطلب الآن
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export function Testimonials() {
  return (
    <MotionSection {...reveal} className="section-pad bg-gradient-to-b from-ink-900 to-ink-850">
      <Container>
        <SectionHeading eyebrow="آراء العملاء" title="ثقة تبنى بالوضوح والمتابعة" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-ink-950/70 p-8">
              <p className="text-3xl font-black text-gold-200">"</p>
              <p className="mt-2 min-h-24 text-lg leading-9 text-white/72">{item.quote}</p>
              <p className="mt-7 text-lg font-black text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

export function FAQSection({ compact = false }: { compact?: boolean }) {
  return (
    <MotionSection {...reveal} className={compact ? "py-10 surface-light" : "section-pad surface-light"}>
      <Container>
        {!compact ? (
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title="إجابات سريعة قبل بدء الطلب"
            body="جمعنا أهم الأسئلة التي تساعدك على فهم رحلة الاستقدام وخيارات الخدمة."
          />
        ) : null}
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </Container>
    </MotionSection>
  );
}

export function ContactCTA() {
  return (
    <MotionSection {...reveal} className="section-pad bg-gradient-to-b from-ink-900 to-ink-850">
      <Container>
        <div className="luxury-border overflow-hidden rounded-[2rem] bg-premium-line p-6 md:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-stretch">
            <div className="order-2 xl:order-1">
              <OfficeMapCard compact />
            </div>
            <div className="order-1 xl:order-2">
              <span className="text-sm font-black text-gold-100">ابدأ الآن</span>
              <h2 className="arabic-heading mt-5 max-w-4xl text-3xl font-black text-white md:text-[2.35rem] lg:text-[2.8rem]">
                دع فريق المنصة يرتب طلبك القادم بثقة
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-10 text-white/68">
                اترك بياناتك وسيتواصل معك مستشار الخدمة لتحديد الدولة، نوع الخدمة، والمتطلبات المناسبة.
              </p>
              <div className="mt-7">
                <PrimaryButton href="/contact">طلب استقدام</PrimaryButton>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                <Link href={`tel:${contact.phone}`} className="flex items-center gap-3 rounded-3xl bg-ink-950/62 p-5">
                  <Phone className="h-5 w-5 text-gold-100" />
                  <span className="font-bold text-white">{contact.phone}</span>
                </Link>
                <Link href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-3 rounded-3xl bg-ink-950/62 p-5">
                  <MessageCircle className="h-5 w-5 text-gold-100" />
                  <span className="font-bold text-white">{contact.whatsapp}</span>
                </Link>
                <Link href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-3xl bg-ink-950/62 p-5">
                  <Mail className="h-5 w-5 text-gold-100" />
                  <span className="font-bold text-white">{contact.email}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}

export function OfficeLocationSection() {
  return (
    <MotionSection {...reveal} className="section-pad surface-light">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <SectionHeading
            align="start"
            eyebrow="موقع المكتب"
            title="زورونا في موقع شركة المنصة الذهبية"
            body="يمكنك فتح الموقع مباشرة في خرائط Google أو استعراض موقع المكتب من الخريطة التفاعلية."
          />
          <OfficeMapCard />
        </div>
      </Container>
    </MotionSection>
  );
}

export function ContactBlock() {
  return (
    <section className="surface-light pb-24 pt-36 md:pb-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              align="start"
              eyebrow="تواصل معنا"
              title="نحن قريبون من طلبك"
              body="املأ النموذج أو تواصل مباشرة عبر القنوات الرسمية وسيعود لك فريقنا بخطوة واضحة."
            />
            <div className="mt-8">
              <OfficeMapCard compact />
            </div>
            <div className="mt-8 grid gap-3">
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <MapPin className="h-5 w-5 text-gold-100" />
                <span className="text-white/78">{contact.address}</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <Phone className="h-5 w-5 text-gold-100" />
                <span className="text-white/78">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <Mail className="h-5 w-5 text-gold-100" />
                <span className="text-white/78">{contact.email}</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
