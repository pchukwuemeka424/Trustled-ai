type BlogPostBodyProps = {
  content: string;
};

export function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
