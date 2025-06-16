
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PromptHub
              </h1>
              <p className="text-xs text-gray-500">Unlock AI with Better Prompts</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#trending" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trending
            </Link>
            <Link to="/#categories" className="text-gray-700 hover:text-blue-600 transition-colors">
              Categories
            </Link>
            <Link to="/generator" className="text-gray-700 hover:text-blue-600 transition-colors">
              AI Generator
            </Link>
            <a href="#newsletter" className="text-gray-700 hover:text-blue-600 transition-colors">
              Newsletter
            </a>
            <Link to="/generator">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Generate Prompt
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/#trending" className="text-gray-700 hover:text-blue-600 transition-colors">
                Trending
              </Link>
              <Link to="/#categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link to="/generator" className="text-gray-700 hover:text-blue-600 transition-colors">
                AI Generator
              </Link>
              <a href="#newsletter" className="text-gray-700 hover:text-blue-600 transition-colors">
                Newsletter
              </a>
              <Link to="/generator">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-fit">
                  Generate Prompt
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
