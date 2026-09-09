import Container from "@/components/ui/Container";
import TaropakBanner from "@/components/sections/TaropakBanner";
import AmiExpoBanner from "@/components/sections/AmiExpoBanner";

export default function UpcomingEvents() {
  return (
    <section className="bg-soft-gray py-10 lg:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TaropakBanner />
          <AmiExpoBanner />
        </div>
      </Container>
    </section>
  );
}
