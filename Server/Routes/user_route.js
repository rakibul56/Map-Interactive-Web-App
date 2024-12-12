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
//logIn End points
router.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
     // Check if the user with the provided email exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email is incorrect" });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    
    res.status(200).json(user);
  
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
  
})


//Update the existing user
router.put("/api/users/:id", async (req, res) => {
  try{ 
    const { id } = req.params;

    const userExist = await User.findById(id);
    //console.log(user);

      
    if (!userExist) {
      return res.status(401).json({ message: "User Not found" });
    }

    const updateduser = await User.findByIdAndUpdate(id,req.body, {new:true});
    res.status(200).json(updateduser);
  
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
  
})
// Delete user acount by ID
router.delete("/api/users/:id", async (req, res) => {
  try{ 
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id:id});
    //console.log(user)

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(user);
  
  } catch (error) {
      console.log("DELETE ERROR",error)
      res.status(500).send({ message: error.message });
  }
  
})

//End point for add or signup new user
router.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    //console.log(data);
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const user = await User.create({ ...data, homeaddress: [], favorite: 'school' })
    res.status(201).json(user);
  } catch (error) {

    console.log(error, "ERROR")
    if (error.code === 11000) {
      req.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
})


module.exports = router;