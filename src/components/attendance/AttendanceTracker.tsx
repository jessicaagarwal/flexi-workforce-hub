
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration
const mockAttendanceHistory = [
  {
    id: '1',
    date: '2023-04-10',
    checkIn: '09:05:22',
    checkOut: '17:30:45',
    totalHours: '8h 25m',
    status: 'Present'
  },
  {
    id: '2',
    date: '2023-04-09',
    checkIn: '08:58:10',
    checkOut: '18:05:30',
    totalHours: '9h 7m',
    status: 'Present'
  },
  {
    id: '3',
    date: '2023-04-08',
    checkIn: '09:10:15',
    checkOut: '17:45:20',
    totalHours: '8h 35m',
    status: 'Present'
  },
];

const AttendanceTracker: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCheckIn = () => {
    const now = new Date();
    setIsCheckedIn(true);
    setCheckInTime(now);
    toast({
      title: "Checked In",
      description: `You've checked in at ${now.toLocaleTimeString()}`,
    });
    
    // In a real app, this would make an API call to save the check-in time
  };
  
  const handleCheckOut = () => {
    const now = new Date();
    
    if (checkInTime) {
      const durationMs = now.getTime() - checkInTime.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      
      toast({
        title: "Checked Out",
        description: `You worked for ${hours}h ${minutes}m today`,
      });
      
      // In a real app, this would make an API call to save the check-out time
    }
    
    setIsCheckedIn(false);
    setCheckInTime(null);
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-100 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today's Attendance</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              {isCheckedIn ? (
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span>
                    Checked in {checkInTime && formatDistanceToNow(checkInTime, { addSuffix: true })}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center text-amber-600 mb-4">
                  <AlertCircle className="h-5 w-5 mr-1" />
                  <span>Not checked in yet</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          {isCheckedIn ? (
            <Button 
              onClick={handleCheckOut}
              className="w-32 bg-red-500 hover:bg-red-600"
            >
              <Clock className="mr-2 h-4 w-4" />
              Check Out
            </Button>
          ) : (
            <Button 
              onClick={handleCheckIn}
              className="w-32 bg-green-500 hover:bg-green-600"
            >
              <Clock className="mr-2 h-4 w-4" />
              Check In
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Attendance History</CardTitle>
          <CardDescription>
            Your attendance records for the last few days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAttendanceHistory.map((record) => (
              <div 
                key={record.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div>
                  <div className="font-medium">
                    {new Date(record.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {record.checkIn} to {record.checkOut}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{record.totalHours}</div>
                  <div className="text-sm text-green-600">{record.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Full Attendance History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AttendanceTracker;
