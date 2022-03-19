import get from "lodash.get";

// export const isIncoming = (user, request,userIdPath) => {
//     return user?.user?.id === get(request, userIdPath);
// }

const PENDING_WAY = {
  INCOMING: "Incoming Friend Request",
  OUTGOING: "Outgoing Friend Request",
};

export const isIncoming = (user, request) => {
  return user?.user?.id === request.receiver.id;
};

export const pendingUsername = (user, request) => {
  if (isIncoming(user, request)) return request.sender.username;
  return request.receiver.username;
};

export const pendingStatus = (user, request) => {
  if (isIncoming(user, request)) return PENDING_WAY.INCOMING;
  return PENDING_WAY.OUTGOING;
};

export const pendingDiscriminator = (user, request) => {
  if (isIncoming(user, request)) return request.sender.discriminator;
  return request.receiver.discriminator;
};

export default function friendObject(
  user,
  request,
  userIdPath = "sender.id",
  userPath = "receiver",
  friendPath = "sender"
) {
  if (isIncoming(user, request, userIdPath)) return request?.[friendPath];
  return request?.[userPath];
}
