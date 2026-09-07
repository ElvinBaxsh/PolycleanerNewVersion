import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section-y bg-white">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-green-dark">404</p>
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">Page not found</h1>
        <p className="max-w-md text-slate">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Button href="/" showArrow>
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
