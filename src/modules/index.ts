import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { CategoryType } from "src/interfaces/types";
import { UserDataProps } from "src/interfaces/UserData";

const { persistAtom } = recoilPersist();

const PFDetailDataState = atom<PFDetailDataProps>({
  key: "PFDetailData",
  default: {
    id: "",
    artist: {
      agency: "",
      id: "",
      name: "",
      profileUrl: "",
      _count: {
        performances: 0,
      },
    },
    artistId: "",
    posterUrl: "",
    place: "",
    title: "",
    amount: 0,
    fundingStatus: "PROGRESS",
    reservationTimes: [],
    toEndAt: 0,
    showTime: "",
    runningTime: 0,
    price: 0,
    description: "",
    totalTicketCount: 0,
    cheerCount: 0,
    ticketCount: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

const PageNumState = atom<number>({
  key: "PageNumState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

const TicketNumState = atom<number>({
  key: "TicketNumState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

const AdditionalSupState = atom<number | undefined>({
  key: "AdditionalSupState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

const SelectDateTimeState = atom<{
  id: string;
  date: string;
  time: string;
}>({
  key: "SelectDateTime",
  default: {
    id: "",
    date: "",
    time: "",
  },
  effects_UNSTABLE: [persistAtom],
});

const UserDataState = atom<UserDataProps>({
  key: "UserDataState",
  default: {
    id: "",
    nickname: "",
    role: "",
  },
  effects_UNSTABLE: [persistAtom],
});

const IsFirstWrapState = atom<boolean>({
  key: "IsFirstWrapState",
  default: true,
});

const states = {
  PFDetailDataState,
  PageNumState,
  TicketNumState,
  AdditionalSupState,
  SelectDateTimeState,
  UserDataState,
  IsFirstWrapState,
};

export default states;
