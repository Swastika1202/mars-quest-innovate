import { FC } from "react";
import { FaRocket, FaUsers, FaLightbulb, FaGlobeAmericas } from "react-icons/fa";

const AboutSection: FC = () => {
  return (
    <section id="about" className="about-section py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            About Mars Quest Innovate
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering the next generation to solve Mars colonization challenges through innovation, collaboration, and cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-red-400">Our Mission</h3>
            <p className="text-lg text-gray-300 mb-4">
              Mars Quest Innovate is an interactive platform designed to engage students, educators, and space enthusiasts in solving real-world challenges of Mars colonization.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Through gamification, AI-powered learning, and collaborative problem-solving, we're building a community of innovators ready to tackle humanity's greatest frontier.
            </p>
            <p className="text-lg text-gray-300">
              Join us in shaping the future of space exploration and contribute your ideas to make Mars colonization a reality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-red-500/30 hover:border-red-500 transition-all duration-300">
              <FaRocket className="text-4xl text-red-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Explore Missions</h4>
              <p className="text-gray-400">Interactive challenges simulating real Mars colonization scenarios</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all duration-300">
              <FaUsers className="text-4xl text-orange-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Collaborate</h4>
              <p className="text-gray-400">Connect with innovators worldwide to share solutions</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300">
              <FaLightbulb className="text-4xl text-yellow-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Innovate</h4>
              <p className="text-gray-400">Develop creative solutions to complex space challenges</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all duration-300">
              <FaGlobeAmericas className="text-4xl text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Learn</h4>
              <p className="text-gray-400">Access NASA data and AI-powered educational resources</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Why Mars Colonization Matters</h3>
          <p className="text-gray-300 text-center max-w-4xl mx-auto">
            Mars represents humanity's next giant leap. By establishing a presence on Mars, we ensure the survival of our species, 
            advance scientific knowledge, and inspire future generations to dream bigger. Every challenge we solve here on Earth 
            brings us one step closer to becoming a multi-planetary civilization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
