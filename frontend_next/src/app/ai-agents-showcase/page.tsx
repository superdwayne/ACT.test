import { AgentCard, AgentsSection } from "@/components/figma";
import { DemoLayout } from "@/components/demo-layout";

export default function AIAgentsShowcasePage() {
  const customLeftAgents = [
    { title: "Analyzer", description: "Data Analysis & Insights" },
    { title: "Optimizer", description: "Performance Optimization" },
  ];

  const customRightAgents = [
    { title: "Designer", description: "Creative Design" },
    { title: "Developer", descriptions: ["Frontend Dev", "Backend Dev", "DevOps"] },
  ];

  return (
    <DemoLayout>
      <div className="min-h-screen bg-background">
      {/* Default Section */}
      <AgentsSection />

      {/* Divider */}
      <div className="w-full border-t" />

      {/* Custom Section with Different Styling */}
      <AgentsSection
        title="Custom AI Team"
        className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background"
        leftAgents={customLeftAgents}
        rightAgents={customRightAgents}
      />

      {/* Divider */}
      <div className="w-full border-t" />

      {/* Individual Agent Cards Demo */}
      <section className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Individual Agent Cards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Left Aligned</h3>
            <AgentCard
              title="Researcher"
              description="Market Research"
              align="left"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Center Aligned</h3>
            <AgentCard
              title="Coordinator"
              description="Project Coordination"
              align="center"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Right Aligned</h3>
            <AgentCard
              title="Reviewer"
              description="Quality Review"
              align="right"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold">Multiple Descriptions</h3>
          <AgentCard
            title="Multi-Role Agent"
            descriptions={[
              "Content Creation",
              "SEO Optimization",
              "Social Media Management",
            ]}
            align="center"
          />
        </div>
      </section>

      {/* Custom Center Content Example */}
      <div className="w-full border-t" />
      
      <AgentsSection
        title="Custom Center Design"
        centerContent={
          <div className="relative flex items-center justify-center flex-shrink-0">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center shadow-2xl">
              <div className="text-white text-center">
                <div className="text-4xl font-bold">AI</div>
                <div className="text-sm">Powered</div>
              </div>
            </div>
          </div>
        }
      />
    </div>
    </DemoLayout>
  );
}
