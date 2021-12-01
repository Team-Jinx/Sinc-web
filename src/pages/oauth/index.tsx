import { useEffect } from "react";
import { Loading } from "src/components/templates";

interface OAuthProps {
  kakaoCode: string;
  handleLogin: () => Promise<void>;
}
const OAuth = ({ kakaoCode, handleLogin }: OAuthProps) => {
  useEffect(() => {
    console.log(kakaoCode);
  }, []);

  return <Loading />;
};

export default OAuth;

OAuth.getInitialProps = async (ctx: any) => {
  const kakaoCode = ctx.query.code;

  return { kakaoCode };
};
