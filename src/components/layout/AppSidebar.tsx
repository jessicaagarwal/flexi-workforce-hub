
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Calendar, 
  DollarSign, 
  Award, 
  Clock, 
  Settings, 
  Users, 
  LayoutDashboard,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';
  
  // Define navigation links based on user role
  const navLinks = isAdmin 
    ? [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Employees', href: '/admin/employees', icon: Users },
        { name: 'Leave Requests', href: '/admin/leaves', icon: Calendar },
        { name: 'Payroll', href: '/admin/payroll', icon: DollarSign },
        { name: 'Performance', href: '/admin/performance', icon: Award },
        { name: 'Attendance', href: '/admin/attendance', icon: Clock },
        { name: 'Documents', href: '/admin/documents', icon: FileText },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    : [
        { name: 'Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', href: '/employee/profile', icon: User },
        { name: 'Leave Management', href: '/employee/leave', icon: Calendar },
        { name: 'Attendance', href: '/employee/attendance', icon: Clock },
        { name: 'Payroll', href: '/employee/payroll', icon: DollarSign },
        { name: 'Performance', href: '/employee/performance', icon: Award },
        { name: 'Documents', href: '/employee/documents', icon: FileText },
        { name: 'Settings', href: '/employee/settings', icon: Settings },
      ];

  return (
    <Sidebar className="border-r border-border h-screen">
      <SidebarHeader className="flex items-center px-4 h-16">
        <div className="flex items-center flex-1">
          <span className="text-xl font-bold text-[hsl(172,100%,34%)]">HRMS</span>
          <span className="text-xl font-bold text-gray-700">Pro</span>
        </div>
        <SidebarTrigger>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[hsl(172,70%,95%)] text-[hsl(172,100%,34%)]'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="px-3 py-4 mt-auto">
        <div className="space-y-4">
          <div className="px-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
