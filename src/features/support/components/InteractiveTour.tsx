"use client"

import { X, ArrowLeft, ArrowRight, Hand } from "lucide-react";
import type { TourStep } from "../types";

interface InteractiveTourProps {
  isOpen: boolean;
  onClose: () => void;
  tourSteps: TourStep[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function InteractiveTour({ 
  isOpen, 
  onClose, 
  tourSteps, 
  currentStep, 
  onNext, 
  onPrevious 
}: InteractiveTourProps) {
  if (!isOpen || !tourSteps[currentStep]) return null;

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Overlay muy ligero */}
      <div className="fixed inset-0 bg-black/20 z-40" />
      
      {/* Highlight Element */}
      {(() => {
        const element = document.querySelector(currentTourStep.target);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return (
          <div
            className="absolute z-40 pointer-events-none"
            style={{
              top: rect.top + window.scrollY - 6,
              left: rect.left + window.scrollX - 6,
              width: rect.width + 12,
              height: rect.height + 12,
              border: '4px solid #f97316', // Naranja más visible
              borderRadius: '8px',
              boxShadow: '0 0 0 0 rgba(0, 0, 0, 0), 0 0 40px rgba(249, 115, 22, 0.8)', // Sombra naranja
              transition: 'all 0.3s ease',
              animation: 'pulse 2s infinite'
            }}
          />
        );
      })()}

      {/* Flecha indicadora animada - MÁS GRANDE Y VISIBLE */}
      {(() => {
        const element = document.querySelector(currentTourStep.target);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;
        
        let arrowLeft = left;
        let arrowTop = top + rect.height / 2 - 24;
        let rotation = 'rotate(0deg)';
        
        switch (currentTourStep.position) {
          case 'right':
            arrowLeft = left - 80;
            rotation = 'rotate(0deg)';
            break;
          case 'left':
            arrowLeft = left + rect.width + 40;
            rotation = 'rotate(180deg)';
            break;
          case 'top':
            arrowLeft = left + rect.width / 2 - 24;
            arrowTop = top - 80;
            rotation = 'rotate(90deg)';
            break;
          case 'bottom':
            arrowLeft = left + rect.width / 2 - 24;
            arrowTop = top + rect.height + 40;
            rotation = 'rotate(-90deg)';
            break;
          default:
            arrowLeft = left - 80;
            rotation = 'rotate(0deg)';
        }
        
        return currentTourStep.waitForClick ? (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              top: arrowTop,
              left: arrowLeft,
            }}
          >
            <div className="relative">
              {/* Flecha GRANDE y llamativa */}
              <div 
                className="text-orange-500 animate-bounce"
                style={{
                  transform: rotation,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                }}
              >
                <ArrowLeft className="h-16 w-16" />
              </div>
              
              {/* Manito GRANDE clickeando */}
              <div className="absolute -top-2 -right-2 text-red-500 animate-pulse">
                <Hand className="h-10 w-10" />
              </div>
              
              {/* Círculo de atención */}
              <div className="absolute inset-0 w-20 h-20 border-4 border-orange-400 rounded-full animate-ping" />
            </div>
          </div>
        ) : null;
      })()}

      {/* Toast/Banner no bloqueante - MÁS GRANDE Y CLARO */}
      <div className="fixed bottom-6 right-6 z-50 bg-white border-3 border-orange-500 rounded-xl shadow-2xl p-6 w-96 max-w-md transform transition-all duration-300 ease-in-out">
        {/* Header del toast */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Hand className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-orange-600">
                {currentTourStep.title}
              </h3>
              <div className="text-sm text-gray-500 font-medium">
                Paso {currentStep + 1} de {tourSteps.length}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
            title="Salir del tutorial"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Contenido del mensaje */}
        <div className="mb-6">
          <p className="text-base leading-relaxed text-gray-700 mb-3">
            {currentTourStep.content}
          </p>
          
          {/* Indicador de acción requerida - MÁS GRANDE */}
          {currentTourStep.waitForClick && (
            <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-xl">
              <p className="text-sm font-bold text-orange-700 text-center flex items-center justify-center gap-2">
                <span className="text-lg">👆</span>
                <span>HAZ CLIC AHORA en el elemento con la flecha naranja</span>
              </p>
            </div>
          )}
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </button>
          
          {/* Botón principal */}
          {!currentTourStep.waitForClick ? (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md"
            >
              {currentStep === tourSteps.length - 1 ? "Finalizar" : "Continuar"}
              {currentStep < tourSteps.length - 1 && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-300 text-orange-700 rounded-lg cursor-not-allowed animate-pulse"
            >
              <Hand className="h-4 w-4" />
              Esperando clic...
            </button>
          )}
        </div>
      </div>

      {/* Estilos para animación */}
      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 40px rgba(249, 115, 22, 0.8);
          }
          50% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 60px rgba(249, 115, 22, 1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 0 40px rgba(249, 115, 22, 0.8);
          }
        }
      `}</style>
    </>
  );
}
