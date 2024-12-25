const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Routes

//Index Page
router.get('', async (req, res) => {
//Catching the data
    try{
        //Index title and description rendering
        const locals = {
        title: "OURE",
        description: "OURE is a modern blogging platform built with cutting-edge web technologies, offering a seamless and engaging experience for writers and readers alike."
        }

    //pagination
    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: {createdAt: -1 } }])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

}); 

//About Page
router.get('/about', (req, res) => {
    //About title and description rendering
    const locals = {
        title: "ABOUT",
        description: "OURE is a modern blogging platform offering a seamless experience for writers and readers, built with cutting-edge web technologies."
    }

    res.render('about', {currentRoute: '/about'});
});  

//Contact Page
router.get('/contact', (req, res) => {
    //Contact title and description rendering
    const locals = {
        title: "CONTACT",
        description: "Get in touch with OURE! Reach out for questions, feedback, or support here to help."
    }

    res.render('contact', {currentRoute: '/contact'});
}); 

//Posts :id
router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        currentRoute: `/post/${slug}`
      }
  
      res.render('post', { locals, data});
    } catch (error) {
      console.log(error);
    }
  
  });

  //Search Posts
  router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "SEARCH"
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

module.exports = router;

// Testing if the database started
//function insertPostData () {
    //Post.insertMany([

       // {
        // title: "Welcome To OURE",
        //body: "OURE is a personal blogging platform crafted to provide users with a seamless and engaging blogging experience. Whether you're a passionate writer, a storyteller, or someone who simply loves sharing ideas, OURE is here to make your blogging journey effortless and enjoyable. Built with modern web technologies, OURE combines an elegant and user-friendly frontend with a robust and reliable backend. This ensures not only a visually pleasing experience but also a powerful and secure platform to host your thoughts. With OURE, you can: Share your stories and ideas effortlessly. Connect with a growing community of readers and writers. Enjoy a clean, intuitive interface that makes writing and reading a joy. We invite you to explore, write, and connect. Welcome to OURE—a place where your voice finds its home!"
        //},
    //])
//}
//insertPostData();