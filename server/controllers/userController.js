const bcrpyt = require('bcrypt')

const User = require('../models/userModels')

module.exports.register = async(req, res, next) =>{
    try{
    const {email, username, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({msg: "Username already used", status:false})
    }    
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({msg: "Email already used", status:false});
    }
    const hashedPassword = await bcrpyt.hash(password, 12);
    const user = await User.create({
        email, 
        username, 
        password:hashedPassword
    })
    delete user.password;
    return res.json({user, status: true})
        }catch(err){    
            next(err)
    }


}
module.exports.login = async(req, res, next) =>{
    try{
    const { username, password} = req.body;
    const fetchUser = await User.findOne({username});
    if(!fetchUser){
        return res.json({msg: "Incorrect username/passowrd", status:false})
    }    
    const isPasswordValid = bcrpyt.compare(password,fetchUser.password);
    if(!isPasswordValid){
        return res.json({msg: "Incorrect username/passowrd", status:false})

    }
    delete fetchUser.password;
    return res.json({fetchUser, status: true})
        }catch(err){    
            next(err)
    }


}
exports.setAvatar = async(req,res,next)=>{
    try{
    const {userId} =req.params;
    const {image} = req.body
    const user =await User.findById(userId);
    user.isAvatarImageSet = true;
    user.avatarImage = image;
    await user.save()
    delete user.password;
    res.json({image, isSet:true})
    }catch(err){
        res.json({isSet:false})
    }
}

exports.getAllUsers = async(req, res, next) =>{
    try{
    const {id} = req.params;
    const users = await User.find({_id:{$ne:id}}).select(['username', 'email', 'avatarImage', '_id']);
    res.json({users, status: true})}
    catch(err){
        res.json({status:false})
    }
}