import { useRouter } from "next/router";
import { MainIcon } from "src/assets/icon/common";
import { NotiIcon, SearchIcon } from "src/assets/icon/main";
import { CategoryImg, TodayArtist } from "src/assets/img";
import { Banner, PFInfoList, PopList } from "src/components/organisms";
import { PFInfoData } from "src/interfaces";
import styled from "styled-components";

interface MainProps {
  PFInfoDataList: PFInfoData[];
  PopDataList: string[];
}
const Main = ({ PFInfoDataList, PopDataList }: MainProps) => {
  return (
    <Conatainer>
      <MainIcon className="main_icon" />
      <SearchIcon className="search_icon" />
      <NotiIcon className="noti_icon" />
      <Banner url={TodayArtist} />
      <Category src={CategoryImg} />
      <PFInfoList data={PFInfoDataList} />
      <PopList data={PopDataList} />
    </Conatainer>
  );
};

export default Main;

const Conatainer = styled.div`
  width: 100%;
  padding-bottom: 100px;
  background-color: var(--black);

  display: flex;
  flex-direction: column;

  .main_icon {
    position: absolute;
    z-index: 2;
    top: 42px;
    left: 18px;
  }

  .search_icon {
    position: absolute;
    z-index: 2;
    top: 49px;
    right: 56px;
  }

  .noti_icon {
    position: absolute;
    z-index: 2;
    top: 46px;
    right: 17px;
  }
`;

const Category = styled.img`
  width: 100%;
`;
