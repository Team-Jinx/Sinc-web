import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Check from "src/components/templates/funding/check";
import states from "src/modules";

const SuccessPage = () => {
  const setPageNum = useSetRecoilState(states.PageNumState);
  const PFDetailData = useRecoilValue(states.PFDetailDataState);
  const ticketNum = useRecoilValue(states.TicketNumState);
  const additionalSup = useRecoilValue(states.AdditionalSupState);
  const selectDateTime = useRecoilValue(states.SelectDateTimeState);

  useEffect(() => {
    setPageNum(0);
  }, []);

  return (
    <Check
      PFDetailData={PFDetailData}
      ticketNum={ticketNum}
      additionalSup={additionalSup}
      selectedDate={selectDateTime.date}
      selectedTime={selectDateTime.time}
    />
  );
};

export default SuccessPage;
