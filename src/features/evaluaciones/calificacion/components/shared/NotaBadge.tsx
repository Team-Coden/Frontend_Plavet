import { Badge } from "../../../../../shared/components/ui/badge";
import { getNotaBadgeConfig } from "../../utils";

interface NotaBadgeProps {
  notaFinal: string;
}

export function NotaBadge({ notaFinal }: NotaBadgeProps) {
  const badgeConfig = getNotaBadgeConfig(notaFinal);
  
  return (
    <Badge className={badgeConfig.className}>
      {badgeConfig.label}
    </Badge>
  );
}
