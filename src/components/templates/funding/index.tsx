import { useState } from "react";
import Check from "./check";
import Main from "./main";
import Tos from "./Tos";

const Funding = () => {
  const [pageNum, setPageNum] = useState(0);
  switch (pageNum) {
    case 1:
      return <Main setPageNum={setPageNum} />;
    case 2:
      return <Check setPageNum={setPageNum} />;
    default:
      return <Tos setPageNum={setPageNum} />;
  }
};

export default Funding;
