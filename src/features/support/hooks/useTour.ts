import { useState, useEffect, useCallback } from 'react';
import type { TourState, TourStep } from '../types';

interface UseTourProps {
  onTourComplete?: () => void;
  onTourStart?: (tourId: string) => void;
}

export function useTour({ onTourComplete, onTourStart }: UseTourProps = {}) {
  const [tourState, setTourState] = useState<TourState>({
    isActive: false,
    currentStep: 0,
    tourId: null,
    highlightedElement: null,
  });

  const [currentTourSteps, setCurrentTourSteps] = useState<TourStep[]>([]);

  const startTour = useCallback((tourId: string, steps: TourStep[]) => {
    setTourState({
      isActive: true,
      currentStep: 0,
      tourId,
      highlightedElement: null,
    });
    setCurrentTourSteps(steps);
    onTourStart?.(tourId);
  }, [onTourStart]);

  const nextStep = useCallback(() => {
    setTourState(prev => {
      if (!prev.isActive || !currentTourSteps.length) return prev;
      
      if (prev.currentStep < currentTourSteps.length - 1) {
        return {
          ...prev,
          currentStep: prev.currentStep + 1,
        };
      } else {
        // Tour completado
        onTourComplete?.();
        return {
          isActive: false,
          currentStep: 0,
          tourId: null,
          highlightedElement: null,
        };
      }
    });
  }, [currentTourSteps.length, onTourComplete]);

  const prevStep = useCallback(() => {
    setTourState(prev => {
      if (!prev.isActive || prev.currentStep === 0) return prev;
      
      return {
        ...prev,
        currentStep: prev.currentStep - 1,
      };
    });
  }, []);

  const endTour = useCallback(() => {
    setTourState({
      isActive: false,
      currentStep: 0,
      tourId: null,
      highlightedElement: null,
    });
    onTourComplete?.();
  }, [onTourComplete]);

  const pauseTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const resumeTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      isActive: true,
    }));
  }, []);

  // Efecto para manejar el resaltado de elementos
  useEffect(() => {
    if (!tourState.isActive || !currentTourSteps[tourState.currentStep]) return;

    const step = currentTourSteps[tourState.currentStep];
    const element = document.querySelector(step.target);
    
    if (element) {
      // Hacer scroll al elemento
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Usar setTimeout para evitar setState síncrono en effect
      setTimeout(() => {
        setTourState(prev => ({
          ...prev,
          highlightedElement: element,
        }));
      }, 0);

      // Manejar clic en el elemento si es necesario
      if (step.waitForClick) {
        const handleClick = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          nextStep();
        };

        element.addEventListener('click', handleClick, true);
        
        return () => {
          element.removeEventListener('click', handleClick, true);
        };
      }
    }

    // Ejecutar acción si existe
    if (step.action) {
      step.action();
    }
  }, [tourState.isActive, tourState.currentStep, currentTourSteps, nextStep]);

  const currentStep = tourState.isActive ? currentTourSteps[tourState.currentStep] : null;

  return {
    tourState,
    currentStep,
    currentTourSteps,
    startTour,
    nextStep,
    prevStep,
    endTour,
    pauseTour,
    resumeTour,
    isTourActive: tourState.isActive,
    currentStepIndex: tourState.currentStep,
    totalSteps: currentTourSteps.length,
    progress: currentTourSteps.length > 0 ? ((tourState.currentStep + 1) / currentTourSteps.length) * 100 : 0,
  };
}
