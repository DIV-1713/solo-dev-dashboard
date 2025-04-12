
import { useState } from 'react';
import { Task } from '@/lib/types';
import { formatDate, isOverdue } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Trash2, Edit, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  const handleToggle = () => {
    onUpdate(task.id, { completed: !task.completed });
  };
  
  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, { title: editedTitle.trim() });
      setIsEditing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editedTitle.trim()) {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const isTaskOverdue = isOverdue(task.dueDate) && !task.completed;
  
  return (
    <div className="group flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 transition-colors">
      <Checkbox 
        id={`task-${task.id}`}
        checked={task.completed} 
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className="h-8 flex-1"
            autoFocus
          />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleSaveEdit}
            className="h-8 w-8"
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <label 
            htmlFor={`task-${task.id}`} 
            className={cn(
              "flex-1 cursor-pointer truncate",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </label>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              className="h-7 w-7"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => onDelete(task.id)}
              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      )}
      
      {task.dueDate && (
        <div className={cn(
          "hidden md:flex items-center gap-1 text-xs",
          isTaskOverdue ? "text-destructive" : "text-muted-foreground"
        )}>
          <Calendar className="h-3 w-3" />
          <span>{formatDate(task.dueDate, 'MMM d')}</span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
