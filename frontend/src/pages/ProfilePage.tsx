import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Pencil, Save, BellRing, BellOff, User, BookOpen, Lightbulb, Users, Settings as SettingsIcon, LogIn, LogOut } from 'lucide-react'; // Icons for edit, save, notifications, and sidebar items
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { isLoggedIn, login, logout } = useAuth(); // Use AuthContext
  const [selectedSection, setSelectedSection] = useState('details'); // 'details', 'missions', 'solutions', 'communities', 'settings'
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    schoolUniversity: "Mars University",
    classStreamCourse: "Astrophysics",
    location: "Mars Colony 1",
    gender: "Male",
    contactNumber: "+1-123-456-7890",
    avatarUrl: "https://github.com/shadcn.png", // Placeholder image
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileData((prevData) => ({
            ...prevData,
            avatarUrl: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Placeholder data for missions, solutions, and progress
  const myMissions = [
    { id: 1, title: "Build Mars Habitat", status: "Completed" },
    { id: 2, title: "Water Extraction", status: "In Progress" },
  ];

  const mySolutions = [
    { id: 1, title: "Automated Greenhouse System", votes: 120 },
    { id: 2, title: "Dust Storm Shield Design", votes: 85 },
  ];

  const myCommunities = [
    { id: 1, name: "Mars Habitat Designers", members: 1250, role: "Member", description: "A community focused on designing sustainable habitats for Mars colonization" },
    { id: 2, name: "Water Extraction Innovators", members: 890, role: "Admin", description: "Exploring innovative methods for water extraction on Mars" },
    { id: 3, name: "Solar Energy Solutions", members: 2100, role: "Member", description: "Developing efficient solar energy systems for Mars missions" },
    { id: 4, name: "Greenhouse Agriculture", members: 1540, role: "Moderator", description: "Creating sustainable food production systems for Mars colonies" },
  ];

  // Remove local handleLogin and handleLogout as they will come from AuthContext

  const renderContent = () => {
    switch (selectedSection) {
      case 'details':
        return (
          <div className="space-y-8">
            {/* Profile Header and Avatar */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative flex justify-center">
                <Avatar className="w-32 h-32 border-4 border-red-500">
                  <AvatarImage src={profileData.avatarUrl} alt="Avatar" />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
                  <Pencil className="h-5 w-5 text-white" />
                  <Input id="avatar-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1 text-center">
                <h2 className="text-4xl font-bold text-red-300">{profileData.name}</h2>
                <p className="text-lg text-gray-400">{profileData.schoolUniversity}</p>
              </div>
            </div>

            {/* Student Details (Read-only for details section) */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-red-300">My Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profileData.email} disabled className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="classStreamCourse">Class/Stream/Course</Label>
                  <Input id="classStreamCourse" type="text" value={profileData.classStreamCourse} disabled className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" type="text" value={profileData.location} disabled className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" type="text" value={profileData.gender} disabled className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input id="contactNumber" type="tel" value={profileData.contactNumber} disabled className="bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'missions':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-red-300">My Missions</h3>
            <ul className="space-y-2">
              {myMissions.map((mission) => (
                <li key={mission.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                  <span>{mission.title}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${mission.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {mission.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'solutions':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-red-300">My Solutions</h3>
            <ul className="space-y-2">
              {mySolutions.map((solution) => (
                <li key={solution.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                  <span>{solution.title}</span>
                  <span className="text-sm text-gray-300">Votes: {solution.votes}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'communities':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-red-300">My Communities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCommunities.map((community) => (
                <Card key={community.id} className="bg-gray-700/50 border-gray-600 hover:border-red-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center justify-between">
                      <span>{community.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        community.role === 'Admin' ? 'bg-red-500' : 
                        community.role === 'Moderator' ? 'bg-orange-500' : 
                        'bg-blue-500'
                      }`}>
                        {community.role}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-3">{community.description}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <Users className="h-4 w-4" />
                      <span>{community.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate('/community')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                        size="sm"
                      >
                        View Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-red-300">Edit Profile</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-red-500">
                  <AvatarImage src={profileData.avatarUrl} alt="Avatar" />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload-settings" className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
                  <Pencil className="h-5 w-5 text-white" />
                  <Input id="avatar-upload-settings" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold text-red-300">{profileData.name}</h2>
                <p className="text-lg text-gray-400">{profileData.schoolUniversity}</p>
              </div>
              <Button onClick={handleEditToggle} className="bg-red-600 hover:bg-red-700">
                {isEditing ? <><Save className="h-4 w-4 mr-2" /> Save</> : <><Pencil className="h-4 w-4 mr-2" /> Edit Profile</>}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" value={profileData.name} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profileData.email} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="schoolUniversity">School/University</Label>
                  <Input id="schoolUniversity" type="text" value={profileData.schoolUniversity} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="classStreamCourse">Class/Stream/Course</Label>
                  <Input id="classStreamCourse" type="text" value={profileData.classStreamCourse} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" type="text" value={profileData.location} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" type="text" value={profileData.gender} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input id="contactNumber" type="tel" value={profileData.contactNumber} onChange={handleChange} disabled={!isEditing} className="bg-gray-700 border-gray-600 text-white" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-red-300">Notifications</h3>
            <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-md">
              <div className="flex items-center gap-3">
                {notificationsEnabled ? <BellRing className="h-6 w-6 text-green-400" /> : <BellOff className="h-6 w-6 text-red-400" />}
                <Label htmlFor="notifications" className="text-lg">Enable Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
              />
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {isLoggedIn ? (
                <Button onClick={logout} className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 mx-auto">
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </Button>
              ) : (
                <Button onClick={login} className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 mx-auto">
                  <LogIn className="h-5 w-5 mr-2" /> Login
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4 items-center justify-center">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700 shadow-lg flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-700 p-6 space-y-6 flex-shrink-0 sticky top-0 h-screen">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 border-2 border-red-500">
              <AvatarImage src={profileData.avatarUrl} alt="Avatar" />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-red-300 mt-2">{profileData.name}</h2>
            <p className="text-sm text-gray-400">{profileData.schoolUniversity}</p>
          </div>
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className={`w-full justify-start text-lg ${selectedSection === 'details' ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedSection('details')}
            >
              <User className="h-5 w-5 mr-3" /> My Details
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-lg ${selectedSection === 'missions' ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedSection('missions')}
            >
              <BookOpen className="h-5 w-5 mr-3" /> My Missions
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-lg ${selectedSection === 'solutions' ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedSection('solutions')}
            >
              <Lightbulb className="h-5 w-5 mr-3" /> My Solutions
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-lg ${selectedSection === 'communities' ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedSection('communities')}
            >
              <Users className="h-5 w-5 mr-3" /> My Communities
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-lg ${selectedSection === 'settings' ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedSection('settings')}
            >
              <SettingsIcon className="h-5 w-5 mr-3" /> Settings
            </Button>
            
            {/* Logout Button in Sidebar */}
            {isLoggedIn && (
              <Button
                variant="ghost"
                className="w-full justify-start text-lg hover:bg-red-900 text-red-400 hover:text-red-300 mt-4"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-3" /> Logout
              </Button>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <CardHeader className="mb-6 p-0">
            <CardTitle className="text-3xl font-bold text-red-400">Student Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {renderContent()}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
