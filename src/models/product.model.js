const sqlConnection = require('../services/sqlConnect');
function productLists(data,callback){
    let sql = "Select id as productID , name as product_name , category , price as price from product ";
    const val = [];
    if(data.productId){
        sql+=`where id=? `;
        val.push(data.productId);
        if(data.category){
            sql+=`and category=? `;
            val.push(data.category);
        }else if(data.minPrice){
            sql+=`and price>=? `;
            val.push(data.minPrice);
        }else if(data.maxPrice){
            sql+=`and price<=? `;
            val.push(data.maxPrice);
        }else if(data.productName){
            sql+=`and name=? `;
            val.push(data.productName);
        }
    }else if(data.category){
        sql+=`where category=? `;
        val.push(data.category);
    }else if(data.minPrice){
        sql+=`where price>=? `;
        val.push(data.minPrice);
    }else if(data.maxPrice){
        sql+=`where price<=? `;
        val.push(data.maxPrice);
    }else if(data.productName){
        sql+=`where name=? `;
        val.push(data.productName);
    }
    sqlConnection.execute(sql,val,(err,result)=>{
          if(err){
            callback(err);
          }else{
            callback(err,result);
          }
    })
}

function addProducts(data,callback){
    const sql = `insert into product(name,category,price,createdAt,updatedAt) values(?,?,?,now(),now())`;
    let val  =[data.name,data.category,data.price]
   sqlConnection.execute(sql,val,(err,result)=>{
             if(err){
                callback(err)
             }else{
                callback(err,result);
             }
   })
}

function getProductDetails(data,callback){
    const sql = `SELECT p.name as name ,p.price as price , if((SELECT count(*) from orders as od 
                        left join itemdetails  as oi on oi.orderId = od.id where oi.productId = p.id and od.userid = ? and od.orderStatus = 1)>0,1,0) as addedToCart from 
                        product as p where p.id = ? limit 1`;
    let val  =[data.userId,data.productId]
    sqlConnection.execute(sql,val,(err,result)=>{
                 callback(err,result);
    })
}
module.exports = {productLists,addProducts , getProductDetails}