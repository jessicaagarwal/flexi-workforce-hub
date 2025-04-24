import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

// Mock leave request data
const mockLeaveRequests = [
  {
    id: '1',
    employeeId: '3',
    employeeName: 'Michael Brown',
    employeeAvatar: '',
    leaveType: 'Vacation',
    startDate: '2023-04-20',
    endDate: '2023-04-25',
    reason: 'Family vacation',
    status: 'Pending',
    submittedDate: '2023-04-10',
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Sarah Johnson',
    employeeAvatar: '',
    leaveType: 'Sick Leave',
    startDate: '2023-04-15',
    endDate: '2023-04-16',
    reason: 'Feeling unwell',
    status: 'Approved',
    submittedDate: '2023-04-14',
  },
  {
    id: '3',
    employeeId: '5',
    employeeName: 'Alex Wilson',
    employeeAvatar: '',
    leaveType: 'Personal',
    startDate: '2023-04-18',
    endDate: '2023-04-18',
    reason: 'Personal appointment',
    status: 'Approved',
    submittedDate: '2023-04-12',
  },
  {
    id: '4',
    employeeId: '1',
    employeeName: 'John Smith',
    employeeAvatar: '',
    leaveType: 'Vacation',
    startDate: '2023-05-01',
    endDate: '2023-05-05',
    reason: 'Summer vacation',
    status: 'Pending',
    submittedDate: '2023-04-15',
  },
  {
    id: '5',
    employeeId: '4',
    employeeName: 'Emily Davis',
    employeeAvatar: '',
    leaveType: 'Maternity',
    startDate: '2023-06-01',
    endDate: '2023-09-01',
    reason: 'Maternity leave',
    status: 'Approved',
    submittedDate: '2023-03-25',
  },
  {
    id: '6',
    employeeId: '6',
    employeeName: 'Jessica Taylor',
    employeeAvatar: '',
    leaveType: 'Sick Leave',
    startDate: '2023-04-10',
    endDate: '2023-04-12',
    reason: 'Flu',
    status: 'Rejected',
    submittedDate: '2023-04-09',
  },
];

const LeaveManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isNewLeaveDialogOpen, setIsNewLeaveDialogOpen] = useState(false);
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  
  // New leave request form state
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [reason, setReason] = useState('');
  
  const filteredLeaveRequests = mockLeaveRequests.filter(leave => {
    // Filter by search query
    const matchesSearch = 
      leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'pending' && leave.status === 'Pending') ||
      (activeTab === 'approved' && leave.status === 'Approved') ||
      (activeTab === 'rejected' && leave.status === 'Rejected');
    
    return matchesSearch && matchesTab;
  });
  
  const handleApproveLeave = (leaveId) => {
    // In a real app, this would update the leave request status in the database
    toast.success('Leave request approved successfully');
  };
  
  const handleRejectLeave = (leaveId) => {
    // In a real app, this would update the leave request status in the database
    toast.success('Leave request rejected successfully');
  };
  
  const handleSubmitNewLeave = () => {
    // Validate form
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, this would submit the new leave request to the database
    toast.success('Leave request submitted successfully');
    setIsNewLeaveDialogOpen(false);
    
    // Reset form
    setLeaveType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setReason('');
  };
  
  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setIsViewLeaveDialogOpen(true);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getDaysCount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Request and manage employee leaves
          </p>
        </div>
        <Button 
          className="bg-hrms-blue hover:bg-blue-700"
          onClick={() => setIsNewLeaveDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Request Leave
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leaves..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          {renderLeaveList(filteredLeaveRequests)}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {renderLeaveList(filteredLeaveRequests)}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {renderLeaveList(filteredLeaveRequests)}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          {renderLeaveList(filteredLeaveRequests)}
        </TabsContent>
      </Tabs>
      
      {/* New Leave Request Dialog */}
      <Dialog open={isNewLeaveDialogOpen} onOpenChange={setIsNewLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
            <DialogDescription>
              Fill in the details to submit a new leave request
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="leaveType">Leave Type</label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="paternity">Paternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label>Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label>End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="reason">Reason</label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for your leave request"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewLeaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewLeave}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Leave Request Dialog */}
      <Dialog open={isViewLeaveDialogOpen} onOpenChange={setIsViewLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              View and manage leave request details
            </DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={selectedLeave.employeeAvatar} />
                  <AvatarFallback>
                    {selectedLeave.employeeName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedLeave.employeeName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedLeave.leaveType}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm font-medium">
                    {formatDate(selectedLeave.startDate)} - {formatDate(selectedLeave.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Days</span>
                  <span className="text-sm font-medium">
                    {getDaysCount(selectedLeave.startDate, selectedLeave.endDate)} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(selectedLeave.status)}`}>
                    {selectedLeave.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Submitted</span>
                  <span className="text-sm font-medium">
                    {formatDate(selectedLeave.submittedDate)}
                  </span>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Reason</label>
                <p className="text-sm text-muted-foreground">
                  {selectedLeave.reason}
                </p>
              </div>
              
              {selectedLeave.status === 'Pending' && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectLeave(selectedLeave.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApproveLeave(selectedLeave.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

function renderLeaveList(leaves) {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-6 border-b bg-muted/50 px-4 py-3 font-medium">
        <div>Employee</div>
        <div>Leave Type</div>
        <div>Duration</div>
        <div>Days</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y">
        {leaves.map((leave) => (
          <div key={leave.id} className="grid grid-cols-6 px-4 py-3 items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={leave.employeeAvatar} />
                <AvatarFallback>
                  {leave.employeeName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{leave.employeeName}</span>
            </div>
            <div>{leave.leaveType}</div>
            <div>
              {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
            </div>
            <div>{getDaysCount(leave.startDate, leave.endDate)} days</div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(leave.status)}`}>
                {leave.status}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleViewLeave(leave)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleViewLeave(leave)}>
                    View Details
                  </DropdownMenuItem>
                  {leave.status === 'Pending' && (
                    <>
                      <DropdownMenuItem onClick={() => handleApproveLeave(leave.id)}>
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRejectLeave(leave.id)}>
                        Reject
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveManagement; 