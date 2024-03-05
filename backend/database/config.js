const { default: mongoose } = require("mongoose");

module.exports = mongoose.connect('mongodb+srv://lavan:Lavan757@cluster0.9kluo40.mongodb.net/')
.then(() =>{
    console.log('DB connected successfully')
})
.catch((err) =>{
    console.log(err)
})
