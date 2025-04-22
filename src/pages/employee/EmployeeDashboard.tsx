
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar, Award, DollarSign, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [clockedIn, setClockedIn] = React.useState(false);
  
  // Mock attendance data
  const attendanceRate = 96;
  
  const handleClockInOut = () => {
    setClockedIn(!clockedIn);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's your personal dashboard - everything you need at a glance.
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleClockInOut} 
              variant={clockedIn ? "destructive" : "default"}
              className="w-full"
            >
              <Clock className="mr-2 h-4 w-4" />
              {clockedIn ? 'Clock Out' : 'Clock In'}
            </Button>
            
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Apply for Leave
            </Button>
            
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Latest Payslip
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <Progress value={attendanceRate} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <Progress value={70} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Annual leave remaining</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">April 30, 2025</div>
            <p className="text-xs text-muted-foreground mt-2">Estimated: $3,450</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Team Meeting</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Performance Review</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Salary Disbursement</p>
                  <p className="text-xs text-muted-foreground">April 30, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-1">
                  <FileText className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Leave Request Approved</p>
                  <p className="text-xs text-muted-foreground">Your leave request for May 3-5 has been approved by HR.</p>
                  <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                  <Award className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Performance Feedback</p>
                  <p className="text-xs text-muted-foreground">Your manager has submitted feedback for your Q1 performance.</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
