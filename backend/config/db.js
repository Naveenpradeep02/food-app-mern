import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.DATA_BASE)
    console.log('DataBase Connected');

}

export default connectDB;