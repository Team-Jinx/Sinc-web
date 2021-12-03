import {
  FilterIcon,
  HandAtvIcon,
  HandIcon,
  MainIcon,
} from "src/assets/icon/common";
import { Icon, Tag } from "src/components/atoms";
import { StoryDataProps } from "src/interfaces/StoryData";
import { CalDateInterval } from "src/libs";
import { format } from "friendly-numbers";
import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "src/assets/icon/header";

interface VideoBoxProps {
  storyData: StoryDataProps;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsCategoryModelOpen: Dispatch<SetStateAction<boolean>>;
  isPlay: boolean;
  type?: "story" | "notice";
  title?: string;
  artist?: string;
}
const VideoBox = ({
  storyData,
  handleClickLike,
  setIsCategoryModelOpen,
  setIsOpen,
  isPlay,
  type = "story",
  title = "",
  artist = "",
}: VideoBoxProps) => {
  const video = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      isPlay ? video.current?.play() : video.current?.pause();
    }, 100);
  }, [isPlay, video]);

  return (
    <Container onClick={() => setIsOpen(true)} type={type}>
      {type === "story" && (
        <>
          <MainIcon className="main_icon" />
          <FilterIcon
            className="filter_icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsCategoryModelOpen(true);
            }}
          />
        </>
      )}
      {type === "notice" && (
        <Header>
          <ArrowLeftIcon onClick={() => router.back()} />
          새소식
        </Header>
      )}
      {storyData.videoUrl !== null && (
        <VideoWrap
          src={storyData.videoUrl + "#t=0.5"}
          preload="metadata"
          loop
          playsInline
          controlsList="nodownload"
          ref={video}
        />
      )}
      {storyData.imageUrl !== null && (
        <ImgWrap url={storyData.imageUrl || ""} />
      )}
      <StyledTag
        text={
          storyData.performance
            ? storyData.performance.artist?.agency +
              " " +
              storyData.performance.artist?.name
            : artist
        }
        type="video"
      />
      <InfoWrap type={type}>
        <p className="info_txt_1">{CalDateInterval(storyData.createdAt)}일전</p>
        <p className="info_txt_2">
          {storyData.performance ? storyData.performance.title : title}
        </p>
        <p className="info_txt_3">{storyData.description}</p>
      </InfoWrap>
      {type === "story" && (
        <DetailBtn
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/detail/${storyData.performanceId}`);
          }}
          url={storyData.performance.posterUrl}
        />
      )}
      <LikeWrap Type={type}>
        {storyData.usersCheeredPerformances.length !== 0 ? (
          <HandAtvIcon
            onClick={(e) => {
              e.stopPropagation();
              handleClickLike(
                true,
                storyData.performanceId,
                storyData.id,
                storyData.usersCheeredPerformances[0].id,
              );
            }}
            role="button"
          />
        ) : (
          <HandIcon
            onClick={(e) => {
              e.stopPropagation();
              handleClickLike(false, storyData.performanceId, storyData.id);
            }}
            role="button"
          />
        )}
        {format(storyData.cheerCount)}
      </LikeWrap>
    </Container>
  );
};

export default VideoBox;

interface ContainerProps {
  type: "story" | "notice";
}
const Container = styled.section<ContainerProps>`
  width: 100%;
  height: 100vh;
  padding-bottom: ${({ type }) => (type === "story" ? "54px" : "0")};

  .main_icon {
    position: absolute;
    z-index: 2;
    top: 42px;
    left: 18px;
  }

  .filter_icon {
    position: absolute;
    z-index: 4;
    top: 36px;
    right: 11px;
  }
`;

const Header = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-items: flex-end;
  justify-items: center;
  font-weight: 500;
  font-size: 15.36px;
  line-height: 130%;
  color: var(--white);
`;

const StyledTag = styled(Tag)`
  position: absolute;
  z-index: 2;
  top: 108px;
`;

const VideoWrap = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface ImgWrapProps {
  url: string;
}
const ImgWrap = styled.div<ImgWrapProps>`
  width: 100%;
  height: 100%;
  background: url("${({ url }) => url}") center center / cover;
`;

interface InfoWrapProps {
  type: "story" | "notice";
}
const InfoWrap = styled.div<InfoWrapProps>`
  position: absolute;
  z-index: 2;
  bottom: ${({ type }) => (type === "story" ? "96px" : "42px")};
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
  bottom: 165px;
  right: 20px;
  width: 43px;
  height: 43px;
  border: 1px solid var(--white);
  border-radius: 10px;
  background: url("${({ url }) => url}") center center / cover;
`;

interface LikeWrapProps {
  Type: "story" | "notice";
}
const LikeWrap = styled(Icon)<LikeWrapProps>`
  position: absolute;
  z-index: 2;
  bottom: ${({ Type }) => (Type === "story" ? "96px" : "42px")};
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
