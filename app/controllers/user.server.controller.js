const User = require('../models/user.model');
const validate = require('../middleware/user/validation')
const bcrypt = require('bcryptjs')
const passport = require('passport')


//retrieve all users data
exports.listAllUsers = async function(req,res){
    console.log("user constroller call")
    try{
        let user_list = await User.listUsers();
        
        res.status(200)
        res.send(user_list)
    }catch (e){
        res.send(e)
        console.log(e)

    }
}



exports.getDetails = async function(req,res){
    return null;
}

exports.addUser = async function(req,res){
    let Fname = req.body.firstName
    let Lname = req.body.lastName
    var password = req.body.password
    let email = req.body.email
    let password2 = req.body.password2
    console.log(password,email,password2)
    console.log(typeof(password))
    const errorList = validate.validationTest(Fname,Lname,email,password,password2)
    if(validate.reportError(errorList)){
        console.log("validation result:" + validate.reportError(errorList))
        //hash pasword
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password.toString(),salt,(err,hash)=>{
                if(err) throw err;
                password = hash;
                console.log(hash)
                console.log(password)
                try{
                    let result = User.addUser(Fname,Lname,email,password)
                    res.send(result)
                    res.status(200)
                    
                }catch(e){
                    res.send("the error come from controller addUser" + e)
                }
            })
        })
        
        

    }
}

exports.rmUser = async function(req,res){
    return null;
}

exports.updateUser = async function(req,res){
    return null;
}
