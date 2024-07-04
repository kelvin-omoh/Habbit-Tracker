import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connected...");
    } catch (error) {
        console.error(error);
    }
}

export default connectToDB;
