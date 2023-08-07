const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

//get all blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "not found any blogs"
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "found all blogs",
            blogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: "false",
            message: "error while getting blogs",
            error
        })
    }

}

//create blogs
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "please provide all the fields"
            });
        }
        const existingUser = await userModel.findById(user)
        //validation of user
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        const newBlog = new blogModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "succesfully created blog",
            newBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            seccess: false,
            message: "error while creating blogs",
            error
        })
    }

}

//update blogs
exports.updateBlogController = async (req, res) => {
    try {
        //get the id for api
        const { id } = req.params
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "successfully blog updated",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: true,
            message: "error while updating blog",
            error
        })
    }

}

//single blog
exports.getBlogByIdController = async (req, res) => {
    try {
        //get the id for api
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "successfully get the blog",
            blog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            sucess: false,
            message: "error in getting blog",
            error
        })
    }

}

//delete blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "successfully deleted"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while deleteing blog",
            error
        })
    }

}


//get user blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "succesfully found blogs",
            userBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error while finding user blog",
            error
        })
    }
}