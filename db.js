import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://ptwotechnologies:Pqr6HAicdCnErKO4@cluster0.wijprju.mongodb.net/datacollection?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
export default connectDB;
