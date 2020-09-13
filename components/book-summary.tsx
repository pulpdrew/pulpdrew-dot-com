import { BookSummaryData } from "../lib/book";
import { TagChipList } from "./tag-chip";

export interface BookSummaryProps {
  review: BookSummaryData;
}

const BookSummary: React.FC<BookSummaryProps> = ({ review: summary }) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{summary.title}</h2>
        <p>{summary.date}</p>
      </div>
      <span>Author: {summary.author}</span>
      <span className="ml-5">Rating: {summary.rating}/10</span>
      <p className="mt-2">{summary.summary}</p>
      <TagChipList tags={summary.tags}></TagChipList>
    </article>
  );
}

export default BookSummary;