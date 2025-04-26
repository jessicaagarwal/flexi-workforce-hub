
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/landing/Hero';
import { features, adminFeatures, employeeFeatures, testimonials, whyChooseHRX } from '@/data/landingPageData';
import { Users, Calendar, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from '@/components/landing/FeatureCard';
import AccessItem from '@/components/landing/AccessItem';
import TestimonialCard from '@/components/landing/TestimonialCard';

const getIcon = (iconName) => {
  const icons = {
    users: <Users className="w-8 h-8 text-primary" />,
    calendar: <Calendar className="w-8 h-8 text-primary" />,
    clock: <Clock className="w-8 h-8 text-primary" />,
    'dollar-sign': <DollarSign className="w-8 h-8 text-primary" />
  };
  return icons[iconName];
};

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">HRX</span>
          </div>
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-primary hover:bg-primary/90"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Hero />

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Everything you need to streamline your HR operations</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={getIcon(feature.icon)}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Admin/Employee Dashboard Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Admin Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="text-primary" />
                  Admin/HR Dashboard
                </h3>
                <ul className="space-y-4">
                  {adminFeatures.map((feature) => (
                    <AccessItem key={feature} text={feature} />
                  ))}
                </ul>
              </div>
              {/* Employee Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="text-primary" />
                  Employee Dashboard
                </h3>
                <ul className="space-y-4">
                  {employeeFeatures.map((feature) => (
                    <AccessItem key={feature} text={feature} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose HRX */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose HRX</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Modern solutions for modern workplaces</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyChooseHRX.map((item) => (
                <Card key={item.title} className="p-6">
                  <CardContent className="space-y-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Join hundreds of satisfied companies using HRX</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">HRX</h3>
              <p className="text-gray-400">Transforming HR Management for the Modern Workplace</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HRX - All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
