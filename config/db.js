import mongoose from "mongoose";

const conectDB = async  () =>{
    try{

        const connection = await mongoose.connect(process.env.MONGO_URL, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })

        const url =`${connection.connection.host}:${connection.connection.port}`
       console.log(url);
        } catch(err){
           console.log(`error: ${err}`);
            process.exit((1))           
        }
}

export default conectDB;