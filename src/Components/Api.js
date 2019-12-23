import axios from "axios";

const allApi = axios.create({
  baseURL: "http://172.30.1.1:8080"
});

export const getPostsList = (univid, postid) => {
  const Post = allApi.get(`/Community/${univid}/${postid}`);
  return Post;
};
