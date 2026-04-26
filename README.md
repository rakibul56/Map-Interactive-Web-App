# EduInfoFinder

**Find schools, kindergartens, and social services near you — on an interactive map.**

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb) ![Leaflet](https://img.shields.io/badge/Map-Leaflet.js-orange?logo=leaflet) ![Tailwind CSS](https://img.shields.io/badge/Styles-TailwindCSS-38bdf8?logo=tailwindcss)

---

## Overview

EduInfoFinder is a full-stack web app that puts educational and social facilities on an interactive map. Pick a category, click a pin, and instantly see the facility's name, address, phone number, email, and website — without leaving the page.

The project started as a way to make public geodata from city APIs more accessible. The data covers four service types — schools, kindergartens, social work centres, and youth services — pulled directly from ArcGIS feeds and stored in MongoDB.

---

## Features

- **Interactive map** powered by Leaflet.js with OpenStreetMap tiles
- **Category filters** — Schools, Kindergartens, Social Work, Youth Services, or All
- **Search** to find facilities by name
- **Color-coded markers** so each category is immediately recognizable
- **Rich popups** with name, address, phone, email, and a direct website link
- **Geolocation** — the map centers on your current position automatically
- **User accounts** — register and log in to save personal data
- **Set a favorite** facility or save your home address from any marker popup
- Data seeded from live ArcGIS GeoJSON feeds with a single command

---

## Screenshots

> **[ Replace these placeholders with actual screenshots ]**

| Home Page | Map View | Facility Popup |
|-----------|----------|----------------|
| `screenshot-home.png` | `screenshot-map.png` | `screenshot-popup.png` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Map | react-leaflet / Leaflet.js |
| Routing | react-router-dom v6 |
| HTTP client | Axios |
| Auth (wired up) | Firebase |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| Data source | ArcGIS GeoJSON REST APIs |

---

## Installation

> Prerequisites: **Node.js ≥ 18**, **MongoDB** running locally (or a MongoDB Atlas URI).

### 1 — Clone the repo

```bash
git clone https://github.com/your-username/Map-Interactive-Web-App.git
cd Map-Interactive-Web-App
```

> **[ Replace `your-username` with your actual GitHub username ]**

### 2 — Set up the database

Create a MongoDB database named `edudb`, then configure the connection in two places:

**`Server/.env`**
```env
MONGODB_URI=mongodb://localhost:27017/edudb
```

**`Server/Data_fetch/dbtest.js`** — find the line that says `"Connect To MongoDb"` and paste the same connection string there.

Then seed the database (this fetches all four GeoJSON datasets from ArcGIS):

```bash
cd Server
npm install
node Data_fetch/dbtest.js
```

You should see four datasets imported into the `features` collection.

### 3 — Start the server

```bash
# still in Server/
node server.js
# API is now running on http://localhost:3001
```

### 4 — Start the client

```bash
cd ../Client
npm install
npm run dev
# Frontend is now at http://localhost:5173
```

---

## Usage

1. Open `http://localhost:5173` in your browser.
2. Sign up for an account — this creates your user record in MongoDB.
3. Go to the **Map** page.
4. Use the **Filter** buttons at the top to pick one or more categories.
5. Click any marker to see full details for that facility.
6. From a popup you can **Set as Favorite** or **Set as Home** (logged-in users only).
7. Use the **Search** bar to filter results by name.

---

## Project Structure

```
Map-Interactive-Web-App/
├── Client/                   # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.jsx       # Leaflet map, markers, popups
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MapPage.jsx   # Owns filter + search state
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── contexts/         # AuthContext and UserContext (prepared)
│   │   ├── firebase/         # Firebase config
│   │   └── App.jsx
│   └── package.json
│
└── Server/                   # Express API
    ├── Models/
    │   └── test.model.js     # Feature and User Mongoose models
    ├── Routes/
    │   ├── map_route.js      # GET /api/map?filter=...
    │   ├── user_route.js     # User CRUD
    │   └── test_route.js
    ├── Data_fetch/
    │   ├── dbtest.js         # One-shot data seeder
    │   └── db.js
    ├── server.js             # Entry point, port 3001
    └── package.json
```

---

## Contributing

Contributions are welcome. Here is how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please keep PRs focused — one feature or fix per PR makes review much faster.

---

## License

This project is licensed under the **MIT License**.  
See [LICENSE](LICENSE) for details.

> **[ Add a LICENSE file to the repo if you haven't already ]**

---

## Author

**Rakibul Islam**  
[GitHub](https://github.com/your-username) · [Email](mailto:thangamagan399@gmail.com)

> **[ Replace `your-username` with your actual GitHub username ]**
