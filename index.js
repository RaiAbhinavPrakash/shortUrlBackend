const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')

const { connectToMongoDb } = require("./connect");

const URL = require("./models/urlSchema");

const urlRoute = require("./routes/urlRoute");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/userRoute');
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/authCookie");


const app = express();
const PORT = 8001;


connectToMongoDb("mongodb://localhost:27017/short-url");


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRoute)
app.use('/user', userRoute);



app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
