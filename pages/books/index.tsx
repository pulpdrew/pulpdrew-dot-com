import Head from 'next/head'
import { GetStaticProps } from 'next';
import { BookSummaryData, BookSummaryService } from '../../lib/review';
import Nav, { NavItem } from '../../components/nav';
import PostSummary from '../../components/post-summary';
import { Post } from '../../lib/post';
import { mostRecentFirst } from '../../lib/utils';
import BookSummary from '../../components/book-summary';

interface BookReviewPageProps {
  reviews: BookSummaryData[];
}

const BookReviewPage: React.FC<BookReviewPageProps> = ({ reviews }) => {
  return (
    <div>
      <Head>
        <title>Pulpdrew</title>
      </Head>

      <Nav selected={NavItem.BOOKS}></Nav>

      <main className="sm:container mx-auto mt-10 md:px-20">
        {reviews.map((review) => <BookSummary review={review} key={review.slug}></BookSummary>)}
      </main>

    </div>
  )
}

export default BookReviewPage;

export const getStaticProps: GetStaticProps = async () => {
  const reviews = new BookSummaryService().reviews.sort(mostRecentFirst);

  return {
    props: {
      reviews
    }
  };
};