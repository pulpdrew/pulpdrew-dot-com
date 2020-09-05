import Head from 'next/head'
import { GetStaticProps } from 'next';
import Nav, { NavItem } from '../../components/nav';
import PostSummary from '../../components/post-summary';
import { Post, PostService } from '../../lib/post';
import { mostRecentFirst } from '../../lib/utils';

interface TechPostsPageProps {
  posts: Post[];
}

const TechPostsPage: React.FC<TechPostsPageProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Tech</title>
      </Head>

      <Nav selected={NavItem.TECH}></Nav>

      <main className="sm:container mx-auto mt-10 md:px-20">
        {posts.map((post) => <PostSummary post={post} key={post.slug}></PostSummary>)}
      </main>

    </div>
  )
}

export default TechPostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = new PostService().posts.filter(post => post.tags.includes("tech")).sort(mostRecentFirst);

  return {
    props: {
      posts: posts
    }
  };
};