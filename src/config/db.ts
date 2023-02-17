import mongoose from "mongoose";

export const connectToDB = async () => {
  const DB_URL: string | undefined = process.env.DB_URL;

  if (!DB_URL) {
    throw new Error("No Database Settings set");
  }

  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    throw new Error("Could not connect to database");
  }
};
