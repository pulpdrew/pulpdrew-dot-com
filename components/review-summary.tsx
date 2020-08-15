import Link from "next/link";
import { BookReview } from "../lib/review";

export interface BookReviewSummaryProps {
  review: BookReview;
}

const BookReviewSummary: React.FC<BookReviewSummaryProps> = ({ review }) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between mb-3 align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{review.title}</h2>
        <p>{review.date}</p>
      </div>
      <p>{review.summary}</p>
      <Link href="/reviews/[slug]" as={`/reviews/${review.slug}`}><a className="text-sm">Read full review...</a></Link>
    </article>
  );
}

export default BookReviewSummary;