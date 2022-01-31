const jwtGenerator = require("../../utils/jwtGenerator");
const { database } = require("../../prisma");

// signup route

const routeData = {
  path: "/user/show",
  method: "GET",
};

const callback = async (req, res) => {
  try {
    //1. destructure the req.body(name, email, password)
    const { model } = req.body;

    //2. check if user exists (is user exxist then throw error)
    const data = {
      model,
    };

    //6. enter the new user insisde our database
    const newUser = await database.user.findMany({
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
