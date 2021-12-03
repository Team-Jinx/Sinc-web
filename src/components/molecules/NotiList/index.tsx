import styled from "styled-components";
import { NoticeDataProps } from "src/interfaces/StoryData";
import { useRouter } from "next/router";
import { forwardRef, RefObject, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import states from "src/modules";

interface NotiListProps {
  NotiDatas: NoticeDataProps[];
  pageIndex: number;
  setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}
const NotiList = ({ NotiDatas, pageIndex, setPageIndex }: NotiListProps) => {
  const [target, setTarget] = useState<HTMLElement>();

  useEffect(() => {
    // for infinite scroll
    const option = {
      // root: viewport.current,
      threshold: 0.5,
    };
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          // 쿠키 데이터 get하기
          setPageIndex(pageIndex + 1);
          console.log(pageIndex);
        }
      });
    };
    const io = new IntersectionObserver(handleIntersection, option);
    if (target) {
      io.observe(target);
    }
    return () => io && io.disconnect();
  }, [target]);

  return (
    <Container>
      {NotiDatas.map((nd, idx) => (
        <>
          {idx === NotiDatas.length - 1 ? (
            <Item
              isVideo={nd.videoUrl !== null}
              url={nd.videoUrl !== null ? nd.videoUrl : nd.imageUrl}
              isAd={nd.type === "NOTICE"}
              id={idx}
              ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
            />
          ) : (
            <Item
              isVideo={nd.videoUrl !== null}
              url={nd.videoUrl !== null ? nd.videoUrl : nd.imageUrl}
              isAd={nd.type === "NOTICE"}
              id={idx}
            />
          )}
        </>
      ))}
    </Container>
  );
};

export default NotiList;

const Container = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1px;
  row-gap: 1px;
  background-color: var(--gray_1000);
`;

interface ItemProps {
  isVideo: boolean;
  url: string;
  isAd: boolean;
  id: number;
}
const Item = forwardRef(
  (
    { isVideo, url, isAd, id }: ItemProps,
    ref?:
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null
      | undefined,
  ) => {
    const router = useRouter();
    const setNotiInx = useSetRecoilState(states.NoticeIdxState);
    return (
      <ItemWrap
        onClick={() => {
          setNotiInx(id);
          router.push(`/video/notice`);
        }}
        ref={ref}
      >
        {isAd && <span className="noti_tag">공지</span>}
        {isVideo ? (
          <video className="item" src={url} />
        ) : (
          <img alt="item" className="item" src={url} />
        )}
      </ItemWrap>
    );
  },
);

const ItemWrap = styled.div`
  width: 100%;
  height: 180px;

  .noti_tag {
    position: absolute;
    z-index: 2;
    transform: translate(7px, 7px);
    background: var(--gray_800);
    border-radius: 4px;
    padding: 1px 7px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: var(--white);
  }

  .item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
