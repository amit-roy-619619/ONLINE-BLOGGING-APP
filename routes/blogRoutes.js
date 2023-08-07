const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');



//router object
const router = express.Router();

//create routes
//get all blogs || get
router.get('/all-blog', getAllBlogController)

//create blogs || post
router.post('/create-blog', createBlogController)

//update blogs || put
router.put('/update-blog/:id', updateBlogController)

//single blog details || get
router.get('/get-blog/:id', getBlogByIdController)

//delete blogs || delete
router.delete('/delete-blog/:id', deleteBlogController)

//user blog || get
router.get('/user-blog/:id', userBlogController)

module.exports = router;