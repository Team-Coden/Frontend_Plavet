"use client"

import { Clock, BookOpen, Star, Play } from "lucide-react";
import { Button } from "../../../shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card";
import { Badge } from "../../../shared/components/ui/badge";
import type { HelpModule, HelpCategory, TourStep } from "../types";

interface HelpCardProps {
  module: HelpModule;
  category: HelpCategory;
  onStartTour: (moduleId: string, steps: TourStep[]) => void;
}

export function HelpCard({ module, category, onStartTour }: HelpCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 hover:border-blue-300';
      case 'green':
        return 'border-green-200 bg-green-50 hover:border-green-300';
      case 'purple':
        return 'border-purple-200 bg-purple-50 hover:border-purple-300';
      case 'orange':
        return 'border-orange-200 bg-orange-50 hover:border-orange-300';
      default:
        return 'border-gray-200 bg-gray-50 hover:border-gray-300';
    }
  };

  const getCategoryIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className={`border-2 transition-all duration-200 hover:shadow-lg ${getCategoryColor(category.color)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category.color)}`}>
              <BookOpen className={`h-4 w-4 ${getCategoryIconColor(category.color)}`} />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {category.title}
              </CardDescription>
            </div>
          </div>
          <Badge className={getDifficultyColor(module.difficulty)}>
            {getDifficultyText(module.difficulty)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          {module.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {module.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-white/70 rounded-full border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{module.tourSteps.length} pasos</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          onClick={() => onStartTour(module.id, module.tourSteps)}
          className="w-full gap-2"
          variant="default"
        >
          <Play className="h-4 w-4" />
          Iniciar Tutorial
        </Button>
      </CardContent>
    </Card>
  );
}
