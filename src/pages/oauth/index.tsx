import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import fetcher, { loginByKakao, setGraphQLClient } from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading } from "src/components/templates";
import states from "src/modules";

interface OAuthProps {
  kakaoCode: string;
}
const OAuth = ({ kakaoCode }: OAuthProps) => {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(states.UserDataState);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const res = await loginByKakao(kakaoCode);
        await setGraphQLClient(res.accessToken);
        const { checkJwt } = await fetcher(getQueries.getUserData());
        setUserData(checkJwt);

        router.replace("/");
      } catch (e) {
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
  // ctx.res.setHeader("access-token", res.accessToken);

  return { kakaoCode };
};
