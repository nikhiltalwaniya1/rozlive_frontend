import axios from "axios";
import { baseURL, key } from "../../util/Config";
import { Toast } from "../../util/Toast";
import {
  GET_COMMENT,
  GET_LIKE,
  GET_VIDEO,
  DELETE_VIDEO,
  DELETE_COMMENT,
} from "./types";

export const getVideo = (id, start, limit, sDate, eDate) => (dispatch) => {
  const url =
    id !== null
      ? `getVideo?userId=${id}`
      : `getVideo?start=${start}&limit=${limit}&startDate=${sDate}&endDate=${eDate}`;
  axios
    .get(url)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_VIDEO,
          payload: { video: res.data.video, total: res.data.total },
        });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const getComment = (videoId) => (dispatch) => {
  axios
    .get(`comment?videoId=${videoId}&type=ADMIN`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: GET_COMMENT, payload: res.data.data });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const getLike = (videoId) => (dispatch) => {
  axios
    .get(`likes?videoId=${videoId}&type=ADMIN`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: GET_LIKE, payload: res.data.data });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const deleteVideo = (videoId) => (dispatch) => {
  axios
    .delete(`deleteRelite/?videoId=${videoId}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({ type: DELETE_VIDEO, payload: videoId });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const allowDisallowComment = (videoId) => (dispatch) => {
  axios
    .patch(`/relite/commentSwitch/${videoId}`)
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("VideoDetail", JSON.stringify(res.data.video));
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const deleteComment = (commentId) => (dispatch) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      key: key,
    },
  };

  fetch(`${baseURL}comment?commentId=${commentId}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.status) {
        dispatch({ type: DELETE_COMMENT, payload: commentId });
      } else {
        Toast("error", res.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};
