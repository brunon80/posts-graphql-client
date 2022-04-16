import React from 'react';
import { GET_POST_USER } from '../graphql/posts/queries'
import { useQuery } from "@apollo/client"

function Posts({ userId }) {
  const { loading, error, data } = useQuery(GET_POST_USER, {
    variables: {
      userId
    }
  });

  if (loading) return <p>Loading your posts...</p>;
  if (error) return <p>Error while loading posts</p>;

  return (
    <>
      {
        data.posts.map(post => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr />
          </div>
        ))
      }
    </>
  );
}

export default Posts;