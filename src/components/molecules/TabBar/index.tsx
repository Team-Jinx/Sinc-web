import { useRouter } from "next/router";
import { Home, Tv, User } from "src/assets/icon/tabbar";
import { Icon } from "src/components/atoms";
import styled, { css } from "styled-components";

const TabBar = () => {
  const router = useRouter();

  return (
    <Conatainer>
      <StyledIcon
        path={router.pathname}
        style={{
          color: router.pathname === "/" ? "var(--primary)" : "var(--white)",
        }}
        onClick={() => router.push("/")}
      >
        <Home className="home" />홈
      </StyledIcon>
      <StyledIcon
        path={router.pathname.includes("/video") ? "/video" : ""}
        style={{
          color: router.pathname.includes("/video")
            ? "var(--primary)"
            : "var(--white)",
        }}
        onClick={() => router.push("/video")}
      >
        <Tv className="video" />
        비디오
      </StyledIcon>
      <StyledIcon
        path={router.pathname}
        style={{
          color:
            router.pathname === "/mypage" ? "var(--primary)" : "var(--white)",
        }}
        onClick={() => router.push("/mypage")}
      >
        <User className="mypage" />
        마이
      </StyledIcon>
    </Conatainer>
  );
};

export default TabBar;

const Conatainer = styled.div`
  width: 100%;
  height: 75px;
  padding-top: 5px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: var(--black);

  display: flex;
  flex-direction: row;
`;

interface IconProps {
  path: string;
}
const StyledIcon = styled(Icon)<IconProps>`
  width: 33.33%;
  height: 54px;
  display: flex;
  flex: column;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  font-size: 10px;
  line-height: 12px;
  color: var(--white);

  transition: 0.3s;
  .home {
    ${({ path }) =>
      path === "/" &&
      css`
        path {
          stroke: var(--primary);
        }
      `}
  }

  .video {
    ${({ path }) =>
      path === "/video" &&
      css`
        path {
          stroke: var(--primary);
        }
      `}
  }

  .mypage {
    ${({ path }) =>
      path === "/mypage" &&
      css`
        path {
          stroke: var(--primary);
        }
      `}
  }
`;
