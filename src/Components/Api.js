import axios from "axios";

const allApi = axios.create({
  baseURL: "https://api.codingnome.dev"
});

export const getPostsList = (univid, postid, setError) => {
  setError(false);
  const Post = allApi
    .get(`/Community/${univid}/${postid}`)
    .catch(function(error) {
      setError(true);
    });
  return Post;
};

export const getCommunityList = async (univid, setError) => {
  setError(false);
  const List = await allApi.get(`/Community/${univid}`).catch(function(error) {
    setError(true);
  });
  return List;
};

export const getRoomList = async (univid, setError) => {
  setError(false);
  const List = await allApi.get(`/roomdata/${univid}`).catch(function(error) {
    setError(true);
  });
  return List;
};

export const postCommunityPost = async (title, body) => {
  await allApi
    .post(`/Community/1`, {
      writer: localStorage.getItem("userId"),
      title: title,
      body: body
    })
    .catch(function() {
      console.log("실패");
    });
};

export const deleteCommunityPost = async (univid, postid) => {
  await allApi.delete(`/Community/${univid}/${postid}`);
};

export const getCommunityComments = async (univid, postid) => {
  const List = await allApi.get(`/Community/${univid}/${postid}/Comments`);
  return List;
};

export const postCommunityComments = async (body, univid, postid) => {
  await allApi.post(`/Community/${univid}/${postid}/Comments`, {
    writer: "testName",
    body: body
  });
};
