import Head from 'next/head'
import { GetStaticProps } from 'next';
import { BookReview, BookReviewService } from '../../lib/review';
import Nav, { NavItem } from '../../components/nav';
import PostSummary from '../../components/post-summary';
import { Post } from '../../lib/post';
import { mostRecentFirst } from '../../lib/utils';
import BookReviewSummary from '../../components/review-summary';

interface BookReviewPageProps {
  reviews: BookReview[];
}

const BookReviewPage: React.FC<BookReviewPageProps> = ({ reviews }) => {
  return (
    <div>
      <Head>
        <title>Pulpdrew</title>
      </Head>

      <Nav selected={NavItem.BOOKS}></Nav>

      <main className="sm:container mx-auto mt-10">
        {reviews.map((review) => <BookReviewSummary review={review} key={review.slug}></BookReviewSummary>)}
      </main>

    </div>
  )
}

export default BookReviewPage;

export const getStaticProps: GetStaticProps = async () => {
  const reviews = new BookReviewService().reviews.sort(mostRecentFirst);

  return {
    props: {
      reviews
    }
  };
};