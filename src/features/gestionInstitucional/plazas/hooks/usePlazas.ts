'use client';

import { useState, useMemo } from "react";
import type { Plaza, PlazaStats } from "../types";
import { TALLERES } from "../types";

const centrosDisponibles = ["Centro Norte", "Taller Central", "Planta 1"];
const titulosDisponibles = ["Desarrollador", "Analista", "Operario", "Supervisor"];

export const usePlazas = (initialData: Plaza[]) => {
  const [plazas, setPlazas] = useState<Plaza[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [filterTaller, setFilterTaller] = useState<string>("todos");

  const filteredPlazas = useMemo(() => {
    return plazas.filter((plaza) => {
      const matchesSearch =
        plaza.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plaza.centro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plaza.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plaza.taller &&
          plaza.taller.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTab =
        activeTab === "todas" ||
        plaza.estado.toLowerCase() === activeTab.toLowerCase();

      const matchesFilter =
        filterEstado === "todos" || plaza.estado === filterEstado;

      const matchesTaller =
        filterTaller === "todos" || plaza.taller === filterTaller;

      return matchesSearch && matchesTab && matchesFilter && matchesTaller;
    });
  }, [plazas, searchTerm, activeTab, filterEstado, filterTaller]);

  const stats = useMemo(
    (): PlazaStats => ({
      total: plazas.length,
      activas: plazas.filter((p) => p.estado === "Activa").length,
      ocupadas: plazas.filter((p) => p.estado === "Ocupada").length,
      cerradas: plazas.filter((p) => p.estado === "Cerrada").length,
    }),
    [plazas]
  );

  const addPlaza = (newPlaza: Omit<Plaza, "id" | "fechaCreacion">) => {
    const plaza: Plaza = {
      ...newPlaza,
      id: Date.now(),
      fechaCreacion: new Date().toISOString().split("T")[0],
    };
    setPlazas([...plazas, plaza]);
  };

  const updatePlaza = (updatedPlaza: Plaza) => {
    setPlazas(plazas.map((p) => (p.id === updatedPlaza.id ? updatedPlaza : p)));
  };

  const deletePlaza = (id: number) => {
    setPlazas(plazas.filter((p) => p.id !== id));
  };

  return {
    plazas,
    filteredPlazas,
    stats,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filterEstado,
    setFilterEstado,
    filterTaller,
    setFilterTaller,
    talleresDisponibles: TALLERES as unknown as string[],
    addPlaza,
    updatePlaza,
    deletePlaza,
    centrosDisponibles,
    titulosDisponibles,
  };
};
