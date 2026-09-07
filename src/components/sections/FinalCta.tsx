import { MessageCircle, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/constants";

export default function FinalCta({
  title = "Let's build a cleaner future together.",
  description = "Contact us today for samples, offers and partnership opportunities.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-b border-white/10 bg-navy py-6">
      <Reveal>
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {title.split("cleaner future").length > 1 ? (
                <>
                  {title.split("cleaner future")[0]}
                  <span className="text-brand-green">cleaner future</span>
                  {title.split("cleaner future")[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/70">{description}</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-green px-5 text-sm font-semibold text-white hover:bg-brand-green-dark"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
            >
              <Mail className="size-4" aria-hidden />
              Send an Email
            </a>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
