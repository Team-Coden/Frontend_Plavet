// ==========================================
// Tipos para el Módulo de Evaluaciones
// ==========================================

export interface Estudiante {
  id: string;
  cedula: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  direccion: string;
  carrera: string;
  semestre: number;
  promedioGeneral: number;
  estado: 'Activo' | 'Inactivo' | 'Graduado';
  fechaIngreso: string;
  identidadTitulo: string;
  codigoTitulo: string;
  horario: string;
}

export interface Empresa {
  id: string;
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  tipoEmpresa: string;
  sector: string;
  tamano: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente' | 'Suspendido';
  telefono: string;
  email: string;
  website?: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  contactos: Contacto[];
  descripcion?: string;
  servicios?: string;
  productos?: string;
  anosOperacion?: number;
  representanteLegal?: string;
  cedulaRepresentante?: string;
  cantidadPracticas: number;
  cantidadPracticasActivas: number;
  ultimaPractica?: string;
  observaciones?: string;
}

export interface Contacto {
  id: string;
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  extension?: string;
  esPrincipal: boolean;
}
