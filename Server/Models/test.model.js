const mongoose = require('mongoose');

//  the PropertiesSchema schema for each feature
const PropertiesSchema =  mongoose.Schema({
    OBJECTID:{ type: Number },
    ID: { type: Number },
    TYP: { type: Number },
    ART: { type: String },
    STANDORTTYP: { type: String },
    BEZEICHNUNG: { type: String },
    BEZEICHNUNGZUSATZ: { type: String },
    KURZBEZEICHNUNG: { type: String },
    STRASSE: { type: String },
    PLZ: { type: String },
    ORT: { type: String },
    HORT: { type: Number },
    KITA: { type: Number },
    TELEFON: { type: String },
    FAX: { type: String },
    EMAIL: { type: String },
    PROFILE: { type: String },
    SPRACHEN: { type: String },
    WWW: { type: String },
    URL: { type: String },
    TRAEGER: { type: String },
    TRAEGERTYP: Number,
    BEZUGNR: { type: String },
    GEBIETSARTNUMMER: { type: Number },
    SNUMMER: { type: Number },
    NUMMER: { type: Number },
    GlobalID: { type: String },
    CreationDate: { type: String },
    Creator: { type: String },
    EditDate: { type: String },
    Editor: { type: String },
    BARRIEREFREI: Number,
    INTEGRATIV: Number
    
    
   });  

//  the geometry schema for each feature
const GeometrySchema = mongoose.Schema({
  type: { type: String },
  coordinates: { type: [Number] }
});

//  the feature schema
const FeatureSchema = mongoose.Schema({
  name: { type: String },
  type: { type: String  },
  properties: { type:PropertiesSchema },
  geometry: { type:GeometrySchema }
});

const UserSchema =  mongoose.Schema({
  firstname: { type: String  },
  lastname :{ type: String },
  password: { type: String },
  email: { type: String ,required: true, unique: true},
  homeaddress: {
    type: [Number],
    default: [],
    // type: { type: String, default: "Point" },
    // coordinates: { type: [Number], default: [0, 0] }  // longitude, latitude
  },
  favorite : { type: String}  // Type Can also be FeatureSchema but only BEZEICHNUNG pass to the user
});

const User = mongoose.model('Users', UserSchema);
const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = { Feature ,User };