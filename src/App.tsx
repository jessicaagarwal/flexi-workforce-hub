
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import LeaveManagement from "./pages/LeaveManagement";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Redirect root to dashboard if authenticated */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Protected routes with AppLayout */}
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/leave" element={<LeaveManagement />} />
              {/* Add other routes here as they are implemented */}
              <Route path="/payroll" element={<div className="p-6">Payroll page coming soon</div>} />
              <Route path="/performance" element={<div className="p-6">Performance tracking page coming soon</div>} />
              <Route path="/documents" element={<div className="p-6">Document management page coming soon</div>} />
              <Route path="/attendance" element={<div className="p-6">Attendance management page coming soon</div>} />
              <Route path="/settings" element={<div className="p-6">Settings page coming soon</div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
