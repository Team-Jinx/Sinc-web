import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, Mypage } from "src/components/templates";
import states from "src/modules";
import useSWR from "swr";

const My = () => {
  const userData = useRecoilValue(states.UserDataState);

  const { data: TicketData } = useSWR(
    getQueries.getUserTicket(userData.id),
    fetcher,
  );

  return (
    <>
      {!TicketData ? (
        <Loading />
      ) : (
        <Mypage
          profileImg={userData.profileUrl}
          nickname={userData.nickname}
          ticketData={TicketData.findUserImminentTicket}
        />
      )}
    </>
  );
};

export default My;
