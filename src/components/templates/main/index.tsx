import { useRouter } from "next/router";
import { MainIcon } from "src/assets/icon/common";
import { NotiIcon, SearchIcon } from "src/assets/icon/main";
import { ArtistReviewBox, Category, TabBar } from "src/components/molecules";
import { Banner, PopList } from "src/components/organisms";
import { ArtistDataProps } from "src/interfaces/ArtistData";
import { HotPFDataPRops } from "src/interfaces/PFData";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import { CategoryType } from "src/interfaces/types";
import styled from "styled-components";

interface MainProps {
  BannerData: HotPFDataPRops[];
  ArtistData: ArtistDataProps[];
  PopDataList: PopStoriesDataProps[];
  setCategory: (e: CategoryType) => void;
}
const Main = ({
  BannerData,
  ArtistData,
  PopDataList,
  setCategory,
}: MainProps) => {
  const router = useRouter();

  return (
    <Conatainer>
      <MainIcon className="main_icon" />
      <SearchIcon
        className="search_icon"
        onClick={() => router.push("/search")}
      />
      <NotiIcon className="noti_icon" />
      <Banner data={BannerData} />
      <Category setCategory={(e: CategoryType) => setCategory(e)} />
      <ReviewWrap>
        <h1 className="pf_list_title">최신 리뷰</h1>
        <ArtistReviewBox
          artistData={ArtistData[0]}
          rate={4}
          comment={
            "너무 재밌게 잘봤습니다.돈이 아깝지 않고, 오히려 좋은 공연을 너무 저렴하게 본거 같아 로또 맞은 기분이였습니다."
          }
        />
        <ArtistReviewBox
          artistData={ArtistData[1]}
          rate={5}
          comment={
            "이번 공연은  어려운 내용을 관람하는 사람에게 가볍게 전달한 점이 좋았습니다.\n다들 너무 멋지셨어요~"
          }
        />
      </ReviewWrap>
      <PopList data={PopDataList} />
      <TabBar />
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

const ReviewWrap = styled.section`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 36px;

  .pf_list_title {
    width: 100%;
    margin: 0;
    margin-bottom: 16.6px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: var(--white);
  }
`;
