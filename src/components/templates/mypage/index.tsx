import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowRight, MypageTag } from "src/assets/icon/common";
import { Header, TabBar } from "src/components/molecules";
import { TicketModal } from "src/components/organisms";
import PFNotiModal from "src/components/organisms/PFNotiModal";
import { UserTicketDataProps } from "src/interfaces/UserData";
import { ConvertDateStr } from "src/libs";
import styled from "styled-components";

interface MyPageProps {
  nickname: string;
  profileImg?: string;
  ticketData?: UserTicketDataProps;
}
const Mypage = ({ nickname, profileImg, ticketData }: MyPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Container>
        <Header title="마이페이지" />
        <ProfileWrap tag={MypageTag}>
          <img alt="profile_img" className="profile_img" src={profileImg} />
          <p className="tag">{nickname} 님</p>
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
        {ticketData !== undefined && (
          <PFNotiModal
            pfDate={ConvertDateStr(
              new Date(ticketData.reservationTime.toReserveAt),
            )}
            pfTitle={ticketData.performance.title}
            setIsOpen={setIsOpen}
          />
        )}
        {ticketData && (
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

interface ProfileWrapProps {
  tag: string;
}
const ProfileWrap = styled.section<ProfileWrapProps>`
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

  .tag {
    margin: 0;
    width: 130px;
    height: 40px;
    background-color: var(--gray_300);
    /* background: url("${({ tag }) => tag}") center center / cover; */
    font-weight: 600;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    color: var(--white);
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
