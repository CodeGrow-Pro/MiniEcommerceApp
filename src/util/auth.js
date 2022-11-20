const jwt = require('jsonwebtoken');
const user  = require('../models/user.model');
function newToken(user){
    return jwt.sign({id:user.userId},'miniEcommerceapp',{
        expiresIn:'1d'
    })
}
function verifyToken(token){
    try{
  const response = jwt.verify(token,'miniEcommerceapp');
  return response;
    }catch(err){
        console.log(err.message)
        return;
    }
}
module.exports = {newToken,verifyToken}