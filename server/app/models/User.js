const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../configs/roles");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name must be required"],
//       trim: true,
//     },
//     username: {
//       type: String,
//       required: [true, "Username must be required"],
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email must be required"],
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Password must be required"],
//       trim: true,
//       minlength: [8, "Password must be at least 8 characters"],
//     },
//     salt: {
//       type: String,
//     },
//     phoneNumber: {
//       type: String,
//       trim: true,
//     },
//     verified_phone: {
//       type: Boolean,
//       default: false,
//     },
//     verified_phone_at: {
//       type: Date,
//     },
//     birthday: {
//       type: Date,
//       trim: true,
//     },

//     nickname: {
//       type: String,
//       trim: true,
//     },
//     avatar: {
//       type: String,
//       default: "https://i.imgur.com/X2JhY8y.png",
//     },
//     bot: {
//       type: Boolean,
//     },
//     mfa_enabled: {
//       type: Boolean,
//       default: false,
//     },
//     banner: {
//       type: String,
//       default: "https://i.imgur.com/X2JhY8y.png",
//     },
//     accent_color: {
//       type: Number,
//       default: 0,
//     },
//     locale: {
//       type: String,
//       default: "en-US",
//     },
//     verified_email: {
//       type: Boolean,
//       default: false,
//     },
//     verified_email_at: {
//       type: Date,
//     },
//     discriminator: {
//       type: Number,
//     },
//     bio: {
//       type: String,
//       default: "",
//     },
//     timezone: {
//       type: String,
//       default: "UTC",
//     },
//     time_format: {
//       type: String,
//       default: "default",
//     },
//     off_days: {
//       type: Array,
//       default: [],
//     },
//   },
//   { timestamp: true }
// );

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    description: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      // select: false,
    },
    discriminator: {
      type: String,
      minLength: 5,
      maxLength: 5,
    },
    phone: {
      type: String,
      default: null,
      // required: ["number"],
    },
    accounts: {
      type: Array,
      items: {
        type: Object,
        properties: {
          provider: {
            type: String,
          },
          id: {
            type: String,
          },
          visible: {
            type: Boolean,
            default: false,
          },
        },
        required: ["provider", "id"],
      },
    },
    birthday: {
      type: String,
      format: "date-time",
      default: null,
    },
    // nickname: {
    //   type: String,
    //   default: null,
    // },
    avatar_url: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    accent_color: {
      type: Number,
      default: Math.floor(Math.random() * 16777215),
    },
    locale: {
      type: String,
      default: "en-US",
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    time_format: {
      type: Number,
      enum: [12, 24],
    },
    status: {
      type: Object,
      properties: {
        online: {
          type: Boolean,
          default: false,
        },
        last_online: {
          type: String,
          format: "date-time",
        },
        text: {
          type: String,
          default: null,
        },
        presence: {
          type: String,
          enum: ["online", "idle", "dnd", "offline"],
          default: "offline",
        },
        type: {
          type: String,
          enum: ["online", "idle", "dnd", "offline", "custom"],
          default: "offline",
        },
        emoji: {
          type: String,
          default: null,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns
 */
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.accent_color = Math.floor(Math.random() * 16777215);
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */

const User = mongoose.model("User", userSchema);

module.exports = User;
