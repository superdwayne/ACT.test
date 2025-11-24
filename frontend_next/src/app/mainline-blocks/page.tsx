import {
  Hero,
  Features,
  Logos,
  Testimonials,
  PricingTable,
  FAQ,
  ResourceAllocation,
  Investors,
} from "@/components/mainline";
import { DemoLayout } from "@/components/demo-layout";

export default function MainlineBlocksPage() {
  return (
    <DemoLayout>
      <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Mainline Template Blocks</h1>
        <p className="text-muted-foreground mb-12">
          Explore all the pre-built blocks from the Mainline template
        </p>
      </div>

      {/* Hero Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Hero Section</h2>
          <p className="text-muted-foreground">Main landing page hero</p>
        </div>
        <Hero />
      </section>

      {/* Logos Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Logo Marquee</h2>
          <p className="text-muted-foreground">Animated logo showcase</p>
        </div>
        <Logos />
      </section>

      {/* Features Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Features</h2>
          <p className="text-muted-foreground">Product features showcase</p>
        </div>
        <Features />
      </section>

      {/* Resource Allocation Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Resource Allocation</h2>
          <p className="text-muted-foreground">Interactive resource management</p>
        </div>
        <ResourceAllocation />
      </section>

      {/* Testimonials Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">Customer testimonials carousel</p>
        </div>
        <Testimonials />
      </section>

      {/* Investors Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Investors</h2>
          <p className="text-muted-foreground">Investor showcase</p>
        </div>
        <Investors />
      </section>

      {/* Pricing Table Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">Pricing Table</h2>
          <p className="text-muted-foreground">Pricing plans comparison</p>
        </div>
        <PricingTable />
      </section>

      {/* FAQ Block */}
      <section className="border-t py-12">
        <div className="container mb-8">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <p className="text-muted-foreground">Frequently asked questions</p>
        </div>
        <FAQ />
      </section>
    </div>
    </DemoLayout>
  );
}
