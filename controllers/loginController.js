//setting up modeles
const loginModel = require("../models/loginModel");
const productModel = require("../models/productModel");

const login = async (req, res) =>{
    let sess = req.session;
    console.log(sess);
    req.session.destroy( err=>{
        if(err){
            console.log( "there is an error");
        }
    });
    // console.log("After destroy");
    // console.log(sess.name);
    res.render("./login.ejs");
}


const authenticate = async (req, res) =>{
    let userName = req.body.username;
    let userPass = req.body.pass;
    let data = await loginModel.loginDetails(userName, userPass);
    console.log(data);
    console.log(userPass);
    if (data.length != 1){
        let data = {
            msg:"The user Doesnt exist",
            status:false
        }
        res.render("./login.ejs", {data});
    }
    else if(data[0].user_name == userName && data[0].pass == userPass){
        let user = req.session;
        user.name = userName;
        user.uid = data[0].user_id;
        user.type = data[0].user_type;
        console.log("The user id is = " + user.id);
        res.redirect("/");
    }
    else{
        let data = {
            msg:"The user name or password doesnt match",
            status:false
        }
        res.render("./login.ejs", {data});
    }
}

const register = async (req, res) =>{
    let userName = req.body.username;
    let userPass = req.body.pass;
    let userPhone = req.body.phone;
    let userType = "customer";

    let validationCheck = await loginModel.userValid(userName);
    if(validationCheck == true){
        let result = await loginModel.registerUser(userName, userPass, userPhone, userType);
        let data = {
            msg:"SUCCESSFULLY REGISTERED",
            status:true
        }
        res.render("./login.ejs", {data});
    }
    else{
        let data = {
            msg:"user name thik koren !!!",
            status:false
        }
        res.render("./login", {data});
    }
    
    
}

const logout = async (req, res)=>{
    // req.session.destroy( async err =>{
    //     if(err){
    //         console.log( "there is an error");
    //     }});
        req.session.name = undefined;
        let user = req.session;
        let pageTitle = "Home";
        let products = await productModel.getProducts();
        console.log(products);
        data = {
            pageTitle,
            products,
            user
        }
        res.render("./index.ejs", data)
}

module.exports = {
    login,
    register,
    authenticate,
    logout
}