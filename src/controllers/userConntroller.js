const userModel = require('../models/user.model');
const auth = require('../util/auth')
// function signup(req,res){
//     const data = req.body;
//     if(data.email && data.password){
//            userModel.getUserSignupDetails(data,(err,result)=>{
//             if(err){
//                 console.log(err.message)
//                 return res.status(401).send({
//                     message:"please check your login details!",
//                     success:false
//                 });
//             }
//             if(result.length>0){
//                 return res.status(409).send({
//                     message:"user already exists!",
//                     success:false
//                 })
//             }else{
//                 userModel.basicsignup(data,(err,result)=>{
//                     if(err){
//                         console.log(err);
//                         return res.status(401).send({
//                             message:"something want wrong!",
//                             success:false
//                         });
//                     }else{
//                         return res.status(201).send({
//                             message:"signup successfully!",
//                             success:true
//                         })
//                     }
//                 })
//             }
//            })
//     }else{
//         return res.status(400).send({
//             message:"please check your login details!",
//             success:false
//         });
//     }
// }
// function login(req,res){
//     const data = req.body;
//     if(data.email && data.password){
//     userModel.login(data,(err,result)=>{
//         if(err){
//             console.log(err);
//             return res.status(500).send({
//                 message:"something want wrong!",
//                 success:false
//             })
//         }
//         if(result.length==0){
//             return res.status(404).send({
//                 message:"email or password incorrect!",
//                 success:false
//             });
//         }
//         return res.status(200).send({
//             message:"login successfully !",
//             success:true
//         })
//     })
//     }else{
//         return res.status(400).send({
//             message:"Please check the login details!",
//             success:false
//         })
//     }
// }
function signup(req, res) {
    const data = req.body;
    if (data.email && data.password) {
        userModel.getUserSignupDetails(data, (err, result) => {
            if (err) {
                console.log(err.message)
                return res.status(401).send({
                    message: "please check your login details!",
                    success: false
                });
            }
            if (result.length > 0) {
                return res.status(409).send({
                    message: "user already exists!",
                    success: false
                })
            } else {
                userModel.strongSignUp(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(401).send({
                            message: "something want wrong!",
                            success: false
                        });
                    } else {
                        return res.status(201).send({
                            message: "signup successfully!",
                            success: true
                        })
                    }
                })
            }
        })
    } else {
        return res.status(400).send({
            message: "please check your login details!",
            success: false
        });
    }
}

function login(req, res) {
    const data = req.body;
    if (data.email && data.password) {
        userModel.strongLogin(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: "something want wrong!",
                    success: false
                })
            }
            if (result.length == 0) {
                return res.status(404).send({
                    message: "email or password incorrect!",
                    success: false
                });
            }
            return res.status(200).send({
                message: "login successfully !",
                success: true,
                Response: result
            })
        })
    } else {
        return res.status(400).send({
            message: "Please check the login details!",
            success: false
        })
    }
}

function isAuthorized(req, res, next) {
    const token = req.headers.auth;
    let response;
    try {
        response = auth.verifyToken(token);
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            message: "invalied token!",
            success: false
        });
    }
    userModel.getUserById(response.id, (err, result) => {
        if (err) {
            return res.status(401).send({
                message: "invalied user!",
                success: false
            })
        }
        req.user = result;
        next()
    })
}

function updateUser(req, res) {
    const data = req.body;
    const token = req.headers.auth;
    let response;
    try {
        response = auth.verifyToken(token);
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            message: "invalied token!",
            success: false
        });
    }
    if (data && response.id) {
        userModel.updateUser(response.id,data, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: " something want wrong! ",
                    success: false
                });
            }
            return res.status(200).send({
                message: "user update successfully!",
                success: true
            });
        })
    } else {
        return res.status(500).send({
            message: " please check the details! ",
            success: false
        });
    }
}
module.exports = {
    signup,
    login,
    isAuthorized,
    updateUser
}