import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Eye, File, Folder, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';

const DocumentsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-documents');
  
  // Mock documents data
  const personalDocuments = [
    { name: 'Employment Contract.pdf', type: 'PDF', size: '2.4 MB', date: '2023-12-10', category: 'Contract' },
    { name: 'ID Card.jpg', type: 'Image', size: '820 KB', date: '2023-12-10', category: 'Identification' },
    { name: 'Education Certificate.pdf', type: 'PDF', size: '1.2 MB', date: '2023-12-05', category: 'Education' },
    { name: 'Bank Details.pdf', type: 'PDF', size: '540 KB', date: '2023-12-01', category: 'Financial' },
  ];
  
  const companyDocuments = [
    { name: 'Company Policy.pdf', type: 'PDF', size: '3.2 MB', date: '2025-01-15', category: 'Policy' },
    { name: 'Employee Handbook.pdf', type: 'PDF', size: '5.1 MB', date: '2025-01-10', category: 'Handbook' },
    { name: 'Health Insurance Details.pdf', type: 'PDF', size: '1.8 MB', date: '2024-12-20', category: 'Benefits' },
  ];
  
  const pendingDocuments = [
    { name: 'Annual Health Checkup Form', dueDate: '2025-05-15', status: 'Required' },
    { name: 'Tax Declaration Form', dueDate: '2025-04-20', status: 'Urgent' },
  ];
  
  // Get document icon based on type
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'Image':
        return <File className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Document Management
          </h1>
          <p className="text-muted-foreground">
            Access, upload, and manage your important documents.
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search documents..."
          className="max-w-sm"
        />
        <Button variant="outline">Search</Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
          <TabsTrigger value="company">Company Docs</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Documents</CardTitle>
              <CardDescription>Documents related to your employment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 px-4 py-3 font-medium">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Size</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {personalDocuments.map((doc, index) => (
                    <div key={index} className="grid grid-cols-5 px-4 py-3 items-center">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <div>{doc.type}</div>
                      <div>{doc.size}</div>
                      <div>{new Date(doc.date).toLocaleDateString()}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Folder className="h-4 w-4 mr-2" />
                Manage Folders
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                View History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Documents</CardTitle>
              <CardDescription>Important company policies and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 px-4 py-3 font-medium">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Size</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {companyDocuments.map((doc, index) => (
                    <div key={index} className="grid grid-cols-5 px-4 py-3 items-center">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <div>{doc.type}</div>
                      <div>{doc.size}</div>
                      <div>{new Date(doc.date).toLocaleDateString()}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Documents</CardTitle>
              <CardDescription>Documents that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDocuments.map((doc, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${doc.status === 'Urgent' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{doc.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${doc.status === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Due date: {new Date(doc.dueDate).toLocaleDateString()}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm">
                            <Upload className="h-3 w-3 mr-2" />
                            Upload Now
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default DocumentsPage; 