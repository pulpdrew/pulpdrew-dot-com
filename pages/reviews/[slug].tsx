import { GetStaticPaths, GetStaticProps } from "next";
import Nav, { NavItem } from "../../components/nav";
import styles from "../../styles/post.module.css";
import Head from "next/head";
import { BookReview, BookReviewService } from "../../lib/review";

const BookReviewPage: React.FC<{review: BookReview}> = ({ review }) => {
  return (
    <div>
      <Head>
        <title>Review: {review.title}</title>
      </Head>
      
      <Nav selected={NavItem.BOOKS}></Nav>
      
      <div className="sm:container mx-auto md:px-20">
        <h1 className="text-3xl mt-5 mb-1">{review.title}</h1>
        <h2 className="text-xl mb-5">{review.date}</h2>
        <span className={styles.post} dangerouslySetInnerHTML={{ __html: review.html }}></span>
      </div>
    </div>
    
  );
};
export default BookReviewPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = new BookReviewService().reviews.map(review => {
    return {
      params: { slug: review.slug },
    };
  });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const review = new BookReviewService().reviews.find(review => review.slug === params.slug);
  return { props: { review: review } };
}