import { Dispatch, SetStateAction } from "react";
import { Btn } from "src/components/atoms";
import styled from "styled-components";

interface TicketModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  nickname: string;
  ticketCount: number;
  date: string;
}
const TicketModal = ({
  isOpen,
  setIsOpen,
  title,
  nickname,
  ticketCount,
  date,
}: TicketModalProps) => {
  return (
    <>
      {isOpen && (
        <>
          <Background onClick={() => setIsOpen(false)} />
          <Container>
            <PFInfoWrap>
              <img
                alt="poster_url"
                className="poster_url"
                src={
                  "https://sinc-storage.s3.ap-northeast-2.amazonaws.com/%ED%95%9C%EC%97%AC%EB%A6%84+%EB%B0%A4%EC%9D%98+%EA%BF%88.png"
                }
              />
              <div className="info_title">
                <Stxt>공연명</Stxt>
                <Ltxt>{title}</Ltxt>
              </div>
              <div className="info_person">
                <div className="person_inner">
                  <Stxt>예약자명</Stxt>
                  <Ltxt>{nickname}</Ltxt>
                </div>
                <div className="person_inner">
                  <Stxt>예약 좌석 수</Stxt>
                  <Ltxt>{ticketCount}명</Ltxt>
                </div>
              </div>
              <div className="info_date">
                <Stxt>공연일시</Stxt>
                <Ltxt>{date}</Ltxt>
              </div>
            </PFInfoWrap>
            <DotLine />
            <BtnWrap>
              <p className="btn_desc">
                본인확인을 위해 담당자에게 위 화면을 보여주세요
              </p>
              <StyledBtn type="primary" onClick={() => setIsOpen(false)}>
                담당자 확인
              </StyledBtn>
            </BtnWrap>
          </Container>
        </>
      )}
    </>
  );
};

export default TicketModal;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: var(--gray_700);
  opacity: 0.6;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  left: 50%;
  top: 80px;
  z-index: 12;
  transform: translateX(-50%);
`;

const Stxt = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: var(--gray_200);
  margin: 0;
  margin-bottom: 6px;
`;

const Ltxt = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: var(--white);
  margin: 0;
  margin-bottom: 4px;
`;

const PFInfoWrap = styled.article`
  width: 320px;
  padding: 39px 24px 45px 24px;
  border-radius: 15px;
  background-color: var(--gray_1000);
  display: flex;
  flex-direction: column;
  align-items: center;

  .poster_url {
    width: 88px;
    height: 126px;
    border-radius: 4px;
    object-fit: cover;
    margin-bottom: 32px;
  }

  .info_title {
    width: 100%;
    padding: 0 2px 22px 2px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray_800);
  }

  .info_person {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2px 22px 2px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray_800);
    .person_inner {
      display: flex;
      flex-direction: column;
    }
  }

  .info_date {
    width: 100%;
  }
`;

const DotLine = styled.div`
  background-image: linear-gradient(
    to right,
    var(--white) 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 15px 2px;
  background-repeat: repeat-x;
  padding-bottom: 1px;
  width: 285px;
`;

const BtnWrap = styled.div`
  width: 320px;
  padding: 23px 20px 26px 20px;
  background-color: var(--gray_1000);
  border-radius: 15px;

  .btn_desc {
    margin: 0;
    font-size: 12px;
    line-height: 14px;
    color: var(--white);
    margin-bottom: 12px;
    text-align: center;
  }
`;

const StyledBtn = styled(Btn)`
  width: 100%;
  height: 44.8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
