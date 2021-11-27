import { CalDay } from ".";

const ConvertDateStr = (date: Date) => {
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일(${CalDay(date.getDay())}) `;
};

export default ConvertDateStr;
