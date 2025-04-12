
import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data for demonstration
const mockLeaveBalance = {
  annual: {
    total: 12,
    used: 4,
    remaining: 8,
  },
  sick: {
    total: 7,
    used: 2,
    remaining: 5,
  },
  unpaid: {
    total: 0,
    used: 1,
    remaining: 0,
  }
};

const LeaveBalanceCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leave Balance</CardTitle>
        <CardDescription>
          Your current leave balance and usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-5 bg-blue-500 rounded-sm mr-2"></div>
                <div className="text-sm font-medium">Annual Casual Leave</div>
              </div>
              <div className="text-sm font-semibold">
                {mockLeaveBalance.annual.remaining}/{mockLeaveBalance.annual.total} days remaining
              </div>
            </div>
            <Progress 
              value={(mockLeaveBalance.annual.used / mockLeaveBalance.annual.total) * 100} 
              className="h-2" 
            />
            <div className="text-xs text-muted-foreground">
              Used: {mockLeaveBalance.annual.used} days
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-5 bg-red-500 rounded-sm mr-2"></div>
                <div className="text-sm font-medium">Sick Leave</div>
              </div>
              <div className="text-sm font-semibold">
                {mockLeaveBalance.sick.remaining}/{mockLeaveBalance.sick.total} days remaining
              </div>
            </div>
            <Progress 
              value={(mockLeaveBalance.sick.used / mockLeaveBalance.sick.total) * 100} 
              className="h-2" 
            />
            <div className="text-xs text-muted-foreground">
              Used: {mockLeaveBalance.sick.used} days
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-5 bg-amber-500 rounded-sm mr-2"></div>
                <div className="text-sm font-medium">Loss of Pay (LOP)</div>
              </div>
              <div className="text-sm font-semibold">
                {mockLeaveBalance.unpaid.used} days
              </div>
            </div>
            <div className="p-2 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                <div className="text-xs text-amber-700">
                  LOP leaves will be deducted from your salary
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-2">Leave History</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <div className="text-sm">Annual Leave</div>
              </div>
              <div className="text-sm">
                Apr 5 - Apr 7, 2023
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-red-500" />
                <div className="text-sm">Sick Leave</div>
              </div>
              <div className="text-sm">
                Mar 15, 2023
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                <div className="text-sm">LOP</div>
              </div>
              <div className="text-sm">
                Feb 22, 2023
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveBalanceCard;
