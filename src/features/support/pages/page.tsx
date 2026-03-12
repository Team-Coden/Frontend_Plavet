"use client"

import { BookOpen, MessageCircle, Mail, Phone, LayoutDashboard, FileText, Briefcase, ClipboardCheck, Users, Building2 } from "lucide-react";
import Main from "@/features/main/pages/page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/button";

export default function SupportPage() {
  const modules = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Panel principal con métricas y estadísticas',
      icon: LayoutDashboard,
      color: 'bg-blue-100 text-blue-600',
      features: ['Métricas en tiempo real', 'Gráficos interactivos', 'Reportes rápidos']
    },
    {
      id: 'documentacion',
      title: 'Documentación',
      description: 'Gestión de documentos y archivos',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      features: ['Subida de archivos', 'Organización por carpetas', 'Búsqueda avanzada']
    },
    {
      id: 'pasantias',
      title: 'Pasantías',
      description: 'Proceso completo de gestión de pasantías',
      icon: Briefcase,
      color: 'bg-purple-100 text-purple-600',
      features: ['Registro de estudiantes', 'Seguimiento', 'Evaluaciones']
    },
    {
      id: 'evaluaciones',
      title: 'Evaluaciones',
      description: 'Sistema de calificación y pruebas',
      icon: ClipboardCheck,
      color: 'bg-orange-100 text-orange-600',
      features: ['Creación de pruebas', 'Calificación automática', 'Reportes de resultados']
    },
    {
      id: 'personal',
      title: 'Personal',
      description: 'Gestión de usuarios y roles',
      icon: Users,
      color: 'bg-red-100 text-red-600',
      features: ['Administración de usuarios', 'Asignación de roles', 'Permisos']
    },
    {
      id: 'institucional',
      title: 'Gestión Institucional',
      description: 'Configuración de la institución',
      icon: Building2,
      color: 'bg-cyan-100 text-cyan-600',
      features: ['Centros de trabajo', 'Plazas disponibles', 'Configuración general']
    }
  ];

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Centro de Ayuda
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra guías específicas para cada módulo y contacta con nuestro equipo 
              de soporte si necesitas asistencia adicional.
            </p>
          </div>

          {/* Modules Help Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ayuda por Módulos
              </h2>
              <p className="text-gray-600">
                Selecciona un módulo para ver guías específicas y tutoriales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card key={module.id} className="border-2 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
                    <CardHeader className="text-center pb-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${module.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Features */}
                        <div className="space-y-2">
                          {module.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button className="w-full" variant="default">
                            Ver Guía Rápida
                          </Button>
                          <Button className="w-full" variant="outline">
                            Tutoriales Completos
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Options */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¿Necesitas Ayuda Adicional?
              </h2>
              <p className="text-gray-600">
                Contacta directamente con nuestro equipo de soporte técnico
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:shadow-lg transition-all duration-200">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Chat en Vivo</CardTitle>
                  <CardDescription className="text-sm">
                    Habla con nuestro equipo en tiempo real
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Lun - Vie: 9:00 - 18:00
                    </p>
                    <Button className="w-full">
                      Iniciar Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all duration-200">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription className="text-sm">
                    Envíanos un correo electrónico
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Respuesta en 24 horas
                    </p>
                    <Button variant="outline" className="w-full">
                      Enviar Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-all duration-200">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Teléfono</CardTitle>
                  <CardDescription className="text-sm">
                    Llama a nuestro centro de ayuda
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Lun - Vie: 8:00 - 20:00
                    </p>
                    <Button variant="outline" className="w-full">
                      +1 (555) 123-4567
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Respuestas rápidas a las preguntas más comunes
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    question: "¿Cómo accedo a los diferentes módulos?",
                    answer: "Usa el menú de navegación principal para acceder a cada módulo."
                  },
                  {
                    question: "¿Cómo restablezco mi contraseña?",
                    answer: "Haz clic en '¿Olvidaste tu contraseña?' en la página de login."
                  },
                  {
                    question: "¿Cómo contacto a soporte técnico?",
                    answer: "Usa cualquiera de los métodos de contacto que aparecen arriba."
                  },
                  {
                    question: "¿Qué navegadores son compatibles?",
                    answer: "Recomendamos Chrome, Firefox, Safari o Edge en versiones recientes."
                  }
                ].map((faq, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  );
}
