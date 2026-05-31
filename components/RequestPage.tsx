import { requestPageContent } from "@/lib/data";
import { Container } from "@/components/ui";
import PageShell from "@/components/PageShell";
import RequestForm from "@/components/RequestForm";

type RequestType = keyof typeof requestPageContent;

export default function RequestPage({ type }: { type: RequestType }) {
  const content = requestPageContent[type];

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-900 via-ink-950 to-sand-50 pb-28 pt-40">
        <div className="absolute inset-0 bg-gold-radial" />
        <div className="absolute inset-0 noise opacity-45" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="mb-6 inline-flex rounded-full border border-gold-300/25 bg-gold-300/10 px-5 py-2.5 text-base font-bold text-gold-100">
                {content.eyebrow}
              </span>
              <h1 className="arabic-heading max-w-3xl text-3xl font-black text-white md:text-4xl lg:text-5xl">{content.title}</h1>
              <p className="mt-8 text-xl leading-10 text-white/72">{content.description}</p>
              <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.045] p-6">
                <p className="text-xl font-black text-white">كيف يعمل الطلب؟</p>
                <p className="mt-3 text-lg leading-9 text-white/62">
                  أكمل البيانات المطلوبة ثم اضغط إرسال عبر واتساب ليصل الطلب مباشرة إلى فريق شركة المنصة.
                </p>
              </div>
            </div>
            <RequestForm type={type} />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
