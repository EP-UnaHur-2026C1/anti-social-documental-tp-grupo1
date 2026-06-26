const { Post } = require("../models")

const validarPostId = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { validarPostId }