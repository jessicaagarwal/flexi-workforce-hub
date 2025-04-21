
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
} from '@/components/ui/sidebar.jsx';
import { useAuth } from '@/hooks/useAuth';

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const isHR = user?.role === 'hr' || user?.role === 'admin';

  return (
    <Sidebar className="!bg-[hsl(172,100%,16%)] text-sidebar-foreground rounded-tr-xl rounded-br-xl shadow-lg border-r-0 min-h-screen">
      <SidebarHeader className="px-4 py-5 border-b border-[hsl(172,100%,26%)] flex items-center gap-3 bg-[hsl(172,100%,28%)] rounded-tr-xl">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-full bg-[hsl(172,100%,34%)] p-2 flex items-center justify-center shadow-xl">
            <Users className="h-8 w-8 text-[hsl(0,0%,98%)]" />
          </div>
          <span className="font-bold text-2xl text-[hsl(0,0%,96%)] tracking-wide drop-shadow">
            HRMS Pro
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 flex flex-col gap-3 mt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="!text-[hsl(0,0%,96%)] !font-semibold px-5 mb-1">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 px-2">
              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive('/dashboard')}
                    asChild
                    className={cn(
                      isActive('/dashboard')
                        ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                        : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                      'rounded-lg px-3 py-2 transition-all'
                    )}
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard />
                      <span>HR Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/employee-dashboard')}
                  asChild
                  className={cn(
                    isActive('/employee-dashboard')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/employee-dashboard">
                    <User />
                    <span>Employee Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isHR && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive('/employees')}
                    asChild
                    className={cn(
                      isActive('/employees')
                        ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                        : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                      'rounded-lg px-3 py-2 transition-all'
                    )}
                  >
                    <Link to="/employees">
                      <Users />
                      <span>Employees</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/attendance')}
                  asChild
                  className={cn(
                    isActive('/attendance')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/attendance">
                    <Clock />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/leave')}
                  asChild
                  className={cn(
                    isActive('/leave')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/leave">
                    <Calendar />
                    <span>Leave Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/payroll')}
                  asChild
                  className={cn(
                    isActive('/payroll')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/payroll">
                    <DollarSign />
                    <span>Payroll</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/performance')}
                  asChild
                  className={cn(
                    isActive('/performance')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/performance">
                    <TrendingUp />
                    <span>Performance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/documents')}
                  asChild
                  className={cn(
                    isActive('/documents')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/documents">
                    <FileText />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2 pt-2 border-t border-[hsl(172,100%,26%)]">
          <SidebarGroupLabel className="!text-[hsl(0,0%,96%)] !font-semibold px-5 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 px-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/settings')}
                  asChild
                  className={cn(
                    isActive('/settings')
                      ? 'bg-[hsl(172,100%,34%)] text-[hsl(0,0%,98%)] font-bold shadow-md'
                      : 'text-[hsl(0,0%,96%)] hover:bg-[hsl(172,100%,28%)] hover:text-[hsl(0,0%,98%)]',
                    'rounded-lg px-3 py-2 transition-all'
                  )}
                >
                  <Link to="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-[hsl(0,0%,96%)] hover:bg-[hsl(4,90%,58%)] hover:text-[hsl(0,0%,98%)] rounded-lg px-3 py-2 transition-all"
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[hsl(172,100%,28%)] rounded-br-xl mt-5 px-0 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3 w-full px-5">
          <div className="h-11 w-11 rounded-full bg-[hsl(0,0%,92%)] flex items-center justify-center text-[hsl(172,100%,28%)] font-semibold text-lg shadow">
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

      <SidebarTrigger className="absolute -right-3 top-14 z-10 !bg-white !text-[hsl(172,100%,34%)] border border-[hsl(172,100%,34%)] shadow-lg" />
    </Sidebar>
  );
};

export default AppSidebar;

