
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ProjectStatus } from '@/lib/types';
import { MOCK_PROJECTS, PROJECT_STATUSES } from '@/lib/data';
import { filterProjectsByStatus } from '@/lib/utils';
import { Plus, Search, X } from 'lucide-react';

const Dashboard = () => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProjects = MOCK_PROJECTS
    .filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const projectsByStatus = filterProjectsByStatus(filteredProjects, statusFilter);
  
  const statusCounts = Object.entries(PROJECT_STATUSES).reduce(
    (acc, [status]) => {
      acc[status as ProjectStatus] = MOCK_PROJECTS.filter(
        project => project.status === status
      ).length;
      return acc;
    },
    {} as Record<ProjectStatus, number>
  );
  
  return (
    <AppLayout className="px-4 py-8">
      <div className="container max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Projects</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..." 
                className="pl-9 pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Projects ({MOCK_PROJECTS.length})</SelectItem>
                    {Object.entries(PROJECT_STATUSES).map(([value, { label }]) => (
                      <SelectItem key={value} value={value}>
                        {label} ({statusCounts[value as ProjectStatus]})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </div>
          </div>
        </header>
        
        <ProjectGrid 
          projects={projectsByStatus}
          emptyMessage={
            searchQuery 
              ? `No projects match "${searchQuery}"`
              : statusFilter !== 'all'
                ? `No projects with status "${PROJECT_STATUSES[statusFilter].label}"`
                : "No projects yet. Create your first project!"
          }
        />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
