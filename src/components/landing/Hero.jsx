
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="block text-gray-900">Empowering Workplaces.</span>
          <span className="block text-primary mt-2">Simplifying HR.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          HRX is your all-in-one platform to manage employees, payroll, performance, and more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/register')} 
            size="lg"
            className="bg-primary hover:bg-primary/90 font-semibold text-lg px-8"
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/login')}
            className="border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8"
          >
            Request Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
