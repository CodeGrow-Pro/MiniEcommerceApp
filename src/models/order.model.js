const sqlConnection = require('../services/sqlConnect');
function listOrderDetails(data, callback) {
    const sql = `select * from orders o inner join itemdetails it on o.id=it.orderId inner join product p on 
                        it.productId=p.id where o.userid = ?
    `;
    const val = [data.userId];
    sqlConnection.execute(sql, val, (err, result) => {
        callback(err, result);
    })
}

function findOrderbyUser(data, callback) {
    const sql = `select * from orders where userid = ? and orderStatus = 1`;
    const val = [data.userId];
    sqlConnection.execute(sql, val, (err, result) => {
        callback(err, result);
    })
}

function addOrders(data, callback) {
    const sql = `insert into orders (userid,total,orderStatus,createdAt,updatedAt) values(?,?,1,now(),now())`;
    const val = [data.userId, data.total];
    sqlConnection.execute(sql, val, (err, result) => {
        callback(err, result);
    })
}
function updateOrders(data, callback) {
    let sql = `update orders set total=? , orderStatus = ? , updatedAt = now() where userid = ?`;
    const val = [];
    if(data.payment){
        sql = `update orders set orderStatus  = ? where userid = ?`;
        val.push(2)
    }else{
        val.push(data.total);
        val.push(1)
    }
    val.push(data.userId)
    sqlConnection.execute(sql, val, (err, result) => {
        callback(err, result);
    })
}

function getOrderdetails(data,callback){
    const sql = `select od.id as OrderId ,od.total as total , p.id as productId,
                       p.name as productName , p.price as Price , oi.quantity as Quantity 
                       from orders as od left join itemdetails as oi on
                       od.id = oi.orderId left join product as p on 
                       p.id = oi.productId where
                       od.userid = ? and od.orderStatus = 1  
    `
    const val = [data.userId];
sqlConnection.execute(sql,val,(err,result)=>{
    callback(err,result);
})
}
module.exports = {
    listOrderDetails,
    findOrderbyUser,
    addOrders,
    getOrderdetails,
    updateOrders
}