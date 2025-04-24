import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock stats for dashboard
  const stats = [
    { 
      title: 'Total Employees', 
      value: '124', 
      icon: Users, 
      change: '+4% from last month', 
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Leave Requests', 
      value: '12', 
      icon: Calendar, 
      change: 'Pending approval', 
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50' 
    },
    { 
      title: 'Payroll', 
      value: '$143,624', 
      icon: DollarSign, 
      change: 'For April 2025', 
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Performance Reviews', 
      value: '32', 
      icon: Award, 
      change: 'Due this month', 
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening in your HR dashboard today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">New employee joined</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson - Designer</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2h ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Leave request approved</p>
                  <p className="text-xs text-muted-foreground">Michael Chen - 3 days</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">5h ago</div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Performance review completed</p>
                  <p className="text-xs text-muted-foreground">Ana Rodriguez - Engineering</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">Yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Company Town Hall</p>
                  <p className="text-xs text-muted-foreground">April 28, 2025 - 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quarterly Review Meeting</p>
                  <p className="text-xs text-muted-foreground">May 5, 2025 - 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Payroll Processing Deadline</p>
                  <p className="text-xs text-muted-foreground">May 10, 2025</p>
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