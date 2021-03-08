const db = require('../../config/db');

exports.listUsers = async function (email){
    console.log("user model called")
    const sql = "SELECT * from user WHERE email = ?"
    const connection = await db.getPool().getConnection();
    let [rows,feilds] = await connection.query(sql,[email]);
    return [rows];
}

// exports.checkExist = async function (email){
//     console.log("user model called")
//     const sql = `SELECT id, email,first_name,last_name,image_filename FROM user WHERE email = ${email}`
//     const connection = await db.getPool().getConnection()
//     const [rows,fields] = await connection.query(sql)
//     if (rows == "{}"){
//         return true
//     }else{
//         return false
//     }
// }

exports.addUser = async function(firstName,lastName,email,password){
    console.log("addUser model called ")
    let values = [
        [email],
        [firstName],
        [lastName],
        [password],
    ]
    const sql = 'INSERT INTO user (email, first_name, last_name, password) VALUES (?) '
    const connection = await db.getPool().getConnection()
    const status = await connection.query(sql,[values])
    //const [rows,fields] = await listById(params.id)
    return status
}

exports.deleteUser = async function(params){
    console.log("delete user module called")
    const sql = `DELETE from user where id = ${pramas.id}`
    const connection = await db.getPool().getConnection()
    const status = await connection.query(sql)
    return status
}

exports.updateUserInfo = async function(params){
    console.log("update user module called")
    const sql = `UPDATE user SET email=${params.email},first_name=${first_name},last_name=${params.last_name},image_filename=${params.image_filename},password=${params.password},auth_token=${params.auth_token} WHERE id = ${params.id}`
    const connection = await db.getPool().getConnection()
    const status = await connection.query(sql)
    const [rows,fields] = await listById(params.id)
    return [[rows,fields],status]
}




