const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const attachmentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    //   required: [true, "Filename must be required"],
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "User must be required"],
    // },
    description: {
      type: String,
      trim: true,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    contentType: {
      type: String,
    //   required: [true, "Content type must be required"],
    },
    size: {
      type: Number,
    //   required: [true, "Size must be required"],
    },
    url: {
      type: String,
    //   required: [true, "Url must be required"],
    },
    proxy_url: {
      type: String,
      default: null,
      // required: [true, "Proxy url must be required"],
    },
    width: {
      type: Number,
      // required: [true, "Width must be required"],
    },
    height: {
      type: Number,
      // required: [true, "Height must be required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

attachmentSchema.plugin(toJSON);
attachmentSchema.plugin(paginate);

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
