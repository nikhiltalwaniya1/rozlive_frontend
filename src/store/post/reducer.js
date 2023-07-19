import {
  DELETE_COMMENT,
  DELETE_POST,
  GET_COMMENT,
  GET_LIKE,
  GET_POST,
} from "./types";

const initialState = {
  post: [],
  comment: [],
  like: [],
  totalPost: 0,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload.post,
        totalPost: action.payload.total,
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

    case DELETE_POST:
      return {
        ...state,
        post: state.post.filter((post) => post._id !== action.payload),
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

export default postReducer;
