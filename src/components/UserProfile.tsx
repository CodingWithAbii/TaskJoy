import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { t } from '@/lib/i18n';

interface UserProfileProps {
  totalPoints: number;
}

const POINTS_PER_LEVEL = 100;

export const UserProfile = ({ totalPoints }: UserProfileProps) => {
  const level = Math.floor(totalPoints / POINTS_PER_LEVEL) + 1;
  const pointsForCurrentLevel = totalPoints % POINTS_PER_LEVEL;
  const progressPercentage = (pointsForCurrentLevel / POINTS_PER_LEVEL) * 100;

  return (
    <Card className="w-full border-2 border-primary/20 shadow-lg">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{t('user_profile.total_points')}</div>
        <div className="text-4xl font-bold text-primary">{totalPoints}</div>
        <div className="mt-2">
           <div className="flex justify-between items-baseline mb-1">
             <span className="text-sm font-medium text-muted-foreground">{t('user_profile.level')} {level}</span>
             <span className="text-xs text-muted-foreground">{pointsForCurrentLevel} / {POINTS_PER_LEVEL}</span>
           </div>
           <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
