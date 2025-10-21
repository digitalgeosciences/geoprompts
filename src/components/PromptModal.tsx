import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, X, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface PromptModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal = ({ prompt, isOpen, onClose }: PromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const { toast } = useToast();

  if (!prompt) return null;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const submitRating = async (rating: number) => {
    if (!prompt) return;
    
    setIsSubmittingRating(true);
    setUserRating(rating);
    
    try {
      // Submit to Google Sheets via Apps Script
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptId: prompt.id,
          rating: rating,
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Rating submitted",
          description: "Thank you for your feedback!",
        });
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      toast({
        title: "Failed to submit rating",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-background border-border">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Image */}
          <div className="lg:w-2/3 relative bg-muted">
            <img
              src={prompt.image}
              alt={prompt.title}
              className="w-full h-64 lg:h-full object-cover"
            />
            
            {/* Close button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 w-8 h-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Enhanced badge */}
            {prompt.enhanced && (
              <Badge 
                className="absolute top-4 left-4 bg-accent text-accent-foreground border-0"
                variant="secondary"
              >
                Enhanced Prompt
              </Badge>
            )}
          </div>

          {/* Right side - Details */}
          <div className="lg:w-1/3 p-6 flex flex-col">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{prompt.title}</h2>
                  <Badge variant="outline" className="text-sm">
                    {prompt.category}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            {/* Prompt text */}
            <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground leading-relaxed">
                {prompt.prompt}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 mb-6">
              <Button 
                onClick={copyPrompt}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Prompt
                  </>
                )}
              </Button>
              
              {/* Rating section */}
              <div className="border border-border rounded-lg p-4 bg-muted/30">
                <h4 className="font-semibold text-foreground mb-3">Rate this prompt</h4>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => submitRating(star)}
                      disabled={isSubmittingRating}
                      className="transition-colors disabled:opacity-50"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= userRating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground hover:text-yellow-400'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Average: {prompt.rating.toFixed(1)} ({prompt.ratingCount} ratings)
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Model</h4>
                <p className="text-muted-foreground">{prompt.model}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Dimensions</h4>
                <p className="text-muted-foreground">{prompt.dimensions}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs border-border text-muted-foreground cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => {
                        onClose();
                        // Note: Tag filtering would need to be passed down as a prop
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromptModal;