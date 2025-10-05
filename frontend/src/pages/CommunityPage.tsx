import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Users, Lightbulb, Plus, Search } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  challenge: string;
  members: number;
  solutions: number;
}

const initialCommunities: Community[] = [
  {
    id: 1,
    name: "Mars Habitat Designers",
    challenge: "Develop sustainable living modules for Mars",
    members: 150,
    solutions: 85,
  },
  {
    id: 2,
    name: "Water Extraction Innovators",
    challenge: "Efficient methods for extracting Martian water ice",
    members: 230,
    solutions: 120,
  },
  {
    id: 3,
    name: "Red Planet Agriculture",
    challenge: "Cultivating crops in Martian soil",
    members: 180,
    solutions: 95,
  },
  {
    id: 4,
    name: "Solar Energy on Mars",
    challenge: "Advanced solar farm designs for optimal power generation",
    members: 110,
    solutions: 60,
  },
];

const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityChallenge, setNewCommunityChallenge] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.challenge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCommunity = () => {
    if (newCommunityName && newCommunityChallenge) {
      const newCommunity: Community = {
        id: communities.length + 1,
        name: newCommunityName,
        challenge: newCommunityChallenge,
        members: 1, // Creator is the first member
        solutions: 0,
      };
      setCommunities([...communities, newCommunity]);
      setNewCommunityName('');
      setNewCommunityChallenge('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleJoinCommunity = (id: number) => {
    if (!joinedCommunities.includes(id)) {
      setJoinedCommunities([...joinedCommunities, id]);
      setCommunities(communities.map(community =>
        community.id === id ? { ...community, members: community.members + 1 } : community
      ));
      console.log(`Joined community with id: ${id}`);
    }
  };

  const isCommunityJoined = (id: number) => joinedCommunities.includes(id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-400 mb-4">Community Hub</CardTitle>
          <p className="text-lg text-gray-300">Connect, collaborate, and innovate for Mars exploration!</p>
        </CardHeader>
        <CardContent className="space-y-8">
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
                    <Label htmlFor="community-challenge">Challenge/Focus</Label>
                    <Input
                      id="community-challenge"
                      value={newCommunityChallenge}
                      onChange={(e) => setNewCommunityChallenge(e.target.value)}
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
          </div>

          {/* Communities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <Card key={community.id} className="bg-gray-700 border-gray-600 p-6 space-y-4 transform hover:scale-[1.02] transition-transform duration-300">
                  <CardTitle className="text-2xl font-bold text-red-300">{community.name}</CardTitle>
                  <p className="text-gray-300"><span className="font-semibold">Challenge:</span> {community.challenge}</p>
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {community.members} Members</span>
                    <span className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /> {community.solutions} Solutions</span>
                  </div>
                  <Button
                    onClick={() => handleJoinCommunity(community.id)}
                    disabled={isCommunityJoined(community.id)}
                    className={`w-full ${
                      isCommunityJoined(community.id)
                        ? 'bg-gray-600 hover:bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isCommunityJoined(community.id) ? 'You are already joined' : 'Join Community'}
                  </Button>
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

