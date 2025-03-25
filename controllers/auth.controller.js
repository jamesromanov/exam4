const { response } = require("../utils/response");
const Author = require("../models/author.model");
const errorHandler = require("../utils/errorHandler");
const Joi = require("joi");

let joiVal = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .min(5)
    .max(20)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: Joi.string()
    .required()
    .min(8)
    .max(12)
    .regex(/[a-zA-Z0-9]{3,30}/),
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

let login = errorHandler(async(req, res, next));
