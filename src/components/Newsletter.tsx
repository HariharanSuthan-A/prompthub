
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Bell, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate subscription
    setIsSubscribed(true);
    toast({
      title: "Success!",
      description: "You've been subscribed to our weekly prompt updates",
    });
    setEmail("");
    
    // Reset after 3 seconds for demo purposes
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section id="newsletter" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Gift className="h-8 w-8 text-yellow-300" />
          <span className="text-lg font-semibold text-blue-100">Weekly Updates</span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">
          Never Miss a Great Prompt
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest AI prompts, tips, and exclusive content delivered to your inbox every week.
          Join thousands of AI enthusiasts improving their prompt game.
        </p>

        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-md border-0 shadow-2xl">
          <CardContent className="p-6">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Subscribe for Weekly Prompts</span>
                </div>
                
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center border-2 border-gray-200 focus:border-blue-400"
                />
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Subscribe Now
                </Button>
                
                <p className="text-xs text-gray-500">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="bg-green-100 text-green-800 rounded-full p-3 w-fit mx-auto mb-3">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Welcome aboard!</h3>
                <p className="text-gray-600">Check your email for confirmation.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full" />
            <span>New prompts weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full" />
            <span>AI tool updates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full" />
            <span>Exclusive tips</span>
          </div>
        </div>
      </div>
    </section>
  );
};
