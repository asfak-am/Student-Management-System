import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import Sidebar from './components/sidebar/sidebar'
import TopBar from './components/topbar/TopBar'
import Dashboard from './components/dashboard/Dashboard'
import Students from './components/students/Students'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import GoogleSuccess from './pages/GoogleSuccess'

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8edff 0%, #f5f0ff 100%)',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '5px solid #e5e7eb',
        borderTop: '5px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Protected Layout ─────────────────────────────────────────────────────────
function AppLayout() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { logout } = useAuth();

  const pages = {
    dashboard: {
      title: 'Dashboard',
      icon: 'bi-grid-fill',
      subtitle: 'Manage your dashboard',
      component: <Dashboard />,
    },
    students: {
      title: 'Students',
      icon: 'bi-people-fill',
      subtitle: 'Manage all students',
      component: <Students />,
    },
  };

  const currentPageData = pages[currentPage];

  return (
    <>
      <Sidebar onNavigate={setCurrentPage} activeRoute={currentPage} onLogout={logout} />
      <div className="main-content p-3">
        <TopBar
          title={currentPageData.title}
          icon={currentPageData.icon}
          subtitle={currentPageData.subtitle}
        />
        {currentPageData.component}
      </div>
    </>
  );
}

// ─── Protected Route ──────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" replace />;
}

// ─── Public Route ─────────────────────────────────────────────────────────────
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return !user ? children : <Navigate to="/dashboard" replace />;
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Public routes */}
          <Route path="/login"           element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register"        element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password"  element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/auth/google/success" element={<GoogleSuccess />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
          <Route path="/*"         element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App