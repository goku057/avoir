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

const getProducts = async ()=>{
    
    let sqlCommand = "SELECT `id`, `img`, `title`, `description`, `price`, `quantity`, `status` FROM `product_info` WHERE 'status' != 'outofstock';";

    let data = await query(sqlCommand);
    return data;
    
}

const getSingleProduct = async (id)=>{
    
    let sqlCommand = "SELECT * FROM product_info WHERE id = " + id;

    let data = await query(sqlCommand);
    return data;
    
}

const getCartProducts = async (id) =>{
    let sqlCommand = "SELECT *, cart_info.quantity as cqty FROM `cart_info` JOIN product_info on product_id = id WHERE user_id = " + id + " AND cart_info.status = 'pending';";
    let data = await query(sqlCommand);
    return data;
}

const addToCart = async ( userId, productId, size, price) => {
    let sqlCommand = "INSERT INTO `cart_info`( `user_id`, `product_id`, `product_price`, `quantity`, `status`, `cart_date`, `product_size`) VALUES (" + userId + ", " + productId + " ,"+ price + ", 1, 'pending', CURRENT_DATE, '"+ size + "');";
    await query(sqlCommand);
    
}

const deleteFromCart = async(id) =>{
    let sqlCommand = "DELETE FROM cart_info WHERE cart_id = " + id;
    await query(sqlCommand);
}
const updateCart = async (id, qty) =>{
    let sqlCommand = "UPDATE `cart_info` SET `quantity`= "+ qty  +" WHERE cart_id = " + id;
    await query(sqlCommand);
}

const getTotalPrice = async (uid)=>{
    let sqlCommand = "SELECT SUM(product_price * quantity) as total_price FROM `cart_info` AS ci WHERE status = 'pending' and user_id = " + uid + ";";
    let data = await query(sqlCommand);
    return data;
}

const pay = async (uid, tran ,totalPrice)=>{
    let sqlCommand = "INSERT INTO `payment_info`( `transation_id`, `user_id`, `amount`, `payment_date`) VALUES ('"+ tran + "',"+ uid +" , " + totalPrice + " , CURRENT_DATE);";
    let data = await query(sqlCommand);
    
    // sqlCommand = "UPDATE `cart_info` SET `status`='paid' WHERE user_id ="+ uid +";";
    // await query(sqlCommand);
    return data;
}

const afterPay = async (uid)=>{
    
    // let sqlCommand = "UPDATE `cart_info` SET `status`='paid' WHERE user_id ="+ uid +";";
    
    let sqlCommand = "UPDATE `cart_info` AS ci SET ci.status = 'paid' WHERE user_id ="+ uid +";";
    data = await query(sqlCommand);
    // console.log("THis is ")
    // console.log(data);
    // return data;
}

const addProduct = async(fileName, title, description, price, quantity, status) =>{
    let sqlCommand = "INSERT INTO `product_info`( `img`, `title`, `description`, `price`, `quantity`, `status`, `product_type`) VALUES ('images/"+ fileName+ "', '"+ title +"', '" + description+ "', " + price+ "," + quantity + ", 'instock', '"+ status + "')";
    await query(sqlCommand);

}

const delProduct = async(id)=>{
    let sqlCommand = "DELETE FROM product_info WHERE id = " + id;
    await query(sqlCommand);
}
module.exports = {
    getProducts,
    getSingleProduct,
    getCartProducts,
    addToCart,
    deleteFromCart,
    updateCart,
    getTotalPrice,
    pay,
    afterPay,
    addProduct,
    delProduct
}