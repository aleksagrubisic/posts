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

  // let content;

  // useMemo(() => {
  //   if(isLoading) {
  //     content = <p>PLEASE WAIT</p>;
  //   } else if (error) {
  //     content = <p>{error.message}</p>;
  //   } else if(posts) {
  //     if(posts.length) {
  //       content = <ul>
  //         {posts.map(post => <Post key={post.id} id={post.id} onUpdate={updateHandler}>{post.text}</Post>)}
  //       </ul>
  //     } else {
  //       content = <p>no posts.</p>
  //     }
  //   }
  // }, [content, isLoading, error, posts, postID])

  // Ovako mi se cini malo preglednije
  // Ali bih ja mozda loading i error ovdojio od content-a
  const content = useMemo(() => {
    if (isLoading) return <p>PLEASE WAIT</p>;
    if (error) return <p>{error.message}</p>;
    return posts && posts.length ? (
      <ul>
        {posts.map((post) => (
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
      {/* {postID && <UpdatePost updatedPostID={postID} updatedPostHandler={updateHandler}/>} */}
      {/* Umesto && bih koristio ternary operator, jer u slucaju da npr. ako ocemo da prikazemo listu samo ako imamo itema i stavimo item.length && ... odstampace nam 0. I onda je bolje staviti !item.length ? null : ...
      Zbog konzistencije bih onda svuda tako stavljao iako u ovom slucaju nije potrebno */}
      {!postID ? null : (
        <UpdatePost updatedPostID={postID} updatedPostHandler={updateHandler} />
      )}
    </>
  );
}

export default Home