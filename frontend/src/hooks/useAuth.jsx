import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '../services/apiService';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials, setLoading as setReduxLoading } from '../redux/authSlice';

// Create context
const AuthContext = createContext(undefined);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Check for saved auth data in localStorage
    const savedUser = localStorage.getItem('hrms_user');
    const savedToken = localStorage.getItem('hrms_token');
    
    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      
      // Also update Redux store
      dispatch(setCredentials({ user: parsedUser, token: savedToken }));
    }
    
    setIsLoading(false);
    dispatch(setReduxLoading(false));
  }, [dispatch]);
  
  const login = async (email, password) => {
    setIsLoading(true);
    dispatch(setReduxLoading(true));
    
    try {
      // Make real API call to login endpoint
      const response = await api.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;
      
      // Save to state and localStorage
      setUser(userData);
      setToken(token);
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      localStorage.setItem('hrms_token', token);
      
      // Update Redux store
      dispatch(setCredentials({ user: userData, token }));
      
      toast.success('Login successful!');
      return userData; // Return the user object for navigation in the component
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
      dispatch(setReduxLoading(false));
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_token');
    
    // Update Redux store
    dispatch(clearCredentials());
    
    toast.success('Logged out successfully');
    // Navigation will be handled by the component that calls this function
  };
  
  const register = async (name, email, password, role = 'employee') => {
    setIsLoading(true);
    
    try {
      // Make real API call to register endpoint
      await api.post('/auth/register', { name, email, password, role });
      
      toast.success('Registration successful! Please login.');
      return true; // Return success for navigation in the component
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
