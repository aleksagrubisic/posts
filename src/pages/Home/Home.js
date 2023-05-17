import React, {useMemo, useState} from 'react';
import AddPost from '../../components/Posts/AddPost/AddPost';
import Post from '../../components/Posts/Post/Post';
import UpdatePost from '../../components/Posts/UpdatePost/UpdatePost';
import {usePostContext} from '../../context/posts.context';

const Home = () => {

  const {isLoading, error, posts} = usePostContext();

  const [postID, setPostID] = useState(null);

  const updateHandler = (id) => {
    setPostID(id)
  };

  let content;

  useMemo(() => {
    if(isLoading) {
      content = <p>PLEASE WAIT</p>;
    } else if (error) {
      content = <p>{error.message}</p>;
    } else if(posts) {
      if(posts.length) {
        content = <ul>
          {posts.map(post => <Post key={post.id} id={post.id} onUpdate={updateHandler}>{post.text}</Post>)}
        </ul>
      } else {
        content = <p>no posts.</p>
      }
    }
  }, [content, isLoading, error, posts, postID])

  return (
    <>
      <AddPost />
      {content}
      {postID && <UpdatePost updatedPostID={postID} updatedPostHandler={updateHandler}/>}
    </>
  )
}

export default Home