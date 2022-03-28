const httpStatus = require("http-status");
const messageService = require("../../services/messageService");
const catchAsync = require("../../utils/catchAsync");

const sendMessage = catchAsync(async (req, res, next) => {
  const formData = JSON.parse(JSON.stringify(req.body));
  const message = await messageService.createMessage(req.user, formData);
  res.status(httpStatus.CREATED).send(message);
});

const getMessages = catchAsync(async (req, res, next) => {
  const { channelId } = req.params;
  // const { page, limit } = req.query;
  const { page } = req.query;
  const filter = { channelId };
  const options = {
    sortBy: "createdAt:desc",
    page,
    populate: "sender",
  };
  const messages = await messageService.queryMessages(
    filter,
    options,
    req.user
  );
  res.status(httpStatus.OK).send(messages);
});

const editMessage = catchAsync(async (req, res, next) => {
  const { message } = req.body;
  const { messageId } = req.params;

  const result = await messageService.editMessage(req.user, { message, messageId });
  res.status(httpStatus.CREATED).send(result);
});


module.exports = {
  sendMessage,
  getMessages,
  editMessage,
};
