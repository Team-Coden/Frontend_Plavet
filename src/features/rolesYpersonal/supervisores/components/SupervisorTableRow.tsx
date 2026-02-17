import { TableCell, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { Supervisor } from "../types";

interface SupervisorTableRowProps {
  supervisor: Supervisor;
  onView: (supervisor: Supervisor) => void;
  onEdit: (supervisor: Supervisor) => void;
  onDelete: (supervisor: Supervisor) => void;
}

const statusStyles: Record<string, string> = {
  activo: "bg-green-100 text-green-700 hover:bg-green-200",
  inactivo: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  pendiente: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
};

export function SupervisorTableRow({ supervisor, onView, onEdit, onDelete }: SupervisorTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {supervisor.nombre} {supervisor.apellido}
      </TableCell>
      <TableCell>{supervisor.nombre_contacto || 'N/A'}</TableCell>
      <TableCell>{supervisor.nombre_centro || 'Sin asignar'}</TableCell>
      <TableCell>
        <Badge className={`${statusStyles[supervisor.estado] || 'bg-gray-100'} capitalize`}>
          {supervisor.estado}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(supervisor.fecha_creacion).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onView(supervisor)}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(supervisor)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => onDelete(supervisor)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
