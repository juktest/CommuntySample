import axios from "axios";

const allApi = axios.create({
  baseURL: "http://api.codingnome.dev"
});

export const getPostsList = (univid, postid, setError) => {
  const Post = allApi.get(`/Community/${univid}/${postid}`).catch(function(error) {
    setError(true);
  });
  setError(false);;
  console.log("Post",Post);
  return Post;
};

export const getCommunityList = (univid, setError) => {
  const List = allApi.get(`/Community/${univid}`).catch(function(error) {
    setError(true);
  });
  setError(false);
  return List;
};

export const getRoomList = (univid, setError) => {
  const List = allApi.get(`/roomdata/${univid}`).catch(function(error) {
    setError(true);
  });
  setError(false);
  return List;
};

export const postCommunityPost = (title, body) => {
  allApi.post(`/Community/1`, {
    writer: "testName",
    title: title,
    body: body
  });
};
