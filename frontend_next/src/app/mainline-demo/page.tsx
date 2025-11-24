import {
  Hero,
  Features,
  Logos,
  Testimonials,
  Pricing,
  FAQ,
  Footer,
} from "@/components/mainline";
import { DemoLayout } from "@/components/demo-layout";

export default function MainlineDemoPage() {
  return (
    <DemoLayout>
      <div className="min-h-screen">
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
    </DemoLayout>
  );
}
