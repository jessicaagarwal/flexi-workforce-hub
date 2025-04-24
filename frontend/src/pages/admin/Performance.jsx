import React, { useState } from 'react';
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
import { Search, Plus, Award, Star, ChevronRight } from 'lucide-react';

// Mock employees performance data
const mockPerformanceData = [
  { id: 1, employeeId: 'EMP001', name: 'John Employee', department: 'Engineering', rating: 4.2, lastReview: 'March 15, 2025', nextReview: 'June 15, 2025', status: 'On Track' },
  { id: 2, employeeId: 'EMP003', name: 'Sarah Johnson', department: 'Design', rating: 4.5, lastReview: 'February 10, 2025', nextReview: 'May 10, 2025', status: 'Excellent' },
  { id: 3, employeeId: 'EMP005', name: 'Michael Chen', department: 'Marketing', rating: 3.8, lastReview: 'April 05, 2025', nextReview: 'July 05, 2025', status: 'Needs Improvement' },
  { id: 4, employeeId: 'EMP002', name: 'Ana Rodriguez', department: 'Engineering', rating: 4.7, lastReview: 'March 20, 2025', nextReview: 'June 20, 2025', status: 'Excellent' },
  { id: 5, employeeId: 'EMP004', name: 'David Kim', department: 'HR', rating: 4.0, lastReview: 'January 25, 2025', nextReview: 'April 25, 2025', status: 'On Track' },
];

// Mock upcoming reviews
const mockUpcomingReviews = [
  { id: 1, employeeId: 'EMP004', name: 'David Kim', department: 'HR', reviewDate: 'April 25, 2025', currentRating: 4.0, reviewer: 'Jessica Wang', status: 'Scheduled' },
  { id: 2, employeeId: 'EMP008', name: 'Emily Davis', department: 'Finance', reviewDate: 'April 28, 2025', currentRating: 3.9, reviewer: 'Jessica Wang', status: 'Scheduled' },
  { id: 3, employeeId: 'EMP012', name: 'Robert Smith', department: 'Customer Support', reviewDate: 'May 02, 2025', currentRating: 4.1, reviewer: 'Jessica Wang', status: 'Not Started' },
];

const AdminPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // Filter performance data based on search and department
  const filteredPerformance = mockPerformanceData.filter(employee => {
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
              <div className="text-3xl font-bold mr-2">4.2</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    fill={star <= 4 ? 'currentColor' : 'none'} 
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
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">In the next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16</div>
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
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Review
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
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
                          <span className="font-medium mr-1">{employee.rating}</span>
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
                  {mockUpcomingReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.employeeId}</div>
                      </TableCell>
                      <TableCell>{review.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{review.currentRating}</span>
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
                        <Button variant="outline" size="sm">
                          Start Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Standard Review</CardTitle>
                    <CardDescription>Basic performance review template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>March 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Used by:</span>
                        <span>All Departments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Engineering Review</CardTitle>
                    <CardDescription>Specialized template for engineering team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>April 01, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Used by:</span>
                        <span>Engineering Department</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button>
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