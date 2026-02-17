import type { Supervisor, SupervisorFormData, ApiResponse, PaginatedResponse } from '../types';

// Mock data for development
const mockSupervisores: Supervisor[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    id_contacto: 1,
    fecha_creacion: '2024-01-01T00:00:00.000Z',
    id_centro_trabajo: 1,
    estado: 'activo',
    nombre_contacto: 'Juan Pérez',
    nombre_centro: 'Centro Principal'
  },
  // Add more mock data as needed
];

export const getSupervisores = async (): Promise<PaginatedResponse<Supervisor>> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockSupervisores,
        success: true,
        pagination: {
          page: 1,
          pageSize: 10,
          total: mockSupervisores.length,
          totalPages: 1
        }
      });
    }, 500);
  });
};

export const createSupervisor = async (data: SupervisorFormData): Promise<ApiResponse<Supervisor>> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSupervisor: Supervisor = {
        id: Math.floor(Math.random() * 1000) + 10, // Generate a random ID
        nombre: data.nombre,
        apellido: data.apellido,
        id_contacto: parseInt(data.id_contacto),
        id_centro_trabajo: data.id_centro_trabajo ? parseInt(data.id_centro_trabajo) : null,
        estado: data.estado,
        fecha_creacion: new Date().toISOString(),
        nombre_contacto: `${data.nombre} ${data.apellido}`,
        nombre_centro: data.id_centro_trabajo ? `Centro ${data.id_centro_trabajo}` : 'Sin asignar'
      };
      
      mockSupervisores.push(newSupervisor);
      
      resolve({
        data: newSupervisor,
        success: true,
        message: 'Supervisor creado exitosamente'
      });
    }, 500);
  });
};

export const updateSupervisor = async (id: number, data: SupervisorFormData): Promise<ApiResponse<Supervisor>> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSupervisores.findIndex(s => s.id === id);
      if (index !== -1) {
        const updatedSupervisor = {
          ...mockSupervisores[index],
          ...data,
          id_contacto: parseInt(data.id_contacto),
          id_centro_trabajo: data.id_centro_trabajo ? parseInt(data.id_centro_trabajo) : null,
          nombre_contacto: `${data.nombre} ${data.apellido}`,
          nombre_centro: data.id_centro_trabajo ? `Centro ${data.id_centro_trabajo}` : 'Sin asignar'
        };
        
        mockSupervisores[index] = updatedSupervisor;
        
        resolve({
          data: updatedSupervisor,
          success: true,
          message: 'Supervisor actualizado exitosamente'
        });
      } else {
        resolve({
          data: {} as Supervisor,
          success: false,
          message: 'Supervisor no encontrado'
        });
      }
    }, 500);
  });
};

export const deleteSupervisor = async (id: number): Promise<ApiResponse<boolean>> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockSupervisores.findIndex(s => s.id === id);
      if (index !== -1) {
        // Soft delete
        mockSupervisores[index].deletedAt = new Date().toISOString();
        
        resolve({
          data: true,
          success: true,
          message: 'Supervisor eliminado exitosamente'
        });
      } else {
        resolve({
          data: false,
          success: false,
          message: 'Supervisor no encontrado'
        });
      }
    }, 500);
  });
};
