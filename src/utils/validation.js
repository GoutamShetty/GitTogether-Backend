const validateSignUpData = (req) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name or last name are required");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
