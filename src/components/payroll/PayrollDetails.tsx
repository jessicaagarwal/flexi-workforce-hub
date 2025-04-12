
import React from 'react';
import { DollarSign, Calendar, Download, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

// Mock data
const mockPayrollData = {
  basic: 5000,
  houseRentAllowance: 2000,
  conveyanceAllowance: 800,
  medicalAllowance: 500,
  specialAllowance: 1200,
  providentFund: 600,
  professionalTax: 200,
  incomeTax: 800,
  lopDeduction: 320,
  totalEarnings: 9500,
  totalDeductions: 1920,
  netSalary: 7580,
  month: 'April',
  year: '2023',
  payDate: '30/04/2023',
};

const PayrollDetails: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Card className="border shadow-md">
      <CardHeader className="bg-gray-50 border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Salary Slip</CardTitle>
            <CardDescription>
              {mockPayrollData.month} {mockPayrollData.year}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Employee Name</div>
              <div className="font-medium">{user?.name || 'Employee Name'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Employee ID</div>
              <div className="font-medium">{user?.id || 'EMP001'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Pay Date</div>
              <div className="font-medium">{mockPayrollData.payDate}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-700">Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-sm">Basic Salary</div>
                  <div className="font-medium">${mockPayrollData.basic.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">House Rent Allowance</div>
                  <div className="font-medium">${mockPayrollData.houseRentAllowance.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Conveyance Allowance</div>
                  <div className="font-medium">${mockPayrollData.conveyanceAllowance.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Medical Allowance</div>
                  <div className="font-medium">${mockPayrollData.medicalAllowance.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Special Allowance</div>
                  <div className="font-medium">${mockPayrollData.specialAllowance.toFixed(2)}</div>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-green-700">
                  <div>Total Earnings</div>
                  <div>${mockPayrollData.totalEarnings.toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-red-700">Deductions</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-sm">Provident Fund</div>
                  <div className="font-medium">${mockPayrollData.providentFund.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Professional Tax</div>
                  <div className="font-medium">${mockPayrollData.professionalTax.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Income Tax</div>
                  <div className="font-medium">${mockPayrollData.incomeTax.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">LOP Deduction</div>
                  <div className="font-medium">${mockPayrollData.lopDeduction.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    (1 day @ $320/day)
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-red-700">
                  <div>Total Deductions</div>
                  <div>${mockPayrollData.totalDeductions.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <div className="font-semibold text-lg">Net Salary</div>
            <div className="font-bold text-lg">${mockPayrollData.netSalary.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t flex justify-between items-center py-3">
        <div className="text-xs text-muted-foreground">
          <span>*This is a computer-generated payslip and does not require a signature.</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PayrollDetails;
