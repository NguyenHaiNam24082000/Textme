const moongoose = require("moongoose");

const workspaceMemberSchema = new moongoose.Schema(
    {
        user: {
            type: moongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        guild: {
            type: moongoose.Schema.Types.ObjectId,
            ref: "Guild",
        },
        role: {
            type: [moongoose.Schema.Types.ObjectId],
            ref: "Role",
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    { timestamp: true }
);

