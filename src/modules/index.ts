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
    reservationTimes: [],
    showTime: "",
    runningTime: 0,
    price: 0,
    description: "",
  },
});

const states = {
  PFDetailDataState,
};

export default states;
