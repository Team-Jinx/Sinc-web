import { useRecoilValue } from "recoil";
import { Mypage } from "src/components/templates";
import states from "src/modules";

const My = () => {
  const userData = useRecoilValue(states.UserDataState);

  return (
    <Mypage profileImg={userData.profileUrl} nickname={userData.nickname} />
  );
};

export default My;
