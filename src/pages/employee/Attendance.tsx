
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileText } from 'lucide-react';

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const [isClockIn, setIsClockIn] = React.useState(false);
  const [attendanceTime, setAttendanceTime] = React.useState<string>('');

  // Mock current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleClockInOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setAttendanceTime(timeString);
    setIsClockIn(!isClockIn);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Attendance</h1>
        <p className="text-muted-foreground">
          Track your daily attendance and view your history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
          <p className="text-sm text-muted-foreground">{currentDate}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold mb-1">{attendanceTime || '--:--'}</div>
              <p className="text-sm text-muted-foreground">
                {isClockIn ? 'Clocked In' : 'Not Clocked In'}
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleClockInOut}
              className={isClockIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
            >
              <Clock className="mr-2 h-4 w-4" />
              {isClockIn ? 'Clock Out' : 'Clock In'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{day}</p>
                  <p className="text-sm text-muted-foreground">April {15 + i}, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Clock In: <span className="font-medium">09:0{i} AM</span></p>
                  <p className="text-sm">Clock Out: <span className="font-medium">05:3{i} PM</span></p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
