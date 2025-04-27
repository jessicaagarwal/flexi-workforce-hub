import React, { useState, useEffect } from 'react';
import api from '@/services/apiService';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Award, Star, ChevronRight, Loader2 } from 'lucide-react';

const AdminPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // State for performance data
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(true);
  const [performanceError, setPerformanceError] = useState(null);
  
  // State for upcoming reviews
  const [upcomingReviews, setUpcomingReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  
  // State for review templates
  const [reviewTemplates, setReviewTemplates] = useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templatesError, setTemplatesError] = useState(null);
  
  // State for performance stats
  const [performanceStats, setPerformanceStats] = useState({
    averageRating: 0,
    upcomingReviewsCount: 0,
    topPerformersCount: 0
  });
  
  // State for creating a new review
  const [isCreatingReview, setIsCreatingReview] = useState(false);
  
  // Fetch performance data
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setIsLoadingPerformance(true);
        const response = await api.get('/performance');
        
        // Format the data
        const formattedData = response.data.map(performance => ({
          id: performance._id,
          employeeId: performance.employee?.employeeId || 'N/A',
          name: performance.employee?.name || 'Unknown',
          department: performance.employee?.department || 'N/A',
          rating: performance.rating || 0,
          lastReview: performance.lastReviewDate ? new Date(performance.lastReviewDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'N/A',
          nextReview: performance.nextReviewDate ? new Date(performance.nextReviewDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'N/A',
          status: performance.status || 'Not Rated'
        }));
        
        setPerformanceData(formattedData);
        setPerformanceError(null);
      } catch (err) {
        console.error('Error fetching performance data:', err);
        setPerformanceError('Failed to fetch performance data');
        toast.error('Failed to fetch performance data');
      } finally {
        setIsLoadingPerformance(false);
      }
    };
    
    fetchPerformanceData();
  }, []);
  
  // Fetch upcoming reviews
  useEffect(() => {
    const fetchUpcomingReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await api.get('/performance/upcoming');
        
        // Format the data
        const formattedReviews = response.data.map(review => ({
          id: review._id,
          employeeId: review.employee?.employeeId || 'N/A',
          name: review.employee?.name || 'Unknown',
          department: review.employee?.department || 'N/A',
          reviewDate: new Date(review.reviewDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          currentRating: review.currentRating || 0,
          reviewer: review.reviewer?.name || 'Not Assigned',
          status: review.status || 'Not Started'
        }));
        
        setUpcomingReviews(formattedReviews);
        setReviewsError(null);
        
        // Update performance stats
        setPerformanceStats(prev => ({
          ...prev,
          upcomingReviewsCount: formattedReviews.length
        }));
      } catch (err) {
        console.error('Error fetching upcoming reviews:', err);
        setReviewsError('Failed to fetch upcoming reviews');
        // Don't show toast for this error to avoid multiple error messages
      } finally {
        setIsLoadingReviews(false);
      }
    };
    
    fetchUpcomingReviews();
  }, []);
  
  // Fetch review templates
  useEffect(() => {
    const fetchReviewTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const response = await api.get('/performance/templates');
        
        // Format the data
        const formattedTemplates = response.data.map(template => ({
          id: template._id,
          name: template.name,
          description: template.description,
          lastUpdated: new Date(template.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          usedBy: template.departments?.join(', ') || 'All Departments'
        }));
        
        setReviewTemplates(formattedTemplates);
        setTemplatesError(null);
      } catch (err) {
        console.error('Error fetching review templates:', err);
        setTemplatesError('Failed to fetch review templates');
        // Don't show toast for this error to avoid multiple error messages
      } finally {
        setIsLoadingTemplates(false);
      }
    };
    
    fetchReviewTemplates();
  }, []);
  
  // Fetch performance stats
  useEffect(() => {
    const fetchPerformanceStats = async () => {
      try {
        const response = await api.get('/performance/stats');
        
        setPerformanceStats({
          averageRating: response.data.averageRating || 0,
          upcomingReviewsCount: response.data.upcomingReviewsCount || 0,
          topPerformersCount: response.data.topPerformersCount || 0
        });
      } catch (err) {
        console.error('Error fetching performance stats:', err);
        // Don't show error toast for stats to avoid multiple error messages
      }
    };
    
    fetchPerformanceStats();
  }, []);
  
  // Handle start review
  const handleStartReview = async (id) => {
    try {
      await api.post(`/performance/reviews/${id}/start`);
      
      toast.success('Review started successfully');
      
      // Update upcoming reviews
      const response = await api.get('/performance/upcoming');
      setUpcomingReviews(response.data);
    } catch (err) {
      console.error('Error starting review:', err);
      toast.error('Failed to start review');
    }
  };
  
  // Handle create new review
  const handleCreateReview = async () => {
    setIsCreatingReview(true);
    
    try {
      // In a real app, this would open a modal or navigate to a form
      toast.info('This would open a form to create a new review');
    } catch (err) {
      console.error('Error creating review:', err);
      toast.error('Failed to create review');
    } finally {
      setIsCreatingReview(false);
    }
  };
  
  // Handle create new template
  const handleCreateTemplate = async () => {
    try {
      // In a real app, this would open a modal or navigate to a form
      toast.info('This would open a form to create a new template');
    } catch (err) {
      console.error('Error creating template:', err);
      toast.error('Failed to create template');
    }
  };
  
  // Filter performance data based on search and department
  const filteredPerformance = performanceData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Performance Management</h1>
        <p className="text-muted-foreground">
          Manage employee performance reviews and feedback
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">{performanceStats.averageRating.toFixed(1)}</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    fill={star <= Math.round(performanceStats.averageRating) ? 'currentColor' : 'none'} 
                    className="h-4 w-4 text-yellow-400" 
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all departments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{performanceStats.upcomingReviewsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">In the next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{performanceStats.topPerformersCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Employees with 4.5+ rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Reviews</TabsTrigger>
          <TabsTrigger value="templates">Review Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee name or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <Select 
                value={departmentFilter} 
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleCreateReview}
                disabled={isCreatingReview}
              >
                {isCreatingReview ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    New Review
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              {isLoadingPerformance ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : performanceError ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                  {performanceError}
                </div>
              ) : filteredPerformance.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-muted-foreground">
                  No performance data found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPerformance.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.employeeId}</TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{employee.rating.toFixed(1)}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                        </TableCell>
                        <TableCell>{employee.lastReview}</TableCell>
                        <TableCell>{employee.nextReview}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'Excellent' 
                              ? 'bg-green-100 text-green-800' 
                              : employee.status === 'On Track'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {employee.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Performance Reviews</CardTitle>
              <CardDescription>Reviews scheduled in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingReviews ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : reviewsError ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                  {reviewsError}
                </div>
              ) : upcomingReviews.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-muted-foreground">
                  No upcoming reviews found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Current Rating</TableHead>
                      <TableHead>Review Date</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.employeeId}</div>
                        </TableCell>
                        <TableCell>{review.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{review.currentRating.toFixed(1)}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          </div>
                        </TableCell>
                        <TableCell>{review.reviewDate}</TableCell>
                        <TableCell>{review.reviewer}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            review.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : review.status === 'Scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {review.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStartReview(review.id)}
                            disabled={review.status === 'Completed'}
                          >
                            Start Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Review Templates</CardTitle>
              <CardDescription>Manage performance review templates</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTemplates ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : templatesError ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                  {templatesError}
                </div>
              ) : reviewTemplates.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-muted-foreground">
                  No review templates found
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {reviewTemplates.map(template => (
                    <Card key={template.id}>
                      <CardHeader>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span>{template.lastUpdated}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Used by:</span>
                            <span>{template.usedBy}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <Button onClick={handleCreateTemplate}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPerformance; 