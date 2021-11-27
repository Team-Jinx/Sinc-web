import { useRouter } from "next/router";
import { HandIcon, MainIcon } from "src/assets/icon/common";
import { TagImg } from "src/assets/img/video";
import { Icon } from "src/components/atoms";
import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { CalDateInterval } from "src/libs";
import { format } from "friendly-numbers";
import styled from "styled-components";

interface VideoProps {
  storyData: StoryDataProps;
  handleClickLike: (
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
}
const Video = ({ storyData, handleClickLike }: VideoProps) => {
  const router = useRouter();
  const url =
    "https://v16m.tiktokcdn.com/a9fab9833f838c38ef6bbbc0266fa0ad/619c3020/video/tos/alisg/tos-alisg-pve-0037/b0f2d2e0b5d342a8ad23d1dc86a43154/?a=1180&br=4178&bt=2089&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZmOpFBrkag3-I&l=20211122180438010244075048207F2A6C&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amV0bjQ6ZjVvODMzODgzNEApOzUzNmU1ODxnNzk8aWY3ZWcwc3FucjRfMmhgLS1kLy1zczBjLjEvYF4xYy5iXmEyLTE6Yw%3D%3D&vl=&vr=";
  return (
    <Container tag={TagImg}>
      <MainIcon className="main_icon" />
      <VideoWrap controls>
        <source src={url} type="video/mp4" />
      </VideoWrap>
      <div className="tag">
        {storyData.performance.artist?.agency +
          storyData.performance.artist?.name}
      </div>
      <InfoWrap>
        <p className="info_txt_1">{CalDateInterval(storyData.createdAt)}일전</p>
        <p className="info_txt_2">{storyData.performance.title}</p>
        <p className="info_txt_3">{storyData.description}</p>
      </InfoWrap>
      <DetailBtn
        onClick={() => router.push(`/detail/${storyData.performanceId}`)}
        url={storyData.performance.posterUrl}
      />
      <LikeWrap>
        <HandIcon
          onClick={() => handleClickLike(storyData.performanceId, storyData.id)}
          role="button"
        />
        {format(storyData.cheerCount)}
      </LikeWrap>
      <TabBar />
    </Container>
  );
};

export default Video;

interface ContainerProps {
  tag: string;
}
const Container = styled.section<ContainerProps>`
  .main_icon {
    position: absolute;
    z-index: 2;
    top: 42px;
    left: 18px;
  }

  .tag {
    position: absolute;
    z-index: 2;
    top: 108px;
    left: 0px;
    width: 220px;
    height: 52px;
    padding-left: 20px;
    background: url("${({ tag }) => tag}") center center / cover;
    font-weight: 600;
    font-size: 14px;
    line-height: 42px;
    color: var(--white);
  }
`;

const VideoWrap = styled.video`
  width: 100%;
  height: 100vh;
  padding-bottom: 54px;
`;

const InfoWrap = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 146px;
  left: 20px;
  width: 236px;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    all: unset;
  }
  .info_txt_1 {
    font-size: 10px;
    line-height: 14px;
    color: var(--gray_200);
  }
  .info_txt_2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--white);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
  .info_txt_3 {
    font-size: 12px;
    line-height: 17px;
    color: var(--gray_200);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;

interface DetailBtnProps {
  url?: string;
}
const DetailBtn = styled(Icon)<DetailBtnProps>`
  position: absolute;
  z-index: 2;
  bottom: 215px;
  right: 20px;
  width: 43px;
  height: 43px;
  border: 1px solid var(--white);
  border-radius: 10px;
  background: url("${({ url }) => url}") center center / cover;
`;

const LikeWrap = styled(Icon)`
  position: absolute;
  z-index: 2;
  bottom: 146px;
  right: 22px;
  width: 36px;
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  color: var(--white);
`;
