const httpStatus = require("http-status");
const { removeAccents } = require("../commons/removeAccents");
const { FriendRequest, Channel, Message } = require("../models");
const sizeOf = require("image-size");
const url = require("url");
const httpRequest = require("https");
const tunnel = require("tunnel");
const request = require("request");
const { canPlay } = require("../configs/patterns");
// const { FRIEND_STATUS } = require("../configs/friendStatus");
const ApiError = require("../utils/ApiError");
const ogs = require("open-graph-scraper");

const http_regex =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_,\+.~#?&\/=]*)/gm;
const size_url = /(?:[-_]?[0-9]+x[0-9]+)+/g;

function friendId(user, object) {
  if (user._id.toString() === object.sender.toString()) return object.receiver;

  return object.sender;
}

/**
 * Create a message between a user and a friend
 * @param {Object} user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createMessage = async (user, body) => {
  const { channelId, content } = body;

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
  let embedLink = await postLink(content);

  // const friendShip = await FriendRequest.findOne({
  //   $or: [
  //     { from: user._id, to: friendId(user, room) },
  //     { to: user._id, from: friendId(user, room) },
  //   ],
  //   status: FRIEND_STATUS.FRIEND,
  // });

  // if (!friendShip) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     `you and your friend do not have friendship!`
  //   );
  // }

  const message = await Message.create({
    ...body,
    channel: channelId,
    sender: user._id,
    embed: embedLink,
  });

  channel.lastMessage = message._id;
  await channel.save();

  return message.populate("sender");
};

/**
 * Query for Message
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMessages = async (filter, options, user) => {
  const filterClone = { ...filter };
  const channel = await Channel.findOne({
    $or: [{ owner: user._id }, { members: user._id }],

    _id: filter.channel,
  });

  if (!channel) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `there is no channel between you and your friend!`
    );
  }

  // if (user._id.toString() === room.sender.toString()) {
  //   filterClone.messageDeletedBySender = false;
  // } else {
  //   filterClone.messageDeletedByReceiver = false;
  // }

  const messages = await Message.paginate(filterClone, options);
  return messages;
};

const searchMessages = async (filter, options, user) => {
  const sortBy = `createdAt:${options.sort_order}`;
  const optionsClone = {
    sortBy,
    limit: options.limit,
    page: options.page,
    limit: options.limit,
  };
  if (options.sort_by.toLowerCase() === "relevance") {
    const content = removeAccents(filter.content);
    filter.content = { $regex: `.*${content}.*` };
  } else {
    filter.content = { $regex: `.*${filter.content}.*` };
  }
  const filterClone = { ...filter };
  const channel = await Channel.findOne({
    $or: [{ owner: user._id }, { members: user._id }],

    _id: filter.channel,
  });

  if (!channel) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `there is no channel between you and your friend!`
    );
  }

  // if (user._id.toString() === room.sender.toString()) {
  //   filterClone.messageDeletedBySender = false;
  // } else {
  //   filterClone.messageDeletedByReceiver = false;
  // }

  const messages = await Message.paginate(filterClone, optionsClone);
  return messages;
};

/**
 * edit a message
 * @param {Object} user
 * @param {Object} data
 * @returns {Promise<User>}
 */
const editMessage = async (user, data) => {
  const { messageId, message } = data;

  const oldMessage = await Message.findOne({
    _id: messageId,
    sender: user._id,
  });

  const result = await Message.findOneAndUpdate(
    { _id: messageId, sender: user._id },
    {
      content: message,
      messagesEdited: [
        ...oldMessage.messagesEdited,
        {
          content: oldMessage.content,
        },
      ],
    },
    { upsert: true, new: true }
  );

  return result;
};

/**
 * delete a message
 * @param {ObjectId} messageId
 * @returns {Promise<User>}
 */
const deleteMessage = async (user, messageId) => {
  const message = await Message.findOne({ _id: messageId, senderId: user._id });

  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a message!`);
  }

  // activate below lines only when give sender ability to choose delete mode!

  // const room = await Room.findById(message.roomId);

  // if (user._id.toString() === room.sender.toString()) {
  //   message.messageDeletedBySender = true;
  //   if (user._id.toString() === message.senderId.toString()) {
  //     message.messageDeletedByReceiver = true;
  //   }
  // } else {
  //   message.messageDeletedByReceiver = true;

  //   if (user._id.toString() === message.senderId.toString()) {
  //     message.messageDeletedBySender = true;
  //   }
  // }

  message.messageDeletedBySender = true;
  message.messageDeletedByReceiver = true;

  await message.save();
  return message;
};

const isImageLink = async (url, timeoutT) => {
  if (typeof url !== "string") return false;
  if (
    url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    // return url.match(/^http[^\?]*|[image]|.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
    null
  )
    return true;
  else {
    const req = new Promise(function (resolve, reject) {
      request.head(url, function (err, res, body) {
        if (!err) {
          resolve(res.headers["content-type"].match(/^image\//gim) !== null);

          //   console.log("content-type:", res.headers["content-type"]);
          // console.log("content-length:", res.headers["content-length"]);
        } else {
          resolve(false);
        }
      });
    }).then((result) => result);
    return await req.then((result) => result);
  }
};

const embedType = (url) => {
  let type = "link";
  if (
    canPlay.youtube(url) ||
    canPlay.facebook(url) ||
    canPlay.vimeo(url) ||
    canPlay.twitch(url) ||
    canPlay.streamable(url) ||
    canPlay.wistia(url) ||
    canPlay.dailymotion(url) ||
    canPlay.vidyard(url) ||
    canPlay.kaltura(url) ||
    canPlay.soundcloud(url) ||
    canPlay.mixcloud(url)
  ) {
    type = "media";
  }
  return type;
};

const postLink = async function (data) {
  let embedLink = [];
  if (data !== undefined) {
    const http = data.match(http_regex);
    if (http) {
      console.log(await isImageLink(http[0]));
      const result = await Promise.all(
        http.map(async (url) =>
          (await isImageLink(url, 1000))
            ? {
                type: "image",
                url,
                ogImage: {
                  url: url,
                  width: undefined,
                  height: undefined,
                },
              }
            : ogs(
                {
                  url: url,
                  onlyGetOpenGraphInfo: true,
                  downloadLimit: 2000000,
                  headers: {
                    "user-agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Mozilla/5.0 (compatible; January/1.0; +https://gitlab.insrt.uk/revolt/january)",
                  },
                  // agent: {
                  //   https: tunnel.httpsOverHttp({
                  //     proxy: {
                  //       host: '174.138.116.12',
                  //       port: 80,
                  //       rejectUnauthorized: false,
                  //     }
                  //   })
                  // }
                  // customMetaTags: [
                  //   {
                  //     multiple: false,
                  //     property: "keywords",
                  //     fieldName: "keywords",
                  //   },
                  // ],
                },
                (error, results, response) => {
                  return {
                    ...results,
                    url,
                  };
                }
              )
        )
      ).then((results) => {
        console.log("og", results);
        return results;
      });
      embedLink = await result.map(async (og) => {
        let thumbnail_url = null;
        let thumbnail_size = null;
        let thumbnail_width = null;
        let thumbnail_height = null;
        let dimensions = {};
        if (!Array.isArray(og.ogImage)) {
          thumbnail_url = og.ogImage?.url;
        } else {
          thumbnail_url = og.ogImage[0]?.url;
        }
        if (thumbnail_url && thumbnail_url.match(size_url)) {
          thumbnail_size = thumbnail_url.match(size_url)[0];
          thumbnail_width = Number.parseFloat(
            thumbnail_size.split("x")[0].replace("-", "").replace("_", "")
          );
          thumbnail_height = Number.parseFloat(thumbnail_size.split("x")[1]);
        }
        if (thumbnail_url && (!thumbnail_width || !thumbnail_height)) {
          const options = url.parse(thumbnail_url);
          req = new Promise((resolve, reject) => {
            const req = httpRequest.get(options, async function (response) {
              const chunks = [];
              await response
                .on("data", function (chunk) {
                  chunks.push(chunk);
                })
                .on("end", function () {
                  const buffer = Buffer.concat(chunks);
                  resolve(buffer);
                });
            });
            req.on("error", (e) => {
              reject(e.message);
            });
            // send the request
            req.end();
          }).then((data) => {
            return sizeOf(data);
          });
          dimensions = await req.then((dimensions) => {
            return dimensions;
          });
        } else {
          dimensions = {
            width: thumbnail_width,
            height: thumbnail_height,
          };
        }
        const type =
          og?.type ??
          (embedType(og.url) === "link" && dimensions.width >= 400
            ? "article"
            : embedType(og.url));
        const thumbnail = {
          height: isNaN(
            convertType(
              !Array.isArray(og.ogImage)
                ? og.ogImage?.height
                : og.ogImage[0]?.height
            )
          )
            ? dimensions.height
            : !Array.isArray(og.ogImage)
            ? og.ogImage?.height
            : og.ogImage[0]?.height,
          width: isNaN(
            convertType(
              !Array.isArray(og.ogImage)
                ? og.ogImage?.width
                : og.ogImage[0]?.width
            )
          )
            ? dimensions.width
            : !Array.isArray(og.ogImage)
            ? og.ogImage?.width
            : og.ogImage[0]?.width,
        };
        return {
          title: og.ogTitle,
          description: og.ogDescription,
          url: og.url,
          image: og.ogImage,
          provider: {
            name: og.ogSiteName,
            url: og.ogSiteUrl,
          },
          thumbnail: {
            url: !Array.isArray(og.ogImage)
              ? og.ogImage?.url
              : og.ogImage[0]?.url,
            proxy_url: null,
            height: thumbnail.height,
            width: thumbnail.width,
          },
          media: og.ogVideo || (og.ogAudio ?? og.twitterPlayer),
          type: type,
        };
      });
    }
  }
  return await Promise.all(embedLink);
};

const convertType = (value) => {
  var values = { undefined: undefined, null: null, true: true, false: false },
    isNumber = !isNaN(+value);
  return (isNumber && +value) || (!(value in values) && value) || values[value];
};

module.exports = {
  createMessage,
  queryMessages,
  editMessage,
  deleteMessage,
  searchMessages,
  postLink,
};
