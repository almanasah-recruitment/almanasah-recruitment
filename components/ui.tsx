import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "start";
}) {
  return (
    <div className={clsx("mx-auto max-w-4xl", align === "center" ? "text-center" : "text-right")}>
      <span className="mb-5 inline-flex rounded-full border border-gold-300/30 bg-gold-300/12 px-5 py-2.5 text-base font-extrabold text-gold-100">
        {eyebrow}
      </span>
      <h2 className="arabic-heading mx-auto max-w-4xl text-3xl font-black text-white md:text-[2.35rem] lg:text-[2.8rem]">{title}</h2>
      {body ? <p className="mx-auto mt-8 max-w-3xl text-lg leading-10 text-white/68 md:text-xl">{body}</p> : null}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  variant = "gold"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-extrabold transition duration-300",
        variant === "gold"
          ? "bg-gradient-to-l from-gold-200 via-gold-300 to-gold-500 text-ink-950 shadow-gold hover:-translate-y-0.5"
          : "border border-white/14 bg-white/7 text-white hover:border-gold-200/60 hover:bg-white/12"
      )}
    >
      {children}
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
    </Link>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-[88rem] px-5 sm:px-7 lg:px-10", className)}>{children}</div>;
}
