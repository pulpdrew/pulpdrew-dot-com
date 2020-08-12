import Head from 'next/head'
import Nav, { NavItem } from '../components/nav';
import PostSummary from '../components/post-summary';
import Post from '../lib/post';
import { GetStaticProps } from 'next';
import PostService from '../lib/post-service';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) =>  {
  return (
    <div>
      <Head>
        <title>Pulpdrew</title>
      </Head>

      <Nav selected={NavItem.MAIN}></Nav>

      <main className="sm:container mx-auto mt-10">
        {posts.map((post) => <PostSummary post={post} key={post.slug}></PostSummary>)}
      </main>

    </div>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: new PostService().getPosts(),
    }
  };
};