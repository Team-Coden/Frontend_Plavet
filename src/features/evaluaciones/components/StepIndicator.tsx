import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  step: number;
  title: string;
  completed: boolean;
  current?: boolean;
}

export function StepIndicator({ step, title, completed, current = false }: StepIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
          completed
            ? "bg-primary text-primary-foreground"
            : current
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {completed ? "✓" : step}
      </div>
      <span
        className={cn(
          "text-sm font-medium hidden sm:block",
          completed || current ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {title}
      </span>
    </div>
  );
}
