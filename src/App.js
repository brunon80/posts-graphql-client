import { useQuery, useMutation } from "@apollo/client"
import './App.css';
import { GET_USER } from './graphql/user/queries'
import { GET_POST_USER } from './graphql/posts/queries'
import Posts from './components/Post'
import { CREATE_POST } from './graphql/posts/mutations'

const USER_ID = "625861c955423386bc4cdb64"

function App() {

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      userId: USER_ID
    }
  });

  const [
    createPost,
    {
      error: createPostError,
    }
  ] = useMutation(CREATE_POST, {
    // refetchQueries: [
    //   {
    //     query: GET_POST_USER,
    //     variables: {
    //       userId: USER_ID
    //     }
    //   }
    // ]
    update(cache, { data: { createPost } }) {
      const { posts } = cache.readQuery({
        query: GET_POST_USER,
        variables: {
          userId: USER_ID
        }
      });

      cache.writeQuery({
        query: GET_POST_USER,
        variables: {
          userId: USER_ID
        },
        data: {
          posts: [
            ...posts,
            createPost
          ]
        }
      });
    }
  });

  function onSubmit(e) {
    e.preventDefault();
    const title = e.target.postTitle.value;
    const content = e.target.content.value;
    console.log(title, content);

    createPost({
      variables: {
        data: {
          title,
          content,
          author: USER_ID
        }
      }
    });

  e.target.postTitle.value = '';
  e.target.content.value = '';
}

if (loading) return <p>Loading...</p>;
if (error || createPostError) return <p>Error :(</p>;

return (
  <>
    <header className="header">
      <div className="container">
        <h1>{`Olá ${data.user.fullName}`}</h1>
      </div>
    </header>
    <main className="main">
      <div className="container">
        <form onSubmit={onSubmit}>
          <input placeholder="Título" name="postTitle" type="text" />
          <input placeholder="Conteúdo" name="content" type="text" />
          <button
            type="submit">{'Criar'}
          </button>
        </form>
      </div>
      <hr />
      <div className="container">
        <h2>Posts</h2>
      </div>
      <Posts userId={USER_ID} />
    </main>
  </>
);
}

export default App;
