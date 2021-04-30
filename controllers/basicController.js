const e = require("express");
const productModel = require("../models/productModel.js");
const profileModel = require("../models/profileModel.js");

const home = async (req, res) =>{
    let user = req.session;
    
    let pageTitle = "Home";
    let products = await productModel.getProducts();
    // console.log(products);
    data = {
        pageTitle,
        products,
        user
    }
    res.render("./index.ejs", data)
    // console.log(user);
}

const product = async (req, res) =>{
    let user = req.session;
    let pageTitle = "Product";
    let product = await productModel.getSingleProduct(req.params.id);
    if(product.length == 0){
        res.render("404");
        return;
    }
    data = {
        pageTitle,
        product,
        user
    }
    res.render("./product-details.ejs", data);
}

const cart = async (req, res) =>{
    let user = req.session;
    // console.log("userid = "+ user.uid);
    if(user.name == undefined){
        res.render("./login.ejs");
    }
    else{
        let pageTitle = "Cart";
        cartProducts = await productModel.getCartProducts(user.uid);
        data = {
            pageTitle,
            user,
            cart: cartProducts
        }
        res.render("./cart.ejs", data);
    }
}

const addToCart = async (req, res) =>{
    if(req.session.name == null){
        res.render("login");
        return;
    }
    user = req.session;
    // console.log(req.body);
    productId = req.body.product_id;
    size = req.body.size;
    price = req.body.price;
    await productModel.addToCart( user.uid, productId, size, price);
    res.redirect("/product/" + productId);
    
}

const deleteFromCart = async(req, res) =>{
    let cartId = req.params.id;
    await productModel.deleteFromCart(cartId);
    res.redirect("/cart");
}

const updateCart = async(req, res) =>{
    // console.log(req.params.id);
    // console.log(req.body);
    let cart_id = req.params.id;
    let qty = req.body.quantity;
    await productModel.updateCart(cart_id, qty);
}

const confirm = async(req, res) =>{
    if(req.session.name == null){
        res.render("login");
    }
    else{
        
        let result = await productModel.getTotalPrice(req.session.uid);
        // console.log(result);
        let data = {
            totalPrice: result[0].total_price
        }    
        res.render('checkout', {data});
    }
}

const pay = async (req, res) =>{
    if(req.session.name == null){
        res.render("login");
    }
    else{
        
        tran_id = req.body.tran;
        totalPrice = req.body.totalPrice;
        let result = await productModel.pay(req.session.uid, tran_id, totalPrice);
        // await productModel.pay(req.session.uid);
        // console.log(result);
        // await productModel.afterPay(req.session.uid);  
        res.redirect('/after');
    }
}
const apay = async (req, res) =>{
    if(req.session.name == null){
        res.render("login");
    }
    else{
        
        await productModel.afterPay(req.session.uid);
        // console.log(result);
          
        res.redirect('/');
    }
}

const profile = async (req, res) =>{
    let user = req.session;
    if(user.name == null){
        res.render("login");
        return;
    }
    let pageTitle = "Profile";
    let profile = await profileModel.getProfile(user.uid);
    if(profile.length == 0){
        res.render("404");
        return;
    }
    data = {
        pageTitle,
        profile,
        user
    }
    res.render("./profile.ejs", data);
}


const changePass = async(req, res)=>{
    let pass = req.body.pass;
    let id = req.session.uid;
    await profileModel.changePass(id, pass);
    res.redirect("/");
}

const addProducts = async (req, res) =>{
    let user = req.session;
    if(user.name == null){
        res.render("login");
        return;
    }
    let pageTitle = "Add Products";
    data = {
        pageTitle,
        user
    }
    res.render("add-product.ejs", data);
}

const uploadFile = async (req, res, next) => {

    let user = req.session;
    if(user.name == null){
        res.render("login");
        return;
    }

    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      res.redirect("/profile");
      return next(error)
    }
    // console.log("file name is " + file.filename);
    let fileName = file.filename;
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let type = req.body.type;
    await productModel.addProduct(fileName, title, description, price, quantity, type);
    res.redirect("/add-products");
    
  }

  const delProducts = async(req, res) =>{
    let user = req.session;
    if(user.name == null){
        res.render("login");
        return;
    }

      let product_id = req.params.id;
      let result = await productModel.getSingleProduct(product_id);
      if(result.length == 0){
          res.render("404");
          return;
      }
      else{
        await productModel.delProduct(product_id);
        res.redirect("/");
      }
  }

module.exports = {
    home,
    product,
    cart,
    addToCart,
    deleteFromCart,
    updateCart,
    confirm,
    pay,
    apay,
    profile,
    changePass,
    addProducts,
    uploadFile,
    delProducts
}