import { useContext } from "react";
import { useRef } from "react";
import { PostList } from "../Store/post-list";

const CreatePost = () => {
  const title = useRef();
  const body = useRef();
  const reactions = useRef();
  const tag = useRef();
  const userId = useRef();
  let { addPost } = useContext(PostList);
  const handalSumbit = (event) => {
    event.preventDefault();
    const titleValue = title.current.value;
    const bodyValue = body.current.value;
    const reactionsValue = { likes: reactions.current.value, dislikes: 0 };
    const tagValue = tag.current.value.split(" ");
    const userIdValue = userId.current.value;

    title.current.value = "";
    body.current.value = "";
    reactions.current.value = "";
    tag.current.value = "";
    userId.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleValue,
        body: bodyValue,
        reactions: reactionsValue,
        tags: tagValue,
        userId: userIdValue,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
    addPost(titleValue, bodyValue, reactionsValue, tagValue, userIdValue);
  };

  return (
    <div className="bd-example m-0 border-0">
      <form onSubmit={handalSumbit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            id="title"
            ref={title}
            placeholder="Please Input Title of the post"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Content
          </label>
          <textarea
            rows="4"
            className="form-control"
            id="body"
            ref={body}
            placeholder="Content for the post"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Reactions
          </label>
          <input
            className="form-control"
            id="reactions"
            ref={reactions}
            placeholder="How many People reacted to this post"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            HashTags
          </label>
          <input
            className="form-control"
            id="tags"
            ref={tag}
            placeholder="please mantion hastag with coma seperated"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            user Id
          </label>
          <input
            className="form-control"
            id="userId"
            ref={userId}
            placeholder="Please input your user Id"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
