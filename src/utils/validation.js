const validateSignUpData = (req) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name or last name are required");
  }
};

module.exports = { validateSignUpData };
