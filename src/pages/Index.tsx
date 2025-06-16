
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PromptCard } from "@/components/PromptCard";
import { Newsletter } from "@/components/Newsletter";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Flame, PenTool, Code, Palette, Briefcase, BookOpen } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Prompts", icon: Flame },
    { id: "writing", name: "Writing & Blogging", icon: PenTool },
    { id: "coding", name: "Coding & Development", icon: Code },
    { id: "design", name: "Midjourney Prompts", icon: Palette },
    { id: "marketing", name: "Marketing & Business", icon: Briefcase },
    { id: "education", name: "Education & Learning", icon: BookOpen },
  ];

  const prompts = [
    {
      id: 1,
      title: "Blog Idea Generator",
      purpose: "Come up with blog topics for any niche",
      prompt: "Give me 10 blog post ideas about [topic] that are SEO-friendly and trending.",
      tool: "ChatGPT",
      category: "writing",
      trending: true,
    },
    {
      id: 2,
      title: "Realistic Product Photography",
      purpose: "Generate realistic product visuals",
      prompt: "/imagine a high-resolution image of a smartwatch on a marble table, cinematic lighting, –v 5 --ar 16:9",
      tool: "Midjourney",
      category: "design",
      trending: true,
    },
    {
      id: 3,
      title: "Bug Fix Assistant",
      purpose: "Help identify and fix bugs",
      prompt: "Here's my code snippet [paste code]. What's the issue, and how can I fix it?",
      tool: "ChatGPT",
      category: "coding",
      trending: false,
    },
    {
      id: 4,
      title: "Facebook Ad Copy",
      purpose: "Generate ad copy for a product",
      prompt: "Write a persuasive Facebook ad for [product], focusing on [audience] with a clear CTA.",
      tool: "ChatGPT",
      category: "marketing",
      trending: true,
    },
    {
      id: 5,
      title: "Teach Me a Topic",
      purpose: "Break down complex topics simply",
      prompt: "Explain [topic] like I'm 12, using analogies and simple examples.",
      tool: "ChatGPT",
      category: "education",
      trending: false,
    },
    {
      id: 6,
      title: "Creative Story Generator",
      purpose: "Generate engaging short stories",
      prompt: "Write a 500-word short story about [character] who discovers [mystery] in [setting]. Make it engaging and include a plot twist.",
      tool: "ChatGPT",
      category: "writing",
      trending: false,
    },
    {
      id: 7,
      title: "Fantasy Landscape Art",
      purpose: "Create stunning fantasy landscapes",
      prompt: "/imagine a mystical floating island with glowing crystals, waterfalls cascading into clouds, aurora borealis sky, ultra-detailed, 8k --ar 21:9 --v 5",
      tool: "Midjourney",
      category: "design",
      trending: true,
    },
    {
      id: 8,
      title: "Code Review Assistant",
      purpose: "Get comprehensive code reviews",
      prompt: "Please review this code for best practices, performance, security issues, and readability. Provide specific suggestions: [paste code]",
      tool: "Claude",
      category: "coding",
      trending: false,
    },
  ];

  const filteredPrompts = selectedCategory === "all" 
    ? prompts 
    : prompts.filter(prompt => prompt.category === selectedCategory);

  const trendingPrompts = prompts.filter(prompt => prompt.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <Hero />
      
      {/* Trending Prompts Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Flame className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Trending Prompts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trendingPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Category Filter */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Browse by Category
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default Index;
