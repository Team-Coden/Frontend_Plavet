"use client";

import { Card, CardContent } from "../../../../shared/components/ui/card";
import { Users, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import type { UsuarioStats } from "../types";

export const UsuarioStatsCards = ({ stats }: { stats: UsuarioStats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Usuarios</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-slate-100">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activos */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Activos</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.activos}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inactivos */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inactivos</p>
              <p className="text-2xl font-bold text-gray-500 mt-1">{stats.inactivos}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100">
              <XCircle className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles únicos */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Roles en uso</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.rolesUnicos}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
