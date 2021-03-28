const db = require('../../config/db');



exports.listUsers = async function (email){
    console.log("user model called")
    const sql = "SELECT * from user WHERE email = ?"
    const connection = await db.getPool().getConnection();
    let [rows,feilds] = await connection.query(sql,[email]);
    return rows;
}

/*-------------------------------------------------*/

exports.listUsersById = async function (params){
    try{
        const sql1 = `SELECT * FROM user WHERE id = '${params.id}'`
        const connection = await db.getPool().getConnection()
        const [rows,fileds] = await connection.query(sql1)
        return rows;
    }catch (e){
        console.log(e)
    }
}

/*-------------------------------------------------*/

/*return a user id by query with a email when create user successfully*/
exports.returnEmail = async function(email){
    try{
        const sql = 'SELECT email FROM user WHERE email = ?'
        const connection = await db.getPool().getConnection()
        const [rows,fields] = await connection.query(sql,[email])
        let isExist = false
        rows.forEach(item => {
            if (item.email) {
                isExist = true
            }
        })
        if (isExist) {
            return rows[0].email
        }

        else{
            return  false
        }

    }catch (e) {
        console.log(e)
    }

}


/*-------------------------------------------------*/


exports.addUser = async function(firstName,lastName,email,password){
    let values = [
        [email],
        [firstName],
        [lastName],
        [password],
    ]

try{
    const sql = 'INSERT INTO user (email, first_name, last_name, password) VALUES (?) '
    const sql2 = 'SELECT id from user WHERE email = ?'
    const connection = await db.getPool().getConnection()
    await connection.query(sql,[values])
    const [rows,fields] = await connection.query(sql2,[email])
    return rows[0].id
}catch (e) {
    console.log(e)
}
}


/*-------------------------------------------------*/


exports.deleteUser = async function(params){
    console.log("delete user module called")
    const sql = `DELETE from user where id = ${params.id}`
    const connection = await db.getPool().getConnection()
    const status = await connection.query(sql)
    return status
}


/*----------------------update user info---------------------------*/


exports.updateUserInfo = async function(params){
    console.log("update user module called")
   // const sql = `UPDATE user SET email=${params.email},first_name=${first_name},last_name=${params.last_name},image_filename=${params.image_filename},password=${params.password},auth_token=${params.auth_token} WHERE id = ${params.id}`
    const sql = `UPDATE user SET "${params[0]}" = "${params[1]}" WHERE id = ${params[2]}`
    const connection = await db.getPool().getConnection()
    const status = await connection.query(sql)
    const [rows,fields] = await listById(params.id)
    return [rows]
}

/*--------------------login user-----------------------------*/


exports.loginUser = async function(token,email) {
    try{
        //console.log("model called")
        const sql = `UPDATE user SET auth_token = '${token}' where email = '${email}'` // 规范查询📖
        const sql2 = `SELECT id FROM user WHERE email = '${email}'`
        const connection = await db.getPool().getConnection();
        const loginQuery = await connection.query(sql)
        const [rows, fields] = await connection.query(sql2)
        return rows
    }catch (e) {
        console.log(e)
    }
}

/*--------------------logout user-----------------------------*/


exports.logOutUser = async function(token){
    try{
        const connection = await db.getPool().getConnection();
        const sql1 = `SELECT * FROM user WHERE auth_token = '${token}'`
        const [rows,fields] = await connection.query(sql1)

        let isExist = false
        rows.forEach(item => {
            if (item.email) {
                console.log("1"+isExist)
                isExist = true
            }
        })

        if (isExist) {
            const sql2 = `UPDATE user SET auth_token = NULL WHERE auth_token = "${token}"`
            const [rows2,fields2] = await connection.query(sql2)
            console.log("2"+isExist)

            return true
        }else{
            console.log("3"+isExist)
            return  false
        }
    }catch (e){
        return e
    }
}



/*==================retrived hashed password======================*/
exports.retrivePassword = async function(req,res){
    try{
        const sql =  `SELECT password from user WHERE id = "${req.params.id}"`
        const connection = await db.getPool().getConnection()
        const [rows,fields] = connection.query(sql)
        return rows
    }catch(e){
        console.log(e)
    }
}

/*==================retrived userId by token======================*/
exports.retriveIdByToken = async function(token){
    try{
        const sql =  `SELECT id from user WHERE auth_token = "${token}"`
        const connection = await db.getPool().getConnection()
        const [rows,fields] = connection.query(sql)
        return rows
    }catch(e){
        console.log(e)
    }
}


