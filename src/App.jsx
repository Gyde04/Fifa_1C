import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthContext';
import ExamProvider from './context/ExamContext';
import Loading from './components/ui/Loading';
import Layout from './components/layout/Layout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const ExamPage = lazy(() => import('./pages/ExamPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const StudyPage = lazy(() => import('./pages/StudyPage'));
const FlaggedPage = lazy(() => import('./pages/FlaggedPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminQuestionsPage = lazy(() => import('./pages/AdminQuestionsPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));
const AdminMaterialsPage = lazy(() => import('./pages/AdminMaterialsPage'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExamProvider>
          <Suspense fallback={<Loading fullPage message="Loading..." />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Navigate to="/login" replace />} />

              <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/practice" element={<PracticePage />} />
                <Route path="/exam" element={<ExamPage />} />
                <Route path="/results/:id" element={<ResultPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/study" element={<StudyPage />} />
                <Route path="/flagged" element={<FlaggedPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/questions" element={<AdminQuestionsPage />} />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/materials" element={<AdminMaterialsPage />} />
                </Route>
              </Route>

              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </ExamProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
