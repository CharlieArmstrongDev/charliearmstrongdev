import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/db/kv';
import { Post } from '@/types/post'; // Assuming you have a Post type defined

interface BlogPostProps {
  post: Post | null;
}

const BlogPostPage: React.FC<BlogPostProps> = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-4">{post.content}</div>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const post = await getPostBySlug(slug);

  return {
    props: {
      post,
    },
    revalidate: 10, // ISR: Revalidate every 10 seconds
  };
};

export default BlogPostPage;