
🚀 Mars Quest Innovate

 🌌 Empowering Innovators to Build for the Red Planet

Mars Quest Innovate is a web-based platform developed for the **NASA Space Apps Challenge**. It transforms **real-time NASA Mars data** into an interactive innovation experience — enabling users to analyze live environmental datasets, design sustainable Martian habitats, and compete on a **real-time leaderboard**.

 🧠 Project Overview

Mars Quest Innovate bridges the gap between **space science, technology, and creativity**. By integrating NASA’s open Mars datasets with a user-friendly interface, the platform allows participants to:
- Explore **real-time atmospheric data** (temperature, pressure, etc.) from NASA APIs.  
- Submit habitat and sustainability solutions.  
- Track global innovation through a **leaderboard** and **user activity metrics**.  

Our mission: to make space exploration **accessible, data-driven, and engaging** — inspiring the next generation of problem-solvers to think like astronauts and innovate for Mars.

 ⚙️ Features

✅ Fetches **real-time NASA Mars weather data**  
✅ **User authentication** and personalized profiles  
✅ **Submission portal** for creative solutions  
✅ **Dynamic leaderboard** with live scoring  
✅ **Database integration** to store user activity and solutions  
✅ **Responsive UI** built for accessibility and performance  

 🧩 Tech Stack

| Category | Tools / Frameworks |
|-----------|--------------------|
| **Frontend** | React, Tailwind CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **APIs** | NASA Open Data APIs |
| **AI Tools** | ChatGPT, GitHub Copilot, Windsurf |
| **Version Control** | Git, GitHub |


🚀 Getting Started

 1️⃣ Clone the repository
bash
git clone https://github.com/<your-username>/mars-quest-innovate.git
cd mars-quest-innovate


 2️⃣ Install dependencies

bash
npm install

3️⃣ Set up environment variables

Create a `.env` file in the **backend** directory:

bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mars-quest?retryWrites=true&w=majority
MONGO_DB_NAME=mars-quest
PORT=5000


 4️⃣ Run the project

bash
npm run dev

📡 Data Sources

All Mars environmental data is fetched from:

* [NASA InSight: Mars Weather Service API](https://api.nasa.gov/)
* [NASA Open Data Portal](https://data.nasa.gov/)

