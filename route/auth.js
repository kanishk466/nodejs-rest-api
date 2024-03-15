const express = require("express")
const router = express.Router();
const userModel = require("../models/User")
const becrypt = require("bcrypt")

router.get('/', (req, res) => {
    res.send("hey its auth route")
})


//REgister
router.post('/register',async(req,res)=>{
   
   try {


    const salt = await  becrypt.genSalt(10);
    const hashPassword = await becrypt.hash(req.body.password,salt);


    const newUser = new userModel({
        username:req.body.username,
        email: req.body.email,
        password: hashPassword
       })


    const user = await newUser.save();
    res.status(200).json(user)


   } catch (error) {
    console.log(error);
    res.status(400).json({message:"Invalid registration"});
   }
})
 


//Login

router.post("/login", async (req, res) => {
    try {
        
        const user = await userModel.findOne({email: req.body.email});

        if(!user){  
            return res.status(401).json({ message : "Authorization failed!" });
          }

          const validPassword = await becrypt.compare(req.body.password ,user.password)
          if (!validPassword ) {
              return res.status(401).json({ message: 'Authentication failed' });
          }

          res.status(200).json(user);
    } catch (error) {
        res.status(400).json(err)
    }
})



module.exports = router;