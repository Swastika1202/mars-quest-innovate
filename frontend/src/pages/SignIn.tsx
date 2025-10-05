import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useAxiosApi'; // Changed import path

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // For error messages

  const { login } = useAuth();
  const navigate = useNavigate();
  const api = useApi(); // Initialize useApi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await api.post('/auth/login', formData);
      const { token, userId } = response.data;
      login(token, userId); // Use login from AuthContext with token and userId
      navigate('/'); // Redirect to main dashboard
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-lg text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-red-400">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="text-right">
              <Link to="#" className="text-red-400 hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Sign In
            </Button>
            <p className="text-center text-gray-400 text-sm">
              Don't have an account? <Link to="/signup" className="text-red-400 hover:underline">Sign Up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
