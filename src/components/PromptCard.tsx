
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Flame } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Prompt {
  id: number;
  title: string;
  purpose: string;
  prompt: string;
  tool: string;
  category: string;
  trending?: boolean;
}

interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard = ({ prompt }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      });
    }
  };

  const getToolColor = (tool: string) => {
    switch (tool.toLowerCase()) {
      case "chatgpt":
        return "bg-green-100 text-green-800 border-green-200";
      case "midjourney":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "claude":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "gemini":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {prompt.title}
              </CardTitle>
              {prompt.trending && (
                <Flame className="h-4 w-4 text-orange-500" />
              )}
            </div>
            <CardDescription className="text-gray-600">
              {prompt.purpose}
            </CardDescription>
          </div>
          <Badge className={`${getToolColor(prompt.tool)} border font-medium`}>
            {prompt.tool}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-700 font-mono leading-relaxed">
            {prompt.prompt}
          </p>
        </div>
        
        <Button
          onClick={handleCopy}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300"
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Prompt
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
