
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  LayoutDashboard, 
  Calendar,
  Settings
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-bg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-accent rounded-md p-1">
            <div className="h-6 w-6 text-primary-foreground font-bold flex items-center justify-center">
              PP
            </div>
          </div>
          <span className="font-bold text-lg hidden md:block">ProjectPilot</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Sign Up
          </Button>

          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out transform",
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="container py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="flex items-center py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
