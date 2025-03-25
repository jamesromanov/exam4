const { response } = require("../utils/response");
const Author = require("../models/author.model");

const getAuthor = async (req, res, next) => {
  try {
    let authorId = req.author.id;
    let author = await Author.findById(authorId)
      .select("name email")
      .populate("posts");
    if (!authorId || !author) throw new Error("Foydalanuvchi topilmadi!");
    response(res, author);
  } catch (error) {
    response(res, error.message, 404);
  }
};

module.exports = { getAuthor };
