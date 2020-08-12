import Post from "../types/post";

export interface PostSummaryProps {
  post: Post;
}

const PostSummary: React.FC<PostSummaryProps> = ({post}) => {
  return (
    <article className="mt-10">
      <div className="flex justify-between mb-3 align-bottom flex-wrap">
        <h2 className="text-lg font-bold mr-5">{post.title}</h2>
      <p>{post.date.toLocaleDateString()}</p>
      </div>
      <p>{post.summary}</p>
      <a href={`/posts/${post.slug}`} className="text-sm">Read more...</a>
    </article>
  );
}

export default PostSummary;