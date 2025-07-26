import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskItem } from './TaskItem';
import { ScrollArea } from './ui/scroll-area';
import { t } from '@/lib/i18n';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('task_list.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p className="font-semibold">{t('task_list.no_tasks_title')}</p>
            <p className="text-sm">{t('task_list.no_tasks_description')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">{t('task_list.active')}</h3>
                    {activeTasks.map((task) => (
                        <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
                    ))}
                </div>
            )}
            
            {completedTasks.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">{t('task_list.completed')}</h3>
                    <ScrollArea className="h-full max-h-60">
                      <div className="space-y-2 pr-4">
                        {completedTasks.map((task) => (
                            <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
                        ))}
                      </div>
                    </ScrollArea>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
