
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-accent rounded-md p-1">
            <div className="h-5 w-5 text-primary-foreground font-bold flex items-center justify-center">
              PP
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProjectPilot
          </span>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
