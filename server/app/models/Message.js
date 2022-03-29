const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content must be required"],
      trim: true,
    },
    systemMessage: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender must be required"],
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "Channel must be required"],
    },
    pinned:{
      type: Boolean,
      default: false,
    },
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    messagesEdited: [
      {
        content: {
          type: String,
          trim: true,
        },
        editedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    embed: {
      type: Array,
      default: [],
      items: {
        type: Object,
        properties: {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          url: {
            type: String,
          },
          imageURL: {
            type: String,
          },
        },
      },
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

messageSchema.virtual("User", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

messageSchema.virtual("Channel", {
  ref: "Channel",
  localField: "channel",
  foreignField: "_id",
  justOne: true,
});

// messageSchema.virtual("workspace", {
//     ref: "Workspace",
//     localField: "channel",
//     foreignField: "workspace",
//     justOne: true,
// });

// messageSchema.virtual("user_avatar", {
//     ref: "User",
//     localField: "user",
//     foreignField: "_id",
//     justOne: true,
//     populate: {
//         path: "avatar",
//         select: "url",
//     },
// });

// messageSchema.virtual("user_name", {
//     ref: "User",
//     localField: "user",
//     foreignField: "_id",
//     justOne: true,
//     populate: {
//         path: "name",
//         select: "name",
//     },
// });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
