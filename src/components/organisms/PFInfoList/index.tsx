import { PFInfoBox } from "src/components/molecules";
import { PFInfoData } from "src/interfaces";
import styled from "styled-components";

interface PFInfoListProps {
  data: PFInfoData[];
}
const PFInfoList = ({ data }: PFInfoListProps) => {
  return (
    <Container>
      <h1 className="pf_list_title">박수 많이 받은 공연</h1>
      {data.map((d) => (
        <StyledPFInfoBox
          type="list"
          key={d.pfNum}
          url={d.url}
          pfNum={d.pfNum}
          univName={d.univName}
          title={d.title}
          date={d.date}
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
  }
  .pf_list_title {
    width: 320px;
    margin-bottom: 9px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: var(--white);
  }
`;

interface PFInfoBoxProps {
  id?: string;
}
const StyledPFInfoBox = styled(PFInfoBox)<PFInfoBoxProps>`
  padding: 15px 0 18px 0;
  margin-bottom: 8px;
  box-sizing: border-box;
`;
