import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  "Habitat", "Water", "Energy", "Agriculture", "Life Support",
  "Construction", "Weather", "Transportation", "Healthcare", "Other"
];

const SubmitSolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    universityName: '',
    category: '',
    communityName: '',
    description: '',
    reportFile: null as File | null,
    youtubeLink: '',
    prototypeLink: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        reportFile: e.target.files![0],
      }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solution Submitted:', formData);
    // In a real application, you would send this data to a backend API.
    // For now, we'll just navigate back to the Innovation Hub.
    navigate('/innovation-hub');
    alert('Solution submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50 mb-6">
        <div className="container mx-auto px-4 py-4">
          <Link to="/innovation-hub">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Innovation Hub
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-red-400 mb-2">Submit Your Solution</CardTitle>
            <p className="text-lg text-gray-300">Share your innovative ideas for Mars settlement!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName">Your Name</Label>
                  <Input id="userName" type="text" value={formData.userName} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>

              <div>
                <Label htmlFor="universityName">University/School Name</Label>
                <Input id="universityName" type="text" value={formData.universityName} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
              </div>

              <div>
                <Label htmlFor="category">Solution Category</Label>
                <Select onValueChange={handleCategoryChange} value={formData.category} required>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="communityName">Community Name (Optional)</Label>
                <Input id="communityName" type="text" value={formData.communityName} onChange={handleChange} className="bg-gray-700 border-gray-600 text-white" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={handleChange} required rows={5} className="bg-gray-700 border-gray-600 text-white" />
              </div>

              <div>
                <Label htmlFor="reportFile">Report/Document (PDF, DOCX, etc.)</Label>
                <Input id="reportFile" type="file" onChange={handleFileChange} className="bg-gray-700 border-gray-600 text-white file:text-white file:bg-red-600 file:hover:bg-red-700 file:border-none" />
              </div>

              <div>
                <Label htmlFor="youtubeLink">YouTube Link (Explaining Solution)</Label>
                <Input id="youtubeLink" type="url" value={formData.youtubeLink} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=your_video_id" className="bg-gray-700 border-gray-600 text-white" />
              </div>

              <div>
                <Label htmlFor="prototypeLink">Prototype Link (e.g., GitHub, Figma, 3D Model)</Label>
                <Input id="prototypeLink" type="url" value={formData.prototypeLink} onChange={handleChange} placeholder="https://github.com/your_project" className="bg-gray-700 border-gray-600 text-white" />
              </div>

              <Button type="submit" className="w-full gradient-mars text-white font-semibold py-3 text-lg">
                Submit Solution
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubmitSolutionPage;
