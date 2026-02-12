import type { Excuse, ExcuseFormData } from "../types";

export class ExcusaService {
  static async getAllExcuses(): Promise<Excuse[]> {
    // Simulación de llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
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
  }

  static async createExcuse(excuseData: ExcuseFormData & { certificado?: File }): Promise<{ success: boolean; message?: string }> {
    // Simulación de creación de excusa
    console.log("Creating excuse with data:", excuseData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: "Excusa creada exitosamente"
    };
  }

  static async updateExcuseStatus(id: string, status: string): Promise<{ success: boolean; message?: string }> {
    // Simulación de actualización de estado
    console.log(`Updating excuse ${id} to status: ${status}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: `Estado actualizado a ${status}`
    };
  }

  static async deleteExcuse(id: string): Promise<{ success: boolean; message?: string }> {
    // Simulación de eliminación
    console.log(`Deleting excuse with id: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: "Excusa eliminada exitosamente"
    };
  }

  static async downloadCertificate(id: string): Promise<{ success: boolean; data?: string; message?: string }> {
    // Simulación de descarga de certificado
    console.log(`Downloading certificate for excuse: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: "contenido-del-certificado-pdf",
      message: "Certificado descargado exitosamente"
    };
  }
}
