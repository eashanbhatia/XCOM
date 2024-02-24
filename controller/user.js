const mongoose = require('mongoose')

module.exports.getIndex = (req,res,next) =>{
    console.log("Hello")
    res.render('index')
}

