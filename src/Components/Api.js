import axios from "axios";

const allApi = axios.create({
  baseURL: "https://api.codingnome.dev"
});

export const getPostsList = async (univid, postid) => {
  const Post = await allApi
    .get(`/Community/${univid}/${postid}`)
    .catch(function(error) {});
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
  const writer = localStorage.getItem("userId");
  await allApi.post(`/Community/${univid}/${postid}/Comments`, {
    writer: writer,
    body: body
  });
};

export const postCommunityPut = async (univid, postid, title, body) => {
  const writer = localStorage.getItem("userId");
  await allApi.put(`/Community/${univid}/${postid}`, {
    title: title,
    body: body,
    writer: writer
  });
};

//댓글 삭제
export const deleteCommunityComments = async (univid, postid, commentId) => {
  await allApi.delete(`/Community/${univid}/${postid}/Comments/${commentId}`);
};

//댓글 수정
export const putCommunityComments = async (univid, postid, commentId, body) => {
  const writer = localStorage.getItem("userId");
  await allApi.put(`/Community/${univid}/${postid}/Comments/${commentId}`, {
    body: body,
    writer: writer
  });
};
