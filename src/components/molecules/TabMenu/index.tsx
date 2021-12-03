import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";

interface TabMenuProps {
  menu: "desc" | "noti";
  setMenu: Dispatch<SetStateAction<"desc" | "noti">>;
}
const TabMenu = ({ menu, setMenu }: TabMenuProps) => {
  return (
    <Container>
      <TabBtn isAtv={menu === "desc"} onClick={() => setMenu("desc")}>
        공연설명
      </TabBtn>
      <TabBtn isAtv={menu === "noti"} onClick={() => setMenu("noti")}>
        새소식
      </TabBtn>
    </Container>
  );
};

export default TabMenu;

const Container = styled.menu`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--gray_600);
  margin: 0;
  margin-bottom: 6.8px;
  padding: 0;
`;

interface TabBtnProps {
  isAtv: boolean;
}
const TabBtn = styled.button<TabBtnProps>`
  all: unset;
  box-sizing: border-box;
  padding: 12px 11px;
  position: relative;
  bottom: -1px;
  font-size: 14px;
  line-height: 17px;
  color: var(--white);

  transition: 0.2s;
  ${({ isAtv }) =>
    isAtv &&
    css`
      border-bottom: 2px solid var(--white);
      font-weight: 700;
      padding-bottom: 10px;
    `}
`;
