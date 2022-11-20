const sqlConnection = require('../services/sqlConnect');
function addOrderItems(data,callback){
    const sql = `insert into itemdetails(orderId,productId,quantity,createdAt,updatedAt) values(?,?,?,now(),now())`;
    const val = [data.orderId,data.productId,data.quantity];
    sqlConnection.execute(sql,val,(err,result)=>{
         callback(err,result);
    })
}
function editOrderedItem(data,callback){
    const sql = `UPDATE itemdetails SET quantity = ? , updatedAt = now() 
                        WHERE orderId = ? AND productId = ?
    `;
    const val = [data.quantity,data.orderId,data.productId];
    sqlConnection.execute(sql,val,(err,result)=>{
        callback(err,result);
    })
}

function deleteOrderItems(data,callback){
    const sql = `DELETE FROM itemdetails 
                        WHERE  orderId = ? AND productId = ?`;
    const val = [data.orderId,data.productId];
    sqlConnection.execute(sql,val,(err,result)=>{
        callback(err,result);
    })
}

function getOrderItems(data,callback){
    const sql = `select * from itemdetails where orderId=? and productId= ?`;
    const val = [data.orderId , data.productId];
    sqlConnection.execute(sql,val,(err,result)=>{
        callback(err,result);
    })
}
module.exports = {addOrderItems,editOrderedItem,deleteOrderItems,getOrderItems}