const express = require("express")
const router = express.Router();
const { User } = require("../Models/test.model")


//Get all user Together
router.get("/api/users", async (req, res) => {
    try{ 
      const user = await User.find({});
      console.log(user);
      if (!user) {
        return res.status(404).json({ mgs: "User Data Not Found" });
      }
      res.status(200).json(user);
    
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
})
// Get user by ID
router.get("/api/users/:id", async (req, res) => {
  try{ 
    const {id}  = req.params;
    const userExist = await User.findById(id);
    //console.log(user);
    if (!userExist) {
      return res.status(404).json({mgs:"User Not Found"})
    }
    res.status(200).json(userExist);
  
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
  
})










module.exports = router;