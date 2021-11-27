import { ReservationTimeType } from "src/interfaces/types";
import { CalDay } from ".";

const ExtractPeriod = (dates: ReservationTimeType[]) => {
  // const startD = new Date(dates[0].toReserveAt);
  // const endD = new Date(dates[dates.length - 1].toReserveAt);
  const startD = new Date(
    dates && dates.length !== 0 ? dates[0].toReserveAt : "",
  );
  const endD = new Date(
    dates && dates.length !== 0 ? dates[dates.length - 1].toReserveAt : "",
  );

  return `${startD.getMonth() + 1}월 ${startD.getDate()}일(${CalDay(
    startD.getDay(),
  )}) ~ ${endD.getMonth() + 1}월 ${endD.getDate()}일(${CalDay(endD.getDay())})`;
};

export default ExtractPeriod;
