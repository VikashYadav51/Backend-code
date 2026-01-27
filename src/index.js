import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './database/user.database.js';

dotenv.config({
    path : './.env'
})

connectDB()
.then(() =>{
    const Port = process.env.PORT || 8000;
    app.listen(Port, () =>{
        console.log(`Server is running on port ${Port}`)
    })
})

.catch((error) =>{
    console.log(`Server connection failed ${error}`)
    process.exit(1);
})


