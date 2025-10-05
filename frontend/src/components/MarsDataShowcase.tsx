import { useMarsPhotos, useAPOD } from "../hooks/useApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Loader2, Calendar } from "lucide-react";

export const MarsDataShowcase = () => {
  const { data: apod, isLoading: apodLoading, error: apodError } = useAPOD();
  const { data: recentPhotos, isLoading: recentLoading } = useMarsPhotos({ 
    rover: 'curiosity', 
    sol: 1000, 
    page: 1 
  });

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
             <span className="text-gradient-mars">Mars Data</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time data from NASA's Mars missions. Explore actual images and scientific data from the Red Planet.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {/* Astronomy Picture of the Day */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Astronomy Picture of the Day</CardTitle>
              </div>
              <CardDescription>
                Today's featured space image from NASA
              </CardDescription>
            </CardHeader>
            <CardContent>
              {apodLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : apodError ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>Unable to load APOD</p>
                  <p className="text-sm">NASA API key may be required</p>
                </div>
              ) : apod ? (
                <div className="space-y-4">
                  {apod.media_type === 'image' ? (
                    <img 
                      src={apod.url} 
                      alt={apod.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Video content available</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-semibold">{apod.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {apod.explanation}
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{apod.date}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No APOD available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Mars Photos Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Recent Mars Photos</h3>
          {recentLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentPhotos?.photos && recentPhotos.photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPhotos.photos.slice(0, 6).map((photo) => (
                <Card key={photo.id} className="glass-card">
                  <CardContent className="p-0">
                    <img 
                      src={photo.img_src} 
                      alt={`Mars photo from ${photo.rover.name}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{photo.rover.name}</Badge>
                        <span className="text-sm text-muted-foreground">Sol {photo.sol}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {photo.camera.full_name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <p>No recent photos available</p>
              <p className="text-sm">NASA API key may be required</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
