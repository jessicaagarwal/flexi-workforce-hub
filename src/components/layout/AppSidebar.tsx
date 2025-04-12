
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Home, 
  Users, 
  DollarSign, 
  Calendar, 
  BarChart, 
  FileText, 
  Clock, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Payroll', path: '/payroll', icon: DollarSign },
  { name: 'Leave Management', path: '/leave', icon: Calendar },
  { name: 'Performance', path: '/performance', icon: BarChart },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Attendance', path: '/attendance', icon: Clock },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-hrms-blue">HRMS</span>
          <span className="text-2xl font-bold text-gray-700">Pro</span>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3",
                        location.pathname.startsWith(item.path) ? 
                          "text-hrms-blue font-medium" : 
                          "text-gray-700 hover:text-hrms-blue"
                      )}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <button 
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 text-gray-700 hover:text-hrms-blue rounded-md transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
