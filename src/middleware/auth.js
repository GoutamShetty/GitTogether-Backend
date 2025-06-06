const adminAuth = (req, res, next) => {
  const token = "xyz";
  if (token !== "xyz") {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  if (token !== "xyz") {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
