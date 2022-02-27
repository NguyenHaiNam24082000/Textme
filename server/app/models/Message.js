const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content must be required"],
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    { timestamp: true }
);

messageSchema.virtual("user", {
    ref: "User",
    localField: "user",
    foreignField: "_id",
    justOne: true,
});

messageSchema.virtual("channel", {
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
