const express = require("express")
const router = express.Router();
const { Feature } = require("../Models/test.model");

router.get("/api/map", async (req, res) => {
  try {

    console.log("QUERYy", req.query.filter)

    let mapData = [];

    if (req.query && req.query.filter && req.query.filter != '') {

      const filter = req.query.filter.split(",")

      if (filter.includes("All")) {
        mapData = await Feature.find({});
      }
      else {
        //console.log('arrr', filter)
        const ffilter = filter.map(x => {
          return x.toLowerCase().replace(/s$/, '')
        })
        //console.log( 'finalfilter',ffilter );
        mapData = await Feature.find({
          name: {
            $in: [
              ...ffilter
            ]
          }
        })
      }
    }
    else {
      mapData = await Feature.find({});

    }
    res.status(200).json(mapData);
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
    
})



const fetchGoogleData = async (lat, lon) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCjQKe1WgLs4jbMzoTlccB7TZ4ZICaPs08`
    );
    return response.json();
};

router.get("/api/googledata", async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    try {
        const data = await fetchGoogleData(lat, lon);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});




module.exports = router;