const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
const glob = require("glob");

config();

//middleware

app.use(cors());
app.use(express.json()); //req body

//routes
const { routeData, callback } = require("./routes/user/signup");
app.post(routeData.path, callback);

glob(`${__dirname}/routes/**/**/*.js`, (err, files) => {
  files.map((f) => {
    const { routeData, callback } = require(f);
    switch (routeData.method) {
      case "POST":
        app.post(routeData.path, callback);
        break;
      case "GET":
        app.post(routeData.path, callback);
        break;
      case "PUT":
        app.post(routeData.path, callback);
        break;
    }
  });
});

app.listen(3001, () => {
  console.log(`Server is starting on port 3001`);
});
