import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DoorClosed, FileText, MessagesSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AttendanceTracker from '@/components/attendance/AttendanceTracker';
import MissedAttendanceForm from '@/components/attendance/MissedAttendanceForm';
import LeaveApplicationForm from '@/components/leave/LeaveApplicationForm';
import LeaveBalanceCard from '@/components/leave/LeaveBalanceCard';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import PayrollDetails from '@/components/payroll/PayrollDetails';
import ResignationFormModal from '@/components/resignation/ResignationFormModal';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('attendance');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Employee Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your attendance, leaves, and more.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ResignationFormModal>
            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
              <DoorClosed className="h-4 w-4 mr-2" />
              Resignation
            </Button>
          </ResignationFormModal>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AttendanceTracker />
            <MissedAttendanceForm />
          </div>
        </TabsContent>
        
        <TabsContent value="leave" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <LeaveApplicationForm />
            <LeaveBalanceCard />
          </div>
        </TabsContent>
        
        <TabsContent value="payroll" className="space-y-6">
          <PayrollDetails />
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <div className="max-w-2xl">
            <FeedbackForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard; 