import { request } from "graphql-request";

const fetcher = async (query: string) => {
  const res = await request(API_URL, query);
  return res;
};

export default fetcher;
