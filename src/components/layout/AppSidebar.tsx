
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
  User
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
        "!bg-[hsl(172,100%,16%)] text-sidebar-foreground rounded-tr-2xl rounded-br-2xl shadow-xl border-r-0 min-h-screen w-64 flex flex-col",
        "transition-all duration-300"
      )}
    >
      <SidebarHeader className="px-6 py-6 border-b border-[hsl(172,100%,26%)] flex items-center gap-4 bg-[hsl(172,100%,28%)] rounded-tr-2xl">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-full bg-[hsl(172,100%,34%)] p-2 flex items-center justify-center shadow-lg">
            <Users className="h-8 w-8 text-[hsl(0,0%,98%)]" />
          </div>
          <span className="font-extrabold text-2xl text-[hsl(0,0%,96%)] tracking-wide drop-shadow-sm">
            HRMS Pro
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col gap-5 py-6 px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="!text-[hsl(0,0%,96%)] !font-bold px-3 mb-2 tracking-wide uppercase text-xs">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-[hsl(172,100%,20%)] rounded-xl py-2 px-1 flex flex-col gap-[2px] shadow">
            <SidebarMenu className="flex flex-col gap-1">
              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActivePath(location, '/dashboard')}
                    asChild
                    className={cn(
                      isActivePath(location, '/dashboard')
                        ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                        : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                      "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                    )}
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="w-6 h-6" />
                      <span>HR Dashboard</span>
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/employee-dashboard">
                    <User className="w-6 h-6" />
                    <span>Employee Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActivePath(location, '/employees')}
                    asChild
                    className={cn(
                      isActivePath(location, '/employees')
                        ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                        : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                      "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                    )}
                  >
                    <Link to="/employees">
                      <Users className="w-6 h-6" />
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/attendance">
                    <Clock className="w-6 h-6" />
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/leave">
                    <Calendar className="w-6 h-6" />
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/payroll">
                    <DollarSign className="w-6 h-6" />
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/performance">
                    <TrendingUp className="w-6 h-6" />
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
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/documents">
                    <FileText className="w-6 h-6" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4 pt-4 border-t border-[hsl(172,100%,26%)]">
          <SidebarGroupLabel className="!text-[hsl(0,0%,96%)] !font-bold px-3 mb-2 tracking-wide uppercase text-xs">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-[hsl(172,100%,22%)] rounded-xl py-2 px-1 flex flex-col gap-[2px] shadow">
            <SidebarMenu className="flex flex-col gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActivePath(location, '/settings')}
                  asChild
                  className={cn(
                    isActivePath(location, '/settings')
                      ? "bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold ring-2 ring-[hsl(172,100%,34%)] shadow-md"
                      : "text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]",
                    "flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base"
                  )}
                >
                  <Link to="/settings">
                    <Settings className="w-6 h-6" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-[hsl(0,0%,96%)] hover:bg-[hsl(4,90%,58%)] hover:text-[hsl(0,0%,98%)] flex items-center gap-4 rounded-lg px-5 py-3 transition-all text-base font-semibold"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[hsl(172,100%,28%)] rounded-br-2xl px-0 py-5 flex items-center justify-center border-t border-[hsl(172,100%,26%)]">
        <div className="flex items-center gap-4 w-full px-6">
          <div className="h-12 w-12 rounded-full bg-[hsl(0,0%,92%)] flex items-center justify-center text-[hsl(172,100%,28%)] font-bold text-xl shadow">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[hsl(0,0%,96%)] truncate text-base">
              {user?.name || 'User'}
            </div>
            <div className="text-xs text-[hsl(172,100%,16%)] truncate">
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarTrigger className="absolute -right-4 top-16 z-10 !bg-white !text-[hsl(172,100%,34%)] border border-[hsl(172,100%,34%)] shadow-xl" />
    </Sidebar>
  );
};

export default AppSidebar;
