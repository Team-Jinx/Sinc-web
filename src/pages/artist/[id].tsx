import { Artist } from "src/components/templates";

const ArtistPage = () => {
  return <Artist artistData={mock_art} NotiDatas={[]} />;
};

export default ArtistPage;

// mock data
const mock_art = {
  agency: "서울예술대 실용음악과",
  id: "hihi",
  name: "동아리명",
  profileUrl:
    "https://sinc-storage.s3.ap-northeast-2.amazonaws.com/Rectangle+1095.svg",
  performances: [],
};
