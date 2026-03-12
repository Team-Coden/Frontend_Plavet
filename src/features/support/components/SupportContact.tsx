"use client"

import { Mail, MessageSquare, Phone, Clock } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card";

export function SupportContact() {
  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Chat en Vivo",
      description: "Habla con nuestro equipo de soporte en tiempo real",
      action: "Iniciar Chat",
      available: "Lun - Vie: 9:00 - 18:00",
      color: "text-green-600 bg-green-50 border-green-200"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Envíanos un correo electrónico y te responderemos pronto",
      action: "Enviar Email",
      available: "Respuesta en 24 horas",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Llama a nuestro centro de ayuda",
      action: "+1 (555) 123-4567",
      available: "Lun - Vie: 8:00 - 20:00",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¿Necesitas Ayuda Adicional?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Si no encontraste lo que buscabas en nuestros tutoriales, nuestro equipo de soporte 
          está aquí para ayudarte. Contáctanos a través de cualquiera de estos canales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <Card key={index} className="border-2 hover:shadow-lg transition-all duration-200">
              <CardHeader className="text-center pb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${option.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{option.available}</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant={option.title === "Chat en Vivo" ? "default" : "outline"}
                  >
                    {option.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Preguntas Frecuentes</CardTitle>
          <CardDescription>
            Encuentra respuestas rápidas a las preguntas más comunes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                question: "¿Cómo inicio un tutorial?",
                answer: "Simplemente haz clic en el botón 'Iniciar Tutorial' en cualquier tarjeta de ayuda."
              },
              {
                question: "¿Puedo pausar un tutorial?",
                answer: "Sí, puedes pausar y reanudar los tutoriales en cualquier momento usando los controles."
              },
              {
                question: "¿Los tutoriales son gratuitos?",
                answer: "Sí, todos nuestros tutoriales interactivos son completamente gratuitos."
              },
              {
                question: "¿Qué navegadores son compatibles?",
                answer: "Recomendamos usar Chrome, Firefox, Safari o Edge en sus versiones más recientes."
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
  );
}
