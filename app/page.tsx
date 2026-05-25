import Hero from "@/components/Hero";
import PageShell from "@/components/PageShell";
import {
  ContactCTA,
  CountriesSection,
  FAQSection,
  ServicesGrid,
  StepsTimeline,
  Testimonials,
  WhyChooseUs
} from "@/components/Sections";
import RecruitmentRequirements from "@/components/RecruitmentRequirements";
import RecruitmentStepper from "@/components/RecruitmentStepper";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <WhyChooseUs />
      <ServicesGrid />
      <RecruitmentStepper />
      <RecruitmentRequirements />
      <StepsTimeline />
      <CountriesSection />
      <Testimonials />
      <FAQSection />
      <ContactCTA />
    </PageShell>
  );
}
