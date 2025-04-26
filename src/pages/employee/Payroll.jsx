import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, DollarSign, Wallet, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const employeePayroll = {
  currentMonth: {
    month: 'April 2025',
    basic: 4000,
    allowances: 800,
    bonus: 200,
    overtime: 150,
    tax: 450,
    insurance: 200,
    netPay: 4500,
    payDate: 'April 30, 2025',
    status: 'Pending'
  },
  payslips: [
    { id: 1, month: 'March 2025', netPay: 4350, issueDate: 'March 31, 2025', status: 'Paid' },
    { id: 2, month: 'February 2025', netPay: 4300, issueDate: 'February 28, 2025', status: 'Paid' },
    { id: 3, month: 'January 2025', netPay: 4250, issueDate: 'January 31, 2025', status: 'Paid' },
  ]
};

const Payroll = () => {
  const { user } = useAuth();
  const payrollData = employeePayroll;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">My Payroll</h1>
        <p className="text-muted-foreground">
          View your salary details and download payslips
        </p>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Month</TabsTrigger>
          <TabsTrigger value="history">Payslip History</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Net Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${payrollData.currentMonth.netPay}</div>
                <p className="text-xs text-muted-foreground mt-1">For {payrollData.currentMonth.month}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Pay Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payrollData.currentMonth.payDate}</div>
                <p className="text-xs text-muted-foreground mt-1">Status: {payrollData.currentMonth.status}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">YTD Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$17,400</div>
                <p className="text-xs text-muted-foreground mt-1">Jan - Apr 2025</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Salary Breakdown</CardTitle>
              <CardDescription>For {payrollData.currentMonth.month}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Earnings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Basic Salary</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.basic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Allowances</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.allowances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Bonus</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.bonus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Overtime</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.overtime}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-semibold">Total Earnings</span>
                      <span className="text-sm font-semibold">${payrollData.currentMonth.basic + payrollData.currentMonth.allowances + payrollData.currentMonth.bonus + payrollData.currentMonth.overtime}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-3">Deductions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Tax</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.tax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Insurance</span>
                      <span className="text-sm font-medium">${payrollData.currentMonth.insurance}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-semibold">Total Deductions</span>
                      <span className="text-sm font-semibold">${payrollData.currentMonth.tax + payrollData.currentMonth.insurance}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8 pt-4 border-t">
                <span className="font-bold">Net Pay</span>
                <span className="font-bold">${payrollData.currentMonth.netPay}</span>
              </div>
              
              <div className="mt-6">
                <Button disabled={payrollData.currentMonth.status === 'Pending'}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Payslip
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payslip History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.payslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell>{payslip.month}</TableCell>
                      <TableCell>${payslip.netPay}</TableCell>
                      <TableCell>{payslip.issueDate}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payslip.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
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
        
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Bank Information</CardTitle>
              <CardDescription>Your salary will be transferred to this account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">National Bank</p>
                    <p className="text-sm text-muted-foreground">Account Number: **** **** **** 1234</p>
                    <p className="text-sm text-muted-foreground">Account Holder: {user?.name}</p>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>To update your bank information, please contact the HR department.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payroll; 