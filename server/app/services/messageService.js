const httpStatus = require("http-status");
const { removeAccents } = require("../commons/removeAccents");
const { FriendRequest, Channel, Message } = require("../models");
const sizeOf = require("image-size");
const urlParser = require("url");
const httpRequest = require("https");
const tunnel = require("tunnel");
const probe = require("probe-image-size");
const request = require("request");
const { canPlay } = require("../configs/patterns");
const translate = require("@vitalets/google-translate-api");
// const { translate } = require("free-translate");
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
const createMessage = async (user, body, data) => {
  const { channelId, content, embed } = body;
  const { channel, files } = data;
  console.log({
    user,
    channel,
    files,
  });
  let embedLink = await postLink(content);
  embedLink = [JSON.parse(embed), ...embedLink];
  const replies = body.replies
    ? (() => {
        if (typeof body.replies === "string") {
          return body.replies.split(",");
        }
        return body.replies;
      })()
    : [];

  // console.log("replies", replies);
  const attachments = files?.map((file) => file._id) || [];

  const message = await Message.create({
    ...body,
    channel: channelId,
    sender: user._id,
    embed: embedLink,
    replies: replies,
    files: files,
    attachments: attachments,
  });

  channel.lastMessage = message._id;
  await channel.save();

  return message.populate([
    "sender",
    "replies",
    "attachments",
    {
      path: "replies",
      populate: {
        path: "sender",
      },
    },
  ]);
  // {
  //   path: "replies",
  //   populate: {
  //     path: "sender",
  //     // select: "name avatar",
  //   },
  // }
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

  return result.populate([
    "sender",
    "replies",
    {
      path: "replies",
      populate: {
        path: "sender",
      },
    },
  ]);
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

  // message.messageDeletedBySender = true;
  // message.messageDeletedByReceiver = true;
  message.systemMessage = true;
  message.systemMessageType = "MESSAGE_DELETED";
  message.messageDeleted = true;

  await message.save();
  return message;
};

const translateMessage = async (user, messageId, language) => {
  const message = await Message.findOne({ _id: messageId });

  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, `there is no such a message!`);
  }

  let messageTranslated = message.content;
  // translate(message.content, { to: language })
  //   .then((response) => {
  //     messageTranslated = response.text;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // messageTranslated = await translate(message.content, { to: language });
  // messageTranslated = await translate("This is cool!", { to: language });
  messageTranslated = translate(message.content, { to: language })
    .then((res) => {
      return res.text;
    })
    .catch((err) => {
      console.error(err);
    });

  return messageTranslated;
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
      request.head(
        {
          url,
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Mozilla/5.0 (compatible; January/1.0; +https://gitlab.insrt.uk/revolt/january) Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
          },
        },
        function (err, res, body) {
          console.log(res.headers["content-type"]);
          if (!err) {
            resolve(res.headers["content-type"].match(/^image\//gim) !== null);

            //   console.log("content-type:", res.headers["content-type"]);
            // console.log("content-length:", res.headers["content-length"]);
          } else {
            resolve(false);
          }
        }
      );
    })
      .then((result) => result)
      .catch((err) => false);
    return await req.then((result) => result).catch((err) => false);
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
    const http = [...new Set(data.match(http_regex))];
    if (http) {
      console.log("http", http);
      // const result = await Promise.all(
      //   httpClone.map(async (url) =>
      //     (await isImageLink(url, 1000))
      //       ? {
      //           type: "image",
      //           url,
      //           ogImage: {
      //             url: url,
      //             width: undefined,
      //             height: undefined,
      //           },
      //         }
      //       : ogs(
      //           {
      //             url: url,
      //             onlyGetOpenGraphInfo: true,
      //             downloadLimit: 2000000,
      //             headers: {
      //               "user-agent":
      //                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Mozilla/5.0 (compatible; January/1.0; +https://gitlab.insrt.uk/revolt/january)",
      //             },
      //             // agent: {
      //             //   https: tunnel.httpsOverHttp({
      //             //     proxy: {
      //             //       host: '174.138.116.12',
      //             //       port: 80,
      //             //       rejectUnauthorized: false,
      //             //     }
      //             //   })
      //             // }
      //             // customMetaTags: [
      //             //   {
      //             //     multiple: false,
      //             //     property: "keywords",
      //             //     fieldName: "keywords",
      //             //   },
      //             // ],
      //           },
      //           (error, results, response) => {
      //             return {
      //               ...results,
      //               url,
      //             };
      //           }
      //         )
      //   )
      // ).then((results) => {
      //   // console.log("og", results);
      //   return results;
      // });
      // embedLink = await Promise.all(await result.map(async (og) => {
      //   let thumbnail_url = !Array.isArray(og.ogImage)
      //     ? og.ogImage?.url
      //     : og.ogImage[0]?.url;
      //   let thumbnail_size = null;
      //   let thumbnail_width = og.ogImage.width;
      //   let thumbnail_height = og.ogImage.height;
      //   let dimensions = {};
      //   if (
      //     isNaN(Number.parseFloat(convertType(og.ogImage.width))) &&
      //     isNaN(Number.parseFloat(convertType(og.ogImage.height)))
      //   ) {
      //     if (thumbnail_url && thumbnail_url.match(size_url)) {
      //       thumbnail_size = thumbnail_url.match(size_url)[0];
      //       thumbnail_width = Number.parseFloat(
      //         thumbnail_size.split("x")[0].replace("-", "").replace("_", "")
      //       );
      //       thumbnail_height = Number.parseFloat(thumbnail_size.split("x")[1]);
      //     }
      //     if (
      //       thumbnail_url &&
      //       (isNaN(Number.parseFloat(convertType(thumbnail_width))) ||
      //         isNaN(Number.parseFloat(convertType(thumbnail_height))))
      //     ) {
      //       const options = url.parse(thumbnail_url);
      //       req = new Promise((resolve, reject) => {
      //         const req = httpRequest.get(options, async function (response) {
      //           const chunks = [];
      //           // await response
      //           //   .on("data", function (chunk) {
      //           //     chunks.push(chunk);
      //           //   })
      //           //   .on("end", function () {
      //           //     const buffer = Buffer.concat(chunks);
      //           //     resolve(buffer);
      //           //   });
      //           for await (const chunk of response) {
      //             chunks.push(chunk);
      //             try {
      //               resolve(Buffer.concat(chunks));
      //             } catch (error) {
      //               reject(error);
      //             }
      //           }
      //         });
      //         req.on("error", (e) => {
      //           reject(e.message);
      //         });
      //         // send the request
      //         req.end();
      //       }).then((data) => {
      //         return sizeOf(data);
      //       });
      //       dimensions = await req.then((dimensions) => {
      //         return dimensions;
      //       });
      //       // dimensions = await probe(thumbnail_url, {
      //       //   rejectUnauthorized: false,
      //       // });
      //       console.log("dimensions", dimensions);
      //     } else {
      //       dimensions = {
      //         width: thumbnail_width,
      //         height: thumbnail_height,
      //       };
      //     }
      //   }
      //   const type =
      //     og?.type ??
      //     (embedType(og.url) === "link" && dimensions.width >= 400
      //       ? "article"
      //       : embedType(og.url));
      //   const thumbnail = {
      //     height: thumbnail_height ?? dimensions.height,
      //     width: thumbnail_width ?? dimensions.width,
      //   };
      //   console.log(og.url, thumbnail);
      //   return {
      //     title: og.ogTitle,
      //     description: og.ogDescription,
      //     url: og.url,
      //     image: og.ogImage,
      //     provider: {
      //       name: og.ogSiteName,
      //       url: og.ogSiteUrl,
      //     },
      //     thumbnail: {
      //       url: thumbnail_url,
      //       proxy_url: null,
      //       height: thumbnail.height,
      //       width: thumbnail.width,
      //     },
      //     media: og.ogVideo || (og.ogAudio ?? og.twitterPlayer),
      //     type: type,
      //   };
      // }));

      embedLink = await Promise.all(
        http.map(async (url) => {
          console.log("url", url);
          let og = new Promise(async function (resolve, reject) {
            console.log("url", await isImageLink(url, 1000));
            (await isImageLink(url, 1000))
              ? resolve({
                  type: "image",
                  url,
                  ogImage: {
                    url: url,
                    width: undefined,
                    height: undefined,
                  },
                })
              : ogs(
                  {
                    url: url,
                    onlyGetOpenGraphInfo: true,
                    downloadLimit: 2000000,
                    headers: {
                      "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Mozilla/5.0 (compatible; January/1.0; +https://gitlab.insrt.uk/revolt/january)",
                    },
                  },
                  (error, results, response) => {
                    console.log("og", error);
                    if (error) {
                      reject(error);
                    } else {
                      resolve({
                        ...results,
                        url,
                      });
                    }
                  }
                );
          })
            .then((results) => results)
            .catch((error) => console.log("error", error));
          og = await og
            .then((results) => results)
            .catch((error) => console.log(error));
          let thumbnail_url = !Array.isArray(og.ogImage)
            ? og.ogImage?.url
            : og.ogImage[0]?.url;
          let thumbnail_size = null;
          let thumbnail_width = og.ogImage?.width;
          let thumbnail_height = og.ogImage?.height;
          let dimensions = {};
          if (
            isNaN(Number.parseFloat(convertType(thumbnail_width))) &&
            isNaN(Number.parseFloat(convertType(thumbnail_height)))
          ) {
            if (thumbnail_url && thumbnail_url.match(size_url)) {
              thumbnail_size = thumbnail_url.match(size_url)[0];
              thumbnail_width = Number.parseFloat(
                thumbnail_size.split("x")[0].replace("-", "").replace("_", "")
              );
              thumbnail_height = Number.parseFloat(
                thumbnail_size.split("x")[1]
              );
            }
            if (
              thumbnail_url &&
              (isNaN(Number.parseFloat(convertType(thumbnail_width))) ||
                isNaN(Number.parseFloat(convertType(thumbnail_height))))
            ) {
              // const options = urlParser.parse(thumbnail_url);
              // req = new Promise((resolve, reject) => {
              //   const req = httpRequest.get(thumbnail_url, async function (response) {
              //     const chunks = [];
              //     // await response
              //     //   .on("data", function (chunk) {
              //     //     chunks.push(chunk);
              //     //   })
              //     //   .on("end", function () {
              //     //     const buffer = Buffer.concat(chunks);
              //     //     resolve(buffer);
              //     //   });
              //     for await (const chunk of response) {
              //       chunks.push(chunk);
              //       try {
              //         resolve(Buffer.concat(chunks));
              //       } catch (error) {
              //         reject(error);
              //       }
              //     }
              //   });
              //   req.on("error", (e) => {
              //     reject(e.message);
              //   });
              //   // send the request
              //   req.end();
              // }).then((data) => {
              //   return sizeOf(data);
              // });
              // dimensions = await req.then((dimensions) => {
              //   return dimensions;
              // });
              dimensions = await probe(thumbnail_url, {
                rejectUnauthorized: false,
              });
            } else {
              dimensions = {
                width: thumbnail_width,
                height: thumbnail_height,
              };
            }
          }
          const type =
            og?.type ??
            (embedType(og.url) === "link" &&
            Number.parseFloat(dimensions.width) >= 400
              ? "article"
              : embedType(og.url));
          const thumbnail = {
            height: thumbnail_height ?? dimensions.height,
            width: thumbnail_width ?? dimensions.width,
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
              url: thumbnail_url,
              proxy_url: null,
              height: thumbnail.height,
              width: thumbnail.width,
            },
            media: og.ogVideo || (og.ogAudio ?? og.twitterPlayer),
            type: type,
          };
        })
      )
        .then((results) => results)
        .catch((error) => console.log("error", error));
    }
  }
  return embedLink;
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
  translateMessage,
};
