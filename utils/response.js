const response = (res, data, sts = 200) => {
  if (sts > 205 || sts < 200)
    res.status(sts).json({ status: "Failed!", error: err.message });
  else res.status(sts).json({ status: "Success!", data });
};
module.exports = { response };
