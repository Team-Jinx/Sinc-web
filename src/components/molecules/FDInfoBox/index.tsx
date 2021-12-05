import { HandIcon } from "src/assets/icon/common";
import { useWindowSize } from "src/hooks";
import styled from "styled-components";

interface FDInfoBoxProps {
  id?: string;
  className?: string;
  soldTicket: number;
  leftTicket: number;
  percent: number;
  leftPeriod: number;
  totalPrice: number;
  likeNum: number;
}
const FDInfoBox = ({
  id,
  className,
  soldTicket,
  leftTicket,
  percent,
  leftPeriod,
  totalPrice,
  likeNum,
}: FDInfoBoxProps) => {
  const size = useWindowSize();
  return (
    <Conatainer id={id} className={className}>
      <TxtWrap>
        <p className="white_txt">
          <b>{soldTicket.toLocaleString()}장</b> 판매
        </p>
        <p>
          남은 티켓 수{" "}
          <b style={{ fontWeight: 600 }}>{leftTicket.toLocaleString()}장</b>
        </p>
      </TxtWrap>
      <TxtWrap>
        <p className="white_txt">
          <span style={{ fontSize: "18px", color: "var(--primary)" }}>
            {percent.toFixed(0)}%
          </span>{" "}
          달성
        </p>
        <p>
          남은 펀딩 기간 <b style={{ fontWeight: 600 }}>{leftPeriod}일</b>
        </p>
      </TxtWrap>
      <Bar percent={percent} width={size.width || 320}>
        <div className="inner_bar" />
      </Bar>
      <TxtWrap>
        <p className="white_txt">모인 금액</p>
        <p className="white_txt" style={{ fontSize: "16px" }}>
          <b style={{ fontWeight: 600 }}>{totalPrice.toLocaleString()}</b> 원
        </p>
      </TxtWrap>
      <TxtWrap>
        <HandIcon className="hand_icon" />
        <p className="white_txt">{likeNum.toLocaleString()} 개</p>
      </TxtWrap>
    </Conatainer>
  );
};

export default FDInfoBox;

const Conatainer = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const TxtWrap = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--gray_200);

  p {
    all: unset;
  }
  .white_txt {
    color: var(--white);
  }
  .hand_icon {
    width: 21px;
    height: 21px;
  }
`;

interface BarProps {
  percent: number;
  width: number;
}
const Bar = styled.div<BarProps>`
  height: 8px;
  width: 100%;
  background: var(--gray_600);
  border-radius: 2px;
  margin-bottom: 11px;

  .inner_bar {
    position: relative;
    z-index: 2;
    height: 8px;
    width: ${({ percent, width }) => (percent * (width - 40)) / 100}px;
    background: var(--primary);
    border-radius: ${({ percent }) =>
      percent === 100 ? "2px" : "2px 0px 0px 2px"};
  }
`;
