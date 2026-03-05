import { useState } from "react";
import type { EvaluacionForm, Estudiante, Empresa } from "../types";

export type { EvaluacionForm, Estudiante, Empresa };

export const useEvaluacion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);
  
  const [evaluationForm, setEvaluationForm] = useState<EvaluacionForm>({
    identidadTitulo: "Desarrollo y administración de aplicaciones informáticas",
    codigoTitulo: "IFC006_3",
    nombreApellidos: "",
    horario: "",
    direccion: "",
    telefonos: "",
    fechaInicioPasantia: "",
    fechaTerminoPasantia: "",
    
    // Datos de la empresa
    centroTrabajo: "",
    direccionEmpresa: "",
    telefonosEmpresa: "",
    personaContacto: "",
    nombreTutor: "",
    telefonosCorreoTutor: "",
    
    // Evaluación por semanas (Capacidades)
    conocimientosTeoricos: Array(12).fill(""),
    asimilacionInstruccionesVerbales: Array(12).fill(""),
    asimilacionInstruccionesEscritas: Array(12).fill(""),
    asimilacionInstruccionesSimbolicas: Array(12).fill(""),
    subtotalCapacidad: Array(12).fill(""),
    
    // Evaluación por semanas (Habilidades)
    organizacionPlanificacion: Array(12).fill(""),
    metodo: Array(12).fill(""),
    ritmoTrabajo: Array(12).fill(""),
    trabajoRealizado: Array(12).fill(""),
    subtotalHabilidad: Array(12).fill(""),
    
    // Evaluación por semanas (Actitudes)
    iniciativa: Array(12).fill(""),
    trabajoEquipo: Array(12).fill(""),
    puntualidadAsistencia: Array(12).fill(""),
    responsabilidad: Array(12).fill(""),
    subtotalActitud: Array(12).fill(""),
    total: Array(12).fill(""),
    
    // Promedios y nota final
    promedioCapacidades: "",
    promedioHabilidades: "",
    promedioActitudes: "",
    notaFinal: "",
    
    // Observaciones
    observaciones: "",
    
    // Firmas
    firmaTutorCentro: "",
    firmaTutorEducativo: "",
    fechaFirma: ""
  });

  // Validación de pasos
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Datos Personales
        return !!(evaluationForm.nombreApellidos && 
                  evaluationForm.horario && 
                  evaluationForm.direccion && 
                  evaluationForm.telefonos &&
                  evaluationForm.fechaInicioPasantia &&
                  evaluationForm.fechaTerminoPasantia);
      
      case 2: // Datos Empresa
        return !!(evaluationForm.centroTrabajo && 
                  evaluationForm.direccionEmpresa && 
                  evaluationForm.telefonosEmpresa &&
                  evaluationForm.personaContacto &&
                  evaluationForm.nombreTutor &&
                  evaluationForm.telefonosCorreoTutor);
      
      case 3: // Evaluación completa
        // Always allow progression - no validation required for data entry
        return true;
      
      case 4: // Observaciones y Firmas
        return !!(evaluationForm.observaciones && 
                  evaluationForm.firmaTutorCentro && 
                  evaluationForm.firmaTutorEducativo && 
                  evaluationForm.fechaFirma);
      
      default:
        return false;
    }
  };

  // Navegación entre pasos
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowConfirmDialog(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Confirmar envío
  const confirmSubmit = () => {
    console.log("[v0] Evaluación completa enviada:", evaluationForm);
    
    // Guardar datos de la evaluación para calificaciones
    const evaluacionData = {
      estudiante: evaluationForm.nombreApellidos,
      empresa: evaluationForm.centroTrabajo,
      promedioCapacidades: evaluationForm.promedioCapacidades,
      promedioHabilidades: evaluationForm.promedioHabilidades,
      promedioActitudes: evaluationForm.promedioActitudes,
      notaFinal: evaluationForm.notaFinal,
      fechaEvaluacion: new Date().toISOString().split('T')[0],
      evaluacionCompleta: evaluationForm
    };
    
    // Guardar en localStorage para que el módulo de calificaciones pueda acceder
    localStorage.setItem('ultimaEvaluacion', JSON.stringify(evaluacionData));
    
    setShowConfirmDialog(false);
    
    // Redirigir directamente a calificación
    window.location.href = '/calificaciones';
  };

  // Resetear formulario
  const resetForm = () => {
    setEvaluationForm({
      identidadTitulo: "Desarrollo y administración de aplicaciones informáticas",
      codigoTitulo: "IFC006_3",
      nombreApellidos: "",
      horario: "",
      direccion: "",
      telefonos: "",
      fechaInicioPasantia: "",
      fechaTerminoPasantia: "",
      centroTrabajo: "",
      direccionEmpresa: "",
      telefonosEmpresa: "",
      personaContacto: "",
      nombreTutor: "",
      telefonosCorreoTutor: "",
      conocimientosTeoricos: Array(12).fill(""),
      asimilacionInstruccionesVerbales: Array(12).fill(""),
      asimilacionInstruccionesEscritas: Array(12).fill(""),
      asimilacionInstruccionesSimbolicas: Array(12).fill(""),
      subtotalCapacidad: Array(12).fill(""),
      organizacionPlanificacion: Array(12).fill(""),
      metodo: Array(12).fill(""),
      ritmoTrabajo: Array(12).fill(""),
      trabajoRealizado: Array(12).fill(""),
      subtotalHabilidad: Array(12).fill(""),
      iniciativa: Array(12).fill(""),
      trabajoEquipo: Array(12).fill(""),
      puntualidadAsistencia: Array(12).fill(""),
      responsabilidad: Array(12).fill(""),
      subtotalActitud: Array(12).fill(""),
      total: Array(12).fill(""),
      promedioCapacidades: "",
      promedioHabilidades: "",
      promedioActitudes: "",
      notaFinal: "",
      observaciones: "",
      firmaTutorCentro: "",
      firmaTutorEducativo: "",
      fechaFirma: ""
    });
    setCurrentStep(1);
    setEstudianteSeleccionado(null);
    setEmpresaSeleccionada(null);
  };

  // Manejar selección de estudiante
  const handleEstudianteSelect = (estudiante: Estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setEvaluationForm({
      ...evaluationForm,
      nombreApellidos: estudiante.nombreCompleto
    });
  };

  // Manejar selección de empresa
  const handleEmpresaSelect = (empresa: Empresa) => {
    setEmpresaSeleccionada(empresa);
    setEvaluationForm({
      ...evaluationForm,
      centroTrabajo: empresa.razonSocial,
      direccionEmpresa: empresa.direccion
    });
  };

  return {
    // Estado
    currentStep,
    showConfirmDialog,
    estudianteSeleccionado,
    empresaSeleccionada,
    evaluationForm,
    
    // Acciones
    nextStep,
    prevStep,
    confirmSubmit,
    resetForm,
    handleEstudianteSelect,
    handleEmpresaSelect,
    setShowConfirmDialog,
    setEvaluationForm,
    
    // Utilidades
    validateStep
  };
};
