import { useRouter } from "next/router";
import { Btn } from "src/components/atoms";
import { FDInfoBox, Header, PFInfoBox } from "src/components/molecules";
import styled from "styled-components";

interface PFInfoDataProps {
  url?: string;
  univName: string;
  title: string;
  date: string;
  location?: string;
}

interface FDInfoDataProps {
  soldTicket: number;
  leftTicket: number;
  percent: number;
  leftPeriod: number;
  totalPrice: number;
  likeNum: number;
}
interface DetailProps {
  PFInfoData: PFInfoDataProps;
  FDInfoData: FDInfoDataProps;
}
const Detail = ({ PFInfoData, FDInfoData }: DetailProps) => {
  const router = useRouter();
  return (
    <Container>
      <Header title="공연 상세" onClick={() => router.back()} />
      <StyledPFInfoBox
        type="detail"
        url={PFInfoData.url}
        univName={PFInfoData.univName}
        title={PFInfoData.title}
        date={PFInfoData.date}
        location={PFInfoData.location}
      />
      <FDWrap>
        <FDInfoBox
          soldTicket={FDInfoData.soldTicket}
          leftTicket={FDInfoData.leftTicket}
          percent={FDInfoData.percent}
          leftPeriod={FDInfoData.leftPeriod}
          totalPrice={FDInfoData.totalPrice}
          likeNum={FDInfoData.likeNum}
        />
      </FDWrap>
      <QnABtn type="empty" onClick={() => "question"}>
        문의하기
      </QnABtn>
      <Bottom type="primary" onClick={() => router.push("/funding")}>
        펀딩하기
      </Bottom>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 73px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  margin-top: 23px;
  margin-bottom: 56px;
`;

const FDWrap = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1f1f1f;
`;

const QnABtn = styled(Btn)`
  width: 320px;
  height: 40px;
  border: 1px solid var(--white);
  border-radius: 4px;
  font-size: 14px;
  line-height: 17px;
  color: #f7f7f7;
`;

const Bottom = styled(Btn)`
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  color: var(--gray_1000);
`;
