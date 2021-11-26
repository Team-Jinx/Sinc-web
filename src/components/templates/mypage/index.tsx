import { useState } from "react";
import { MypageImg, TicketModalImg } from "src/assets/img";
import PFNotiModal from "src/components/organisms/PFNotiModal";
import styled from "styled-components";

const Mypage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container>
        <img alt="mypage" className="mypage" src={MypageImg} />
        <PFNotiModal
          pfDate="9월 19일(목) 오후 6시"
          pfTitle="제24회 정기공연 뮤지컬 <경성광인>"
          setIsOpen={setIsOpen}
        />
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
  top: 47px;
  z-index: 10;
  transform: translateX(-50%);
  width: 320px;
  height: 569px;
  background: url(${({ src }) => src});
`;
