
import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://zuhairk7890o:2p5g8sdu6O5DdOjj@cluster0.2aj5kpy.mongodb.net/"


const connectDB = async () => {
    try { await mongoose.connect(MONGO_URI); console.log('MongoDB connected'); }
    catch (error) { console.error('Database connection failed', error); process.exit(1); }
};
export default connectDB;


