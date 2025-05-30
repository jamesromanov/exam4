const { response } = require("../utils/response");
const Post = require("../models/post.model");
const Joi = require("joi");
const errorHandler = require("../utils/errorHandler");

let joiV = Joi.object({
  title: Joi.string()
    .min(5)
    .max(50)
    .pattern(/^[a-zA-Z0-9\s.,!?'-]{3,}$/)
    .required(),
  author: Joi.string().min(8).max(30).required(),
  content: Joi.string().min(5).max(40).required(),
  image: Joi.string().min(6).max(40),
});

const addPost = errorHandler(async (req, res, next) => {
  let { title, content, author, image } = req.body;
  if (!title) throw new Error("Title berish majburiy!");
  if (!author) throw new Error("Author berish majburiy!");
  if (!content) throw new Error("Content berish majburiy!");

  let data = joiV.validate({ title, content, author, image });
  if (data.error) throw new Error("iltimos ma'lumotlarni togri kiriting!");

  image = req.file.path;
  let post = await Post.create({ title, content, author, image });
  response(res, post, 201);
});

const updatePostById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let { title, content, author, image } = req.body;
  if (!id) throw new Error("Korsatilgan iddagi post topilmadi!");
  let post = await Post.findByIdAndUpdate(id, {
    title,
    content,
    author,
    image,
  });
  response(res, post, 203);
});

const deletePostById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  if (!id) throw new Error("Korsatilgan iddagi post topilmadi!");
  await Post.findByIdAndDelete(id);
  response(res, "Deleted!", 204);
});
const getPostById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let post = await Post.findById(id);
  if (!post) throw new Error("Korsatilgan iddagi post topilmadi!");
  response(res, post);
});
const getAllPosts = errorHandler(async (req, res, next) => {
  let posts = await Post.find();
  response(res, posts);
});

module.exports = {
  getAllPosts,
  getPostById,
  deletePostById,
  updatePostById,
  addPost,
};
