import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Btn } from "src/components/atoms";
import { FDInfoBox, PFInfoBox } from "src/components/molecules";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { CalDateInterval, ExtractPeriodAsStr } from "src/libs";
import styled, { css, keyframes } from "styled-components";

interface BottomSheetProps {
  PFDetailData: PFDetailDataProps;
  ticketCount: number;
  amount: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const BottomSheet = ({
  PFDetailData,
  ticketCount,
  amount,
  isOpen,
  setIsOpen,
}: BottomSheetProps) => {
  const router = useRouter();
  return (
    <>
      {isOpen && <Background onClick={() => setIsOpen(false)} />}
      <Container isOpen={isOpen}>
        <BarIcon />
        <StyledPFInfoBox
          type="detail"
          url={PFDetailData.posterUrl}
          univName={PFDetailData.artist.agency + PFDetailData.artist.name}
          title={PFDetailData.title}
          date={ExtractPeriodAsStr(PFDetailData.reservationTimes)}
          location={PFDetailData.place}
        />
        <StyledFDInfoBox
          soldTicket={ticketCount}
          leftTicket={PFDetailData.totalTicketCount - ticketCount}
          percent={(ticketCount / PFDetailData.totalTicketCount) * 100}
          leftPeriod={
            -CalDateInterval(
              PFDetailData.reservationTimes[
                PFDetailData.reservationTimes.length - 1
              ].toReserveAt,
            )
          }
          totalPrice={amount}
          likeNum={PFDetailData.cheerCount}
        />
        <StyledBtn
          type="gray"
          onClick={() => router.push(`/detail/${PFDetailData.id}`)}
        >
          자세히 보기
        </StyledBtn>
      </Container>
    </>
  );
};

export default BottomSheet;

const mobileFadeIn = keyframes`
  from {
    bottom: -500px
  }
  to {
    bottom: 54px;
  }
`;
const mobileFadeInRule = css(
  ["", " 0.1s linear"] as any as TemplateStringsArray,
  mobileFadeIn,
);

// const mobileFadeOut = keyframes`
//   from {
//     bottom: 54px;
//   }
//   to {
//     bottom: -500px
//   }
// `;
// const mobileFadeOutRule = css(
//   ["", " 0.1s linear"] as any as TemplateStringsArray,
//   mobileFadeOut,
// );

const Background = styled.div`
  position: absolute;
  left: 0px;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
`;

interface ContainerProps {
  isOpen: boolean;
}
const Container = styled.section<ContainerProps>`
  position: absolute;
  z-index: 4;
  left: 0px;
  width: 100%;
  padding: 12px 20px 27px 20px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_1000);
  ${({ isOpen }) =>
    isOpen
      ? css`
          bottom: 54px;
          animation: ${mobileFadeInRule};
        `
      : css`
          bottom: -500px;
          /* animation: ${mobileFadeOutRule}; */
        `};
`;

const BarIcon = styled.span`
  width: 55.5px;
  height: 3px;
  margin-bottom: 30px;
  border-radius: 2px;
  background-color: var(--gray_500);
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  padding-bottom: 33px;
  border-bottom: 1px solid var(--gray_800);
`;

const StyledFDInfoBox = styled(FDInfoBox)`
  margin-top: 21.5px;
  margin-bottom: 24.5px;
`;

const StyledBtn = styled(Btn)`
  width: 100%;
  height: 46px;
  border-radius: 4px;
  font-size: 15px;
  text-align: center;
  line-height: 46px;
`;
