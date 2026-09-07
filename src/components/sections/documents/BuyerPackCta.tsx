import { FolderDown, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import InquiryButton from "@/components/inquiry/InquiryButton";

export default function BuyerPackCta() {
  return (
    <section className="bg-white pb-10 lg:pb-14">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 rounded-2xl bg-navy p-6 text-center sm:flex-row sm:justify-between sm:text-left sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <FolderDown className="size-7 stroke-[1.5]" aria-hidden />
            </span>
            <div>
              <p className="text-lg font-bold text-white">Get a tailored buyer pack</p>
              <p className="mt-1 text-sm text-white/70">
                Save time with a ready-to-share package of key documents matched to your needs.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2 sm:items-end">
            <InquiryButton
              type="documents"
              className="h-11 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <Package className="size-4" aria-hidden />
              Request Buyer Pack
            </InquiryButton>
            <p className="text-[11px] font-medium text-white/50">Fast &bull; Secure &bull; Complete</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
