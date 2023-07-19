import {
  DELETE_COMMENT,
  DELETE_VIDEO,
  GET_COMMENT,
  GET_LIKE,
  GET_VIDEO,
} from "./types";

const initialState = {
  video: [],
  comment: [],
  like: [],
  totalVideo: 0,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO:
      return {
        ...state,
        video: action.payload.video,
        totalVideo: action.payload.total,
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case GET_LIKE:
      return {
        ...state,
        like: action.payload,
      };

    case DELETE_VIDEO:
      return {
        ...state,
        video: state.video.filter((video) => video._id !== action.payload),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comment: state.comment.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default videoReducer;
