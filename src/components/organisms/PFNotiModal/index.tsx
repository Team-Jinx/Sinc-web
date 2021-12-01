import { Dispatch, SetStateAction } from "react";
import { ArrowRightCircleIcon } from "src/assets/icon/mypage";
import styled from "styled-components";

interface PFNotiModalProps {
  pfTitle: string;
  pfDate: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const PFNotiModal = ({ pfDate, pfTitle, setIsOpen }: PFNotiModalProps) => {
  return (
    <Container>
      <p className="modal_txt">관람 임박 공연</p>
      <p className="pf_info_title">{pfTitle}</p>
      <p className="modal_txt" style={{ marginBottom: "0" }}>
        {pfDate}
      </p>
      <button
        className="detail_btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        현장 접수하기&nbsp;
        <ArrowRightCircleIcon />
      </button>
    </Container>
  );
};

export default PFNotiModal;

const Container = styled.section`
  position: fixed;
  z-index: 2;
  bottom: 104px;
  left: 50%;
  transform: translateX(-50%);

  width: 320px;
  padding: 16px 17px 14px 17px;
  box-shadow: 0px 4px 20px var(--black);
  border-radius: 10px;
  background-color: var(--gray_900);
  display: flex;
  flex-direction: column;

  p {
    all: unset;
    box-sizing: border-box;
  }
  .modal_txt {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 17px;
    color: var(--gray_200);
  }
  .pf_info_title {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: var(--white);
  }
  .detail_btn {
    all: unset;
    width: 100%;
    position: relative;
    top: -4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: var(--primary);
  }
`;
