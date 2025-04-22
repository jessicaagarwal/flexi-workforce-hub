
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Download } from 'lucide-react';

// Mock attendance data
const mockAttendanceData = [
  { id: 1, employeeId: 'EMP001', name: 'John Employee', date: 'Apr 22, 2025', clockIn: '09:05 AM', clockOut: '05:35 PM', status: 'Present' },
  { id: 2, employeeId: 'EMP003', name: 'Sarah Johnson', date: 'Apr 22, 2025', clockIn: '08:55 AM', clockOut: '05:15 PM', status: 'Present' },
  { id: 3, employeeId: 'EMP005', name: 'Michael Chen', date: 'Apr 22, 2025', clockIn: '09:20 AM', clockOut: '05:40 PM', status: 'Late' },
  { id: 4, employeeId: 'EMP002', name: 'Ana Rodriguez', date: 'Apr 22, 2025', clockIn: '--:--', clockOut: '--:--', status: 'Absent' },
  { id: 5, employeeId: 'EMP004', name: 'David Kim', date: 'Apr 22, 2025', clockIn: '08:45 AM', clockOut: '05:30 PM', status: 'Present' },
];

const AdminAttendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter attendance data
  const filteredData = mockAttendanceData.filter(record => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Attendance Management</h1>
        <p className="text-muted-foreground">
          Track and manage employee attendance records
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-600">Present</p>
              <p className="text-3xl font-bold text-green-700">85%</p>
              <p className="text-sm text-green-600">112 Employees</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-yellow-600">Late</p>
              <p className="text-3xl font-bold text-yellow-700">10%</p>
              <p className="text-sm text-yellow-600">12 Employees</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-red-600">Absent</p>
              <p className="text-3xl font-bold text-red-700">5%</p>
              <p className="text-sm text-red-600">6 Employees</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
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
          <div className="w-[200px]">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Select Date
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
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
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employeeId}</TableCell>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.clockIn}</TableCell>
                  <TableCell>{record.clockOut}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Present' 
                        ? 'bg-green-100 text-green-800' 
                        : record.status === 'Late'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAttendance;
