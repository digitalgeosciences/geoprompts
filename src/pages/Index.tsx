import { useState, useMemo } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import PromptCard from "@/components/PromptCard";
import PromptModal from "@/components/PromptModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import promptsData from "@/data/prompts.json";

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

interface Category {
  id: string;
  name: string;
  enabled: boolean;
}

interface PromptsData {
  categories: Category[];
  prompts: Prompt[];
}

const Index = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [displayCount, setDisplayCount] = useState(20);

  const data = promptsData as PromptsData;
  const prompts = data.prompts;
  
  // Get all unique tags from prompts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    prompts.forEach(prompt => {
      prompt.tags.forEach(tag => tagsSet.add(tag));
    });
    return ["All", ...Array.from(tagsSet).sort()];
  }, [prompts]);

  // Filter prompts based on search query and selected tag
  const filteredPrompts = useMemo(() => {
    const filtered = prompts.filter(prompt => {
      const matchesSearch = searchQuery === "" || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "" || selectedTag === "All" || prompt.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
    
    // Reset display count when filters change
    setDisplayCount(20);
    return filtered;
  }, [prompts, searchQuery, selectedTag]);

  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, displayCount);
  }, [filteredPrompts, displayCount]);

  const hasMore = displayCount < filteredPrompts.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <FilterBar 
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">No prompts found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search terms or selected tag.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {displayedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onClick={setSelectedPrompt}
                  onTagClick={setSelectedTag}
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={() => setDisplayCount(prev => prev + 20)}
                  variant="outline"
                  size="lg"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <PromptModal
        prompt={selectedPrompt}
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
      />
    </div>
  );
};

export default Index;
