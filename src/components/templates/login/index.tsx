import { KakaoImg, LogoImg } from "src/assets/img";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <img alt="logo" className="logo" src={LogoImg} />
      <a className="kakao_login_btn" href={KAKAO_AUTH_URL}>
        <KakaoBtn src={KakaoImg} />
      </a>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  background-color: var(--gray_1000);
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    position: fixed;
    top: 212px;
  }

  .kakao_login_btn {
    position: fixed;
    bottom: 122px;
    width: 100%;
    padding: 0 20px;
  }
`;

interface KakaoBtnProps {
  src: string;
}
const KakaoBtn = styled.img<KakaoBtnProps>`
  width: 100%;
`;
