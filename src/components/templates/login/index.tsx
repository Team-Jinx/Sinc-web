import { KakaoImg, LogoImg } from "src/assets/img";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <img alt="logo" className="logo" src={LogoImg} />
      <a href={KAKAO_AUTH_URL}>
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
  }
`;

interface KakaoBtnProps {
  src: string;
}
const KakaoBtn = styled.div<KakaoBtnProps>`
  position: fixed;
  bottom: 122px;
  width: 320px;
  height: 58px;
  background: url(${({ src }) => src}) center center / cover;
`;
