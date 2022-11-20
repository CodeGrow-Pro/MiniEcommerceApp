const mysql = require('mysql2');
const config = require('../constants/dbconfig');
var pool = mysql.createPool(config.mysql.prod);

function execute(sql,data,callback){
 pool.getConnection(function (err,connection){
if(err){
    callback(err);
}else{
    connection.query(sql,data,(err1,result)=>{
        if(err1){
            callback(err1)
        }else{
            connection.release();
            callback(err1,result);
        }
    })
}
 })
}

module.exports = {execute};