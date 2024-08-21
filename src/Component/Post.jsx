import { useContext } from "react";
import styles from "./Post.module.css";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PostList } from "../Store/post-list";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          <MdDelete />
        </span>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div className={styles.hastag}>
          {post.tags.map((item) => "#" + item + " ")}
        </div>
        <p className={`card-text ${styles.reaction}`}>
          <button
            style={{ fontSize: "16px", cursor: "pointer", border: "none" }}
          >
            <FaThumbsUp /> Like
          </button>
          {post.reactions.likes}
          <button
            style={{ fontSize: "16px", cursor: "pointer", border: "none" }}
          >
            <FaThumbsDown /> Like
          </button>
          {post.reactions.dislikes}
        </p>
      </div>
    </div>
  );
};
export default Post;
