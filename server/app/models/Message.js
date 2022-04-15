const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      // required: [true, "Content must be required"],
      trim: true,
    },
    systemMessage: {
      type: Boolean,
      default: false,
    },
    systemMessageType: {
      type: String,
      enum: [
        "JOIN",
        "LEAVE",
        "MEMBER_ADD",
        "MEMBER_REMOVE",
        "CALL",
        "CHANNEL_UNPINNED_MESSAGE",
        "CHANNEL_PINNED_MESSAGE",
        "CHANNEL_NAME_CHANGE",
        "GUILD_MEMBER_JOIN",
        "THREAD_CREATED",
        "MESSAGE_DELETED",
      ],
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
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],
    pinned: {
      type: Boolean,
      default: false,
    },
    messageReference: {
      channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
      message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    },
    call: {
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      ended_timestamp: {
        type: Date,
      },
    },
    mention_everyone: {
      type: Boolean,
      default: false,
    },
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
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
        _id: mongoose.Schema.Types.ObjectId,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: {
          type: Object,
          property: {
            name: {
              type: String,
            },
            id: {
              type: String,
            },
            skin: {
              type: Number,
            },
          },
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
          type: {
            type: String,
            enum: ["image", "gifv", "media", "link", "rich", "article","map"],
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
          colors: [
            {
              type: Number,
            },
          ],
          footer: {
            type: Object,
            properties: {
              text: {
                type: String,
              },
              icon_url: {
                type: String,
              },
              proxy_icon_url: {
                type: String,
              },
            },
          },
          map: {
            type: Object,
            properties: {
              latitude: { type: Number },
              longitude: { type: Number },
              zoom: { type: Number },
            },
          },
          image: {
            type: Object,
            properties: {
              url: {
                type: String,
              },
              proxy_url: {
                type: String,
              },
              height: {
                type: Number,
              },
              width: {
                type: Number,
              },
            },
          },
          thumbnail: {
            type: Object,
            properties: {
              url: {
                type: String,
              },
              proxy_url: {
                type: String,
              },
              height: {
                type: Number,
              },
              width: {
                type: Number,
              },
            },
          },
          media: {
            type: Object,
            properties: {
              url: {
                type: String,
              },
              proxy_url: {
                type: String,
              },
              height: {
                type: Number,
              },
              width: {
                type: Number,
              },
            },
          },
          provider: {
            type: Object,
            properties: {
              name: {
                type: String,
              },
              url: {
                type: String,
              },
            },
          },
          author: {
            type: Object,
            properties: {
              name: {
                type: String,
              },
              url: {
                type: String,
              },
              icon_url: {
                type: String,
              },
              proxy_icon_url: {
                type: String,
              },
            },
          },
          fields: {
            type: Array,
            items: {
              type: Object,
              properties: {
                name: {
                  type: String,
                },
                value: {
                  type: String,
                },
                inline: {
                  type: Boolean,
                },
              },
            },
          },
        },
      },
    },
    messageDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
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
