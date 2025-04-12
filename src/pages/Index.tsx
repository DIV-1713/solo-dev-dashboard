
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, Code, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <AppLayout className="px-4">
      {/* Hero Section */}
      <section className="container py-12 md:py-24 flex flex-col items-center text-center">
        <div className="bg-accent rounded-full p-3 mb-8">
          <Sparkles className="h-6 w-6 text-accent-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Track your projects <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-400">without the complexity</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mb-8">
          A minimal project tracker built by developers, for developers.
          Manage your personal projects efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" /> View on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Project management simplified
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-secondary p-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">Task Management</h3>
            <p className="text-muted-foreground">
              Keep track of project tasks with simple checklists. No complex workflows, just get things done.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-secondary p-3 mb-4">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">Tech Stack Tracking</h3>
            <p className="text-muted-foreground">
              Tag your projects with the technologies you use. Perfect for keeping track of your skills.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-secondary p-3 mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-2">Calendar Planning</h3>
            <p className="text-muted-foreground">
              Plan your development schedule with a simple calendar view. Set deadlines and stay on track.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="glass-bg rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start tracking your projects?
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            ProjectPilot is designed for solo developers and indie hackers who need a simple way to keep track of their projects.
          </p>
          <Button asChild size="lg">
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
