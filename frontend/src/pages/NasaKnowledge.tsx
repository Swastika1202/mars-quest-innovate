import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FaRocket, FaSatellite, FaSpaceShuttle, FaImage, FaTimes } from 'react-icons/fa';

const NASA_API_KEY = 'rFyo3PbgSR7SGrjpagRDmoOb2ClRfH8lfl0CQQBZ';

interface APODData {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

interface NASAImageAsset {
  collection: {
    items: Array<{
      data: Array<{
        title: string;
        description: string;
        date_created: string;
        keywords?: string[];
      }>;
      links?: Array<{
        href: string;
      }>;
    }>;
  };
}

const NasaKnowledge: React.FC = () => {
  const [apod, setApod] = useState<APODData | null>(null);
  const [marsPhotos, setMarsPhotos] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [satellites, setSatellites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchNASAData();
  }, []);

  const handleCardClick = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsDialogOpen(true);
  };

  const fetchNASAData = async () => {
    try {
      // Fetch Astronomy Picture of the Day
      const apodResponse = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      );
      const apodData = await apodResponse.json();
      setApod(apodData);

      // Fetch Mars Rover Photos
      const marsResponse = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
      );
      const marsData = await marsResponse.json();
      setMarsPhotos(marsData.photos.slice(0, 6));

      // Fetch NASA Image Library - Missions
      const missionsResponse = await fetch(
        `https://images-api.nasa.gov/search?q=mission&media_type=image`
      );
      const missionsData: NASAImageAsset = await missionsResponse.json();
      setMissions(missionsData.collection.items.slice(0, 9));

      // Fetch NASA Image Library - Satellites
      const satellitesResponse = await fetch(
        `https://images-api.nasa.gov/search?q=satellite&media_type=image`
      );
      const satellitesData: NASAImageAsset = await satellitesResponse.json();
      setSatellites(satellitesData.collection.items.slice(0, 9));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <FaRocket className="text-6xl text-red-500 animate-bounce mx-auto mb-4" />
          <p className="text-xl">Loading NASA Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            NASA Knowledge Hub
          </h1>
          <p className="text-xl text-gray-300">
            Explore NASA's missions, satellites, and stunning space imagery
          </p>
        </div>

        {/* Astronomy Picture of the Day */}
        {apod && (
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl text-red-400 flex items-center gap-2">
                <FaImage /> Astronomy Picture of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {apod.media_type === 'image' ? (
                    <img
                      src={apod.url}
                      alt={apod.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <iframe
                      src={apod.url}
                      className="w-full h-64 rounded-lg"
                      title={apod.title}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{apod.title}</h3>
                  <p className="text-gray-400 mb-4">{apod.date}</p>
                  <p className="text-gray-300">{apod.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs for different categories */}
        <Tabs defaultValue="missions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-8">
            <TabsTrigger value="missions" className="flex items-center gap-2">
              <FaRocket /> Missions
            </TabsTrigger>
            <TabsTrigger value="satellites" className="flex items-center gap-2">
              <FaSatellite /> Satellites
            </TabsTrigger>
            <TabsTrigger value="mars" className="flex items-center gap-2">
              <FaSpaceShuttle /> Mars Rover
            </TabsTrigger>
          </TabsList>

          {/* Missions Tab */}
          <TabsContent value="missions">
            <div className="grid md:grid-cols-3 gap-6">
              {missions.map((item, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(item, 'mission')}
                >
                  <CardContent className="p-0">
                    {item.links && item.links[0] && (
                      <img
                        src={item.links[0].href}
                        alt={item.data[0].title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
                        {item.data[0].title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(item.data[0].date_created).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {item.data[0].description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Satellites Tab */}
          <TabsContent value="satellites">
            <div className="grid md:grid-cols-3 gap-6">
              {satellites.map((item, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(item, 'satellite')}
                >
                  <CardContent className="p-0">
                    {item.links && item.links[0] && (
                      <img
                        src={item.links[0].href}
                        alt={item.data[0].title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
                        {item.data[0].title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(item.data[0].date_created).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {item.data[0].description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mars Rover Tab */}
          <TabsContent value="mars">
            <div className="grid md:grid-cols-3 gap-6">
              {marsPhotos.map((photo) => (
                <Card 
                  key={photo.id} 
                  className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick(photo, 'mars')}
                >
                  <CardContent className="p-0">
                    <img
                      src={photo.img_src}
                      alt={`Mars photo by ${photo.rover.name}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-white">
                        {photo.rover.name} Rover
                      </h3>
                      <p className="text-sm text-gray-400 mb-1">
                        Camera: {photo.camera.full_name}
                      </p>
                      <p className="text-sm text-gray-400 mb-1">
                        Sol: {photo.sol}
                      </p>
                      <p className="text-sm text-gray-300">
                        Earth Date: {photo.earth_date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* About NASA Section */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl text-red-400">About NASA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p>
              The National Aeronautics and Space Administration (NASA) is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and aerospace research.
            </p>
            <p>
              NASA was established in 1958 by President Dwight D. Eisenhower with a distinctly civilian (rather than military) orientation to encourage peaceful applications in space science. The agency has since led U.S. efforts in space exploration, including the Apollo Moon landing missions, the Skylab space station, and the Space Shuttle program.
            </p>
            <p>
              Today, NASA continues to be at the forefront of scientific discovery, operating numerous robotic spacecraft and telescopes, and conducting extensive research on Earth's climate, the solar system, and the universe beyond. Key ongoing missions include the Mars Perseverance rover, the James Webb Space Telescope, and the Artemis program aimed at returning humans to the Moon and eventually Mars.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Full Information */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-red-400">
                  {selectedItem.type === 'mars' 
                    ? `${selectedItem.rover?.name} Rover - Mars Photo`
                    : selectedItem.data?.[0]?.title}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {selectedItem.type === 'mars'
                    ? `Captured on ${selectedItem.earth_date}`
                    : selectedItem.data?.[0]?.date_created && new Date(selectedItem.data[0].date_created).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="w-full">
                  {selectedItem.type === 'mars' ? (
                    <img
                      src={selectedItem.img_src}
                      alt={`Mars photo by ${selectedItem.rover?.name}`}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    selectedItem.links?.[0] && (
                      <img
                        src={selectedItem.links[0].href}
                        alt={selectedItem.data?.[0]?.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    )
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {selectedItem.type === 'mars' ? (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Rover Information</h3>
                        <p className="text-gray-300"><strong>Rover:</strong> {selectedItem.rover?.name}</p>
                        <p className="text-gray-300"><strong>Status:</strong> {selectedItem.rover?.status}</p>
                        <p className="text-gray-300"><strong>Landing Date:</strong> {selectedItem.rover?.landing_date}</p>
                        <p className="text-gray-300"><strong>Launch Date:</strong> {selectedItem.rover?.launch_date}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Camera Details</h3>
                        <p className="text-gray-300"><strong>Camera:</strong> {selectedItem.camera?.full_name}</p>
                        <p className="text-gray-300"><strong>Camera Name:</strong> {selectedItem.camera?.name}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Photo Information</h3>
                        <p className="text-gray-300"><strong>Sol (Martian Day):</strong> {selectedItem.sol}</p>
                        <p className="text-gray-300"><strong>Earth Date:</strong> {selectedItem.earth_date}</p>
                        <p className="text-gray-300"><strong>Photo ID:</strong> {selectedItem.id}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Description</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedItem.data?.[0]?.description || 'No description available.'}
                        </p>
                      </div>
                      {selectedItem.data?.[0]?.keywords && selectedItem.data[0].keywords.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-orange-400 mb-2">Keywords</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.data[0].keywords.map((keyword: string, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Additional Information</h3>
                        <p className="text-gray-300">
                          <strong>Type:</strong> {selectedItem.type === 'mission' ? 'Mission' : 'Satellite'}
                        </p>
                        <p className="text-gray-300">
                          <strong>Date Created:</strong> {selectedItem.data?.[0]?.date_created && new Date(selectedItem.data[0].date_created).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NasaKnowledge;

