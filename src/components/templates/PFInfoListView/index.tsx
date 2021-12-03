import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { Header, PFInfoBox } from "src/components/molecules";
import { PFInfoDataProps } from "src/interfaces/PFData";
import { ConvertDateStr, ExtractPeriodAsStr } from "src/libs";
import styled from "styled-components";

interface PFInfoListViewProps {
  title: string;
  handleClickBack: () => void;
  pfData: PFInfoDataProps[];
  pageIndex: number;
  setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}
const PFInfoListView = ({
  title,
  handleClickBack,
  pfData,
  pageIndex,
  setPageIndex,
}: PFInfoListViewProps) => {
  const router = useRouter();

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
        title={title}
        leftIcon={<ArrowLeftIcon onClick={handleClickBack} />}
      />
      <PFListWrap>
        {pfData.map((p, idx) => {
          return (
            <>
              {idx === pfData.length - 1 ? (
                <div
                  ref={(e: HTMLElement | null) => e !== null && setTarget(e)}
                >
                  <StyledPFInfoBox
                    key={p.id}
                    type="detail"
                    url={p.posterUrl}
                    univName={
                      p.artist
                        ? p.artist.agency + " " + p.artist.name
                        : "결제일시: " + ConvertDateStr(new Date(p.createdAt))
                    }
                    title={p.title}
                    date={ExtractPeriodAsStr(p.reservationTimes)}
                    location={p.place}
                    handleClick={() => router.push(`/detail/${p.id}`)}
                  />
                </div>
              ) : (
                <StyledPFInfoBox
                  key={p.id}
                  type="detail"
                  url={p.posterUrl}
                  univName={
                    p.artist
                      ? p.artist.agency + " " + p.artist.name
                      : "결제일시: " + ConvertDateStr(new Date(p.createdAt))
                  }
                  title={p.title}
                  date={ExtractPeriodAsStr(p.reservationTimes)}
                  location={p.place}
                  handleClick={() => router.push(`/detail/${p.id}`)}
                />
              )}
            </>
          );
        })}
      </PFListWrap>
    </Container>
  );
};

export default PFInfoListView;

const Container = styled.div`
  width: 100%;
  padding-top: 103px;
  background-color: var(--gray_1000);
`;

const PFListWrap = styled.section`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  padding: 0 0;
  margin-bottom: 36px;
`;
