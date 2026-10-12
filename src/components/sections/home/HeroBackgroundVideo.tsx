import { videoUrl } from "@/lib/constants";

// Silent looping background video: the first 20 seconds of the company video
// (the full one opens from the play button). It is in the HTML, so it starts
// loading with the page. It has no poster: until its first frame arrives it is see-through
// and the hero image behind it shows, so that image is downloaded only once.
// Phones get a smaller file.
export default function HeroBackgroundVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover object-center motion-reduce:hidden"
    >
      {/* Each file has its own width range. Without one on the second, a
          browser that can't use the first goes on to download the second too. */}
      <source src={videoUrl("poly-cleaner-bg-mobile.mp4")} type="video/mp4" media="(max-width: 767.98px)" />
      <source src={videoUrl("poly-cleaner-bg.mp4")} type="video/mp4" media="(min-width: 768px)" />
    </video>
  );
}
