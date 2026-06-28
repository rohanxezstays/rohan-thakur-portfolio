import Hero from "@/components/sections/Hero";
import WalkGallery from "@/components/gallery/WalkGallery";

export default function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
      {/* First page — the hero cover with your photo */}
      <div className="snap-start">
        <Hero />
      </div>
      {/* Scroll down — the walkthrough gallery */}
      <div id="gallery" className="h-screen snap-start">
        <WalkGallery />
      </div>
    </div>
  );
}
