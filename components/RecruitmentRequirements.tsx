import { Check } from "lucide-react";
import { recruitmentRequirements } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui";
import { MotionSection, reveal } from "@/components/Motion";

export default function RecruitmentRequirements() {
  return (
    <MotionSection {...reveal} className="section-pad surface-light">
      <Container>
        <SectionHeading
          eyebrow="متطلبات الاستقدام"
          title="وثائق وإجراءات مرتبة قبل بدء الطلب"
          body="نوضح لك المتطلبات الأساسية حتى تبدأ رحلة الاستقدام دون تأخير أو نقص في البيانات."
        />
        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {recruitmentRequirements.map((group) => (
            <div key={group.title} className="luxury-border rounded-[2rem] bg-white/[0.045] p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-200 text-ink-950">
                  <group.icon className="h-8 w-8" />
                </div>
                <h3 className="arabic-heading max-w-md text-xl font-black text-white md:text-2xl">{group.title}</h3>
              </div>
              <div className="mt-8 grid gap-4">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl bg-ink-950/62 p-5">
                    <Check className="h-6 w-6 text-gold-100" />
                    <span className="text-lg font-bold leading-8 text-white/78">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
