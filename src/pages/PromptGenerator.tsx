
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PromptGenerator = () => {
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [aiTool, setAiTool] = useState("ChatGPT");
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const aiTools = ["ChatGPT", "Claude", "Gemini", "Midjourney"];

  const generatePrompts = async () => {
    if (!topic.trim() || !purpose.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both topic and purpose fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyDkbEjn21-DvyI795K4fR1N5irLt1Is2H0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 3 high-quality AI prompts for the topic "${topic}" with the purpose "${purpose}" optimized for ${aiTool}. 

Please format your response as a simple list with each prompt on a new line, starting with "1. ", "2. ", "3. ". Make the prompts specific, actionable, and effective for ${aiTool}.

Example format:
1. [First prompt here]
2. [Second prompt here] 
3. [Third prompt here]`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompts');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Parse the generated prompts
      const prompts = generatedText
        .split('\n')
        .filter((line: string) => line.match(/^\d+\./))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());

      setGeneratedPrompts(prompts);
      toast({
        title: "Prompts Generated!",
        description: `Generated ${prompts.length} prompts for ${aiTool}`,
      });
    } catch (error) {
      console.error('Error generating prompts:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate prompts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyPrompt = async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Prompt Generator
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate custom AI prompts tailored to your specific needs using advanced AI technology.
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Generate Custom Prompts
            </CardTitle>
            <CardDescription>
              Tell us what you need and we'll create optimized prompts for your chosen AI tool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Subject</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Social media marketing, Creative writing, Data analysis"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-tool">Target AI Tool</Label>
                <select
                  id="ai-tool"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={aiTool}
                  onChange={(e) => setAiTool(e.target.value)}
                >
                  {aiTools.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose or Goal</Label>
              <Textarea
                id="purpose"
                placeholder="Describe what you want to achieve with these prompts..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={generatePrompts}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Prompts...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Prompts
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedPrompts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Generated Prompts for {aiTool}
            </h2>
            {generatedPrompts.map((prompt, index) => (
              <Card key={index} className="shadow-md border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      Prompt #{index + 1}
                    </Badge>
                    <Button
                      onClick={() => copyPrompt(prompt, index)}
                      variant="outline"
                      size="sm"
                      disabled={copiedIndex === index}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="text-gray-700 leading-relaxed">{prompt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PromptGenerator;
