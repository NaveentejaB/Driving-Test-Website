const User = require('../models/user_model')
const jwt = require('jsonwebtoken')
const base64 = require('base64-js')
const sharp = require('sharp')
const ejs = require('ejs')
const validator = require('../utils/validationSchema')
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const nodeHtmlToImage = require('node-html-to-image')

// to view the personal info
module.exports.getUserInfo = async(req,res) =>{
    const decoded = jwt.decode(req.headers["authorization"])
    const id = decoded.id	
    const user = await User.findById(id)
    return res.status(200).json({
        data : user,
        message : `fetched user details.`,
        error : false
    })
}

// update the personal info
module.exports.updateDetails= async(req,res) =>{
    const { error } = validator.update(req.body);
    if (error)
        return res.status(400).json({ 
            error: true, 
            message: error.details[0].message 
        })
    const {address,phone,name,proof,photo} = req.body
    
    const convertImage = async(img) => {
        const binary_input_pho = base64.toByteArray(img)
        const compressed_photo = await sharp(binary_input_pho).resize({width:950, height:900 }).toFormat('webp',{quality:50}).toBuffer()
        return compressed_photo
    }
    
    const id = jwt.decode(req.headers["authorization"]).id	
    
    const user = await User.findById(id)

    const compressed_photo_final = photo ? (await convertImage(photo)).toString('base64') : user.user_photo
    const compressed_proof_final = proof ? (await convertImage(proof)).toString('base64') : user.user_proof

    const updateUser = await User.findByIdAndUpdate(id,{
        user_address : address || user.user_address,
        user_contact : phone || user.user_contact,
        user_name : name || user.user_name,
        user_proof : compressed_proof_final,
        user_photo : compressed_photo_final
    })
    return res.status(200).json({
        data : user,
        message : `updated user details.`,
        error : false
    })
}

// update the result
module.exports.updateResult = async(req,res) => {
    const { error } = validator.updateResult(req.body);
    if (error)
        return res.status(400).json({ 
            error: true, 
            message: error.details[0].message 
        })
    const id = jwt.decode(req.headers["authorization"]).id	
    const {score,status,feedBack} = req.body
    const userUpdate = await User.findByIdAndUpdate(id,{
        user_result :{
            score : score,
            status : status,
            area_of_improvement : feedBack
        }
    })
    if(status){
        const img = await sharp('public/lice.jpg').toBuffer()
        const bufferImg =await sharp(img).toFormat('webp',{ quality: 30 }).toBuffer()
        const base64_image = bufferImg.toString('base64')
        const userLicUpdate = await User.findByIdAndUpdate(id,{
            user_license : base64_image
        })
    }
    return res.status(200).json({
        message : `user results updated.`,
        error : false
    }) 
}

// to authenticate only
module.exports.check = async(req,res) =>{
    return res.status(200).json({
        error : false,
        message : 'valid token only'
    })
}