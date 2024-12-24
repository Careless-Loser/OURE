const express = require('express');
const router = express.Router();

//Routes

//Index Page
router.get('', (req, res) => {
//Index title and description rendering
    const locals = {
        title: "OURE",
        description: "OURE is a modern blogging platform built with cutting-edge web technologies, offering a seamless and engaging experience for writers and readers alike."
    }

    res.render('index', { locals });
}); 

//About Page
router.get('/about', (req, res) => {
    //About title and description rendering
    const locals = {
        title: "ABOUT",
        description: "OURE is a modern blogging platform offering a seamless experience for writers and readers, built with cutting-edge web technologies."
    }

    res.render('about', { locals });
}); 

//Contact Page
router.get('/contact', (req, res) => {
    //Contact title and description rendering
    const locals = {
        title: "CONTACT",
        description: "Get in touch with OURE! Reach out for questions, feedback, or support here to help."
    }

    res.render('contact', { locals });
}); 

module.exports = router;