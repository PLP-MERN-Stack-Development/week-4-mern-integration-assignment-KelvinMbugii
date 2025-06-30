const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { validateCategory } = require("../validators/categoryValidator");
const verifyToken = require("../middlewares/authMiddleware");


router.get('/', verifyToken, async (req, res, next) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            next(err);
        }
});

router.post('/', verifyToken, async (req, res, next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        next(err)
    }
});

module.exports = router;
