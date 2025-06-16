
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Users, TrendingUp } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-20 px-4 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 animate-pulse" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-600">Welcome to PromptHub</span>
          <Sparkles className="h-8 w-8 text-yellow-500" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Unlock AI with Better Prompts
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover high-quality, categorized AI prompts for ChatGPT, Midjourney, Claude, and more. 
          Transform your AI conversations from basic to brilliant.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">10K+ Users</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="font-semibold">500+ Prompts</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">Weekly Updates</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Explore Prompts
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Submit Your Prompt
          </Button>
        </div>
      </div>
    </section>
  );
};
