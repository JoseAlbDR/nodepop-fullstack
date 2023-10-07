import bcrypt from 'bcryptjs';

/**
 * Hash a plaintext password using bcrypt.
 *
 * @param {string} password - The plaintext password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the generated salt
  return await bcrypt.hash(password, salt);
};
