
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

const LeaveManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isNewLeaveDialogOpen, setIsNewLeaveDialogOpen] = useState(false);
  const [isViewLeaveDialogOpen, setIsViewLeaveDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<typeof mockLeaveRequests[0] | null>(null);
  
  // New leave request form state
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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
  
  const handleApproveLeave = (leaveId: string) => {
    // In a real app, this would update the leave request status in the database
    toast.success('Leave request approved successfully');
  };
  
  const handleRejectLeave = (leaveId: string) => {
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
  
  const handleViewLeave = (leave: typeof mockLeaveRequests[0]) => {
    setSelectedLeave(leave);
    setIsViewLeaveDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getDaysCount = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  const getStatusColor = (status: string) => {
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
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
            <DialogDescription>
              Fill in the details to submit a leave request
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="leave-type" className="text-sm font-medium">
                Leave Type
              </label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Maternity">Maternity</SelectItem>
                  <SelectItem value="Paternity">Paternity</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
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
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
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
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => 
                        startDate ? date < startDate : false
                      }
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason for Leave
              </label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for your leave request"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewLeaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-hrms-blue hover:bg-blue-700"
              onClick={handleSubmitNewLeave}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Leave Details Dialog */}
      <Dialog open={isViewLeaveDialogOpen} onOpenChange={setIsViewLeaveDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Review leave request information
            </DialogDescription>
          </DialogHeader>
          
          {selectedLeave && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedLeave.employeeAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedLeave.employeeName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedLeave.employeeName}</div>
                  <div className="text-sm text-muted-foreground">Employee ID: {selectedLeave.employeeId}</div>
                </div>
                <div className="ml-auto">
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedLeave.status)}`}>
                    {selectedLeave.status}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Leave Type</p>
                  <p className="font-medium">{selectedLeave.leaveType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Requested</p>
                  <p className="font-medium">{getDaysCount(selectedLeave.startDate, selectedLeave.endDate)} days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{formatDate(selectedLeave.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{formatDate(selectedLeave.endDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p>{selectedLeave.reason}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Submitted On</p>
                  <p>{formatDate(selectedLeave.submittedDate)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedLeave?.status === 'Pending' && user?.role !== 'employee' && (
              <>
                <Button variant="outline" onClick={() => handleRejectLeave(selectedLeave.id)}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveLeave(selectedLeave.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {(selectedLeave?.status !== 'Pending' || user?.role === 'employee') && (
              <Button onClick={() => setIsViewLeaveDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
  function renderLeaveList(leaves: typeof mockLeaveRequests) {
    if (leaves.length === 0) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No leave requests found</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? "Try a different search term" 
                : "Submit a new leave request to get started"}
            </p>
          </CardContent>
        </Card>
      );
    }
    
    return leaves.map((leave) => (
      <Card key={leave.id} className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={leave.employeeAvatar || "/placeholder.svg"} />
                <AvatarFallback>{leave.employeeName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-medium">{leave.employeeName}</CardTitle>
                <CardDescription>
                  {leave.leaveType} • {getDaysCount(leave.startDate, leave.endDate)} days
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(leave.status)}`}>
                {leave.status}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleViewLeave(leave)}>
                    View details
                  </DropdownMenuItem>
                  {leave.status === 'Pending' && user?.role !== 'employee' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleApproveLeave(leave.id)} className="text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Approve</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRejectLeave(leave.id)} className="text-red-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Reject</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">{formatDate(leave.startDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">{formatDate(leave.endDate)}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">Reason</p>
            <p className="line-clamp-2">{leave.reason}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>Submitted on {formatDate(leave.submittedDate)}</span>
          </div>
          {leave.status === 'Pending' && user?.role !== 'employee' && (
            <div className="ml-auto flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRejectLeave(leave.id)}
              >
                <XCircle className="mr-2 h-3 w-3" />
                Reject
              </Button>
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApproveLeave(leave.id)}
              >
                <CheckCircle className="mr-2 h-3 w-3" />
                Approve
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    ));
  }
};

export default LeaveManagement;
