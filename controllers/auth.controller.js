const { response } = require("../utils/response");
const Author = require("../models/author.model");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
require("dotenv").config();

let joiVal = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .min(5)
    .max(40)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
    .min(8)
    .max(12)
    .regex(/[a-zA-Z0-9]{3,30}/)
    .required(),
  role: Joi.string(),
  isAcive: Joi.boolean(),
});

let register = errorHandler(async (req, res, next) => {
  let { name, email, isAcive, role, password } = req.body;
  if (!name) throw new Error("Iltimos ismingizni kiriting!");
  if (!email) throw new Error("Iltimos emailingiz kiriting!");
  if (!password) throw new Error("Iltimos passwordizni kiriting!");
  let checkingBody = joiVal.validate({ name, email, isAcive, role, password });
  if (checkingBody.error)
    throw new Error("Iltimos ma'lumotlarni togri kiriting!");
  let [emailChecking, nameChecking] = await Promise.all([
    Author.find({ email }),
    Author.find({ name }),
  ]);
  if (emailChecking.length || nameChecking.length)
    throw new Error(
      `${emailChecking.length ? "Email" : "Ism"} allaqachon mavjud!`
    );
  let author = await Author.create({ name, email, isAcive, role, password });
  response(res, author);
});

let login = errorHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password)
    throw new Error(`Iltimos ${!email ? "ism" : "password"} kiriting!`);
  let author = await Author.findOne({ email }).select(
    "name email password role isActive"
  );
  if (!author) throw new Error("Siz avval royhatdan otmagansiz!");
  let checking = await bcrypt.compare(password, author.password);
  if (!checking) throw new Error("Passwordni hato kiritingiz!");
  author.password = password;

  let refreshToken = jwt.sign(
    { id: author.id, role: author.role },
    process.env.JWT_REFRESH_TOKEN_KEY,
    { expiresIn: eval(process.env.JWT_REFRESH_EXP) }
  );
  author.refreshToken = refreshToken;
  author.save();
  let options = {
    maxAge: eval(process.env.JWT_REFRESH_EXP),
    httpOnyl: false,
  };
  res.cookie("jwt", refreshToken, options);
  let obj = author.toObject();

  delete obj.password;
  delete obj.refreshToken;
  response(res, obj);
});
let resetAccessToken = errorHandler(async (req, res, next) => {
  let refreshToken = req.cookies.jwt;
  let checkingToken = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY
  );

  let author = await Author.findOne({ refreshToken: refreshToken });
  if (!author || author.id !== checkingToken.id)
    throw new Error("Siz tizimda mavjud emassiz!");
  let accessToken = jwt.sign(
    { id: author.id, role: author.role },
    process.env.JWT_ACCESS_TOKEN_KEY,
    { expiresIn: process.env.JWT_ACCESS_EPX }
  );
  response(res, { token: accessToken });
});

let logout = errorHandler(async (req, res, next) => {
  let options = {
    maxAge: eval(process.env.JWT_REFRESH_EXP),
    httpOnyl: false,
  };
  res.clearCookie("jwt", options);
  response(res, "Tizimdan muvaffaqiyatli chiqdingiz!");
});
module.exports = { login, register, resetAccessToken, logout };
