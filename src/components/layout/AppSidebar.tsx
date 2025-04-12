
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
  SidebarMenuLink,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const isHR = user?.role === 'hr' || user?.role === 'admin';
  
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="rounded-md bg-hrms-blue p-1">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="font-bold text-xl">HRMS Pro</div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isHR && (
                <SidebarMenuItem active={isActive('/dashboard')}>
                  <SidebarMenuLink asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard />
                      <span>HR Dashboard</span>
                    </Link>
                  </SidebarMenuLink>
                </SidebarMenuItem>
              )}
              
              <SidebarMenuItem active={isActive('/employee-dashboard')}>
                <SidebarMenuLink asChild>
                  <Link to="/employee-dashboard">
                    <User />
                    <span>Employee Dashboard</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              {isHR && (
                <SidebarMenuItem active={isActive('/employees')}>
                  <SidebarMenuLink asChild>
                    <Link to="/employees">
                      <Users />
                      <span>Employees</span>
                    </Link>
                  </SidebarMenuLink>
                </SidebarMenuItem>
              )}
              
              <SidebarMenuItem active={isActive('/attendance')}>
                <SidebarMenuLink asChild>
                  <Link to="/attendance">
                    <Clock />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              <SidebarMenuItem active={isActive('/leave')}>
                <SidebarMenuLink asChild>
                  <Link to="/leave">
                    <Calendar />
                    <span>Leave Management</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              <SidebarMenuItem active={isActive('/payroll')}>
                <SidebarMenuLink asChild>
                  <Link to="/payroll">
                    <DollarSign />
                    <span>Payroll</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              <SidebarMenuItem active={isActive('/performance')}>
                <SidebarMenuLink asChild>
                  <Link to="/performance">
                    <TrendingUp />
                    <span>Performance</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              <SidebarMenuItem active={isActive('/documents')}>
                <SidebarMenuLink asChild>
                  <Link to="/documents">
                    <FileText />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem active={isActive('/settings')}>
                <SidebarMenuLink asChild>
                  <Link to="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuLink>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-md p-2">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <div className="font-medium truncate">{user?.name || 'User'}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      
      <SidebarTrigger className="absolute -right-3 top-10 z-10" />
    </Sidebar>
  );
};

export default AppSidebar;
