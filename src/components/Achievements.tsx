'use client';
import type { Achievement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { t } from '@/lib/i18n';

interface AchievementsProps {
  achievements: Achievement[];
  completedTasksCount: number;
  totalTasksCount: number;
}

export const Achievements = ({ achievements, completedTasksCount, totalTasksCount }: AchievementsProps) => {
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const progress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <Card>
       <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t('achievements.progress')}</span>
          <span className="text-sm font-normal text-muted-foreground">{completedTasksCount} / {totalTasksCount}</span>
        </CardTitle>
         <Progress value={progress} />
      </CardHeader>
      <CardContent>
         <h3 className="mb-4 text-lg font-semibold leading-none tracking-tight">{t('achievements.title')}</h3>
        {unlockedAchievements.length > 0 ? (
          <TooltipProvider>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-4">
              {unlockedAchievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <Tooltip key={ach.id} delayDuration={100}>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center text-center">
                        <div className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 border-2 border-accent text-accent transition-all duration-300 transform "
                          )}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      <p className="font-bold">{ach.name}</p>
                      <p>{ach.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        ) : (
          <p className="text-sm text-muted-foreground">{t('achievements.none')}</p>
        )}
      </CardContent>
    </Card>
  );
};
