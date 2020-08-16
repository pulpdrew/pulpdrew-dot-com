import { GetStaticPaths, GetStaticProps } from "next";
import { Post, PostService } from "../../lib/post";
import Nav, { NavItem } from "../../components/nav";
import styles from "../../styles/post.module.css";
import Head from "next/head";

const PostPage: React.FC<{post: Post}> = ({ post }) => {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>
      
      <Nav selected={NavItem.NONE}></Nav>
      
      <div className="sm:container mx-auto md:px-20">
        <h1 className="text-3xl mt-5 mb-1">{post.title}</h1>
        <h2 className="text-xl mb-5">{post.date}</h2>
        <span className={styles.post} dangerouslySetInnerHTML={{ __html: post.html }}></span>
      </div>
    </div>
    
  );
};
export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = new PostService().posts.map(post => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = new PostService().posts.find(post => post.slug === params.slug);
  return { props: { post } };
}