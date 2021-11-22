import { useRouter } from "next/router";
import { HandIcon, MainIcon } from "src/assets/icon/common";
import { TagImg } from "src/assets/img/video";
import { Icon } from "src/components/atoms";
import styled from "styled-components";

interface VideoProps {
  url: string;
  univName: string;
  title: string;
  date: string;
  desc?: string;
  posterUrl?: string;
  likeNum: string;
}
const Video = ({
  url,
  univName,
  title,
  date,
  desc,
  posterUrl,
  likeNum,
}: VideoProps) => {
  const router = useRouter();
  return (
    <Container tag={TagImg}>
      <MainIcon className="main_icon" />
      <VideoWrap controls>
        <source src={url} type="video/mp4" />
      </VideoWrap>
      <div className="tag">{univName}</div>
      <InfoWrap>
        <p className="info_txt_1">{date}</p>
        <p className="info_txt_2">{title}</p>
        <p className="info_txt_3">{desc}</p>
      </InfoWrap>
      <DetailBtn onClick={() => router.push("/detail")} url={posterUrl} />
      <LikeWrap>
        <HandIcon />
        {likeNum}
      </LikeWrap>
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
    width: 206px;
    height: 32px;
    background: url("${({ tag }) => tag}");
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
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
  bottom: 136px;
  left: 20px;
  width: 226px;
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
  }
  .info_txt_3 {
    font-size: 12px;
    line-height: 17px;
    color: var(--gray_200);
  }
`;

interface DetailBtnProps {
  url?: string;
}
const DetailBtn = styled(Icon)<DetailBtnProps>`
  position: absolute;
  z-index: 2;
  bottom: 205px;
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
  bottom: 136px;
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
