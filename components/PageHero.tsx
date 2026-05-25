import { Container } from "@/components/ui";

export default function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-950 pt-40">
      <div className="absolute inset-0 bg-gold-radial" />
      <div className="absolute inset-0 noise opacity-45" />
      <Container className="relative pb-20 pt-10">
        <span className="mb-6 inline-flex rounded-full border border-gold-300/25 bg-gold-300/10 px-5 py-2.5 text-base font-bold text-gold-100">
          {eyebrow}
        </span>
        <h1 className="arabic-heading max-w-4xl text-3xl font-black text-white md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-10 text-white/72 md:text-xl">{body}</p>
      </Container>
    </section>
  );
}
