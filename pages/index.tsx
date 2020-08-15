import Head from 'next/head'
import Nav, { NavItem } from '../components/nav';
import PostSummary from '../components/post-summary';
import { Post, PostService } from '../lib/post';
import { GetStaticProps } from 'next';
import { BookReviewService, BookReview } from '../lib/review';
import { Slugged, Typed, mostRecentFirst, Dated } from '../lib/utils';
import { BOOK_REVIEW_TYPE } from '../lib/types';
import BookReviewSummary from '../components/review-summary';

interface HomeProps {
  content: (Typed & Slugged)[];
}

const Home: React.FC<HomeProps> = ({ content }) =>  {
  return (
    <div>
      <Head>
        <title>Pulpdrew</title>
      </Head>

      <Nav selected={NavItem.MAIN}></Nav>

      <main className="sm:container mx-auto mt-10">
        {content.map((item) => {
          if (item.type === BOOK_REVIEW_TYPE) {
            return <BookReviewSummary review={item as BookReview} key={item.slug}></BookReviewSummary>
          } else {
            return <PostSummary post={item as Post} key={item.slug}></PostSummary>
          }
        })}
      </main>

    </div>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = new PostService().getPosts() as (Typed & Slugged & Dated)[];
  const reviews = new BookReviewService().getReviews() as (Typed & Slugged & Dated)[];
  const content = posts.concat(reviews).sort(mostRecentFirst);

  return {
    props: {
      content
    }
  };
};