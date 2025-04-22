
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCredentials, clearCredentials, setLoading } from '@/redux/authSlice';

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'employee';
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ user: User; token: string } | void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hrx.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'HR Manager',
    email: 'hr@hrx.com',
    password: 'hr123',
    role: 'hr' as const,
  },
  {
    id: '3',
    name: 'John Employee',
    email: 'employee@hrx.com',
    password: 'employee123',
    role: 'employee' as const,
  },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    // Check for saved user in localStorage for backward compatibility
    const savedUser = localStorage.getItem('hrx_user');
    if (savedUser && !isAuthenticated) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setCredentials({ 
        user: parsedUser, 
        token: 'mock-jwt-token' 
      }));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch, isAuthenticated]);
  
  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Save to localStorage for backward compatibility
      localStorage.setItem('hrx_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Login successful!');
      
      return {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + foundUser.id,
      };
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const logout = () => {
    dispatch(clearCredentials());
    localStorage.removeItem('hrx_user');
    toast.success('Logged out successfully');
  };
  
  const register = async (name: string, email: string, password: string) => {
    dispatch(setLoading(true));
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, this would send data to the backend
      toast.success('Registration successful! Please login.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
