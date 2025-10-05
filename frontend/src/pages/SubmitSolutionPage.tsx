import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useAxiosApi';
import { useAuth } from '../context/AuthContext';

interface Community {
  _id: string;
  name: string;
}

const categories = [
  "Habitat", "Water", "Energy", "Agriculture", "Life Support",
  "Construction", "Weather", "Transportation", "Healthcare", "Other"
];

const SubmitSolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    universityName: '',
    category: '',
    communityId: '',
    title: '',
    description: '',
    reportFile: null as File | null,
    youtubeLink: '',
    prototypeLink: '',
  });
  const [communities, setCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await api.get('/communities');
        setCommunities(response.data);
      } catch (err: any) {
        console.error('Error fetching communities:', err);
        setError(err.response?.data?.message || 'Failed to fetch communities.');
      }
    };
    fetchCommunities();
  }, []);

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

  const handleCommunityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      communityId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!userId) {
      setError('You must be logged in to submit a solution.');
      return;
    }

    if (!formData.title || !formData.description || !formData.communityId || !formData.userName || !formData.email || !formData.universityName || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('community', formData.communityId);
      formDataToSend.append('userName', formData.userName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('universityName', formData.universityName);
      formDataToSend.append('category', formData.category);
      if (formData.youtubeLink) formDataToSend.append('youtubeLink', formData.youtubeLink);
      if (formData.prototypeLink) formDataToSend.append('prototypeLink', formData.prototypeLink);
      if (formData.reportFile) formDataToSend.append('reportFile', formData.reportFile);

      await api.post(`/solutions/communities/${formData.communityId}/solutions`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Solution submitted successfully!');
      setFormData({
        userName: '',
        email: '',
        universityName: '',
        category: '',
        communityId: '',
        title: '',
        description: '',
        reportFile: null,
        youtubeLink: '',
        prototypeLink: '',
      });
      navigate('/innovation-hub');
    } catch (err: any) {
      console.error('Error submitting solution:', err);
      setError(err.response?.data?.message || 'Failed to submit solution.');
    }
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
                <Label htmlFor="title">Solution Title</Label>
                <Input id="title" type="text" value={formData.title} onChange={handleChange} required className="bg-gray-700 border-gray-600 text-white" />
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
                <Label htmlFor="community">Select Community</Label>
                <Select onValueChange={handleCommunityChange} value={formData.communityId} required>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a community" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    {communities.map(community => (
                      <SelectItem key={community._id} value={community._id}>{community.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}

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
