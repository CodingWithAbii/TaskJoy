import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { MoreVertical, Trash2, Calendar, Star, Flag } from 'lucide-react';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { t } from '@/lib/i18n';

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem = ({ task, onToggleTask, onDeleteTask }: TaskItemProps) => {

  const priorityMap = {
    low: { label: t('priority.low'), className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: <Flag className="h-3 w-3" /> },
    medium: { label: t('priority.medium'), className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: <Flag className="h-3 w-3" /> },
    high: { label: t('priority.high'), className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: <Flag className="h-3 w-3" /> },
  };

  return (
    <div className={cn(
        "flex items-center p-3 rounded-lg border transition-all duration-200",
        task.completed ? "bg-muted/50 border-dashed" : "bg-card hover:border-primary/50"
    )}>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleTask(task.id)}
        className="mr-4"
        aria-label={t('task.toggle_aria_label', { title: task.title, status: task.completed ? t('task.status_incomplete') : t('task.status_complete') })}
      />
      <div className="flex-1">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            'font-medium transition-colors',
            task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
          )}
        >
          {task.title}
        </label>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500"/> {task.points} {t('task.points')}
            </Badge>
          {task.priority && (
            <Badge variant="outline" className={cn('flex items-center gap-1 border-0', priorityMap[task.priority].className)}>
              {priorityMap[task.priority].icon}
              {priorityMap[task.priority].label}
            </Badge>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(task.dueDate, { addSuffix: true, locale: enUS })}</span>
            </div>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">{t('task.more_options')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onDeleteTask(task.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>{t('task.delete')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
