const category = require('../models/category.model');
function listCategories(req,res){
    category.listCategories((err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send({
                message:"error in fetching the categories!"
            });
        }
        return res.status(200).send({
            message:"fetch category successfully!",
            success:true,
            categories:result
        })
    })
}
module.exports = {listCategories};