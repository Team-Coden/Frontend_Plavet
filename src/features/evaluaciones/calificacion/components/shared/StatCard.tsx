import { Card, CardContent } from "../../../../../shared/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export function StatCard({ title, value, icon: Icon, iconBgColor, iconColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
