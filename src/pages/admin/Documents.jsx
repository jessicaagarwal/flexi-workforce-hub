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
import { Search, Plus, FileText, Download, Eye, Trash, Upload, Filter } from 'lucide-react';

// Mock documents data
const mockDocumentsData = [
  { id: 1, name: 'Employee Handbook 2025.pdf', category: 'Company', uploadedBy: 'HR Department', date: 'January 2, 2025', size: '4.5 MB', shared: 'All Employees' },
  { id: 2, name: 'IT Security Policy.pdf', category: 'Policy', uploadedBy: 'IT Department', date: 'February 15, 2025', size: '1.8 MB', shared: 'All Employees' },
  { id: 3, name: 'Benefits Guide 2025.pdf', category: 'Company', uploadedBy: 'HR Department', date: 'January 5, 2025', size: '2.2 MB', shared: 'All Employees' },
  { id: 4, name: 'John Employee Contract.pdf', category: 'Employee', uploadedBy: 'HR Department', date: 'January 10, 2025', size: '1.2 MB', shared: 'John Employee, HR' },
  { id: 5, name: 'Quarterly Budget Report.pdf', category: 'Finance', uploadedBy: 'Finance Department', date: 'April 1, 2025', size: '3.5 MB', shared: 'Management, Finance' },
];

// Mock pending approvals
const mockPendingApprovals = [
  { id: 1, name: 'Medical Certificate.pdf', category: 'Employee', uploadedBy: 'John Employee', date: 'April 20, 2025', size: '0.8 MB', status: 'Pending' },
  { id: 2, name: 'Address Proof.pdf', category: 'Employee', uploadedBy: 'Sarah Johnson', date: 'April 19, 2025', size: '1.4 MB', status: 'Pending' },
  { id: 3, name: 'ID Card Copy.pdf', category: 'Employee', uploadedBy: 'Michael Chen', date: 'April 18, 2025', size: '0.6 MB', status: 'Pending' },
];

const AdminDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filter documents based on search and category
  const filteredDocuments = mockDocumentsData.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Document Management</h1>
        <p className="text-muted-foreground">
          Manage, organize, and share company and employee documents
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">152</div>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">248 MB</div>
            <p className="text-xs text-muted-foreground mt-1">Of 10 GB total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockPendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Documents needing review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Approvals ({mockPendingApprovals.length})</TabsTrigger>
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Shared With</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{doc.name}</span>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.shared}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Documents Pending Approval</CardTitle>
              <CardDescription>Review and approve employee document submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingApprovals.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="font-medium">{doc.name}</span>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {doc.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>Upload and share documents with your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Button variant="outline">
                    Select Files
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Document Name</label>
                    <Input placeholder="Enter document name" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Share With</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select groups or individuals" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="management">Management Only</SelectItem>
                        <SelectItem value="hr">HR Department</SelectItem>
                        <SelectItem value="finance">Finance Department</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Upload Document</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDocuments; 