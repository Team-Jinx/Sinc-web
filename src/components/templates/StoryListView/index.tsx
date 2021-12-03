import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { Header } from "src/components/molecules";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import styled from "styled-components";

interface StoryListViewProps {
  title: string;
  handleClickBack: () => void;
  storyData: PopStoriesDataProps[];
  pageIndex: number;
  setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}
const StoryListView = ({
  title,
  handleClickBack,
  storyData,
  pageIndex,
  setPageIndex,
}: StoryListViewProps) => {
  const router = useRouter();

  const [target, setTarget] = useState<HTMLElement>();
  const [isLoading, setIsLoding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // for infinite scroll
    const option = {
      // root: viewport.current,
      // rootMargin: "20px 0px",
      threshold: 0.5,
    };
    const handleIntersection = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && !isLoading) {
          observer.unobserve(entry.target);
          // 쿠키 데이터 get하기
          setIsLoding(true);
          setPageIndex(pageIndex + 1);
          setIsLoding(false);
          console.log(pageIndex);
          observer.observe(entry.target);
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
        title={title}
        leftIcon={<ArrowLeftIcon onClick={handleClickBack} />}
      />
      <StoryListWrap>
        {storyData.map((sd, idx) => (
          <>
            {idx === storyData.length - 1 ? (
              <Item
                src={sd.videoUrl}
                onClick={() => router.push(`/video/${sd.id}`)}
                // ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
              />
            ) : (
              <Item
                src={sd.videoUrl}
                onClick={() => router.push(`/video/${sd.id}`)}
              />
            )}
          </>
        ))}
        <div ref={(e: HTMLElement | null) => e !== null && setTarget(e)}>
          {isLoading && <div style={{ width: "100px", height: "100px" }} />}
        </div>
      </StoryListWrap>
    </Container>
  );
};

export default StoryListView;

const Container = styled.div`
  width: 100%;
  padding-top: 103px;
  background-color: var(--gray_1000);
`;

const StoryListWrap = styled.section`
  width: 100%;
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
