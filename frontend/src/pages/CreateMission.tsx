import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CreateMission = () => {
  const [formData, setFormData] = useState({
    name: '',
    launchDate: new Date(),
    status: 'planned',
    crew: ['']
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCrewChange = (index: number, value: string) => {
    const newCrew = [...formData.crew];
    newCrew[index] = value;
    setFormData(prev => ({
      ...prev,
      crew: newCrew
    }));
  };

  const addCrewMember = () => {
    setFormData(prev => ({
      ...prev,
      crew: [...prev.crew, '']
    }));
  };

  const removeCrewMember = (index: number) => {
    const newCrew = formData.crew.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      crew: newCrew.length ? newCrew : ['']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          crew: formData.crew.filter(member => member.trim() !== '')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create mission');
      }

      const data = await response.json();
      toast({
        title: 'Success!',
        description: 'Mission created successfully!',
      });
      navigate('/missions');
    } catch (error) {
      console.error('Error creating mission:', error);
      toast({
        title: 'Error',
        description: 'Failed to create mission. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Mission</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Mission Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter mission name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Launch Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.launchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.launchDate ? (
                  format(formData.launchDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.launchDate}
                onSelect={(date) => 
                  setFormData(prev => ({ ...prev, launchDate: date || new Date() }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select 
            value={formData.status}
            onValueChange={(value) => 
              setFormData(prev => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Crew Members</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addCrewMember}
            >
              Add Crew Member
            </Button>
          </div>
          
          {formData.crew.map((member, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={member}
                onChange={(e) => handleCrewChange(index, e.target.value)}
                placeholder={`Crew member ${index + 1}`}
              />
              {formData.crew.length > 1 && (
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={() => removeCrewMember(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Mission'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMission;
