
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TaskList from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MOCK_PROJECTS, PROJECT_STATUSES, TECHNOLOGIES } from '@/lib/data';
import { Project, Task, Technology } from '@/lib/types';
import { 
  ArrowLeft,
  Pencil,
  Save,
  X,
  Calendar,
  Clock,
  Link as LinkIcon,
  Github,
  ExternalLink,
  ListChecks
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find project by ID
  const project = MOCK_PROJECTS.find(p => p.id === id);
  
  // Editing states
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  
  // Initialize edited project when project data is available
  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);
  
  // Handle not found project
  if (!project || !editedProject) {
    return (
      <AppLayout>
        <div className="container py-8 max-w-6xl">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h1 className="text-2xl font-medium mb-4">Project not found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Task handlers
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: `task-${uuidv4()}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: null
    };
    
    setEditedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: [...prev.tasks, newTask],
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setEditedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        ),
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  const handleDeleteTask = (taskId: string) => {
    setEditedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== taskId),
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // If cancelling edit, reset to original project
      setEditedProject({ ...project });
    }
    setIsEditing(!isEditing);
  };

  // Handle save project changes
  const handleSaveChanges = () => {
    // This would typically send data to the backend
    // For now, we'll just exit edit mode
    setIsEditing(false);
    
    // Show a toast notification
    console.log("Project saved:", editedProject);
  };
  
  // Handle technology selection
  const handleTechnologyToggle = (tech: Technology) => {
    setEditedProject(prev => {
      if (!prev) return prev;
      
      const hasTech = prev.technologies.some(t => t.id === tech.id);
      
      let updatedTechnologies;
      if (hasTech) {
        updatedTechnologies = prev.technologies.filter(t => t.id !== tech.id);
      } else {
        updatedTechnologies = [...prev.technologies, tech];
      }
      
      return {
        ...prev,
        technologies: updatedTechnologies,
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  return (
    <AppLayout>
      <div className="container py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        
        <header className="mb-8 flex justify-between items-start">
          <div>
            {isEditing ? (
              <Input
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                className="text-2xl font-bold mb-2 max-w-xl h-auto py-2"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-2">{editedProject.name}</h1>
            )}
            
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Created {formatDate(editedProject.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>Updated {formatDate(editedProject.updatedAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={toggleEditMode}>
                  <X className="mr-1.5 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="mr-1.5 h-4 w-4" /> Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={toggleEditMode}>
                <Pencil className="mr-1.5 h-4 w-4" /> Edit Project
              </Button>
            )}
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5" /> Tasks
                </CardTitle>
                <CardDescription>
                  Manage the tasks for this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={editedProject.tasks}
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedProject.description}
                    onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                    className="min-h-[120px]"
                    placeholder="Describe your project..."
                  />
                ) : (
                  <p className="text-muted-foreground whitespace-pre-wrap">{editedProject.description}</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Select
                    defaultValue={editedProject.status}
                    onValueChange={(value) => setEditedProject({ ...editedProject, status: value as Project['status'] })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PROJECT_STATUSES).map(([value, { label }]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge 
                    className={`${PROJECT_STATUSES[editedProject.status].color} px-3 py-1`}
                  >
                    {PROJECT_STATUSES[editedProject.status].label}
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {TECHNOLOGIES.map(tech => {
                      const isSelected = editedProject.technologies.some(t => t.id === tech.id);
                      
                      return (
                        <Badge 
                          key={tech.id}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTechnologyToggle(tech)}
                        >
                          {tech.name}
                        </Badge>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {editedProject.technologies.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No technologies specified</p>
                    ) : (
                      editedProject.technologies.map(tech => (
                        <Badge key={tech.id} variant="secondary">
                          {tech.name}
                        </Badge>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub Repository</label>
                  
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={editedProject.githubUrl || ''}
                        onChange={(e) => setEditedProject({ ...editedProject, githubUrl: e.target.value })}
                        placeholder="GitHub URL"
                      />
                    </div>
                  ) : (
                    editedProject.githubUrl ? (
                      <a 
                        href={editedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                        <span className="truncate">{editedProject.githubUrl}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">No repository linked</p>
                    )
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deployment URL</label>
                  
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={editedProject.deploymentUrl || ''}
                        onChange={(e) => setEditedProject({ ...editedProject, deploymentUrl: e.target.value })}
                        placeholder="Deployment URL"
                      />
                    </div>
                  ) : (
                    editedProject.deploymentUrl ? (
                      <a 
                        href={editedProject.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="truncate">{editedProject.deploymentUrl}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">No deployment linked</p>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetail;
