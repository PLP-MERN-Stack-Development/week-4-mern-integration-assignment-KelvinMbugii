const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const verifyToken = require("../middlewares/authMiddleware");

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();


    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async(req, res, next) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message : "Invalid credentials"})
        }

        const token = jwt.sign(
            { id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res
          .status(200)
          .json({ token, user: { id: user._id, email: user.email } });

    }catch(err){
        next(err);
    }
})



module.exports = router;



