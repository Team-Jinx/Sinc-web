import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { Header } from "src/components/molecules";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import styled from "styled-components";

interface PopularProps {
  PopDatas: PopStoriesDataProps[];
  pageIndex: number;
  setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}
const Popular = ({ PopDatas, pageIndex, setPageIndex }: PopularProps) => {
  const router = useRouter();
  const viewport = useRef(null);
  const [target, setTarget] = useState<HTMLElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Header
        title="인기있는 소식"
        leftIcon={<ArrowLeftIcon onClick={() => router.back()} />}
      />
      <StoryListWrap>
        {PopDatas?.map((pd, idx) => (
          <>
            {idx === PopDatas.length - 1 ? (
              <Item
                key={pd.id}
                src={pd.videoUrl}
                onClick={() => router.push(`/video/${pd.id}`)}
                ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
              />
            ) : (
              <Item
                key={pd.id}
                src={pd.videoUrl}
                onClick={() => router.push(`/video/${pd.id}`)}
              />
            )}
          </>
        ))}
      </StoryListWrap>
    </Container>
  );
};

export default Popular;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-top: 73px;
`;

const StoryListWrap = styled.section`
  width: 100%;
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1px;
  row-gap: 1px;
  background-color: var(--gray_1000);
`;

const Item = styled.video`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;
