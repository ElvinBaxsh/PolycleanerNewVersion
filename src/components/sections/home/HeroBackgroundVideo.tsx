// Silent looping background video. It is in the HTML, so it starts loading with
// the page, and its poster is the hero image, so nothing jumps. Phones get a
// smaller file.
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
