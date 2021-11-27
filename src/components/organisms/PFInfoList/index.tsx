import { useRouter } from "next/router";
import { PFInfoBox } from "src/components/molecules";
import { PFInfoDataProps } from "src/interfaces/PFData";
import { ExtractPeriodAsStr } from "src/libs";
import styled from "styled-components";

interface PFInfoListProps {
  isLoading: boolean;
  data: PFInfoDataProps[];
}
const PFInfoList = ({ isLoading, data }: PFInfoListProps) => {
  const router = useRouter();

  return (
    <Container>
      <h1 className="pf_list_title">박수 많이 받은 공연</h1>
      {!isLoading &&
        data.map((d, idx) => (
          <StyledPFInfoBox
            handleClick={() => {
              console.log("hi");
              router.push(`/detail/${d.id}`);
            }}
            type="list"
            key={d.id}
            url={d.posterUrl}
            pfNum={idx + 1}
            univName={`${d.artist?.agency} ${d.artist?.name}`}
            title={d.title}
            date={ExtractPeriodAsStr(d.reservationTimes)}
            location={d.place}
          />
        ))}
    </Container>
  );
};

export default PFInfoList;

const Container = styled.section`
  width: 100%;
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    all: unset;
    box-sizing: border-box;
  }
  .pf_list_title {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 9px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: var(--white);
  }
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  padding: 15px 20px 18px 20px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;
