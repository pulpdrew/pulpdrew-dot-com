import matter from "gray-matter";
import fs from 'fs';
import path from 'path';

export interface Slugged {
  slug: string;
}

export interface Typed {
  type: string;
}

export interface Dated {
  date: string;
}

export function mostRecentFirst(a: Dated, b: Dated) {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  return bDate.getTime() - aDate.getTime();
}

export type Matter = matter.GrayMatterFile<string> & Slugged;

export function readMatters(dir: string): Matter[] {
  return fs.readdirSync(dir)
    .map((filename) => {
      const fullPath = path.join(dir, filename);
      return {
        slug: filename.replace(/\.md$/, ''),
        ...matter(fs.readFileSync(fullPath, 'utf8')),
      }
    });
}