import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log(
      `Connected to MONGO DB SuccessFully ${conn.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`Error in MONGO DB ${error}`.bgRed.white);
  }
};

export default connectDB;
