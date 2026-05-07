import { testimonial } from "@/lib/data";
import { Section } from "@/components/section";

export function Testimonial() {
  return (
    <Section bg="navy">
      <div className="mx-auto max-w-3xl text-center">
        <p className="h-display text-2xl font-medium leading-snug text-white md:text-4xl">
          “{testimonial.quote}”
        </p>
        <p className="mt-6 text-sm uppercase tracking-widest text-lime">— {testimonial.attribution}</p>
      </div>
    </Section>
  );
}
