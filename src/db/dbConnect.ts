import mongoose from 'mongoose';

/**
 * Connect to the MongoDB database.
 *
 * @param {string} url - The URL of the MongoDB database.
 * @throws {Error} If an error occurs during the connection attempt.
 */
export const dbConnect = async (url: string) => {
  try {
    // Attempt to connect to the MongoDB database using the provided URL
    await mongoose.connect(url);
    console.log('Connected to db Nodepop.');
  } catch (error) {
    // If an error occurs during the connection attempt, log the error and re-throw it
    console.log(error);
    throw error;
  }
};
