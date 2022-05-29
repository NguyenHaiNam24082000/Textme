const httpStatus = require("http-status");
const ShortUniqueId = require("short-unique-id");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { removeAccents } = require("../commons/removeAccents");
// const {COLORS}=
const uid = new ShortUniqueId({
  length: 5,
  dictionary: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
});

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let error = {};
  (await User.isEmailTaken(userBody.email)) &&
    (error.email = "Email already taken");
  (await User.isUsernameTaken(userBody.username)) &&
    (error.username = "Username already taken");
  if (Object.keys(error).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, JSON.stringify(error));
  }

  userBody.discriminator = uid();
  // userBody.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const user = await User.create(userBody);
  return user;
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
//TODO: xxx
const queryUsers = async (user, filter) => {
  const { username, discriminator } = filter;
  console.log(username, discriminator);
  const users = await User.find({
    username: { $regex: `.*${removeAccents(username)}.*`, $options: "i" },
    ...(discriminator && { discriminator }),
  });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

const getAllUsers = async () => {
  return User.find();
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
