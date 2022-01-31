const jwtGenerator = require("../../utils/jwtGenerator");
const { database } = require("../../prisma");

// signup route

const routeData = {
  path: "/user/signup",
  method: "POST",
};

const callback = async (req, res) => {
  try {
    //1. destructure the req.body(name, email, password)
    const { name, phoneNumber } = req.body;

    //2. check if user exists (is user exxist then throw error)
    const user = await database.user.findFirst({
      where: { phoneNumber },
    });
    if (user) {
      return res.status(401).send("User already exists");
    }

    const data = {
      name,
      phoneNumber,
    };

    //6. enter the new user insisde our database
    const newUser = await database.user.create({
      data,
    });
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  callback,
  routeData,
};
