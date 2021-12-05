import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { ArrowRight } from "src/assets/icon/common";
import { ProfileImg } from "src/assets/img";
import { Tag } from "src/components/atoms";
import { Header, TabBar } from "src/components/molecules";
import { TicketModal } from "src/components/organisms";
import PFNotiModal from "src/components/organisms/PFNotiModal";
import { UserTicketDataProps } from "src/interfaces/UserData";
import { ConvertDateStr } from "src/libs";
import styled from "styled-components";

interface MyPageProps {
  nickname: string;
  profileImg?: string;
  ticketData: UserTicketDataProps | null;
}
const Mypage = ({ nickname, profileImg, ticketData }: MyPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Container>
        <Header title="마이페이지" />
        <ProfileWrap>
          <img
            alt="profile_img"
            className="profile_img"
            src={profileImg}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
              (e.currentTarget.src = ProfileImg)
            }
          />
          <Tag text={nickname} type="my" />
        </ProfileWrap>
        <MenuWrap>
          <Menu>
            개인정보 <ArrowRight />
          </Menu>
          <Menu onClick={() => router.push("/mypage/cheered")}>
            응원 내역 <ArrowRight />
          </Menu>
          <Menu onClick={() => router.push("/mypage/funding")}>
            펀딩 내역 <ArrowRight />
          </Menu>
          <Menu>
            설정 <ArrowRight />
          </Menu>
          <Menu>
            고객문의 <ArrowRight />
          </Menu>
        </MenuWrap>
        {ticketData !== null && (
          <PFNotiModal
            pfDate={ConvertDateStr(
              new Date(ticketData.reservationTime.toReserveAt),
            )}
            pfTitle={ticketData.performance.title}
            setIsOpen={setIsOpen}
          />
        )}
        {ticketData !== null && (
          <TicketModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={ticketData.performance.title}
            nickname={nickname}
            ticketCount={ticketData.ticketCount}
            date={ConvertDateStr(
              new Date(ticketData.reservationTime.toReserveAt),
            )}
          />
        )}
        <TabBar />
      </Container>
    </>
  );
};

export default Mypage;

const Container = styled.div`
  width: 100%;
  padding-top: 73px;
`;

const ProfileWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  margin-bottom: 32px;

  .profile_img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 25px;
    margin-bottom: 14px;
  }
`;

const MenuWrap = styled.section`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 16px;
  line-height: 19px;
  color: var(--white);
`;
