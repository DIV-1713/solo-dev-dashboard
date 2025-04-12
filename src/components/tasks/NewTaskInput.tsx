
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NewTaskInputProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

const NewTaskInput = ({ onAdd, onCancel }: NewTaskInputProps) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    } else {
      onCancel();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 h-9"
      />
      <div className="flex gap-1.5">
        <Button type="submit" size="sm" disabled={!title.trim()}>
          Add
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewTaskInput;
