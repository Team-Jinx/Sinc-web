import { ReservationTimeType } from "src/interfaces/types";

const ExtractPeriod = (dates: ReservationTimeType[]) => {
  const startD = new Date(dates[0].toReserveAt);
  const endD = new Date(dates[dates.length - 1].toReserveAt);

  return {
    minD: `${startD.getFullYear()}-${
      startD.getMonth() + 1
    }-${startD.getDate()}`,
    maxD: `${endD.getFullYear()}-${endD.getMonth() + 1}-${endD.getDate()}`,
  };
};

export default ExtractPeriod;
