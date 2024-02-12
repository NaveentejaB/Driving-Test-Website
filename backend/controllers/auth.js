const User = require("../models/user_model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("../utils/validationSchema")

module.exports.register = async(req,res) =>{
    const { error } = validator.register(req.body);
    console.log(error);
    if (error)
        return res.status(400).json({ 
            error: true, 
            message: error.details[0].message
        })
         
    const user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({
                message : `user email are already exists.`,
                error : true    
            })
    }  
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    await new User({
        user_email : req.body.email,
        user_name : req.body.name,
        user_contact : req.body.phone,
        user_address : req.body.address,
        user_password : hashPassword
    }).save()

    const user_data = await User.findOne({user_email:req.body.email})
    
    const payload = { id:user_data._id ,email:user_data.user_email ,role :"user"}

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "45m" }
    )

    return res.status(201).json({
            message : `user registered successfully.`,
            accessToken : accessToken,
            error : false
        })
}

// login the user
module.exports.login = async(req,res) => {
    const { error } = validator.login(req.body);
    if (error)
        return res.status(400).json({ 
            error: true, 
            message: error.details[0].message 
        })
    const {email ,password} = req.body
    const user = await User.findOne({user_email:email})
    if(!user){
        return res.status(401).json({
            message : `user with email : ${email} does't exist.`,
            error : true
        })
    }
    const verifiedPassword = await bcrypt.compare(
        password,
        user.user_password
    )
    if (!verifiedPassword)
        return res.status(401).json({
            error: true, 
            message: "Invalid  password" 
        })
    
    const payload = { id:user._id ,email:user.user_email , role :"user"}

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "45m" }
    )	
    return res.status(200).json({
        accessToken : accessToken,
        error: false,
        message: "Logged in sucessfully",
    })
}