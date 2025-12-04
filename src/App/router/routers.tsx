
import LoginPage from '@/features/auth/pages/page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@/features/main/pages/page';
import DashboardPage from '@/features/dashboard/pages/page';

function RoutersProtected() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default RoutersProtected