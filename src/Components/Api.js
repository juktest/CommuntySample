import axios from "axios";

const allApi = axios.create({
  baseURL: "https://api.codingnome.dev"
});

export const getPostsList = (univid, postid, setError) => {
  const Post = allApi
    .get(`/Community/${univid}/${postid}`)
    .catch(function(error) {
      setError(true);
    });
  setError(false);
  return Post;
};

export const getCommunityList = async (univid, setError) => {
  const List = await allApi.get(`/Community/${univid}`).catch(function(error) {
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

export const postCommunityPost = async (title, body) => {
  await allApi.post(`/Community/1`, {
    writer: "testName",
    title: title,
    body: body
  });
};

export const deleteCommunityPost = async (univid, postid) => {
  const List = await allApi.delete(`/Community/${univid}/${postid}`);
};
