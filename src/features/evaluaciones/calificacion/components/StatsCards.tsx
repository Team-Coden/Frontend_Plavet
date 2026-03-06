import { GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react";
import type { CalificacionStats } from "../types";
import { StatCard } from "./shared";

interface StatsCardsProps {
  stats: CalificacionStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Evaluaciones"
        value={stats.total}
        icon={GraduationCap}
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
      />
      
      <StatCard
        title="Promedio General"
        value={stats.promedioGeneral}
        icon={TrendingUp}
        iconBgColor="bg-green-100 dark:bg-green-900/30"
        iconColor="text-green-600 dark:text-green-400"
      />
      
      <StatCard
        title="Aprobados"
        value={stats.aprobados}
        icon={Award}
        iconBgColor="bg-emerald-100 dark:bg-emerald-900/30"
        iconColor="text-emerald-600 dark:text-emerald-400"
      />
      
      <StatCard
        title="Reprobados"
        value={stats.reprobados}
        icon={BookOpen}
        iconBgColor="bg-red-100 dark:bg-red-900/30"
        iconColor="text-red-600 dark:text-red-400"
      />
    </div>
  );
}
