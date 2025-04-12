
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingUp, Award, Star, LineChart, BarChart, CheckCircle, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const PerformancePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock performance data
  const performanceMetrics = {
    overall: 82,
    productivity: 85,
    quality: 90,
    attendance: 95,
    teamwork: 88,
    innovation: 70,
  };
  
  const upcomingReviews = [
    { title: 'Quarterly Performance Review', date: '2025-06-15', status: 'Scheduled' },
    { title: 'Project Completion Evaluation', date: '2025-05-22', status: 'Pending' },
  ];
  
  const completedGoals = [
    { title: 'Complete HR software training', date: '2025-03-10', status: 'Completed' },
    { title: 'Improve department response time by 15%', date: '2025-02-28', status: 'Completed' },
    { title: 'Implement new leave approval workflow', date: '2025-01-15', status: 'Completed' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Performance Management
          </h1>
          <p className="text-muted-foreground">
            Track your performance metrics, goals, and upcoming reviews.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & KPIs</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Score</CardTitle>
                <CardDescription>Your current performance rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Performance</span>
                      <span className="text-sm font-medium">{performanceMetrics.overall}%</span>
                    </div>
                    <Progress value={performanceMetrics.overall} className="h-2" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Productivity</span>
                        <span className="text-sm">{performanceMetrics.productivity}%</span>
                      </div>
                      <Progress value={performanceMetrics.productivity} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quality of Work</span>
                        <span className="text-sm">{performanceMetrics.quality}%</span>
                      </div>
                      <Progress value={performanceMetrics.quality} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Attendance</span>
                        <span className="text-sm">{performanceMetrics.attendance}%</span>
                      </div>
                      <Progress value={performanceMetrics.attendance} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Teamwork</span>
                        <span className="text-sm">{performanceMetrics.teamwork}%</span>
                      </div>
                      <Progress value={performanceMetrics.teamwork} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Innovation</span>
                        <span className="text-sm">{performanceMetrics.innovation}%</span>
                      </div>
                      <Progress value={performanceMetrics.innovation} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Highlights</CardTitle>
                <CardDescription>Key achievements and areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Strengths
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm pl-6 list-disc">
                      <li>Excellent attendance record</li>
                      <li>High quality of work with minimal errors</li>
                      <li>Strong communication with team members</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      Areas for Improvement
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm pl-6 list-disc">
                      <li>Develop more innovative solutions</li>
                      <li>Improve time management for complex tasks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      Recent Achievements
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm pl-6 list-disc">
                      <li>Completed project ahead of schedule</li>
                      <li>Received recognition for process improvement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Goals</CardTitle>
                <CardDescription>Your active goals and KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium">Improve department efficiency</h3>
                    <p className="text-sm text-muted-foreground mt-1">Reduce processing time by 20%</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm">Progress: 65%</span>
                      <span className="text-sm">Due: May 30, 2025</span>
                    </div>
                    <Progress value={65} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium">Complete advanced HR certification</h3>
                    <p className="text-sm text-muted-foreground mt-1">Finish all required courses and pass exam</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm">Progress: 40%</span>
                      <span className="text-sm">Due: July 15, 2025</span>
                    </div>
                    <Progress value={40} className="h-1.5 mt-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Completed Goals</CardTitle>
                <CardDescription>Goals you've successfully achieved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedGoals.map((goal, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Completed on: {new Date(goal.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reviews</CardTitle>
                <CardDescription>Scheduled performance reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingReviews.map((review, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">{review.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Date: {new Date(review.date).toLocaleDateString()}
                          </p>
                          <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {review.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Past Reviews</CardTitle>
                <CardDescription>History of your performance evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Annual Performance Evaluation</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Date: January 15, 2025
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-sm font-medium">Rating:</span>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformancePage;
