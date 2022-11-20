const sqlConnection = require('../services/sqlConnect');
const bcrypt = require('bcrypt');
const auth = require('../util/auth')

function basicsignup(data, callback) {
    const sql = `Insert into users(username,email,password,createdAt,updatedAt) values(?,?,?,now(),now())`;
    const val = [data.username, data.email, data.password];
    sqlConnection.execute(sql, val, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(err, result);
        }
    })

}

function strongSignUp(data, callback) {
    const sql = `Insert into users(username,email,password,createdAt,updatedAt) values(?,?,?,now(),now())`;
    const val = [data.username, data.email];
    const pass = data.password

    bcrypt.hash(pass, 8, (err, hash) => {
        if (err) {
            console.log(err);
            return;
        }
        val.push(hash)
        sqlConnection.execute(sql, val, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        })
    })
}

function login(data, callback) {
    const sql = `select * from users where email=?`;
    const val = [data.email];
    sqlConnection.execute(sql, val, (err, result) => {
        console.log(result)
        if (data.password === result[0].password) {
            callback(err, result);
        } else {
            callback(err, []);
        }
    })
}

function strongLogin(data, callback) {
    const sql = `select id as userId,username,email,password from users where email=?`;
    const val = [data.email];
    sqlConnection.execute(sql, val, (err, result) => {
        console.log(result)
        const isValied = bcrypt.compareSync(data.password, result[0].password);
        if (isValied) {
            const token = auth.newToken(result[0]);
            const response = {
                userID: result[0].id,
                username: result[0].username,
                email: result[0].email,
                accessToken: token
            }
            callback(err, response);
        } else {
            callback(err, [])
        }
    })

}

function getUserSignupDetails(data, callback) {
    const sql = `select id as userId ,username, email from users where email=? and password=?`;
    const val = [data.email, data.password];
    sqlConnection.execute(sql, val, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(err, result);
        }
    })
}

function getUserById(id, callback) {
    const sql = `select id as userId, username,email from users where id=?`;
    const val = [id];

    sqlConnection.execute(sql, val, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(err, result)
        }
    })
}
function updateUser(userId,newdata,callback){
    let sql  , val;
   if(newdata.username && newdata.email && newdata.password){
     sql = `update users set username = ? , email = ? , password = ? where id = ?`;
     val = [newdata.username,newdata.email , newdata.password,userId];
   }else if(newdata.username && newdata.email){
    sql = `update users set username = ? , email = ?  where id = ? `;
    val = [newdata.username,newdata.email ,userId];
   }else if(newdata.username){
    sql = `update users set username = ? where id = ? `;
     val = [newdata.username,userId];
   }else if(newdata.email){
    sql = `update users set email = ?  where id = ?`;
     val = [newdata.email , userId];
   }
   sqlConnection.execute(sql,val , (err,result)=>{
    callback(err,result);
   })
}
module.exports = {
    basicsignup,
    login,
    getUserSignupDetails,
    strongSignUp,
    strongLogin,
    getUserById,
    updateUser
};