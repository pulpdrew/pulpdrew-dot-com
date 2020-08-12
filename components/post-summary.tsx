import Post from "../lib/post";
import Link from "next/link";

export interface PostSummaryProps {
  post: Post;
}

const PostSummary: React.FC<PostSummaryProps> = ({post}) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between mb-3 align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{post.title}</h2>
      <p>{post.date}</p>
      </div>
      <p>{post.summary}</p>
      <Link href="/posts/[slug]" as={`/posts/${post.slug}`}><a className="text-sm">Read more...</a></Link>
    </article>
  );
}

export default PostSummary;