const admin = require("firebase-admin");
const httpStatus = require("http-status");
const { Channel, User } = require("../models");
const Attachment = require("../models/Attachment");
const serviceAccount = require("./serviceAccountKey.json");
const urlParser = require("url");
const BUCKET = "textme-chat.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadFile = async (req, res, next) => {
  // console.log(req.files);
  const user = req.user;
  const { channelId } = req.body;
  const attachments = JSON.parse(req.body.attachments);
  const channel = await Channel.findOne({
    $or: [{ owner: user._id }, { members: user._id }],
    _id: channelId,
  });

  if (!channel) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `there is no room between you and your friend!`
    );
  }
  if (!req.files) {
    req.data = {
      files: undefined,
      channel: channel,
    };
    return next();
  }
  const files = req.files;
  console.log(files, attachments);
  const results = await Promise.all(
    files.map(async (file, index) => {
      return new Promise(async (resolve, reject) => {
        console.log(attachments[index]);
        const attachment = await Attachment.create({
          filename: attachments[index].filename,
          size: attachments[index].size,
          contentType: attachments[index].type,
          nsfw: attachments[index].nsfw,
          // user: req.user._id,
          // channel: channelId,
        });
        const fileUrl = `${channelId}/${attachment._id}/${attachment.filename}`;
        //   const fileName = file.originalname;
        const fileUpload = bucket.file(fileUrl);
        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: attachment.type,
          },
        });
        stream.on("error", (err) => {
          console.log(err);
          reject(err);
          // req.file.cloudStorageError = err;
        });
        stream.on("finish", async () => {
          await fileUpload.makePublic();
          const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(
            fileUrl
          )}?alt=media`;
          attachment.url = url;
          await attachment.save();
          resolve(attachment);
        });
        stream.end(file.buffer);
      }).then((attachment) => attachment);
    })
  );
  req.files = {
    files: results,
    channel: channel,
  };
  // throw new ApiError(
  //   httpStatus.NOT_FOUND,
  //   `there is no room between you and your friend!`
  // );
  next();
};

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const uploadAvatar = async (req, res, next) => {
  const user = req.user;
  if (!req.files) {
    return next();
  }
  const filename = req.body.filename;
  const avatar = req.files[0];
  console.log(filename, "filename");
  const fileUrl = `${user._id}/${generateUUID()}/${filename}`;
  console.log(fileUrl, "fileUrl");
  const fileUpload = bucket.file(fileUrl);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: avatar.type,
    },
  });
  stream.on("error", (err) => {
    console.log(err);
    // req.file.cloudStorageError = err;
  });
  stream.on("finish", async () => {
    await fileUpload.makePublic();
    const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(
      fileUrl
    )}?alt=media`;
    user.avatar_url = url;
    await user.save();
    next();
  });
  stream.end(avatar.buffer);
};

module.exports = { uploadFile, uploadAvatar };
