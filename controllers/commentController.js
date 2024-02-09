// import model
const Post = require("../models/postModel")
const Comment = require("../models/commentModel")

// business logic

exports.createComment = async (req, res) => {
    try {
        // object create -- fetch data from user body
        const {post, user, body} = req.body;

        // create a comment object
        const comment = new Comment({
            post,user,body
        });

        // save the new object into the database
        const savedComment = await comment.save();
    
        // find the post by id , add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments: savedComment._id}},{new: true} ) // updated doc return aayega
                            .populate("comments") //populate the comments array with comment documents
                            .exec();
        res.json({
            post: updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error while creating comment",
        })
    }
}