import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Clock, Download, Calendar, DollarSign, CreditCard, Wallet, Receipt, AlertCircle, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import PayrollDetails from '@/components/payroll/PayrollDetails';

const PayrollPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('current');
  
  // Mock payroll data
  const payrollHistory = [
    { period: 'March 2025', date: '2025-03-28', netAmount: 4250.00, status: 'Paid' },
    { period: 'February 2025', date: '2025-02-28', netAmount: 4250.00, status: 'Paid' },
    { period: 'January 2025', date: '2025-01-31', netAmount: 4250.00, status: 'Paid' },
    { period: 'December 2024', date: '2024-12-30', netAmount: 4250.00, status: 'Paid' },
    { period: 'November 2024', date: '2024-11-29', netAmount: 4100.00, status: 'Paid' },
  ];
  
  const taxDocuments = [
    { name: 'Annual Tax Statement 2024', date: '2025-01-15', type: 'Tax' },
    { name: 'Tax Deduction Certificate', date: '2024-12-20', type: 'Tax' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Payroll Management
          </h1>
          <p className="text-muted-foreground">
            View your salary details, payslips, and tax documents.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="current">Current Salary</TabsTrigger>
          <TabsTrigger value="history">Payslips</TabsTrigger>
          <TabsTrigger value="tax">Tax Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250.00</div>
                <p className="text-xs text-muted-foreground">Monthly</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gross Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,500.00</div>
                <p className="text-xs text-muted-foreground">Before deductions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,250.00</div>
                <p className="text-xs text-muted-foreground">Tax & benefits</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Payday</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Apr 30</div>
                <p className="text-xs text-muted-foreground">In 18 days</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <PayrollDetails />
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Your current payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">
                      Salary is transferred directly to your bank account
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Bank Name</span>
                    <span className="text-sm font-medium">National Bank</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <span className="text-sm font-medium">XXXX-XXXX-8742</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Routing Number</span>
                    <span className="text-sm font-medium">XXX-XXX-789</span>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  <Wallet className="h-4 w-4 mr-2" />
                  Update Payment Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payslip History</CardTitle>
              <CardDescription>Your payment history and downloadable payslips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b bg-muted/50 px-4 py-3 font-medium">
                  <div>Pay Period</div>
                  <div>Payment Date</div>
                  <div>Amount</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {payrollHistory.map((pay, index) => (
                    <div key={index} className="grid grid-cols-4 px-4 py-3 items-center">
                      <div>{pay.period}</div>
                      <div>{new Date(pay.date).toLocaleDateString()}</div>
                      <div className="font-medium">${pay.netAmount.toFixed(2)}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Receipt className="h-3 w-3 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Payslips
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>Important tax documents for your records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxDocuments.map((doc, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{doc.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {doc.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Released on: {new Date(doc.date).toLocaleDateString()}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm">
                            <Download className="h-3 w-3 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700">Important Note</h3>
                    <p className="text-sm text-blue-700/80 mt-1">
                      Please keep these tax documents for your personal records. They may be needed when filing your annual tax returns.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollPage; 