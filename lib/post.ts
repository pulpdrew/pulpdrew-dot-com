import path from 'path';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import { Slugged, Dated, mostRecentFirst, readMatters, Typed } from './utils';
import { POST_TYPE } from './types';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export interface Post extends Slugged, Dated, Typed {
  title: string;
  summary: string;
  html: string;
  tags: string[];
}

export class PostService {

  private md = new MarkdownIt();

  constructor() {
   this. md.use(highlightjs);
  }

  get posts(): Post[] {
    return readMatters(POSTS_DIR)
      .map<Post>((matter) => {
        const html = this.md.render(matter.content);

        let date = '';
        try {
          date = (matter.data.date as Date).toLocaleDateString();
        } catch (err) {
          console.error(err);
        }

        return {
          title: matter.data.title,
          summary: matter.data.summary,
          slug: matter.slug,
          tags: matter.data.tags,
          type: POST_TYPE,
          date,
          html,
        };
      })
      .sort(mostRecentFirst);
  }
}