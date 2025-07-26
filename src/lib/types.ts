import type { LucideIcon } from 'lucide-react';

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  points: number;
  dueDate?: Date;
  priority?: Priority;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: LucideIcon;
  check: (tasks: Task[], achievements: Achievement[]) => boolean;
};
