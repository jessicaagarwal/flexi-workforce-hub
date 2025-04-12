
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the dashboard or login page
    navigate('/dashboard', { replace: true });
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-hrms-blue" />
      <p className="mt-4 text-lg text-gray-600">Loading HRMS Pro...</p>
    </div>
  );
};

export default Index;
