const product = require('../models/product.model');
function productList(req,res){
    const data =req.body;
    product.productLists(data,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send({
                message:"product not found something want wrong!",
                success:false
            })
        }
        return res.status(200).send({
            message:"product fetch successfully!",
            success:true,
            products : result
        });
    })
}
function addProducts(req,res){
    const data = req.body;
    console.log(data)
    if(data.name && data.category && data.price){
         product.addProducts(data,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).send({
                    message:"something want wrong!",
                    success:false
                })
            }
            return res.status(200).send({
                message:"product add successfully",
                success:true
            })
         })
    }else{
        return res.status(400).send({
            message:"please check your details!",
            success:false,
        })
    }
}
module.exports  = {productList,addProducts};