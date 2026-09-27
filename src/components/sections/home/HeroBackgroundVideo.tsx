/**
 * The hero background as a silent, looping clip of the plant.
 *
 * Server-rendered, not mounted on the client: waiting for hydration meant
 * the still image sat there for the better part of a second before the
 * video appeared. In the HTML the browser starts fetching it with the page.
 *
 * It is visible from the first paint because its poster is the same image
 * that sits behind it — there is no swap to see, the picture simply starts
 * moving once enough of the file has arrived. Phones get a smaller file;
 * the <source> media queries pick one before anything is fetched.
 *
 * `motion-reduce:hidden` leaves the still image in place for anyone who
 * asked their system for less motion.
 */
export default function HeroBackgroundVideo({ poster }: { poster: string }) {
  return (
    <video
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover object-center motion-reduce:hidden"
    >
      <source src="/video/poly-cleaner-bg-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/video/poly-cleaner-bg.mp4" type="video/mp4" />
    </video>
  );
}
