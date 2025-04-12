
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Calendar navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  // Get days in month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart);
  
  // Get all tasks with due dates
  const tasksWithDueDates = MOCK_PROJECTS.flatMap(project => 
    project.tasks
      .filter(task => task.dueDate)
      .map(task => ({
        ...task,
        projectId: project.id,
        projectName: project.name
      }))
  );

  return (
    <AppLayout>
      <div className="container py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Planning Calendar</h1>
        
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              
              {/* Empty cells before first day */}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 bg-secondary/20 rounded-md h-24" />
              ))}
              
              {/* Days of month */}
              {daysInMonth.map(day => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const dayTasks = tasksWithDueDates.filter(task => 
                  format(new Date(task.dueDate!), 'yyyy-MM-dd') === formattedDate
                );
                
                return (
                  <div 
                    key={day.toString()}
                    className="p-2 bg-secondary/30 rounded-md h-24 overflow-hidden hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{format(day, 'd')}</span>
                      {dayTasks.length > 0 && (
                        <span className="text-xs px-1.5 py-0.5 bg-accent rounded-full text-accent-foreground">
                          {dayTasks.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map(task => (
                        <div 
                          key={task.id} 
                          className={cn(
                            "text-xs p-1 rounded truncate",
                            task.completed 
                              ? "bg-green-500/20 border-l-2 border-green-500" 
                              : "bg-blue-500/20 border-l-2 border-blue-500"
                          )}
                          title={`${task.title} (${task.projectName})`}
                        >
                          {task.title}
                        </div>
                      ))}
                      
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty cells after last day to fill grid */}
              {Array.from({ length: (7 - ((daysInMonth.length + startDay) % 7)) % 7 }).map((_, i) => (
                <div key={`end-empty-${i}`} className="p-2 bg-secondary/20 rounded-md h-24" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;
