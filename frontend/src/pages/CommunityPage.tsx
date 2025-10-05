import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Users, Lightbulb, Plus, Search, MessageCircle } from 'lucide-react';
import { useApi } from '../hooks/useAxiosApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Community {
  _id: string; // Changed from id to _id (MongoDB ObjectId)
  name: string;
  description: string; // Changed from challenge to description
  members: string[]; // Array of user IDs (strings)
  admin: string; // Admin user ID
  solutions?: number; // Optional, if you want to track it on frontend
}

// Removed initialCommunities as data will be fetched from backend

const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState(''); // Changed from newCommunityChallenge
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId, isLoggedIn } = useAuth();
  const api = useApi();
  const navigate = useNavigate();

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/communities');
      setCommunities(response.data);
    } catch (err: any) {
      console.error('Error fetching communities:', err);
      setError(err.response?.data?.message || 'Failed to fetch communities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) { // Only fetch if user is logged in
      fetchCommunities();
    }
  }, [isLoggedIn]); // Depend on isLoggedIn

  // Use a separate useEffect to fetch user's joined communities (for `isCommunityJoined` logic)
  const [userJoinedCommunityIds, setUserJoinedCommunityIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserJoinedCommunities = async () => {
      if (userId && isLoggedIn) {
        try {
          const response = await api.get(`/communities/user/${userId}`);
          setUserJoinedCommunityIds(response.data.map((comm: any) => comm._id));
        } catch (err) {
          console.error(`Error fetching user's joined communities:`, err);
        }
      }
    };
    if (isLoggedIn) { // Only fetch if user is logged in
      fetchUserJoinedCommunities();
    }
  }, [userId, isLoggedIn]); // Re-fetch when communities or user status changes

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase()) // Changed from challenge
  );

  const handleCreateCommunity = async () => {
    if (newCommunityName && newCommunityDescription) {
      try {
        await api.post('/communities', {
          name: newCommunityName,
          description: newCommunityDescription,
        });
        setNewCommunityName('');
        setNewCommunityDescription('');
        setIsCreateDialogOpen(false);
        fetchCommunities(); // Refresh the list of communities
      } catch (err: any) {
        console.error('Error creating community:', err);
        setError(err.response?.data?.message || 'Failed to create community.');
      }
    }
  };

  const handleJoinCommunity = async (communityId: string) => {
    if (!isLoggedIn) {
      setError('Please log in to join a community.');
      return;
    }
    try {
      await api.post(`/communities/${communityId}/join`);
      // Optimistically update frontend
      setUserJoinedCommunityIds((prev) => [...prev, communityId]);
      setCommunities((prevCommunities) =>
        prevCommunities.map((comm) =>
          comm._id === communityId ? { ...comm, members: [...comm.members, userId || ''] } : comm
        )
      );
      console.log(`Joined community with id: ${communityId}`);
      setError(null);
    } catch (err: any) {
      console.error('Error joining community:', err);
      setError(err.response?.data?.message || 'Failed to join community.');
    }
  };

  const handleLeaveCommunity = async (communityId: string) => {
    if (!isLoggedIn) {
      setError('Please log in to leave a community.');
      return;
    }
    try {
      await api.post(`/communities/${communityId}/leave`);
      // Optimistically update frontend
      setUserJoinedCommunityIds((prev) => prev.filter((id) => id !== communityId));
      setCommunities((prevCommunities) =>
        prevCommunities.map((comm) =>
          comm._id === communityId ? { ...comm, members: comm.members.filter(memberId => memberId !== userId) } : comm
        )
      );
      console.log(`Left community with id: ${communityId}`);
      setError(null);
    } catch (err: any) {
      console.error('Error leaving community:', err);
      setError(err.response?.data?.message || 'Failed to leave community.');
    }
  };

  const isCommunityJoined = (communityId: string) => userJoinedCommunityIds.includes(communityId);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4"><p>Loading communities...</p></div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400 mb-4">Community Hub</CardTitle>
          <p className="text-lg text-gray-300">Connect, collaborate, and innovate for Mars exploration!</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Search and Create Community */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search communities..."
                className="w-full bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {isLoggedIn && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 flex items-center gap-2">
                    <Plus className="h-5 w-5" /> Create New Community
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-red-400">Create New Community</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="community-name">Community Name</Label>
                      <Input
                        id="community-name"
                        value={newCommunityName}
                        onChange={(e) => setNewCommunityName(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="community-description">Description</Label>
                      <Input // Changed from Input for challenge
                        id="community-description"
                        value={newCommunityDescription}
                        onChange={(e) => setNewCommunityDescription(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateCommunity} className="bg-red-600 hover:bg-red-700 text-white">
                      Create
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Communities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <Card key={community._id} className="bg-gray-700 border-gray-600 p-6 space-y-4 transform hover:scale-[1.02] transition-transform duration-300">
                  <CardTitle className="text-2xl font-bold text-red-300">{community.name}</CardTitle>
                  <p className="text-gray-300"><span className="font-semibold">Description:</span> {community.description}</p> {/* Changed from Challenge */}
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {community.members.length} Members</span> {/* Display members length */}
                    <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /> {community.solutions || 0} Solutions</span> {/* Assuming solutions might be 0 initially */}
                  </div>
                  {isLoggedIn && (
                    isCommunityJoined(community._id) ? (
                      <>
                        <Button
                          onClick={() => handleLeaveCommunity(community._id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Leave Community
                        </Button>
                        <Button
                          onClick={() => navigate(`/chat/${community._id}`)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Chat with Community
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleJoinCommunity(community._id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Join Community
                      </Button>
                    )
                  )}
                  {!isLoggedIn && (
                    <Button
                      disabled
                      className="w-full bg-gray-600 text-gray-400 cursor-not-allowed"
                    >
                      Login to Join
                    </Button>
                  )}
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">No communities found matching your search.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPage;

