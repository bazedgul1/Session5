import mongoose from "mongoose";

const connectDB = async () =>{
try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("MongoDB Connected Successfully")
} catch (error) {
    console.log("Failed MongoDB Failed", error)
}
}

export default connectDB;