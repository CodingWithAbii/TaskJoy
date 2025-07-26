import type { Task, Achievement } from './types';
import { Award, Target, Zap, Rocket, CalendarClock, ShieldCheck } from 'lucide-react';
import type { TFunction } from 'i18next';

export const getInitialTasks = (t: TFunction): Task[] => [
  { id: '1', title: t('initial_tasks.task1'), completed: true, points: 5 },
  { id: '2', title: t('initial_tasks.task2'), completed: false, points: 10, priority: 'medium' },
  { id: '3', title: t('initial_tasks.task3'), completed: false, points: 100, priority: 'high', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)) },
  { id: '4', title: t('initial_tasks.task4'), completed: false, points: 20, priority: 'low' },
];

export const ACHIEVEMENT_LIST = (t: TFunction): Achievement[] => [
  {
    id: 'FIRST_STEP',
    name: t('achievements.first_step.name'),
    description: t('achievements.first_step.description'),
    unlocked: false,
    icon: Target,
    check: (tasks) => tasks.filter(t => t.completed).length >= 1,
  },
  {
    id: 'SERIAL_COMPLETER',
    name: t('achievements.serial_completer.name'),
    description: t('achievements.serial_completer.description'),
    unlocked: false,
    icon: Zap,
    check: (tasks) => tasks.filter(t => t.completed).length >= 5,
  },
  {
    id: 'MARATHONER',
    name: t('achievements.marathoner.name'),
    description: t('achievements.marathoner.description'),
    unlocked: false,
    icon: Rocket,
    check: (tasks) => tasks.filter(t => t.completed).length >= 25,
  },
   {
    id: 'PLANNER',
    name: t('achievements.planner.name'),
    description: t('achievements.planner.description'),
    unlocked: false,
    icon: CalendarClock,
    check: (tasks) => tasks.filter(t => t.dueDate).length >= 5,
  },
  {
    id: 'PRIORITY_CHAMPION',
    name: t('achievements.priority_champion.name'),
    description: t('achievements.priority_champion.description'),
    unlocked: false,
    icon: ShieldCheck,
    check: (tasks) => tasks.filter(t => t.completed && t.priority === 'high').length >= 5,
  },
  {
    id: 'MASTER_OF_PRODUCTIVITY',
    name: t('achievements.master_of_productivity.name'),
    description: t('achievements.master_of_productivity.description'),
    unlocked: false,
    icon: Award,
    check: (tasks) => tasks.length > 0 && tasks.every(t => t.completed),
  },
];
