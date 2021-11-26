import { MainIcon } from "src/assets/icon/common";
import { NotiIcon, SearchIcon } from "src/assets/icon/main";
import { Category } from "src/components/molecules";
import { Banner, PFInfoList, PopList } from "src/components/organisms";
import { PFInfoDataProps } from "src/interfaces/PFData";
import { CategoryType } from "src/interfaces/types";
import styled from "styled-components";

interface MainProps {
  isLoading: boolean;
  BannerData: string[];
  PFInfoDataList: PFInfoDataProps[];
  PopDataList: string[];
  setCategory: (e: CategoryType) => void;
}
const Main = ({
  isLoading,
  BannerData,
  PFInfoDataList,
  PopDataList,
  setCategory,
}: MainProps) => {
  return (
    <Conatainer>
      <MainIcon className="main_icon" />
      <SearchIcon className="search_icon" />
      <NotiIcon className="noti_icon" />
      <Banner urls={BannerData} />
      <Category setCategory={(e: CategoryType) => setCategory(e)} />
      <PFInfoList isLoading={isLoading} data={PFInfoDataList} />
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
