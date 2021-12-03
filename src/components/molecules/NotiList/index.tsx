import styled from "styled-components";
import { NoticeDataProps } from "src/interfaces/StoryData";
import { useEffect, useState } from "react";
import { Item } from "src/components/atoms";

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
