import path from 'path';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import { Slugged, Dated, mostRecentFirst, readMatters, Typed } from './utils';
import { BOOK_REVIEW_TYPE } from './types';

const BOOK_REVIEW_DIR = path.join(process.cwd(), 'reviews');

export interface BookReview extends Slugged, Dated, Typed {
  title: string;
  author: string;
  link: string;
  summary: string;
  html: string;
  tags: string[];
}

export class BookReviewService {

  private md = new MarkdownIt();

  constructor() {
   this. md.use(highlightjs);
  }

  get reviews(): BookReview[] {
    return readMatters(BOOK_REVIEW_DIR)
      .map<BookReview>((matter) => {
        const html = this.md.render(matter.content);

        let date = '';
        try {
          date = (matter.data.date as Date).toLocaleDateString();
        } catch (err) {
          console.error(err);
        }

        return {
          title: matter.data.title,
          author: matter.data.author,
          link: matter.data.link,
          summary: matter.data.summary,
          slug: matter.slug,
          tags: matter.data.tags,
          type: BOOK_REVIEW_TYPE,
          date,
          html,
        };
      })
      .sort(mostRecentFirst);
  }
}