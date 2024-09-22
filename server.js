const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();


if(process.env.NODE_ENV === 'local'){
    app.use(cors({
        origin:'http://localhost:3000',
        credentials: true
    }))
}else {
    app.use(cors({     
        credentials: true
    }))
}

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , "./frontend")));
    app.get("*" , (req , res) => {
        res.sendFile(path.resolve(__dirname , './','frontend', 'index.html'))
    })
}

const dbConnect = async() => {
    try{
        if(process.env.NODE_ENV === 'local'){
            await mongoose.connect(process.env.LOCAL_DB_URI)
            console.log("Connected to local database....");
            
        }else {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Connected to Production database...."); 

        }
    }
    catch(err){
        console.log("Error connecting to MongoDB");
    }
}

dbConnect()
const PORT = process.env.PORT 

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
});