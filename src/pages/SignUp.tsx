import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    schoolUniversity: '',
    classStreamCourse: '',
    email: '',
    password: '',
    location: '',
    gender: '',
    contactNumber: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Simulate successful signup and login
    login();
    navigate('/'); // Redirect to main dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 shadow-lg text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-red-400">Student Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="schoolUniversity">School/University</Label>
                <Input id="schoolUniversity" type="text" value={formData.schoolUniversity} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="classStreamCourse">Class/Stream/Course</Label>
                <Input id="classStreamCourse" type="text" value={formData.classStreamCourse} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Create Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" type="text" value={formData.location} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                  <SelectTrigger id="gender" className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
