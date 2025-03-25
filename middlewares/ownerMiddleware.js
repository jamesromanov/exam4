const Post = require("../models/post.model");
const { response } = require("../utils/response");

const checkOwner = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    console.log(req.user);
    if (!req.params.id || !post)
      throw new Error("bu iddagi oydalanuvchi topilmadi!");
    if (req.author.id == post.author) next();
    else throw new Error("Bu postni ozgartirish huquqiga ega emassiz!");
  } catch (error) {
    response(res, error.message, 401);
  }
};

module.exports = checkOwner;
