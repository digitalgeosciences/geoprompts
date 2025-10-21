import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterBarProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const FilterBar = ({ tags, selectedTag, onTagChange }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-2 text-foreground hover:text-foreground hover:bg-secondary"
        >
          Filter by Tags
          {isExpanded ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
        
        {isExpanded && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={(selectedTag === tag || (selectedTag === "" && tag === "All")) ? "default" : "ghost"}
                size="sm"
                onClick={() => onTagChange(tag === "All" ? "" : tag)}
                className={`
                  transition-all duration-200 ease-in-out
                  ${(selectedTag === tag || (selectedTag === "" && tag === "All"))
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }
                `}
              >
                {tag}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;