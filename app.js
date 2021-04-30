//setting up express
const express = require("express");
const app = express();

//setting up modules
const basicController = require("./controllers/basicController.js");
const loginController = require("./controllers/loginController.js");
var session = require("express-session");

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
//setting up view engine
app.set("view engine", "ejs");
//setting port
app.listen(3000);
console.log("Server is up!!!");

//setting up middlewares
app.use(express.static("./assets"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//home
app.get("/", basicController.home);

//login and registration part and logout part
app.get("/login", loginController.login);
app.post("/login", loginController.authenticate);
app.post("/register", loginController.register);
app.get("/logout", loginController.logout);

//cart part
app.get("/cart", basicController.cart);
app.post("/cart", basicController.addToCart);
app.get("/remove-from-cart/:id", basicController.deleteFromCart);
app.get("/product/:id", basicController.product);
app.post("/update-cart/:id", basicController.updateCart);
app.get("/confirm", basicController.confirm);

//payment part
app.post("/pay", basicController.pay);
app.get("/after",basicController.apay)

//profile part
app.get("/profile",basicController.profile)
app.post("/change-pass", basicController.changePass);


//adding deleting products
app.get("/add-products", basicController.addProducts);
app.get("/delete-product/:id", basicController.delProducts);


//file uploading
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
  });
var upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('img'), basicController.uploadFile);