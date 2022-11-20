const sqlConnection = require('../services/sqlConnect');

function listCategories(callback){
    const sql = "Select id as categoryId , name from category";
    const data = [];
    sqlConnection.execute(sql,data,(err,result)=>{
        callback(err,result)
    });
}

module.exports = {listCategories};