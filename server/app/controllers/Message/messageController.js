const httpStatus = require("http-status");
const messageService = require("../../services/messageService");
const catchAsync = require("../../utils/catchAsync");

const sendMessage = catchAsync(async (req, res, next) => {
  const formData = JSON.parse(JSON.stringify(req.body));
  const message = await messageService.createMessage(
    req.user,
    formData,
    req.files
  );
  res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;
  // const { page, limit } = req.query;
  const { page, limit, nearBy, before, after } = req.query;
  const filter = { channel: channelId };
  const options = {
    sortBy: "createdAt:desc",
    page,
    populate: "sender,replies,replies.sender,attachments",
    limit,
    nearBy,
    before,
    after,
  };
  const messages = await messageService.queryMessages(
    filter,
    options,
    req.user
  );
  res.status(httpStatus.OK).send(messages);
});

const searchMessages = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;
  const { page, limit, sort_by, sort_order, content } = req.query;
  const filter = { channel: channelId, content };
  const options = {
    // sortBy: "createdAt:desc",
    sort_by,
    sort_order,
    page,
    populate: "sender,replies,replies.sender,attachments",
    limit,
  };
  const messages = await messageService.searchMessages(
    filter,
    options,
    req.user
  );
  res.status(httpStatus.OK).send(messages);
});

const editMessage = catchAsync(async (req, res, next) => {
  const { message } = req.body;
  const { messageId } = req.params;
  console.log(message, messageId);

  const result = await messageService.editMessage(req.user, {
    message,
    messageId,
  });
  res.status(httpStatus.CREATED).send(result);
});

const postLink = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const result = await messageService.postLink(content);
  res.status(httpStatus.CREATED).send(result);
});

const deleteMessage = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const result = await messageService.deleteMessage(req.user, messageId);
  res.status(httpStatus.OK).send(result);
});

const translateMessage = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;
  const result = await messageService.translateMessage(
    req.user,
    messageId,
    "vi"
  );
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  sendMessage,
  getMessages,
  editMessage,
  searchMessages,
  postLink,
  deleteMessage,
  translateMessage,
};
