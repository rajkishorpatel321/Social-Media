import { useContext, useEffect, useState } from "react";
import { PostList as postListData } from "../Store/post-list";

import Post from "./Post";
import Welcome from "./Welcome";
import Loading from "./Loading";

const PostList = () => {
  const { postList, fating } = useContext(postListData);
  return (
    <>
      {fating && <Loading />}
      {!fating && postList.length === 0 && <Welcome />}
      {!fating && postList.map((post) => <Post post={post} />)}
    </>
  );
};
export default PostList;
