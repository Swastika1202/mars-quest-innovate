import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Send, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
  communityId: number;
}

interface Community {
  id: number;
  name: string;
  challenge: string;
  members: number;
  solutions: number;
}

// Mock data for demonstration
const mockMessages: Message[] = [
  // Mars Habitat Designers (Community ID 1)
  {
    id: 1,
    user: "MarsExplorer2024",
    message: "Hey everyone! Excited to start working on sustainable habitats for Mars!",
    timestamp: new Date(Date.now() - 3600000),
    communityId: 1,
  },
  {
    id: 2,
    user: "RedPlanetBuilder",
    message: "I have some ideas about using local materials for construction. What do you think?",
    timestamp: new Date(Date.now() - 3300000),
    communityId: 1,
  },
  {
    id: 3,
    user: "SpaceArchitect",
    message: "That sounds promising! We should consider radiation shielding as a priority.",
    timestamp: new Date(Date.now() - 3000000),
    communityId: 1,
  },
  {
    id: 4,
    user: "MarsExplorer2024",
    message: "Absolutely! I've been researching different materials that could work well in Mars' environment.",
    timestamp: new Date(Date.now() - 2700000),
    communityId: 1,
  },

  // Water Extraction Innovators (Community ID 2)
  {
    id: 5,
    user: "HydroMars",
    message: "Anyone have experience with extracting water from Martian soil? I'm working on a new filtration method.",
    timestamp: new Date(Date.now() - 1800000),
    communityId: 2,
  },
  {
    id: 6,
    user: "IceMiner42",
    message: "I've been studying the polar ice caps. The subsurface ice could be our best bet for initial water sources.",
    timestamp: new Date(Date.now() - 1500000),
    communityId: 2,
  },
  {
    id: 7,
    user: "WaterSeeker",
    message: "Great point! We need to consider the energy requirements for drilling and processing.",
    timestamp: new Date(Date.now() - 1200000),
    communityId: 2,
  },

  // Red Planet Agriculture (Community ID 3)
  {
    id: 8,
    user: "GreenThumbMars",
    message: "What crops do you think would grow best in Martian soil with hydroponics?",
    timestamp: new Date(Date.now() - 900000),
    communityId: 3,
  },
  {
    id: 9,
    user: "SpaceFarmer",
    message: "Potatoes and radishes have shown promise in controlled environments. Let's discuss nutrient solutions!",
    timestamp: new Date(Date.now() - 600000),
    communityId: 3,
  },

  // Solar Energy on Mars (Community ID 4)
  {
    id: 10,
    user: "SolarPioneer",
    message: "How do we optimize solar panel efficiency given Mars' dust storms and lower sunlight intensity?",
    timestamp: new Date(Date.now() - 300000),
    communityId: 4,
  },
  {
    id: 11,
    user: "RedSunTech",
    message: "I've been working on dust-resistant coatings and tracking systems. The 40% less sunlight is challenging but manageable.",
    timestamp: new Date(Date.now() - 60000),
    communityId: 4,
  },
];

const mockCommunities: Community[] = [
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

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState('MarsPioneer'); // In real app, get from auth context
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers] = useState(['MarsPioneer', 'MarsExplorer2024', 'RedPlanetBuilder', 'SpaceArchitect']); // Mock online users
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const community = mockCommunities.find(c => c.id === parseInt(communityId || '0'));

  useEffect(() => {
    // Filter messages for the current community
    const communityMessages = mockMessages.filter(msg => msg.communityId === parseInt(communityId || '0'));
    setMessages(communityMessages);
  }, [communityId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && communityId) {
      const message: Message = {
        id: messages.length + 1,
        user: currentUser,
        message: newMessage,
        timestamp: new Date(),
        communityId: parseInt(communityId),
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate typing indicator disappearing after sending
      setIsTyping(false);
    }
  };

  const handleTyping = () => {
    if (newMessage.trim() && !isTyping) {
      setIsTyping(true);
    } else if (!newMessage.trim()) {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!community) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-red-400 mb-4">Community not found</p>
            <Button onClick={() => navigate('/community')} className="bg-red-600 hover:bg-red-700">
              Back to Communities
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-lg h-[600px] flex flex-col">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/community')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <CardTitle className="text-xl text-red-400">{community.name}</CardTitle>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {community.members} members
                </p>
                <p className="text-xs text-green-400 mt-1">
                  {onlineUsers.length} online: {onlineUsers.slice(0, 3).join(', ')}
                  {onlineUsers.length > 3 && ` +${onlineUsers.length - 3} more`}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-400">{message.user}</span>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 ml-0">
                    <p className="text-gray-200">{message.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
