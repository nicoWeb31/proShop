import mongoose from 'mongoose';


export default async ()=>{

    const URI = process.env.MONGO_URI.replace('<password>', process.env.MONGODB_PASSWORD)

    try {
        const connection = await mongoose.connect(URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log(` Connection to mongoDb is established.... 🙂 !! : ${connection.connection.host}`.cyan.underline);

    } catch (error) {
        console.error(`Error : ${error.message}.red.underline.bold`);
        process.exit(1)
    }
}


