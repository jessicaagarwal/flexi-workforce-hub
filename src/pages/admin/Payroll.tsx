
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, FileText, Download, Plus, Search, Filter } from 'lucide-react';

// Mock payroll data
const mockPayrollData = [
  { id: 1, employeeId: 'EMP001', name: 'John Employee', designation: 'Developer', salary: 4500, payDate: 'April 30, 2025', status: 'Pending' },
  { id: 2, employeeId: 'EMP003', name: 'Sarah Johnson', designation: 'Designer', salary: 4200, payDate: 'April 30, 2025', status: 'Pending' },
  { id: 3, employeeId: 'EMP005', name: 'Michael Chen', designation: 'Marketing Specialist', salary: 3800, payDate: 'April 30, 2025', status: 'Pending' },
  { id: 4, employeeId: 'EMP002', name: 'Ana Rodriguez', designation: 'Senior Developer', salary: 5500, payDate: 'April 30, 2025', status: 'Pending' },
  { id: 5, employeeId: 'EMP004', name: 'David Kim', designation: 'HR Specialist', salary: 4000, payDate: 'April 30, 2025', status: 'Pending' },
];

// Mock payroll history data
const mockPayrollHistory = [
  { id: 1, month: 'March 2025', totalEmployees: 124, totalAmount: 560000, processedDate: 'March 31, 2025', status: 'Completed' },
  { id: 2, month: 'February 2025', totalEmployees: 122, totalAmount: 548000, processedDate: 'February 28, 2025', status: 'Completed' },
  { id: 3, month: 'January 2025', totalEmployees: 120, totalAmount: 540000, processedDate: 'January 31, 2025', status: 'Completed' },
];

const AdminPayroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter payroll data based on search term
  const filteredPayroll = mockPayrollData.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Payroll Management</h1>
        <p className="text-muted-foreground">
          Process and manage employee payroll
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Payroll (April)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$143,624</div>
            <p className="text-xs text-muted-foreground mt-1">For 124 employees</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,240</div>
            <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Next Payroll Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">April 30, 2025</div>
            <p className="text-xs text-muted-foreground mt-1">Status: Pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Payroll</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
          <TabsTrigger value="settings">Payroll Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate Payroll
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
                    <TableHead>Designation</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Pay Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>${employee.salary}</TableCell>
                      <TableCell>{employee.payDate}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>View past payroll processing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayrollHistory.map((history) => (
                    <TableRow key={history.id}>
                      <TableCell className="font-medium">{history.month}</TableCell>
                      <TableCell>{history.totalEmployees}</TableCell>
                      <TableCell>${history.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{history.processedDate}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {history.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Settings</CardTitle>
              <CardDescription>Configure general payroll settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Pay Day</label>
                  <Select defaultValue="last-working-day">
                    <SelectTrigger>
                      <SelectValue placeholder="Select pay day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-working-day">Last Working Day</SelectItem>
                      <SelectItem value="last-day">Last Day of Month</SelectItem>
                      <SelectItem value="first-day">1st Day of Next Month</SelectItem>
                      <SelectItem value="custom">Custom Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Calculation Method</label>
                  <Select defaultValue="progressive">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progressive">Progressive</SelectItem>
                      <SelectItem value="flat">Flat Rate</SelectItem>
                      <SelectItem value="custom">Custom Rules</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Email Template</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Payslip Template</SelectItem>
                    <SelectItem value="detailed">Detailed Breakdown Template</SelectItem>
                    <SelectItem value="minimal">Minimal Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPayroll;
