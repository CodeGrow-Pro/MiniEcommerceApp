 const orderModel = require('../models/order.model');
const items = require('../models/items.model');
const product = require('../models/product.model');
function createOrder(req,res){
    const  data = req.body;
    if(data.userId && data.productId){
          product.getProductDetails(data,(err,product)=>{
            if(err){
                console.log(err.message)
                return res.status(500).send({
                    message:"Error in getting product details!",
                    success:false
                })
            }
            orderModel.findOrderbyUser(data,(err1, order)=>{
            if(err1){
                console.log(err1.message)
                return res.status(500).send({
                    message:"Error in order find by user!",
                    success:false
                })
            }
            if(order.length > 0){
                data.total = parseInt(order[0].total,10)+parseInt(product[0].price,10);
                data.orderId = order[0].id;
                orderModel.updateOrders(data,(err2,orderDetails)=>{
                    if(err2){
                        console.log(err2.message)
                        return res.status(500).send({
                            message:"Error in updateting the order!",
                            success:false
                        })
                    }
                    items.addOrderItems(data,(err3,orderItem)=>{
                        if(err3){
                            console.log(err3.message)
                            return res.status(500).send({
                                message:"Error in adding an item",
                                success:false
                            })
                        }

                        return res.status(200).send({
                            message:"product add successfully!",
                            success : true,
                            orderDetails : {orderId: order[0].id}
                        });
                    })
                })
            }else{
                data.total = parseInt(product[0].price , 10);
                orderModel.addOrders(data,(err4,orderdetail)=>{
                    if(err4){
                        console.log(err4.message)
                        return res.status(500).send({
                            message:"Error in adding order item if not exits!",
                            success:false
                        })
                    }
                    data.orderId = orderdetail.insertId;
                    items.addOrderItems(data,(err5,orderitem)=>{
                        if(err5){
                            console.log(err5.message)
                            return res.status(500).send({
                                message:"Error in creating the order!",
                                success:false
                            })
                        }
                        return res.status(200).send({
                            message:"add item successfully",
                            success:true,
                            OrderDetails:{
                                OrderId:orderdetail[0].insertId
                            }
                        })
                    })
                })
            }
           })
          })
    }else{
        console.log(err.message)
        return res.status(401).send({
            messag:"invalied data pass!",
            success:false
        })
    }
}
function getOrderDetails(req,res){
        const data = req.body;
        if(data.userId){
            orderModel.listOrderDetails(data,(err,result)=>{
                if(err){
                    return res.status(500).send({
                        message:"not able to fetch the data",
                        success : false
                    })
                }
                return res.status(200).send({
                    message:"fetched data successfully!",
                    success : true,
                    orderDetails : result
                })
            })
        }
}
module.exports = {
    createOrder,
    getOrderDetails
}