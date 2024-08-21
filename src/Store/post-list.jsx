import { useEffect, useReducer, useState } from "react";
import { createContext } from "react";
let idIncrementer = 1;
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fating: false,
});
const default_post_value = [];

const postListReducer = (curruntState, action) => {
  let newList = curruntState;
  if (action.typeof === "DELETE_POST") {
    newList = curruntState.filter((post) => post.id !== action.payLoad.id);
  } else if (action.typeof === "ADD_POST") {
    idIncrementer++;
    let newPost = {
      id: idIncrementer,
      title: action.payLoad.titleValue,
      body: action.payLoad.bodyValue,
      reactions: {
        likes: action.payLoad.reactionsValue.likes,
        dislikes: action.payLoad.reactionsValue.dislikes,
      },
      userId: action.payLoad.userIdValue,
      tags: action.payLoad.tagValue,
    };
    newList = [newPost, ...curruntState];
  } else if (action.typeof === "ADD_INETIAL_POSTS") {
    newList = action.payLoad.posts;
  }
  return newList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    default_post_value
  );

  const addPost = (
    titleValue,
    bodyValue,
    reactionsValue,
    tagValue,
    userIdValue
  ) => {
    const action = {
      typeof: "ADD_POST",
      payLoad: {
        titleValue,
        bodyValue,
        reactionsValue,
        tagValue,
        userIdValue,
      },
    };
    dispatchPostList(action);
  };

  const deletePost = (id) => {
    const action = {
      typeof: "DELETE_POST",
      payLoad: {
        id,
      },
    };
    dispatchPostList(action);
  };
  const addInitialPost = (posts) => {
    const action = {
      typeof: "ADD_INETIAL_POSTS",
      payLoad: {
        posts,
      },
    };
    dispatchPostList(action);
  };
  const [fating, setFating] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFating(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setFating(false);
        console.log(data.posts);
      });
    return () => {
      controller.abort();
    };
  }, []);
  // useEffect(() => {
  //   fetch("https://dummyjson.com/posts/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: "I am in love with someone.",
  //       userId: 5,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);
  return (
    <PostList.Provider value={{ postList, addPost, fating, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
