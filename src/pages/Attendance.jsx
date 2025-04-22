import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AttendanceTracker from '@/components/attendance/AttendanceTracker';
import MissedAttendanceForm from '@/components/attendance/MissedAttendanceForm';

const AttendancePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('daily');
  
  // Mock attendance data
  const attendanceHistory = [
    { date: '2025-04-10', checkIn: '09:02 AM', checkOut: '06:05 PM', status: 'Present' },
    { date: '2025-04-09', checkIn: '09:15 AM', checkOut: '05:58 PM', status: 'Present' },
    { date: '2025-04-08', checkIn: '09:07 AM', checkOut: '06:10 PM', status: 'Present' },
    { date: '2025-04-07', checkIn: '09:30 AM', checkOut: '06:03 PM', status: 'Present' },
    { date: '2025-04-06', checkIn: '', checkOut: '', status: 'Weekend' },
    { date: '2025-04-05', checkIn: '', checkOut: '', status: 'Weekend' },
    { date: '2025-04-04', checkIn: '09:20 AM', checkOut: '05:50 PM', status: 'Present' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Attendance Management
          </h1>
          <p className="text-muted-foreground">
            Track your attendance, view history, and manage missed check-ins.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="missed">Report Missed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AttendanceTracker />
            <Card>
              <CardHeader>
                <CardTitle>Today's Status</CardTitle>
                <CardDescription>Your current attendance status for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Work Hours:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Status:</span>
                    <span className="text-green-500 font-medium">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your attendance records for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b bg-muted/50 px-4 py-3 font-medium">
                  <div>Date</div>
                  <div>Check In</div>
                  <div>Check Out</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {attendanceHistory.map((record, index) => (
                    <div key={index} className="grid grid-cols-4 px-4 py-3">
                      <div>{new Date(record.date).toLocaleDateString()}</div>
                      <div>{record.checkIn || '-'}</div>
                      <div>{record.checkOut || '-'}</div>
                      <div className={record.status === 'Present' ? 'text-green-500' : 'text-gray-500'}>
                        {record.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="missed" className="space-y-6">
          <div className="max-w-2xl">
            <MissedAttendanceForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;
