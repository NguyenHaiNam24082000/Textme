const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must be required"],
            trim: true,
        },
        color: {
            type: String,
            default: "#000000",
        },
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
        },
        position: {
            type: Number,
            min: [0, "Position must be greater than 0"],
            required: [true, "Position must be required"],
        },
        permissions: {
            type: [Number],
            default: [],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    { timestamp: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;