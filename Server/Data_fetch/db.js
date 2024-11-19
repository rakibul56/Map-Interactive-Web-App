//This file for test purpose

const express = require("express")
const router = express.Router();
const axios = require('axios');
const Feature = require('../Models/test.model');



const uri = [

     { url:'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',type:'School' },
     { url:'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',type:'Kindergarden'},
     { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson',type:'SocialWork'},
     { url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson', type: 'YoungWorkHelp'}
  ];




router.get("/api/test/v1", async (req, res) => {
    try {  
         // Fetch the dataset
    
         // console.log(data.features);
         //Feature.deleteMany({});

        for(let i =0 ; i<uri.length;i++){
            const response = await axios.get(uri[i].url);
            const data = response.data;
            const type = uri[i].type; 
            for( let x=0;x<data.features.length;x++ ){
                Feature.create({ ...data.features[x],type:type });
                console.log("ITEM",data.features[x],{type})
            }
            console.log(`Data from ${uri[i].type} saved successfully!`);
        }
      
      } catch (error) {
        console.error(`Error fetching or saving data from ${uri}:`, error);
      }
    
})


module.exports = router;