import { FC } from "react";
import { FaRobot, FaGamepad, FaChartLine, FaDatabase, FaTrophy, FaUserGraduate } from "react-icons/fa";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const FeaturesSection: FC = () => {
  const features: Feature[] = [
    {
      icon: <FaRobot className="text-5xl" />,
      title: "AI-Powered Learning",
      description: "Get personalized learning paths and intelligent assistance powered by advanced AI to help you understand Mars colonization challenges.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaGamepad className="text-5xl" />,
      title: "Gamified Missions",
      description: "Complete interactive missions like building habitats, extracting water, and setting up solar farms while earning points and badges.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaChartLine className="text-5xl" />,
      title: "Real-Time Analytics",
      description: "Track your progress with detailed analytics and visualizations showing your achievements and learning journey.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaDatabase className="text-5xl" />,
      title: "NASA Data Integration",
      description: "Access real NASA data, Mars rover images, and scientific research to inform your solutions and deepen your understanding.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FaTrophy className="text-5xl" />,
      title: "Leaderboards & Achievements",
      description: "Compete with peers globally, climb the leaderboards, and unlock achievements as you progress through challenges.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <FaUserGraduate className="text-5xl" />,
      title: "Innovation Hub",
      description: "Share your solutions, get feedback from the community, and collaborate with other innovators on groundbreaking ideas.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="features-section py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Platform Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful tools and features that make Mars Quest Innovate the ultimate platform for space exploration education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl p-8 inline-block">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Mars Journey?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Join thousands of innovators already exploring Mars colonization challenges and contributing to humanity's future.
            </p>
            <a
              href="/start-mission"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              <FaRobot />
              Start Exploring Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
