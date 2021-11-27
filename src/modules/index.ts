import { atom } from "recoil";
import { PFDetailDataProps } from "src/interfaces/PFData";

const PFDetailDataState = atom<PFDetailDataProps>({
  key: "PFDetailData",
  default: {
    id: "",
    artist: {
      agency: "",
      name: "",
    },
    artistId: "",
    posterUrl: "",
    place: "",
    title: "",
    fundingStatus: "PROGRESS",
    reservationTimes: [],
    showTime: "",
    runningTime: 0,
    price: 0,
    description: "",
    totalTicketCount: 0,
    cheerCount: 0,
    ticketCount: 0,
  },
});

const states = {
  PFDetailDataState,
};

export default states;
