import axios from "axios";

const allApi = axios.create({
  baseURL: "https://api.codingnome.dev"
});

export const getPostsList = (univid, postid) => {
  const Post = allApi.get(`/Community/${univid}/${postid}`);
  return Post;
};

export const getCommunityList = univid => {
  const List = allApi.get(`/Community/${univid}`);
};
