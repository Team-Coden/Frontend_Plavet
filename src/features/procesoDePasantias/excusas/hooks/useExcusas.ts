'use client';

import { useState, useMemo } from "react";
import type { Excuse, ExcuseFormData, ExcuseFilters } from "../types";

const MOCK_EXCUSES: Excuse[] = [
  {
    id: "EXC001",
    pasantia: "Pasantía Desarrollo Web",
    estudiante: "Juan Pérez",
    tutor: "María González",
    justificacion: "Cita médica programada",
    certificado: "certificado_medico.pdf",
    fecha: "2024-01-15",
    estado: "Aprobada",
  },
  {
    id: "EXC002",
    pasantia: "Pasantía Marketing Digital",
    estudiante: "Ana Martínez",
    tutor: "Carlos Ruiz",
    justificacion: "Emergencia familiar",
    certificado: "justificacion.pdf",
    fecha: "2024-01-14",
    estado: "Pendiente",
  },
  {
    id: "EXC003",
    pasantia: "Pasantía Gestión",
    estudiante: "Pedro López",
    tutor: "Laura Sánchez",
    justificacion: "Problemas de transporte",
    certificado: "carta_excusa.pdf",
    fecha: "2024-01-13",
    estado: "Rechazada",
  },
];

export const useExcusas = () => {
  const [excuses, setExcuses] = useState<Excuse[]>(MOCK_EXCUSES);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filters, setFilters] = useState<ExcuseFilters>({
    searchTerm: "",
    filterEstado: "all",
  });
  const [formData, setFormData] = useState<ExcuseFormData>({
    pasantia: "",
    estudiante: "",
    tutor: "",
    justificacion: "",
  });

  const filteredExcuses = useMemo(() => {
    const filtered = excuses.filter((excuse) => {
      const matchesSearch =
        excuse.pasantia.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        excuse.estudiante.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        excuse.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesEstado = filters.filterEstado === "all" || excuse.estado === filters.filterEstado;
      return matchesSearch && matchesEstado;
    });
    console.log("[DEBUG] Filtros:", filters);
    console.log("[DEBUG] Excusas filtradas:", filtered);
    return filtered;
  }, [excuses, filters]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      console.log("[v0] Archivo seleccionado:", file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pasantia || !formData.estudiante || !formData.tutor || !formData.justificacion) {
      console.log("[v0] Por favor complete todos los campos obligatorios");
      return;
    }

    // Generate new ID
    const newId = `EXC${String(excuses.length + 1).padStart(3, '0')}`;
    
    // Create new excuse
    const newExcuse: Excuse = {
      id: newId,
      pasantia: formData.pasantia,
      estudiante: formData.estudiante,
      tutor: formData.tutor,
      justificacion: formData.justificacion,
      certificado: selectedFile ? selectedFile.name : "certificado.pdf",
      fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      estado: "Pendiente", // New excuses start as pending
    };

    // Add to excuses list
    setExcuses(prev => [newExcuse, ...prev]);

    // Reset form
    setFormData({
      pasantia: "",
      estudiante: "",
      tutor: "",
      justificacion: "",
    });
    setSelectedFile(null);

    console.log("[v0] Nueva excusa enviada:", newExcuse);
    console.log(`[v0] Excusa ${newId} enviada correctamente`);
  };

  const updateFormData = (data: Partial<ExcuseFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updateFilters = (data: Partial<ExcuseFilters>) => {
    setFilters(prev => ({ ...prev, ...data }));
  };

  const handleEditExcuse = (id: string, data: Partial<Excuse>) => {
    console.log("[v0] Editando excusa:", id, data);
    // Aquí iría la lógica para actualizar la excusa en el estado o API
    console.log(`[v0] Excusa ${id} actualizada correctamente`);
  };

  const handleDeleteExcuse = (id: string) => {
    console.log("[v0] Eliminando excusa:", id);
    setExcuses(prev => prev.filter(excuse => excuse.id !== id));
    console.log(`[v0] Excusa ${id} eliminada correctamente`);
  };

  const getEstadoBadge = (estado: string) => {
    const styles = {
      "Aprobada": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Completada": "bg-blue-50 text-blue-700 border-blue-200",
      "Rechazada": "bg-red-50 text-red-700 border-red-200",
      "Pendiente": "bg-amber-50 text-amber-700 border-amber-200",
    };
    const icons = {
      "Aprobada": "✓",
      "Completada": "✓",
      "Rechazada": "✗",
      "Pendiente": "⏳",
    };
    
    return {
      className: styles[estado as keyof typeof styles] || "bg-gray-50 text-gray-700 border-gray-200",
      text: estado,
      icon: icons[estado as keyof typeof icons] || "•"
    };
  };

  return {
    // Data
    excuses,
    filteredExcuses,
    selectedFile,
    formData,
    filters,
    
    // Actions
    handleFileChange,
    handleSubmit,
    updateFormData,
    updateFilters,
    handleEditExcuse,
    handleDeleteExcuse,
    getEstadoBadge,
  };
};
