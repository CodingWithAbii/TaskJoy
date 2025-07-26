'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Task, Achievement } from '@/lib/types';
import { ACHIEVEMENT_LIST } from '@/lib/data';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Achievements } from '@/components/Achievements';
import { UserProfile } from '@/components/UserProfile';
import { TaskJoyLogo } from '@/components/TaskJoyLogo';
import { useToast } from "@/hooks/use-toast"
import { Confetti } from '@/components/Confetti';
import { t } from '@/lib/i18n';
import { getInitialTasks } from '@/lib/data';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedTasks = localStorage.getItem('taskjoy_tasks');
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks, (key, value) => {
        if (key === 'dueDate' && value) {
          return new Date(value);
        }
        return value;
      });
      setTasks(parsedTasks);
    } else {
      setTasks(getInitialTasks(t));
    }

    const storedAchievements = localStorage.getItem('taskjoy_achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    } else {
      setAchievements(ACHIEVEMENT_LIST(t));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('taskjoy_tasks', JSON.stringify(tasks));
    const newTotalPoints = tasks
      .filter((task) => task.completed)
      .reduce((sum, task) => sum + task.points, 0);
    setTotalPoints(newTotalPoints);
    checkAndUnlockAchievements();
  }, [tasks]);

  useEffect(() => {
     localStorage.setItem('taskjoy_achievements', JSON.stringify(achievements));
  }, [achievements]);


  const checkAndUnlockAchievements = () => {
    const newAchievements = [...achievements];
    let newAchievementUnlocked = false;

    newAchievements.forEach((ach) => {
      if (!ach.unlocked) {
        const isUnlocked = ach.check(tasks, newAchievements);
        if (isUnlocked) {
          ach.unlocked = true;
          newAchievementUnlocked = true;
          toast({
            title: t('achievement.unlocked.title'),
            description: `${ach.name}`,
            className: 'bg-accent text-accent-foreground border-accent-foreground/20',
          });
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    });

    if (newAchievementUnlocked) {
      setAchievements(newAchievements);
    }
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast({
      title: t('task.added.title'),
      description: t('task.added.description', { title: task.title }),
    });
  };

  const handleToggleTask = (taskId: string) => {
    let taskTitle = "";
    let taskPoints = 0;
    
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const wasCompleted = task.completed;
          const isNowCompleted = !wasCompleted;
          if (isNowCompleted) {
            taskTitle = task.title;
            taskPoints = task.points;
          }
          return { ...task, completed: isNowCompleted };
        }
        return task;
      })
    );

    if (taskTitle) {
       toast({
        title: t('task.completed.title'),
        description: t('task.completed.description', { title: taskTitle, points: taskPoints }),
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
        title: t('task.deleted.title'),
        variant: "destructive"
    })
  };

  const completedTasksCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  const totalTasksCount = tasks.length;

  return (
    <>
      {showConfetti && <Confetti />}
      <main className="container mx-auto p-4 md:p-8 font-body">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <TaskJoyLogo className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl font-bold font-headline text-primary">TaskJoy</h1>
              <p className="text-muted-foreground">{t('app.tagline')}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <UserProfile totalPoints={totalPoints} />
            <Achievements 
              achievements={achievements} 
              completedTasksCount={completedTasksCount}
              totalTasksCount={totalTasksCount}
            />
          </div>
        </div>
      </main>
    </>
  );
}