"use client";

import { useState } from "react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Textarea } from "../../../shared/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { FileText, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"
import Main from "@/features/main/pages/page"
import { SearchSelect } from "../components"
import type { Estudiante, Empresa } from "../types"

// Componente de paso fuera del render
const StepIndicator = ({ step, title, completed }: { step: number; title: string; completed: boolean }) => (
  <div className="flex items-center">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
      completed 
        ? "bg-green-500 text-white" 
        : completed !== undefined && completed
          ? "bg-green-500 text-white"
          : "bg-muted text-muted-foreground"
    }`}>
      {completed ? <CheckCircle className="h-4 w-4" /> : step}
    </div>
    <span className={`ml-2 text-sm ${completed !== undefined && completed ? "font-medium" : "text-muted-foreground"}`}>
      {title}
    </span>
  </div>
);

export default function EvaluacionesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Empresa | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [evaluationForm, setEvaluationForm] = useState({
    // Datos personales y académicos
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
  })

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

  const confirmSubmit = () => {
    console.log("[v0] Evaluación completa enviada:", evaluationForm);
    
    // Mostrar la calificación enviada
    const mensajeCalificacion = `
EVALUACIÓN ENVIADA EXITOSAMENTE

📋 DATOS DEL ESTUDIANTE:
${evaluationForm.nombreApellidos || 'No especificado'}

📊 CALIFICACIONES:
• Promedio Capacidades: ${evaluationForm.promedioCapacidades || 'No especificado'}
• Promedio Habilidades: ${evaluationForm.promedioHabilidades || 'No especificado'}
• Promedio Actitudes: ${evaluationForm.promedioActitudes || 'No especificado'}
• NOTA FINAL: ${evaluationForm.notaFinal || 'No especificado'}

🏢 EMPRESA: ${evaluationForm.centroTrabajo || 'No especificado'}
📅 PERÍODO: ${evaluationForm.fechaInicioPasantia} - ${evaluationForm.fechaTerminoPasantia}
    `;
    
    alert(mensajeCalificacion);
    setShowConfirmDialog(false);
    
    // Reset form y volver al inicio
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
  const handleEstudianteSelect = (item: Estudiante | Empresa | null) => {
    const estudiante = item as Estudiante | null;
    setEstudianteSeleccionado(estudiante);
    if (estudiante) {
      setEvaluationForm(prev => ({
        ...prev,
        nombreApellidos: estudiante.nombreCompleto,
        identidadTitulo: estudiante.identidadTitulo,
        codigoTitulo: estudiante.codigoTitulo,
        horario: estudiante.horario,
        direccion: estudiante.direccion,
        telefonos: estudiante.telefono,
      }));
    } else {
      setEvaluationForm(prev => ({
        ...prev,
        nombreApellidos: "",
        identidadTitulo: "Desarrollo y administración de aplicaciones informáticas",
        codigoTitulo: "IFC006_3",
        horario: "",
        direccion: "",
        telefonos: "",
      }));
    }
  };

  // Manejar selección de empresa
  const handleEmpresaSelect = (item: Estudiante | Empresa | null) => {
    const empresa = item as Empresa | null;
    setEmpresaSeleccionada(empresa);
    if (empresa) {
      const contactoPrincipal = empresa.contactos.find(c => c.esPrincipal) || empresa.contactos[0];
      setEvaluationForm(prev => ({
        ...prev,
        centroTrabajo: empresa.razonSocial,
        direccionEmpresa: empresa.direccion,
        telefonosEmpresa: empresa.telefono,
        personaContacto: contactoPrincipal?.nombre || "",
        nombreTutor: contactoPrincipal?.nombre || "",
        telefonosCorreoTutor: `${contactoPrincipal?.email || ""} / ${contactoPrincipal?.telefono || ""}`,
      }));
    } else {
      setEvaluationForm(prev => ({
        ...prev,
        centroTrabajo: "",
        direccionEmpresa: "",
        telefonosEmpresa: "",
        personaContacto: "",
        nombreTutor: "",
        telefonosCorreoTutor: "",
      }));
    }
  };

  
  
  // Renderizar contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Selector de Estudiante */}
            <SearchSelect 
              type="estudiante"
              onSelect={handleEstudianteSelect}
              selectedItem={estudianteSeleccionado}
              placeholder="Busca por nombre, cédula o email del estudiante"
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔹 1. Datos personales y académicos</CardTitle>
                <CardDescription>Información personal y académica del alumno</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="identidad-titulo">Identidad del título</Label>
                    <Input
                      id="identidad-titulo"
                      value={evaluationForm.identidadTitulo}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="codigo-titulo">Código del título</Label>
                    <Input
                      id="codigo-titulo"
                      value={evaluationForm.codigoTitulo}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-apellidos">Nombre y apellidos del alumno</Label>
                    <Input
                      id="nombre-apellidos"
                      placeholder="Ingrese nombre completo"
                      value={evaluationForm.nombreApellidos}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, nombreApellidos: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="horario">Horario</Label>
                    <Input
                      id="horario"
                      placeholder="Ej: Lunes a Viernes 8:00-14:00"
                      value={evaluationForm.horario}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, horario: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Ingrese dirección completa"
                    value={evaluationForm.direccion}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, direccion: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefonos">Teléfono(s)</Label>
                    <Input
                      id="telefonos"
                      placeholder="Ingrese número(s) de teléfono"
                      value={evaluationForm.telefonos}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonos: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fecha-inicio">Fecha inicio de pasantía</Label>
                    <Input
                      id="fecha-inicio"
                      type="date"
                      value={evaluationForm.fechaInicioPasantia}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaInicioPasantia: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fecha-termino">Fecha término de pasantía</Label>
                    <Input
                      id="fecha-termino"
                      type="date"
                      value={evaluationForm.fechaTerminoPasantia}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaTerminoPasantia: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {/* Selector de Empresa */}
            <SearchSelect 
              type="empresa"
              onSelect={handleEmpresaSelect}
              selectedItem={empresaSeleccionada}
              placeholder="Busca por razón social, RUC o email de la empresa"
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔹 2. Datos de la empresa</CardTitle>
                <CardDescription>Información del centro de trabajo y tutor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="centro-trabajo">Centro de trabajo (nombre de la empresa)</Label>
                    <Input
                      id="centro-trabajo"
                      placeholder="Ingrese nombre de la empresa"
                      value={evaluationForm.centroTrabajo}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, centroTrabajo: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="persona-contacto">Persona de contacto</Label>
                    <Input
                      id="persona-contacto"
                      placeholder="Ingrese nombre de persona de contacto"
                      value={evaluationForm.personaContacto}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, personaContacto: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="direccion-empresa">Dirección</Label>
                  <Input
                    id="direccion-empresa"
                    placeholder="Ingrese dirección de la empresa"
                    value={evaluationForm.direccionEmpresa}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, direccionEmpresa: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefonos-empresa">Teléfonos</Label>
                    <Input
                      id="telefonos-empresa"
                      placeholder="Ingrese teléfonos de la empresa"
                      value={evaluationForm.telefonosEmpresa}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonosEmpresa: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nombre-tutor">Nombre del tutor en el centro de trabajo</Label>
                    <Input
                      id="nombre-tutor"
                      placeholder="Ingrese nombre del tutor"
                      value={evaluationForm.nombreTutor}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, nombreTutor: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefonos-correo-tutor">Teléfonos y correo del tutor</Label>
                  <Input
                    id="telefonos-correo-tutor"
                    placeholder="Ingrese teléfonos y correo electrónico del tutor"
                    value={evaluationForm.telefonosCorreoTutor}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonosCorreoTutor: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔸 3. Resultados de Aprendizaje</CardTitle>
                <CardDescription>RA 1: Actuar de forma responsable y respetuosa en el entorno de trabajo, siguiendo las políticas y normas de la empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-gray-300 p-2 text-left">Indicadores valoración/semanas año escolar</th>
                          {Array.from({ length: 12 }, (_, i) => (
                            <th key={i} className="border border-gray-300 p-2 text-center min-w-[50px]">
                              {i + 1}ª
                            </th>
                          ))}
                          <th className="border border-gray-300 p-2 text-center min-w-[60px]">PROMEDIO</th>
                          <th className="border border-gray-300 p-2 text-center min-w-[60px]">FINAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* CAPACIDAD Section */}
                        <tr className="bg-gray-100">
                          <td className="border border-gray-300 p-2 font-medium" colSpan={15}>CAPACIDAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Conocimientos teóricos</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.conocimientosTeoricos[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.conocimientosTeoricos]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, conocimientosTeoricos: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones verbales</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.asimilacionInstruccionesVerbales[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.asimilacionInstruccionesVerbales]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesVerbales: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones escritas</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.asimilacionInstruccionesEscritas[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.asimilacionInstruccionesEscritas]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesEscritas: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Asimilación y seguimiento de instrucciones simbólicas</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.asimilacionInstruccionesSimbolicas[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.asimilacionInstruccionesSimbolicas]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, asimilacionInstruccionesSimbolicas: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="border border-gray-300 p-2 font-bold">SUBTOTAL CAPACIDAD</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8 bg-gray-100"
                                value={evaluationForm.subtotalCapacidad[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.subtotalCapacidad]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, subtotalCapacidad: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        
                        {/* HABILIDAD Section */}
                        <tr className="bg-gray-100">
                          <td className="border border-gray-300 p-2 font-medium" colSpan={15}>HABILIDAD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Organización / Planificación del trabajo</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.organizacionPlanificacion[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.organizacionPlanificacion]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, organizacionPlanificacion: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Método</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.metodo[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.metodo]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, metodo: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Ritmo de trabajo</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.ritmoTrabajo[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.ritmoTrabajo]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, ritmoTrabajo: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Trabajo realizado</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.trabajoRealizado[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.trabajoRealizado]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, trabajoRealizado: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="border border-gray-300 p-2 font-bold">SUBTOTAL HABILIDAD</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8 bg-gray-100"
                                value={evaluationForm.subtotalHabilidad[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.subtotalHabilidad]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, subtotalHabilidad: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        
                        {/* ACTITUD Section */}
                        <tr className="bg-gray-100">
                          <td className="border border-gray-300 p-2 font-medium" colSpan={15}>ACTITUD</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Iniciativa</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.iniciativa[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.iniciativa]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, iniciativa: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Trabajo en equipo</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.trabajoEquipo[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.trabajoEquipo]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, trabajoEquipo: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Puntualidad y asistencia</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.puntualidadAsistencia[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.puntualidadAsistencia]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, puntualidadAsistencia: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-medium">Responsabilidad</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8"
                                value={evaluationForm.responsabilidad[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.responsabilidad]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, responsabilidad: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="border border-gray-300 p-2 font-bold">SUBTOTAL ACTITUD</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1 bg-gray-50">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8 bg-gray-100"
                                value={evaluationForm.subtotalActitud[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.subtotalActitud]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, subtotalActitud: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                          <td className="border border-gray-300 p-1 bg-gray-50"></td>
                        </tr>
                        
                        {/* TOTAL Row */}
                        <tr className="bg-blue-100 font-bold">
                          <td className="border border-gray-300 p-2 font-bold">TOTAL</td>
                          {Array.from({ length: 12 }, (_, i) => (
                            <td key={i} className="border border-gray-300 p-1 bg-blue-50">
                              <Input
                                type="text"
                                placeholder="..."
                                className="w-full text-center text-xs h-8 bg-blue-100 font-semibold"
                                value={evaluationForm.total[i] || ""}
                                onChange={(e) => {
                                  const newValues = [...evaluationForm.total]
                                  newValues[i] = e.target.value
                                  setEvaluationForm({ ...evaluationForm, total: newValues })
                                }}
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-1 bg-blue-50"></td>
                          <td className="border border-gray-300 p-1 bg-blue-50"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Promedios */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="promedio-capacidades">Promedio Capacidades</Label>
                      <Input
                        id="promedio-capacidades"
                        type="text"
                        step="0.01"
                        placeholder="..."
                        value={evaluationForm.promedioCapacidades}
                        onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioCapacidades: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="promedio-habilidades">Promedio Habilidades</Label>
                      <Input
                        id="promedio-habilidades"
                        type="text"
                        step="0.01"
                        placeholder="..."
                        value={evaluationForm.promedioHabilidades}
                        onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioHabilidades: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="promedio-actitudes">Promedio Actitudes</Label>
                      <Input
                        id="promedio-actitudes"
                        type="text"
                        step="0.01"
                        placeholder="..."
                        value={evaluationForm.promedioActitudes}
                        onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioActitudes: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nota-final">Nota Final</Label>
                      <Input
                        id="nota-final"
                        type="text"
                        step="0.01"
                        placeholder="..."
                        value={evaluationForm.notaFinal}
                        onChange={(e) => setEvaluationForm({ ...evaluationForm, notaFinal: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔸 4. Observaciones y Firmas</CardTitle>
                <CardDescription>Observaciones finales y firmas del proceso de evaluación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones generales</Label>
                  <Textarea
                    id="observaciones"
                    placeholder="Ingrese observaciones generales sobre el desempeño del estudiante..."
                    value={evaluationForm.observaciones}
                    onChange={(e) => setEvaluationForm({ ...evaluationForm, observaciones: e.target.value })}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firma-tutor-centro">Firma del tutor del centro de trabajo</Label>
                    <Input
                      id="firma-tutor-centro"
                      placeholder="Nombre completo del tutor"
                      value={evaluationForm.firmaTutorCentro}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, firmaTutorCentro: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firma-tutor-educativo">Firma del tutor educativo</Label>
                    <Input
                      id="firma-tutor-educativo"
                      placeholder="Nombre completo del tutor educativo"
                      value={evaluationForm.firmaTutorEducativo}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, firmaTutorEducativo: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fecha-firma">Fecha de firma</Label>
                    <Input
                      id="fecha-firma"
                      type="date"
                      value={evaluationForm.fechaFirma}
                      onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaFirma: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Main>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Evaluaciones
            </h1>
            <p className="text-muted-foreground mt-1">Completa el formulario de evaluación de pasantías paso por paso</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Progreso de Evaluación</h2>
              <span className="text-sm text-muted-foreground">
                Paso {currentStep} de 4
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <StepIndicator step={1} title="Datos Personales" completed={currentStep > 1} />
                <div className="w-8 h-0.5 bg-muted"></div>
                <StepIndicator step={2} title="Datos Empresa" completed={currentStep > 2} />
                <div className="w-8 h-0.5 bg-muted"></div>
                <StepIndicator step={3} title="Evaluación" completed={currentStep > 3} />
                <div className="w-8 h-0.5 bg-muted"></div>
                <StepIndicator step={4} title="Observaciones y Firmas" completed={false} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <Button
            onClick={nextStep}
            className="gap-2"
          >
            {currentStep === 4 ? "Enviar Evaluación" : "Siguiente"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Confirmar Envío
                </CardTitle>
                <CardDescription>
                  ¿Está seguro de enviar esta evaluación? Una vez enviada no podrá ser modificada.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Resumen de la Evaluación:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Estudiante:</strong> {evaluationForm.nombreApellidos}</p>
                    <p><strong>Empresa:</strong> {evaluationForm.centroTrabajo}</p>
                    <p><strong>Período:</strong> {evaluationForm.fechaInicioPasantia} - {evaluationForm.fechaTerminoPasantia}</p>
                  </div>
                </div>
              </CardContent>
              <CardContent className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={confirmSubmit} className="bg-green-600 hover:bg-green-700">
                  Confirmar Envío
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Main>
  )
}
