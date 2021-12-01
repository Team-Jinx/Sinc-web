import { useState } from "react";
import { TabMenu } from "src/components/molecules";
import NotiList from "src/components/molecules/NotiList";
import { NotiDataProps } from "src/interfaces/PFData";
import styled from "styled-components";

interface DetailTabProps {
  showTime: string;
  posterUrl?: string;
  description?: string;
  NotiDatas: NotiDataProps[];
}
const DetailTab = ({
  showTime,
  posterUrl,
  description,
  NotiDatas,
}: DetailTabProps) => {
  const [menu, setMenu] = useState<"desc" | "noti">("desc");

  return (
    <Container>
      <TabMenu menu={menu} setMenu={setMenu} />
      {menu === "desc" ? (
        <DescWrap>
          <p className="pf_time_title">
            <b>공연시간</b>
          </p>
          <p className="pf_time">{showTime}</p>
          <img className="poster_img" alt="poster_img" src={posterUrl} />
          <p className="pf_desc">{description}</p>
        </DescWrap>
      ) : (
        <NotiList NotiDatas={NotiDatas} />
      )}
    </Container>
  );
};

export default DetailTab;

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DescWrap = styled.section`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  line-height: 150%;
  color: var(--white);
  p {
    all: unset;
    padding: 0 20px;
    white-space: pre-line;
  }
  .pf_time_title {
    height: 21px;
    margin-bottom: 8px;
  }
  .pf_time {
    height: 55px;
    margin-bottom: 16px;
    line-height: 21px;
  }
  .poster_img {
    width: 100%;
    margin-bottom: 32px;
  }
  .pf_desc {
    line-height: 20px;
  }
`;
