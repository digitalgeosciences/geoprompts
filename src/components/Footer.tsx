import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-earth rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">GeoPrompts</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              A visual library of Earth's imagined features.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              <a 
                href="https://github.com" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Submit a Prompt</span>
              </a>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Access</h4>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Geopodcast
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ALQUBALELE Notes
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © GeoPrompts. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built and maintained by{" "}
            <a 
              href="https://digitalgeosciences.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Digital Geosciences
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;