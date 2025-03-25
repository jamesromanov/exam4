const express = require("express");
const postController = require("../controllers/post.controller");
const protector = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkrole");
const multer = require("multer");
const path = require("path");
const checkOwner = require("../middlewares/ownerMiddleware");

const postRouter = express.Router();

let storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.floor(Math.random() * 1000) +
        "-" +
        (path.extname(file.originalname) ?? file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4 },
  fileFilter: (req, file, cb) => {
    let extName = path.extname(file.originalname);
    if (extName == ".png") cb(null, true);
    else cb(new Error("Rasm typi .png bolishi kk!"));
  },
});

postRouter
  .route("/")
  .get(protector, checkRole(["author"]), postController.getAllPosts)
  .post(
    protector,
    checkRole(["author"]),
    upload.single("image"),
    postController.addPost
  );

postRouter
  .route("/:id")
  .get(protector, checkRole(["author"]), checkOwner, postController.getPostById)
  .put(
    protector,
    checkRole(["author"]),
    checkOwner,
    postController.updatePostById
  )
  .delete(
    protector,
    checkRole(["author"]),
    checkOwner,
    postController.deletePostById
  );

module.exports = postRouter;
