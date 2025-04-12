
import React from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  TrendingUp, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';

const statsCards = [
  {
    title: 'Total Employees',
    value: '156',
    icon: Users,
    color: 'bg-blue-500',
    change: '+12% from last month',
    positive: true,
  },
  {
    title: 'Upcoming Payroll',
    value: '$124,500',
    icon: DollarSign,
    color: 'bg-green-500',
    change: 'Scheduled for 30th',
    positive: true,
  },
  {
    title: 'Pending Leaves',
    value: '8',
    icon: Calendar,
    color: 'bg-amber-500',
    change: '3 require approval',
    positive: null,
  },
  {
    title: 'Attendance Today',
    value: '94%',
    icon: Clock,
    color: 'bg-purple-500',
    change: '3% higher than average',
    positive: true,
  },
];

const recentActivities = [
  {
    user: 'Sarah Johnson',
    action: 'requested leave',
    time: '2 hours ago',
    type: 'leave',
  },
  {
    user: 'Alex Morgan',
    action: 'submitted timesheet',
    time: '4 hours ago',
    type: 'timesheet',
  },
  {
    user: 'Mike Wilson',
    action: 'uploaded document',
    time: 'Yesterday at 3:45 PM',
    type: 'document',
  },
  {
    user: 'Emily Clark',
    action: 'completed training',
    time: 'Yesterday at 1:30 PM',
    type: 'training',
  },
  {
    user: 'John Smith',
    action: 'updated profile',
    time: '2 days ago',
    type: 'profile',
  },
];

const upcomingEvents = [
  {
    title: 'Team Meeting',
    date: 'Today, 2:00 PM',
    type: 'meeting',
  },
  {
    title: 'Quarterly Review',
    date: 'Tomorrow, 10:00 AM',
    type: 'review',
  },
  {
    title: 'Jane\'s Birthday',
    date: 'April 15',
    type: 'event',
  },
  {
    title: 'Project Deadline',
    date: 'April 20',
    type: 'deadline',
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your HR dashboard today
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.color} p-2 rounded-full text-white`}>
                <card.icon size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.positive !== null && (
                  <span className={card.positive ? 'text-green-500' : 'text-red-500'}>
                    {card.positive ? '↑' : '↓'}{' '}
                  </span>
                )}
                {card.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts and activity section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Performance Overview */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Engineering</div>
                <div className="text-muted-foreground">92%</div>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Marketing</div>
                <div className="text-muted-foreground">86%</div>
              </div>
              <Progress value={86} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Sales</div>
                <div className="text-muted-foreground">78%</div>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Customer Support</div>
                <div className="text-muted-foreground">90%</div>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="relative mt-0.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      {activity.type === 'leave' && <Calendar size={12} className="text-blue-700" />}
                      {activity.type === 'timesheet' && <Clock size={12} className="text-blue-700" />}
                      {activity.type === 'document' && <FileText size={12} className="text-blue-700" />}
                      {activity.type === 'training' && <TrendingUp size={12} className="text-blue-700" />}
                      {activity.type === 'profile' && <Users size={12} className="text-blue-700" />}
                    </div>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming events and alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Upcoming Events */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between text-sm border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-hrms-blue rounded-full"></div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Alerts & Notifications */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertCircle size={18} className="text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">3 leave requests awaiting approval</p>
                  <p className="text-amber-700">Review and approve pending requests</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <AlertCircle size={18} className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Monthly payroll processing</p>
                  <p className="text-blue-700">Scheduled for April 28, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <AlertCircle size={18} className="text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">Employee onboarding complete</p>
                  <p className="text-green-700">2 new employees completed onboarding</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
