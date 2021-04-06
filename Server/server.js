const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const Collection = require("./schema");
const ImageCollections = require("./ImageSchema");
var cors = require("cors");
var app = express();
app.use(express.static("uploads"));
app.use(cors());
var fs = require("fs");
var multer = require("multer");
var path = require("path");
// var upload = multer({ dest: "uploads/" }); //setting the default folder for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/reactnativedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));
app
  .get("/", (req, res) => {
    res.send("Hello Sir");
  })
  .listen(5000, () => {
    console.log("Server is running on port 5000");
  });

//other imports and code will go here
app.post("/upload", upload.single("fileData"), async (req, res) => {
  // console.log(req.body);
  console.log("req.file is --->>>>", req.file);
  await ImageCollections.create({
    images: req.file.originalname,
  }).then((resp) => res.json(resp.images));
  console.log("Path is ---->>>>", req.file.path);
  // res.json(req.file.originalname);

  // fs.readFile(req.file.path, (err, contents) => {
  //   if (err) {
  //     console.log("Error: ", err);
  //   } else {
  //     console.log("File contents ", contents);
  //   }
  // });
});

app.post("/signup", async (req, res) => {
  await Collection.findOne({ email: req.body.email }, function (error, user) {
    if (user === null) {
      console.log("User Does not exist");
      if (
        req.body.username === "" ||
        req.body.firstname === "" ||
        req.body.lastname === "" ||
        req.body.password === ""
      ) {
        res.json("Please Enter All the Fields");
      } else {
        Collection.create(req.body);
        res.json("User Added");
      }
    } else {
      res.json("user already exist");
      console.log("User Already exist");
    }
    console.log(user);
  });
});

// app.post("/upload", async (req, res) => {
//   await console.log(req.body);
// });

app.post("/login", async (req, res) => {
  const email2 = req.body.email;
  console.log("email heree is ------>>>>>>>", email2);
  var e = await Collection.findOne({ email: email2 });
  console.log("e here is ----->>>>>>", e);
  if (e) {
    if (req.body.password === e.password) {
      console.log("User Exist");
      res.json("User Exist");
    } else {
      // res.redirect("/loginform");
      console.log("Wrong Password");
      res.json("Password incorrect");
    }
  } else {
    if (e === null && email2 === "") {
      res.json("Please Enter the mail id");
    } else if (e === null && req.body.password === "") {
      res.json("Please Enter the Password");
    } else {
      // res.redirect("/loginform");
      console.log("User does not exist");
      res.json("user does not exist");

      // console.log("User does not exist");
    }
  }
});

// app.get("/image", (req, res) => {
//   ImageCollections.find({}).fetch(function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
// app.get("/image", (req, res) => {
//   console.log(ImageCollections.find({}));
// });
