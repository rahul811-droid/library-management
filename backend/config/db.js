
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config();

export const configData = {
    EMAIL:process.env.EMAIL,
    PASSWORD:process.env.PASSWORD
}


 const dbConnection = async()=>{

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('MongoDb is connected')
    }).catch((err)=>{
        console.log(err)
    })
    

}


export default dbConnection ;

