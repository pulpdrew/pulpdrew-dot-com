import Link from "next/link";
import { BookReview } from "../lib/review";
import { TagChipList } from "./tag-chip";

export interface BookReviewSummaryProps {
  review: BookReview;
}

const BookReviewSummary: React.FC<BookReviewSummaryProps> = ({ review }) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between mb-2 align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{review.title}</h2>
        <p>{review.date}</p>
      </div>
      <TagChipList tags={review.tags}></TagChipList>
      <p className="mt-2">{review.summary}</p>
      <Link href="/reviews/[slug]" as={`/reviews/${review.slug}`}><a className="text-sm">Read full review...</a></Link>
    </article>
  );
}

export default BookReviewSummary;