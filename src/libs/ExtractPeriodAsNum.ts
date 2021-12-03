import { ReservationTimeType } from "src/interfaces/types";

const ExtractPeriod = (dates: ReservationTimeType[]) => {
  const startD = new Date(dates[0].toReserveAt);
  const endD = new Date(dates[dates.length - 1].toReserveAt);

  let minD_date;
  if (startD.getDate() > 9) {
    minD_date = `${startD.getDate()}`;
  } else {
    minD_date = `0${startD.getDate()}`;
  }

  let minD_month;
  if (startD.getMonth() + 1 > 9) {
    minD_month = `${startD.getMonth() + 1}`;
  } else {
    minD_month = `0${startD.getMonth() + 1}`;
  }

  let maxD_date;
  if (endD.getDate() > 9) {
    maxD_date = `${endD.getDate()}`;
  } else {
    maxD_date = `0${endD.getDate()}`;
  }

  let maxD_month;
  if (endD.getMonth() + 1 > 9) {
    maxD_month = `${endD.getMonth() + 1}`;
  } else {
    maxD_month = `0${endD.getMonth() + 1}`;
  }

  return {
    minD: `${startD.getFullYear()}-${minD_month}-${minD_date}`,
    maxD: `${endD.getFullYear()}-${maxD_month}-${maxD_date}`,
  };
};

export default ExtractPeriod;
