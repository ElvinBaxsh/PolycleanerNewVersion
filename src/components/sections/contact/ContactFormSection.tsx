import { Mail, Phone, MapPin, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/ui/Reveal";
import { LinkedinIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { CONTACT_INFO } from "@/lib/constants";

const ICONS: LucideIcon[] = [Mail, Phone, MapPin, Globe, MessageCircle];

export default function ContactFormSection({
  defaultType,
  defaultInterest,
}: {
  defaultType?: string;
  defaultInterest?: string;
}) {
  return (
    <section id="form" className="section-y scroll-mt-24 bg-white">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        <Reveal className="rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy">Send Us a Message</h2>
          <p className="mt-1 text-sm text-slate">Fill in the form below and our team will get back to you promptly.</p>
          <div className="mt-6">
            <InquiryForm defaultType={defaultType} defaultInterest={defaultInterest} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex h-full flex-col rounded-2xl border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy">Contact Information</h2>
          <ul className="mt-6 space-y-5">
            {CONTACT_INFO.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-border text-brand-blue">
                    <Icon className="size-7 stroke-[1.5]" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{item.label}</p>
                    <p className="text-sm text-slate">{item.value}</p>
                    <p className="text-xs text-slate/60">{item.sub}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Fills the remaining height so this column matches the taller
              form column instead of trailing off in empty space. */}
          <div className="mt-auto pt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy">Follow Us</h3>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-brand-blue transition-colors hover:bg-soft-gray"
              >
                <LinkedinIcon className="size-4.5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-brand-blue transition-colors hover:bg-soft-gray"
              >
                <FacebookIcon className="size-4.5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-brand-blue transition-colors hover:bg-soft-gray"
              >
                <YoutubeIcon className="size-4.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
