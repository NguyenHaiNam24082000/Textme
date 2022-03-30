import moment from "moment";

export function getTimeDifference(date1, date2) {
  return moment(date1).diff(moment(date2), "minutes");
}

export function getTime(date) {
  return moment(date).format("LT");
}

export function chatDividerFormat(date) {
  return moment(date).format("MMMM D, YYYY");
}

export function isNewDay(date1, date2) {
  return !moment(date1).isSame(moment(date2), "day");
}

export function chatMainTime(date) {
  const beforeDate = moment(date);
  const now = moment();
  const diff = parseInt(moment.duration(now.diff(beforeDate)).asDays());
  if (diff === 0) {
    return moment(date).calendar();
  } else if (diff === 1) {
    return moment(date).subtract(1, "days").calendar();
  }
  return moment(date).format("L");
}

export function isSameTime(date1, date2) {
  return moment(date1).isSame(moment(date2));
}

export function getMoreDetailsTime(date) {
  const localLocale = moment(date);
  localLocale.locale("fr");
  return localLocale.format("LLLL");
}
