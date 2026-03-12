export interface TourStep {
  id: string;
  target: string; // Selector CSS del elemento a resaltar
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: () => void; // Acción a ejecutar en este paso
  waitForClick?: boolean; // Esperar a que el usuario haga clic en el elemento
}

export interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Nombre del icono de Lucide React
  color: string; // Color de tema (blue, green, purple, etc.)
  modules: HelpModule[];
}

export interface HelpModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // Ej: "5 min"
  tourSteps: TourStep[];
  tags: string[];
}

export interface TourState {
  isActive: boolean;
  currentStep: number;
  tourId: string | null;
  highlightedElement: Element | null;
}

export interface HelpSearchResult {
  module: HelpModule;
  category: HelpCategory;
  relevanceScore: number;
}
