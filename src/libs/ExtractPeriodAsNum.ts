import { ReservationTimeType } from "src/interfaces/types";

const ExtractPeriod = (dates: ReservationTimeType[]) => {
  const startD = new Date(dates[0].toReserveAt);
  const endD = new Date(dates[dates.length - 1].toReserveAt);

  let maxD_date;
  if (endD.getDate() > 9) {
    maxD_date = `${endD.getDate()}`;
  } else {
    maxD_date = `0${endD.getDate()}`;
  }

  return {
    minD: `${startD.getFullYear()}-${
      startD.getMonth() + 1
    }-${startD.getDate()}`,
    maxD: `${endD.getFullYear()}-${endD.getMonth() + 1}-${maxD_date}`,
  };
};

export default ExtractPeriod;
