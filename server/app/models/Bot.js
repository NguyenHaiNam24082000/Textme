const moongoose = require("mongoose");

const botSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: "https://i.imgur.com/X2JhY8y.png",
  },
});
