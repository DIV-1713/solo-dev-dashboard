
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

const AppLayout = ({ 
  children, 
  className,
  showFooter = true 
}: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
