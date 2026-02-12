"use client";

import { Card, CardContent } from "../../../../shared/components/ui/card";
import { Briefcase, CheckCircle, GraduationCap, Clock, XCircle } from "lucide-react";
import type { PasantiaStats } from "../types";

export const StatsCards = ({ stats }: { stats: PasantiaStats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Total */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pasantías</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-slate-100">
              <Briefcase className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activas */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Activas</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.activas}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completadas */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completadas</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completadas}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pendientes */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pendientes}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suspendidas */}
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Suspendidas</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.suspendidas}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
