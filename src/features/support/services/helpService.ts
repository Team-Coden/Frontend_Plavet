import type { HelpCategory, HelpModule, HelpSearchResult } from '../types';

// Datos mock de categorías y módulos de ayuda
export const mockHelpCategories: HelpCategory[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Aprende a navegar y utilizar el panel principal',
    icon: 'LayoutDashboard',
    color: 'blue',
    modules: [
      {
        id: 'dashboard-basics',
        title: 'Conceptos Básicos del Dashboard',
        description: 'Entiende los componentes principales y métricas',
        category: 'dashboard',
        difficulty: 'beginner',
        duration: '3 min',
        tags: ['dashboard', 'inicio', 'métricas'],
        tourSteps: [
          {
            id: 'dash-1',
            target: 'nav', // Elemento de navegación principal
            title: '📊 Paso 1: Navegación Principal',
            content: 'Esta es la barra de navegación principal. Aquí encontrarás acceso a todos los módulos.',
            position: 'bottom',
            waitForClick: true
          },
          {
            id: 'dash-2',
            target: 'main', // Contenido principal
            title: '📈 Paso 2: Contenido Principal',
            content: 'Aquí se muestra el contenido principal de cada página. Haz clic para continuar.',
            position: 'right',
            waitForClick: true
          },
          {
            id: 'dash-3',
            target: 'button', // Cualquier botón
            title: '⚡ Paso 3: Botones de Acción',
            content: 'Los botones como este te permiten realizar acciones. Haz clic en cualquier botón para continuar.',
            position: 'top',
            waitForClick: true
          }
        ]
      },
      {
        id: 'dashboard-reports',
        title: 'Generación de Reportes',
        description: 'Crea y exporta reportes personalizados',
        category: 'dashboard',
        difficulty: 'intermediate',
        duration: '5 min',
        tags: ['dashboard', 'reportes', 'exportar'],
        tourSteps: [
          {
            id: 'reports-1',
            target: 'a[href*="/dashboard"]', // Enlace a dashboard
            title: '📋 Paso 1: Acceso a Dashboard',
            content: 'Este enlace te lleva al dashboard principal. Haz clic para acceder.',
            position: 'bottom',
            waitForClick: true
          },
          {
            id: 'reports-2',
            target: 'input', // Cualquier input
            title: '🔍 Paso 2: Campos de Búsqueda',
            content: 'Usa estos campos para buscar y filtrar información. Haz clic en cualquier campo.',
            position: 'right',
            waitForClick: true
          },
          {
            id: 'reports-3',
            target: 'h1', // Títulos principales
            title: '💾 Paso 3: Títulos y Encabezados',
            content: 'Los títulos como este te indican en qué sección te encuentras. Haz clic para continuar.',
            position: 'left',
            waitForClick: true
          }
        ]
      }
    ]
  },
  {
    id: 'documentacion',
    title: 'Documentación',
    description: 'Gestiona tus documentos y archivos',
    icon: 'FileText',
    color: 'green',
    modules: [
      {
        id: 'docs-upload',
        title: 'Subir Documentos',
        description: 'Aprende a subir y organizar tus archivos',
        category: 'documentacion',
        difficulty: 'beginner',
        duration: '4 min',
        tags: ['documentos', 'subir', 'archivos'],
        tourSteps: [
          {
            id: 'upload-1',
            target: 'a[href*="/documentos"]', // Enlace a documentos
            title: '📁 Paso 1: Sección de Documentos',
            content: 'Este enlace te lleva a la sección de gestión de documentos. Haz clic para acceder.',
            position: 'top',
            waitForClick: true
          },
          {
            id: 'upload-2',
            target: 'form', // Formularios
            title: '📂 Paso 2: Formularios',
            content: 'Los formularios como este te permiten ingresar y editar información. Haz clic en cualquier formulario.',
            position: 'right',
            waitForClick: true
          },
          {
            id: 'upload-3',
            target: 'label', // Labels
            title: '✅ Paso 3: Etiquetas',
            content: 'Las etiquetas describen los campos y acciones. Haz clic en cualquier etiqueta para continuar.',
            position: 'bottom',
            waitForClick: true
          }
        ]
      }
    ]
  },
  {
    id: 'pasantias',
    title: 'Proceso de Pasantías',
    description: 'Gestiona el ciclo completo de pasantías',
    icon: 'Briefcase',
    color: 'purple',
    modules: [
      {
        id: 'pasantias-gestion',
        title: 'Gestión de Pasantías',
        description: 'Administra estudiantes y empresas',
        category: 'pasantias',
        difficulty: 'intermediate',
        duration: '6 min',
        tags: ['pasantías', 'gestión', 'estudiantes'],
        tourSteps: [
          {
            id: 'pasantias-1',
            target: 'a[href*="/gestionDePasantias"]', // Enlace a gestión de pasantías
            title: '👥 Paso 1: Gestión de Pasantías',
            content: 'Este enlace te lleva al módulo de gestión de pasantías. Haz clic para acceder.',
            position: 'right',
            waitForClick: true
          },
          {
            id: 'pasantias-2',
            target: 'table', // Tablas
            title: '➕ Paso 2: Tablas de Datos',
            content: 'Las tablas muestran información organizada. Haz clic en cualquier tabla para continuar.',
            position: 'bottom',
            waitForClick: true
          },
          {
            id: 'pasantias-3',
            target: 'tr', // Filas de tabla
            title: '📝 Paso 3: Filas de Información',
            content: 'Cada fila representa un registro. Haz clic en cualquier fila para continuar.',
            position: 'left',
            waitForClick: true
          }
        ]
      }
    ]
  },
  {
    id: 'evaluaciones',
    title: 'Evaluaciones',
    description: 'Sistema de calificación y evaluación',
    icon: 'ClipboardCheck',
    color: 'orange',
    modules: [
      {
        id: 'evaluaciones-create',
        title: 'Crear Evaluaciones',
        description: 'Diseña y configura nuevas evaluaciones',
        category: 'evaluaciones',
        difficulty: 'advanced',
        duration: '8 min',
        tags: ['evaluaciones', 'crear', 'configurar'],
        tourSteps: [
          {
            id: 'eval-1',
            target: 'a[href*="/evaluaciones"]', // Enlace a evaluaciones
            title: '✏️ Paso 1: Módulo de Evaluaciones',
            content: 'Este enlace te lleva al módulo de evaluaciones. Haz clic para acceder.',
            position: 'bottom',
            waitForClick: true
          },
          {
            id: 'eval-2',
            target: 'select', // Selects
            title: '⚙️ Paso 2: Menús Desplegables',
            content: 'Los menús desplegables te permiten seleccionar opciones. Haz clic en cualquier select.',
            position: 'right',
            waitForClick: true
          },
          {
            id: 'eval-3',
            target: 'textarea', // Textareas
            title: '❓ Paso 3: Áreas de Texto',
            content: 'Las áreas de texto te permiten escribir contenido extenso. Haz clic en cualquier textarea.',
            position: 'left',
            waitForClick: true
          }
        ]
      }
    ]
  }
];

// Función para buscar módulos de ayuda
export function searchHelpModules(query: string): HelpSearchResult[] {
  const results: HelpSearchResult[] = [];
  const lowercaseQuery = query.toLowerCase();

  mockHelpCategories.forEach(category => {
    category.modules.forEach(module => {
      let relevanceScore = 0;

      // Búsqueda por título
      if (module.title.toLowerCase().includes(lowercaseQuery)) {
        relevanceScore += 10;
      }

      // Búsqueda por descripción
      if (module.description.toLowerCase().includes(lowercaseQuery)) {
        relevanceScore += 5;
      }

      // Búsqueda por tags
      module.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowercaseQuery)) {
          relevanceScore += 3;
        }
      });

      // Búsqueda por categoría
      if (category.title.toLowerCase().includes(lowercaseQuery)) {
        relevanceScore += 2;
      }

      if (relevanceScore > 0) {
        results.push({
          module,
          category,
          relevanceScore
        });
      }
    });
  });

  // Ordenar por relevancia
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Función para obtener módulos por categoría
export function getModulesByCategory(categoryId: string): HelpModule[] {
  const category = mockHelpCategories.find(cat => cat.id === categoryId);
  return category ? category.modules : [];
}

// Función para obtener todos los módulos
export function getAllModules(): HelpModule[] {
  return mockHelpCategories.flatMap(category => category.modules);
}

// Función para obtener módulos por dificultad
export function getModulesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): HelpModule[] {
  return getAllModules().filter(module => module.difficulty === difficulty);
}

// Función para obtener un módulo específico
export function getModuleById(moduleId: string): HelpModule | null {
  for (const category of mockHelpCategories) {
    const module = category.modules.find(mod => mod.id === moduleId);
    if (module) return module;
  }
  return null;
}
