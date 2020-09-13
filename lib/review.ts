import path from 'path';
import { Slugged, Dated, mostRecentFirst, readMatters, Typed } from './utils';
import { BOOK_REVIEW_TYPE } from './types';

const BOOK_REVIEW_DIR = path.join(process.cwd(), 'books');

export interface BookSummaryData extends Slugged, Dated, Typed {
  title: string;
  author: string;
  summary: string;
  tags: string[];
}

export class BookSummaryService {
  get reviews(): BookSummaryData[] {
    return readMatters(BOOK_REVIEW_DIR)
      .map<BookSummaryData>((matter) => {

        let date = '';
        try {
          date = (matter.data.date as Date).toLocaleDateString();
        } catch (err) {
          console.error(err);
        }

        return {
          title: matter.data.title,
          author: matter.data.author,
          summary: matter.data.summary,
          slug: matter.slug,
          tags: matter.data.tags,
          type: BOOK_REVIEW_TYPE,
          date,
        };
      })
      .sort(mostRecentFirst);
  }
}