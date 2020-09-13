import Head from 'next/head'
import Nav, { NavItem } from '../components/nav';
import PostSummary from '../components/post-summary';
import { Post, PostService } from '../lib/post';
import { GetStaticProps } from 'next';
import { BookSummaryService, BookSummaryData } from '../lib/review';
import { Slugged, Typed, mostRecentFirst, Dated } from '../lib/utils';
import { BOOK_REVIEW_TYPE } from '../lib/types';
import BookSummary from '../components/book-summary';

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

      <main className="sm:container mx-auto mt-10 md:px-20 mb-10">
        {content.map((item) => {
          if (item.type === BOOK_REVIEW_TYPE) {
            return <BookSummary review={item as BookSummaryData} key={item.slug}></BookSummary>
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
  const posts = new PostService().posts as (Typed & Slugged & Dated)[];
  const reviews = new BookSummaryService().reviews as (Typed & Slugged & Dated)[];
  const content = posts.concat(reviews).sort(mostRecentFirst);

  return {
    props: {
      content
    }
  };
};