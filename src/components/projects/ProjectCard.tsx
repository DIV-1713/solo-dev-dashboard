
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types';
import { PROJECT_STATUSES } from '@/lib/data';
import { formatDate, getTaskCompletionPercentage } from '@/lib/utils';
import { Calendar, Github, Globe, CheckSquare } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, name, description, status, updatedAt, githubUrl, deploymentUrl, technologies, tasks } = project;
  const completionPercentage = getTaskCompletionPercentage(project);
  const statusInfo = PROJECT_STATUSES[status];
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <Link to={`/projects/${id}`}>
      <Card className="h-full transition-all hover:border-accent hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg md:text-xl">{name}</CardTitle>
            <Badge 
              variant="outline"
              className={`${statusInfo.color} text-primary-foreground`}
            >
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
          
          <div className="flex gap-1 flex-wrap mb-4">
            {technologies.map(tech => (
              <Badge key={tech.id} variant="secondary" className="text-xs">
                {tech.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-3 mb-1">
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {completedTasks}/{tasks.length} tasks complete
            </span>
          </div>
          
          <Progress value={completionPercentage} className="h-1.5" />
        </CardContent>
        <CardFooter className="border-t pt-3 text-xs text-muted-foreground flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>Updated {formatDate(updatedAt, 'MMM d')}</span>
          </div>
          
          <div className="flex gap-2 ml-auto">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            
            {deploymentUrl && (
              <a 
                href={deploymentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
