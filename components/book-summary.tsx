import { BookSummaryData } from "../lib/review";
import { TagChipList } from "./tag-chip";

export interface BookSummaryProps {
  review: BookSummaryData;
}

const BookSummary: React.FC<BookSummaryProps> = ({ review }) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between mb-2 align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{review.title}</h2>
        <p>{review.date}</p>
      </div>
      <TagChipList tags={review.tags}></TagChipList>
      <p className="mt-2">{review.summary}</p>
    </article>
  );
}

export default BookSummary;