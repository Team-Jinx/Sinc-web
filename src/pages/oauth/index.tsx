import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import fetcher, { getAccessToken, setGraphQLClient } from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading } from "src/components/templates";
import states from "src/modules";

interface OAuthProps {
  kakaoCode: string;
}
const OAuth = ({ kakaoCode }: OAuthProps) => {
  const router = useRouter();
  const setUserData = useSetRecoilState(states.UserDataState);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        // 로그인 성공
        const res = await getAccessToken(kakaoCode);
        await setGraphQLClient(res);
        const { checkJwt } = await fetcher(getQueries.getUserData());
        setUserData(checkJwt);

        router.replace("/");
      } catch (e) {
        // 로그인 실패
        router.replace("/login");
      }
    };

    handleLogin();
  }, []);

  return <Loading />;
};

export default OAuth;

OAuth.getInitialProps = async (ctx: any) => {
  const kakaoCode = ctx.query.code;
  return { kakaoCode };
};
