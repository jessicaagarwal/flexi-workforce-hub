
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Award, Star, Target, TrendingUp } from 'lucide-react';

// Mock performance data
const performanceData = {
  currentRating: 4.2,
  previousRating: 3.8,
  nextReviewDate: 'June 15, 2025',
  reviewCycle: 'Q2 2025',
  skills: [
    { name: 'Technical Skills', rating: 85 },
    { name: 'Communication', rating: 75 },
    { name: 'Teamwork', rating: 90 },
    { name: 'Problem Solving', rating: 80 },
    { name: 'Adaptability', rating: 70 },
  ],
  goals: [
    { id: 1, title: 'Complete Advanced React Training', progress: 80, dueDate: 'May 15, 2025', status: 'In Progress' },
    { id: 2, title: 'Improve Code Review Process', progress: 60, dueDate: 'June 30, 2025', status: 'In Progress' },
    { id: 3, title: 'Mentor Junior Developer', progress: 40, dueDate: 'July 15, 2025', status: 'In Progress' },
  ],
  feedbacks: [
    { 
      id: 1, 
      date: 'March 15, 2025', 
      reviewer: 'Jessica Wang, Manager', 
      content: 'John has shown excellent technical skills and problem-solving abilities. He consistently delivers high-quality work ahead of deadlines. Areas for improvement include more proactive communication with stakeholders.',
      rating: 4.5
    },
    { 
      id: 2, 
      date: 'December 10, 2024', 
      reviewer: 'Team Review', 
      content: 'John is a valuable team member who contributes innovative ideas and supports his colleagues. He has demonstrated growth in technical expertise and project management.',
      rating: 4.0
    }
  ]
};

const Performance: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Performance</h1>
        <p className="text-muted-foreground">
          Track your performance metrics, goals, and feedback
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">{performanceData.currentRating}</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    fill={star <= Math.floor(performanceData.currentRating) ? 'currentColor' : 'none'} 
                    className="h-4 w-4 text-yellow-400" 
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {performanceData.currentRating > performanceData.previousRating 
                ? `+${(performanceData.currentRating - performanceData.previousRating).toFixed(1)} from last review` 
                : `${(performanceData.currentRating - performanceData.previousRating).toFixed(1)} from last review`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{performanceData.nextReviewDate}</div>
            <p className="text-xs text-muted-foreground mt-1">Review Cycle: {performanceData.reviewCycle}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">60%</div>
            <Progress value={60} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">3 active goals</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Assessment</CardTitle>
              <CardDescription>Your performance across key skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.rating}%</span>
                    </div>
                    <Progress value={skill.rating} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>Your current goals and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.goals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">Due: {goal.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : goal.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Feedback</CardTitle>
              <CardDescription>Feedback from your manager and team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.feedbacks.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{feedback.reviewer}</h3>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-1">{feedback.rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm">{feedback.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
