const mysql = require("mysql");
const util = require("util");
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database: "avoir",
    connectionLimit: 10
});
const query = util.promisify(db.query).bind(db);

const registerUser = async (userName, pass, phone, userType)=>{
    
    let sqlCommand = "INSERT INTO `user_info`(`user_name`, `phone`, `pass`, `user_type`) VALUES ('" + userName + "', '" + phone +"', '" + pass +"', '" + userType +"');";

    let result;
    let data = await query(sqlCommand);

    return data;
    
}
const userValid = async (userName) =>{
    let sqlCommand = "SELECT `user_id`, `user_name`, `phone`, `pass`, `user_type` FROM `user_info` WHERE user_name = '"+ userName +"'";
    let result;
    let data = await query(sqlCommand);
    if (data.length == 0){
        return true;
    }
    else{
        return false;
    }
}

const loginDetails = async(userName, userPass) =>{
    console.log("User = " + userName);
    let sqlCommand = "SELECT `user_id`, `user_name`, `phone`, `pass`, `user_type` FROM `user_info` WHERE user_name = '"+ userName +"'";
    let result;
    let data = await query(sqlCommand);
    console.log(data.length)
    return data;
}
module.exports = {
    registerUser,
    userValid,
    loginDetails
}