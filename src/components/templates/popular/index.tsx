import { useRouter } from "next/router";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { Header } from "src/components/molecules";
import NotiList from "src/components/molecules/NotiList";
import { NotiDataProps } from "src/interfaces/PFData";
import styled from "styled-components";

interface PopularProps {
  NotiDatas: NotiDataProps[];
}
const Popular = ({ NotiDatas }: PopularProps) => {
  const router = useRouter();
  return (
    <Container>
      <Header
        title="인기있는 소식"
        leftIcon={<ArrowLeftIcon onClick={() => router.back()} />}
      />
      <NotiList NotiDatas={NotiDatas} />
    </Container>
  );
};

export default Popular;

const Container = styled.div`
  width: 100%;
  padding-top: 73px;
`;
