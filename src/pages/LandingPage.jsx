
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, UserIcon, UsersIcon, CalendarDaysIcon, DollarSignIcon, StarIcon, LogInIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white to-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Workplaces. <span className="text-primary">Simplifying HR.</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-xl">
                HRX is your all-in-one platform to manage employees, payroll, performance, and more.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md text-lg">
                    <LogInIcon size={20} />
                    Login
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2 px-8 py-3 rounded-md text-lg">
                  Request Demo
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-lg shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="HRX Dashboard"
                  className="w-full object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-white sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
              Everything you need to streamline your HR operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<UsersIcon size={40} className="text-primary" />}
              title="Employee Management"
              description="Track employee data, roles, and documents in one secure location."
            />
            <FeatureCard 
              icon={<CalendarDaysIcon size={40} className="text-primary" />}
              title="Leave Tracking"
              description="Manage leave applications, approvals, and balances seamlessly."
            />
            <FeatureCard 
              icon={<DollarSignIcon size={40} className="text-primary" />}
              title="Payroll Automation"
              description="Generate payslips, manage salaries, and automate tax calculations."
            />
            <FeatureCard 
              icon={<StarIcon size={40} className="text-primary" />}
              title="Performance Reviews"
              description="Set goals, track progress, and conduct structured evaluations."
            />
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20 px-4 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Role-Based Access</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
              Tailored experiences for every role in your organization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <UsersIcon className="h-10 w-10 text-primary mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Admin/HR Dashboard</h3>
                </div>
                <ul className="space-y-4">
                  <AccessItem text="Add, edit, and delete users" />
                  <AccessItem text="Approve or reject leave requests" />
                  <AccessItem text="Generate and manage payroll" />
                  <AccessItem text="Conduct performance reviews" />
                  <AccessItem text="Set company policies" />
                </ul>
                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Admin Dashboard" 
                    className="rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <UserIcon className="h-10 w-10 text-primary mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Employee Dashboard</h3>
                </div>
                <ul className="space-y-4">
                  <AccessItem text="View and update personal profile" />
                  <AccessItem text="Apply for leave and check balances" />
                  <AccessItem text="View payslips and tax documents" />
                  <AccessItem text="Track performance and goals" />
                  <AccessItem text="Access company resources" />
                </ul>
                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Employee Dashboard" 
                    className="rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
              Get started with HRX in three simple steps
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <WorkStep 
              number="01"
              icon={<LogInIcon size={32} className="text-white" />}
              title="Login Securely" 
              description="Access your account with secure JWT authentication or Google OAuth."
            />
            <div className="hidden md:block">
              <ArrowRightIcon size={40} className="text-primary" />
            </div>
            <WorkStep 
              number="02"
              icon={<UsersIcon size={32} className="text-white" />}
              title="Access Dashboard" 
              description="View your personalized dashboard based on your role in the organization."
            />
            <div className="hidden md:block">
              <ArrowRightIcon size={40} className="text-primary" />
            </div>
            <WorkStep 
              number="03"
              icon={<StarIcon size={32} className="text-white" />}
              title="Manage Tasks" 
              description="Handle daily tasks, track performance, and manage workflows efficiently."
            />
          </div>
        </div>
      </section>

      {/* Why Choose HRX */}
      <section className="py-20 px-4 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose HRX</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
              Modern solutions for modern workplaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
                  <p className="text-gray-600">JWT authentication and Google OAuth integration for maximum security.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Responsive Interface</h3>
                  <p className="text-gray-600">Access HRX from any device - desktop, tablet, or mobile phone.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Tech Stack</h3>
                  <p className="text-gray-600">Built with React, Tailwind CSS, and Node.js for optimal performance.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-2 mr-4">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Designed for Scalability</h3>
                  <p className="text-gray-600">Grows with your organization from startups to enterprise-level businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-xl mx-auto">
              Join hundreds of satisfied companies using HRX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="HRX has transformed our HR processes. What used to take days now takes minutes."
              name="Sarah Johnson"
              role="HR Director, TechCorp"
            />
            <TestimonialCard 
              quote="The employee dashboard is intuitive and makes managing my information incredibly simple."
              name="Michael Chen"
              role="Software Engineer, Innovation Labs"
            />
            <TestimonialCard 
              quote="The payroll automation feature has saved us countless hours and eliminated errors."
              name="Emily Rodriguez"
              role="CFO, GrowthStart Inc."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your HR Management?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of organizations that have simplified their HR processes with HRX.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button className="gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md text-lg">
                <LogInIcon size={20} />
                Login Now
              </Button>
            </Link>
            <Button variant="outline" className="gap-2 px-8 py-3 rounded-md text-lg border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-2xl font-bold">HR</span>
                <span className="text-2xl font-bold text-primary">X</span>
              </div>
              <p className="mt-2 text-gray-400">Empowering workplaces. Simplifying HR.</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HRX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const AccessItem = ({ text }) => (
  <li className="flex items-center">
    <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

const WorkStep = ({ number, icon, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="relative">
      <div className="bg-primary h-16 w-16 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="absolute -top-3 -right-3 bg-white h-8 w-8 rounded-full shadow flex items-center justify-center text-sm font-bold text-primary border border-primary">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role }) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="text-primary mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
          <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
        </svg>
      </div>
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div className="flex items-center">
        <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mr-3">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LandingPage;
