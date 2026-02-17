import { useState, useCallback } from 'react';
import type { Supervisor, SupervisorFormData, ApiResponse } from '../types';

// Mock service - Replace with actual API calls
const mockCreateSupervisor = async (data: SupervisorFormData): Promise<ApiResponse<Supervisor>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSupervisor: Supervisor = {
        id: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
        nombre: data.nombre,
        apellido: data.apellido,
        id_contacto: parseInt(data.id_contacto),
        id_centro_trabajo: data.id_centro_trabajo ? parseInt(data.id_centro_trabajo) : null,
        estado: data.estado,
        fecha_creacion: new Date().toISOString(),
        nombre_contacto: `${data.nombre} ${data.apellido}`,
        nombre_centro: data.id_centro_trabajo ? `Centro ${data.id_centro_trabajo}` : 'Sin asignar',
      };
      
      resolve({
        data: newSupervisor,
        success: true,
        message: 'Supervisor creado exitosamente',
      });
    }, 500);
  });
};

const mockUpdateSupervisor = async (id: number, data: SupervisorFormData): Promise<ApiResponse<Supervisor>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSupervisor: Supervisor = {
        id,
        nombre: data.nombre,
        apellido: data.apellido,
        id_contacto: parseInt(data.id_contacto),
        id_centro_trabajo: data.id_centro_trabajo ? parseInt(data.id_centro_trabajo) : null,
        estado: data.estado,
        fecha_creacion: new Date().toISOString(),
        nombre_contacto: `${data.nombre} ${data.apellido}`,
        nombre_centro: data.id_centro_trabajo ? `Centro ${data.id_centro_trabajo}` : 'Sin asignar',
      };
      
      resolve({
        data: updatedSupervisor,
        success: true,
        message: 'Supervisor actualizado exitosamente',
      });
    }, 500);
  });
};

const mockDeleteSupervisor = async (id: number): Promise<ApiResponse<boolean>> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: true,
        success: true,
        message: 'Supervisor eliminado exitosamente',
      });
    }, 500);
  });
};

export const useSupervisores = (initialData: Supervisor[] = []) => {
  const [supervisores, setSupervisores] = useState<Supervisor[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createSupervisor = useCallback(async (data: SupervisorFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await mockCreateSupervisor(data);
      if (response.success && response.data) {
        setSupervisores(prev => [...prev, response.data as Supervisor]);
      }
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el supervisor';
      setError(errorMessage);
      return { success: false, message: errorMessage } as ApiResponse<null>;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSupervisor = useCallback(async (id: number, data: SupervisorFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await mockUpdateSupervisor(id, data);
      if (response.success && response.data) {
        setSupervisores(prev => 
          prev.map(supervisor => 
            supervisor.id === id ? response.data as Supervisor : supervisor
          )
        );
      }
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el supervisor';
      setError(errorMessage);
      return { success: false, message: errorMessage } as ApiResponse<null>;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSupervisor = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await mockDeleteSupervisor(id);
      if (response.success) {
        setSupervisores(prev => prev.filter(supervisor => supervisor.id !== id));
      }
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el supervisor';
      setError(errorMessage);
      return { success: false, message: errorMessage } as ApiResponse<null>;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    supervisores,
    loading,
    error,
    createSupervisor,
    updateSupervisor,
    deleteSupervisor,
  };
};
