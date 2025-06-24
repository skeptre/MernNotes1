import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB Connected');
	}
	catch (err) {
		console.error("Error connecting to mongodb", err)
		process.exit(1); //exit with failure
	}
}

export default connectDB;
