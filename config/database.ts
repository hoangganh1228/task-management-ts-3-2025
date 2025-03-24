import mongoose from "mongoose"

export const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect Success!");
    
  } catch (error) {
    console.log("Connect Eror:");
    console.log("Connect Error:", error.message);
    console.log(process.env.MONGO_URL);
  }
}