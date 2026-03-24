import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export interface TourStep {
  element: string;
  popover: {
    title: string;
    description: string;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
  };
}

export function useTour(localStorageKey: string, steps: TourStep[], delayMs: number = 800) {
  useEffect(() => {
    const isTourSeen = localStorage.getItem(localStorageKey);
    // Only initialize and run if not seen
    if (!isTourSeen && steps.length > 0) {
      const driverObj = driver({
        showProgress: true,
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: 'Cerrar',
        steps
      });
      const timer = setTimeout(() => {
        driverObj.drive();
        localStorage.setItem(localStorageKey, 'true');
      }, delayMs);
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array to ensure it only runs once per mount
}
