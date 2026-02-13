import LoginPage from '@/features/auth/pages/page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@/features/main/pages/page';
import DashboardPage from '@/features/dashboard/pages/page';
import CentroDeTrabajoPage from '@/features/gestionInstitucional/centroDeTrabajo/pages/page';
import InicioPage from '@/features/inicio/pages/page';
import PlazasPage from '@/features/gestionInstitucional/plazas/pages/page';
import TutoresPage from '@/features/gestionInstitucional/tutores/pages/page';
import DocumentosPage from '@/features/documentacion/pages/page';
import SubirDocumentosPage from '@/features/documentacion/subir/page';
import EvaluacionesPage from '@/features/evaluaciones/evaluacion/page';
import CalificacionesPage from '@/features/evaluaciones/calificacion/page';
import ReportesPage from '@/features/reportes/page';
import CierrePasantiasPage from '@/features/procesoDePasantias/cierreDePasantias/pages/page';
import ExcusasPage from '@/features/procesoDePasantias/excusas/pages/page';
import GestionPasantiasPage from '@/features/procesoDePasantias/gestionDePasantias/pages/page';


function RoutersProtected() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioPage/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/centroDeTrabajo" element={<CentroDeTrabajoPage/>} />
        <Route path="/plaza" element={<PlazasPage/>} />
        <Route path="/tutores" element={<TutoresPage/>} />
        <Route path="/documentos" element={<DocumentosPage/>} />
        <Route path="/subir" element={<SubirDocumentosPage/>} />
        <Route path="/evaluaciones" element={<EvaluacionesPage/>} />
        <Route path="/calificaciones" element={<CalificacionesPage/>} />
        <Route path="/reportes" element={<ReportesPage/>} />
        <Route path="/gestionDePasantias" element={<GestionPasantiasPage/>} />
        <Route path="/cierrePasantias" element={<CierrePasantiasPage/>} />
        <Route path="/excusas" element={<ExcusasPage/>} />

      </Routes>
    </BrowserRouter>
    
  )
}

export default RoutersProtected