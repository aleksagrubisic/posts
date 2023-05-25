import React, {useMemo, useState} from 'react';
import AddPost from '../../components/Posts/AddPost/AddPost';
import Post from '../../components/Posts/Post/Post';
import UpdatePost from '../../components/Posts/UpdatePost/UpdatePost';
import {usePostContext} from '../../context/posts.context';
import {PostType} from '../../models/postType';

const Home = () => {

  const {isLoading, error, posts} = usePostContext();

  const [postID, setPostID] = useState<string | null>(null);

  const updateHandler = (id: string | null) => {
    setPostID(id);
  };

  const content = useMemo(() => {
    if (isLoading) return <p>PLEASE WAIT</p>;
    if (error) return <p>{error.message}</p>;
    return posts && posts.length ? (
      <ul>
        {posts.map((post: PostType) => (
          <Post key={post.id} id={post.id} onUpdate={updateHandler}>
            {post.text}
          </Post>
        ))}
      </ul>
    ) : (
      <p>no posts.</p>
    );
  }, [error, isLoading, posts]);

  return (
    <>
      <AddPost />
      {content}
      {!postID ? null : (
        <UpdatePost updatedPostID={postID} updatedPostHandler={updateHandler} />
      )}
    </>
  );
}

export default Home