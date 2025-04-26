
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-hrms-blue">HRX</span>
          </div>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-hrms-blue text-hrms-blue hover:bg-hrms-blue/10"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-hrms-blue hover:bg-hrms-blue/90"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Main Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Streamline Your HR Operations with HRX
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              A comprehensive human resources management system designed to simplify employee management, attendance tracking, and payroll processing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')} 
                size="lg"
                className="bg-hrms-blue hover:bg-hrms-blue/90 px-8"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/login')}
                className="border-hrms-blue text-hrms-blue hover:bg-hrms-blue/10 px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Employee Management</h3>
                <p className="text-gray-600">Easily manage employee information, documents, and profiles in one place.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Leave Management</h3>
                <p className="text-gray-600">Streamline leave applications, approvals, and tracking with automated workflows.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Payroll Processing</h3>
                <p className="text-gray-600">Simplify payroll calculations, tax deductions, and payment processing.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 HRX - Human Resources Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
