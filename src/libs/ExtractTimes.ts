import { ReservationTimeType } from "src/interfaces/types";

const ExtractTimes = (date: string, dates: ReservationTimeType[]) => {
  const initD = date.split("-");

  const times = dates.map((d) => {
    const nD = new Date(d.toReserveAt);
    return {
      month: nD.getMonth() + 1,
      date: nD.getDate(),
      time: nD.getHours(),
    };
  });

  let res = times.map((t, idx) => {
    if (t.month === Number(initD[1]) && t.date === Number(initD[2])) {
      return {
        id: dates[idx].id,
        time: String(t.time) + ":00",
      };
    }
  });
  res = res.filter((r) => r !== undefined);

  console.log(times);
  console.log(res);

  return res;
};

export default ExtractTimes;
