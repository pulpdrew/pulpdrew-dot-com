import Post from "./post";
import path from 'path';
import fs from 'fs';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import highlightjs from 'markdown-it-highlightjs';

const POSTS_DIR = path.join(process.cwd(), 'posts');

export default class PostService {

  private static posts: Post[] = null;

  getPosts(): Post[] {

    // Used cached posts if available
    if (PostService.posts) return PostService.posts;

    // Initialize the markdown renderer with a syntaxy highlighter
    const md = new MarkdownIt();
    md.use(highlightjs);

    PostService.posts = fs.readdirSync(POSTS_DIR)
      .map((fileName) => {
        // Read markdown file as string
        const fullPath = path.join(POSTS_DIR, fileName);

        // Parse the front matter (metadata)
        const fileContent = matter(fs.readFileSync(fullPath, 'utf8'));

        // Render the content
        const rendered = md.render(fileContent.content);

        // Construct the Post
        return <Post>{
          title: fileContent.data.title,
          summary: fileContent.data.summary,
          date: (fileContent.data.date as Date).toLocaleDateString(),
          html: rendered,
          slug: fileName.replace(/\.md$/, ''),
        };
      })
      .sort((a, b) => {

        // Sort most recent first
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      });

    return PostService.posts;
  }
}