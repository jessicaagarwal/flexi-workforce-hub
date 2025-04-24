import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Attendance = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
    toast.success('Clocked in successfully!');
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    setIsClockedIn(false);
    toast.success('Clocked out successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Attendance</h1>
        <p className="text-muted-foreground">
          Record your daily attendance and view your attendance history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clock In/Out</CardTitle>
            <CardDescription>
              Record your daily attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className="text-sm font-medium">
                  {isClockedIn ? 'Clocked In' : 'Not Clocked In'}
                </div>
              </div>
              
              {clockInTime && (
                <div className="space-y-2">
                  <Label>Clock In Time</Label>
                  <div className="text-sm font-medium">
                    {clockInTime.toLocaleTimeString()}
                  </div>
                </div>
              )}

              {clockOutTime && (
                <div className="space-y-2">
                  <Label>Clock Out Time</Label>
                  <div className="text-sm font-medium">
                    {clockOutTime.toLocaleTimeString()}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleClockIn}
                  disabled={isClockedIn}
                  className="flex-1"
                >
                  Clock In
                </Button>
                <Button
                  onClick={handleClockOut}
                  disabled={!isClockedIn}
                  variant="outline"
                  className="flex-1"
                >
                  Clock Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>
              Your attendance summary for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="text-sm font-medium">
                    {isClockedIn ? 'Present' : 'Not Present'}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="text-sm font-medium">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance; 