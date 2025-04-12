
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/types';

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

const ProjectGrid = ({ projects, emptyMessage = 'No projects found' }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 bg-secondary/30 rounded-lg text-center p-6">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
