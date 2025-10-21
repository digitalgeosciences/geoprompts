import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  model: string;
  dimensions: string;
  image: string;
  enhanced: boolean;
  rating: number;
  ratingCount: number;
}

interface PromptCardProps {
  prompt: Prompt;
  onClick: (prompt: Prompt) => void;
  onTagClick: (tag: string) => void;
}

const PromptCard = ({ prompt, onClick, onTagClick }: PromptCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden bg-gradient-card border-border hover:shadow-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      onClick={() => onClick(prompt)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={prompt.image}
          alt={prompt.title}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-white">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </div>
        </div>

        {/* Enhanced badge */}
        {prompt.enhanced && (
          <Badge 
            className="absolute top-3 left-3 bg-accent text-accent-foreground border-0"
            variant="secondary"
          >
            Enhanced
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {prompt.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{prompt.model}</span>
          <span>{prompt.dimensions}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {prompt.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs border-border text-muted-foreground cursor-pointer hover:bg-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              {tag}
            </Badge>
          ))}
          {prompt.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              +{prompt.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;