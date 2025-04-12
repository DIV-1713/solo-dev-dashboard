
import { useState } from 'react';
import { Task } from '@/lib/types';
import TaskItem from './TaskItem';
import NewTaskInput from './NewTaskInput';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (taskTitle: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }: TaskListProps) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        {incompleteTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
        
        {incompleteTasks.length === 0 && !showAddTask && (
          <p className="text-sm text-muted-foreground py-2">No active tasks</p>
        )}
      </div>
      
      {showAddTask ? (
        <NewTaskInput 
          onAdd={(title) => {
            onAddTask(title);
            setShowAddTask(false);
          }}
          onCancel={() => setShowAddTask(false)}
        />
      ) : (
        <Button 
          onClick={() => setShowAddTask(true)} 
          variant="outline" 
          size="sm"
          className="w-full justify-start gap-1 text-muted-foreground"
        >
          <Plus className="h-4 w-4" /> 
          <span>Add task</span>
        </Button>
      )}
      
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <span>Completed ({completedTasks.length})</span>
            {showCompleted ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          <div className={cn(
            "space-y-1 overflow-hidden transition-all",
            showCompleted ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}>
            {completedTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
