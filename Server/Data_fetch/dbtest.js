const axios = require('axios');
const mongoose = require('mongoose');
const {Feature} = require('../Models/test.model'); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/edudb').then(res => {
  console.log("Database Connected");
  
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Function to fetch data from API
async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to delete old data from MongoDB
async function deleteOldData() {
  try {
    await Feature.deleteMany({});
    console.log('Old data deleted from MongoDB');
  } catch (error) {
    console.error('Error deleting old data from MongoDB:', error);
    throw error;
  }
}

// Function to save data to MongoDB
async function saveDataToMongoDB(data, featureType, category) {
  try {
    const features = data.features.map(item => {
      item.type = featureType;
      item.name = category;

      return new Feature(item);
    });
    await Feature.insertMany(features);
    console.log(`Data from ${category} API saved to MongoDB`);
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    throw error;
  }
}

// Fetch data from multiple APIs and save it to MongoDB
async function fetchDataAndSaveToMongoDB() {
  try {
    const apiDetails = [
      { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson', type: 'FeatureCollection', name:'school'},
      { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson', type: 'FeatureCollection', name: 'kindergarten' },
      { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson', type: 'FeatureCollection', name: 'socialwork' },
      { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',type: 'FeatureCollection', name: 'youthservice' }
    ];

    // Delete old data before fetching new data
    await deleteOldData();

    for (const apiDetail of apiDetails) {
      const data = await fetchData(apiDetail.url);
      await saveDataToMongoDB(data, apiDetail.type, apiDetail.name);
    }

    mongoose.disconnect(); // Disconnect from MongoDB after saving data
  } catch (error) {
    console.error('An error occurred:', error);
    mongoose.disconnect(); // Disconnect from MongoDB if an error occurs
  }
}

// Call the function to fetch data and save it to MongoDB
fetchDataAndSaveToMongoDB();

//setInterval(fetchDataAndSaveToMongoDB,24*60*60*1000)