'use client';

import { useState, useCallback, useEffect } from "react";
import type { Tutor, TutorStats, CreateTutorData } from "../types";
import { tutorService } from "../services/tutorService";

export const useTutores = () => {
  const [paginatedTutores, setPaginatedTutores] = useState<Tutor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<TutorStats>({ total: 0, activos: 0, pendientes: 0, inhabilitados: 0 });
  const itemsPerPage = 15;

  const fetchTutores = useCallback(async () => {
    try {
      const response = await tutorService.getTutoresPaginated(
        currentPage,
        itemsPerPage,
        {
          search: searchTerm || undefined,
          status: statusFilter,
        }
      );
      if (response.success) {
        setPaginatedTutores(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching tutores:", error);
    }
  }, [currentPage, searchTerm, statusFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await tutorService.getTutoresStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching tutores stats:", error);
    }
  }, []);

  const fetchAllForExport = useCallback(async () => {
    try {
      return await tutorService.exportTutoresToCSV({
        status: statusFilter,
      });
    } catch (error) {
      console.error("Error fetching export:", error);
      return null;
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTutores();
    fetchStats();
  }, [fetchTutores, fetchStats]);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const addTutor = async (newTutor: CreateTutorData) => {
    try {
      await tutorService.createTutor(newTutor);
      fetchTutores();
      fetchStats();
    } catch (error) {
      console.error("Error creating tutor:", error);
    }
  };

  const updateTutor = async (updatedTutor: Tutor) => {
    try {
      await tutorService.updateTutor(updatedTutor.id, updatedTutor);
      fetchTutores();
    } catch (error) {
      console.error("Error updating tutor:", error);
    }
  };

  const deleteTutor = async (id: string) => {
    try {
      await tutorService.deleteTutor(id);
      fetchTutores();
      fetchStats();
    } catch (error) {
      console.error("Error deleting tutor:", error);
    }
  };

  const restoreTutor = async (id: string) => {
    try {
      await tutorService.restoreTutor(id);
      fetchTutores();
      fetchStats();
    } catch (error) {
      console.error("Error restoring tutor:", error);
    }
  };

  const permanentlyDeleteTutor = async (id: string) => {
    try {
      await tutorService.permanentlyDeleteTutor(id);
      fetchTutores();
      fetchStats();
    } catch (error) {
      console.error("Error permanently deleting tutor:", error);
    }
  };

  return {
    tutores: paginatedTutores,
    filteredTutores: paginatedTutores,
    paginatedTutores,
    currentPage,
    totalPages,
    setCurrentPage,
    resetPage,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    addTutor,
    updateTutor,
    deleteTutor,
    restoreTutor,
    permanentlyDeleteTutor,
    fetchAllForExport,
  };
};
