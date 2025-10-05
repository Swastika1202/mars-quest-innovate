const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'mars_quest';

// Sample data
const sampleMissions = [
  {
    name: 'Mars Rover Exploration',
    status: 'active',
    startDate: new Date('2023-01-15'),
    crew: ['Alex Johnson', 'Maria Garcia', 'James Chen'],
    location: 'Jezero Crater',
    objectives: [
      'Collect rock samples',
      'Search for signs of ancient life',
      'Test new exploration equipment'
    ]
  },
  {
    name: 'Habitat Construction',
    status: 'planning',
    startDate: new Date('2024-03-01'),
    crew: ['Sarah Kim', 'David Patel'],
    location: 'Olympus Mons Base',
    objectives: [
      'Build primary habitat structure',
      'Set up life support systems',
      'Prepare for crew arrival'
    ]
  }
];

const sampleAstronauts = [
  {
    name: 'Alex Johnson',
    position: 'Mission Commander',
    skills: ['leadership', 'geology', 'mechanical engineering'],
    missionsCompleted: 2,
    status: 'active'
  },
  {
    name: 'Maria Garcia',
    position: 'Chief Scientist',
    skills: ['astrobiology', 'chemistry', 'data analysis'],
    missionsCompleted: 1,
    status: 'active'
  },
  {
    name: 'James Chen',
    position: 'Pilot',
    skills: ['piloting', 'navigation', 'mechanical systems'],
    missionsCompleted: 1,
    status: 'active'
  }
];

async function setupDatabase() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Create collections
    const missions = db.collection('missions');
    const astronauts = db.collection('astronauts');
    
    // Insert sample data
    const missionResult = await missions.insertMany(sampleMissions);
    console.log(`✅ Inserted ${missionResult.insertedCount} missions`);
    
    const astronautResult = await astronauts.insertMany(sampleAstronauts);
    console.log(`✅ Inserted ${astronautResult.insertedCount} astronauts`);
    
    // Create indexes
    await missions.createIndex({ name: 1 }, { unique: true });
    await astronauts.createIndex({ name: 1 }, { unique: true });
    console.log('✅ Created indexes');
    
    // Verify data was inserted
    const missionCount = await missions.countDocuments();
    const astronautCount = await astronauts.countDocuments();
    
    console.log(`\n📊 Database Summary:`);
    console.log(`- Missions: ${missionCount}`);
    console.log(`- Astronauts: ${astronautCount}`);
    
  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the setup
setupDatabase();
