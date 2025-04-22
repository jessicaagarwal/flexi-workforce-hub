
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  Clock,
  Settings,
  LogOut,
  User,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

// Helper: active detection
const isActivePath = (location, path) => location.pathname === path;

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHR = user?.role === 'hr' || user?.role === 'admin';

  return (
    <Sidebar
      className={cn(
        "!bg-white text-gray-600 shadow-lg border-r border-gray-200 min-h-screen w-64 flex flex-col",
        "transition-all duration-300"
      )}
    >
      <SidebarHeader className="px-6 py-5 border-b border-gray-200 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-2 flex items-center justify-center shadow-md">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">
            {isHR ? "MasterHR" : "EmployeeHR"}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col gap-4 py-4 px-3">
        <div className="px-3 mb-1 text-xs font-semibold text-gray-500 uppercase">
          {isHR ? "Admin" : "Dashboards"}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent className="py-1 px-1 flex flex-col gap-1">
            <SidebarMenu className="flex flex-col gap-1">
              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActivePath(location, '/dashboard')}
                    asChild
                    className={cn(
                      isActivePath(location, '/dashboard')
                        ? "bg-primary bg-opacity-10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                    )}
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/employee-dashboard')}
                  asChild
                  className={cn(
                    isActivePath(location, '/employee-dashboard')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/employee-dashboard">
                    <User className="w-5 h-5" />
                    <span>My Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3 mt-3 mb-1 text-xs font-semibold text-gray-500 uppercase">
          HR Management
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent className="py-1 px-1 flex flex-col gap-1">
            <SidebarMenu className="flex flex-col gap-1">
              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActivePath(location, '/employees')}
                    asChild
                    className={cn(
                      isActivePath(location, '/employees')
                        ? "bg-primary bg-opacity-10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                    )}
                  >
                    <Link to="/employees">
                      <Users className="w-5 h-5" />
                      <span>Employees</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/attendance')}
                  asChild
                  className={cn(
                    isActivePath(location, '/attendance')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/attendance">
                    <Clock className="w-5 h-5" />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/leave')}
                  asChild
                  className={cn(
                    isActivePath(location, '/leave')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/leave">
                    <Calendar className="w-5 h-5" />
                    <span>Leave Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/payroll')}
                  asChild
                  className={cn(
                    isActivePath(location, '/payroll')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/payroll">
                    <DollarSign className="w-5 h-5" />
                    <span>Payroll</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/performance')}
                  asChild
                  className={cn(
                    isActivePath(location, '/performance')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/performance">
                    <TrendingUp className="w-5 h-5" />
                    <span>Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/documents')}
                  asChild
                  className={cn(
                    isActivePath(location, '/documents')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/documents">
                    <FileText className="w-5 h-5" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3 mt-3 mb-1 text-xs font-semibold text-gray-500 uppercase">
          Tools
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent className="py-1 px-1 flex flex-col gap-1">
            <SidebarMenu className="flex flex-col gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/settings')}
                  asChild
                  className={cn(
                    isActivePath(location, '/settings')
                      ? "bg-primary bg-opacity-10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-all text-sm"
                  )}
                >
                  <Link to="/settings">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-0 py-4 flex items-center justify-center border-t border-gray-200">
        <div className="flex items-center gap-3 w-full px-4">
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-primary font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-800 truncate text-sm">
              {user?.name || 'User'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.role === 'admin' ? 'Administrator' : user?.role === 'hr' ? 'HR Manager' : 'Employee'}
            </div>
          </div>
          <button 
            onClick={logout}
            className="text-gray-500 hover:text-warning rounded p-1"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarTrigger className="absolute -right-3 top-16 z-10 !bg-white !text-gray-700 border border-gray-200 shadow-md" />
    </Sidebar>
  );
};

export default AppSidebar;
