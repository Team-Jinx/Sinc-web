import { useState } from "react";
import { MypageImg, TicketModalImg } from "src/assets/img";
import { TabBar } from "src/components/molecules";
import PFNotiModal from "src/components/organisms/PFNotiModal";
import styled from "styled-components";

const Mypage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container>
        <img alt="mypage" className="mypage" src={MypageImg} />
        <PFNotiModal
          pfDate="12월 12일(일) 오후 10시"
          pfTitle="싱어송라이터 전공 정기공연 <울림>"
          setIsOpen={setIsOpen}
        />
        <TabBar />
      </Container>
      {isOpen && (
        <>
          <Background onClick={() => setIsOpen(false)} />
          <TicketModal
            src={TicketModalImg}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
        </>
      )}
    </>
  );
};

export default Mypage;

const Container = styled.div`
  width: 100%;
  .mypage {
    width: 100%;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: var(--gray_700);
  opacity: 0.6;
`;

interface ContainerProps {
  src: string;
}
const TicketModal = styled.dialog<ContainerProps>`
  all: unset;
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 80px;
  z-index: 10;
  transform: translateX(-50%);
  width: 320px;
  height: 569px;
  background: url(${({ src }) => src});
`;
