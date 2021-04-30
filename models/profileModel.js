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
const getProfile = async (id)=>{
    
    let sqlCommand = "SELECT * FROM `user_info` WHERE user_id =" + id +";";

    let data = await query(sqlCommand);
    console.log(data);
    return data;
    
}

const changePass = async (id, pass)=>{
    pass = pass.trim(" ");
    let sqlCommand = "UPDATE `user_info` SET pass = '"+ pass + "' WHERE user_id =" + id +";";

    let data = await query(sqlCommand);
    console.log(data);
    return data;
    
}


module.exports = {
    getProfile,
    changePass
}