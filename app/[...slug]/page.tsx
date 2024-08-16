import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

import { StyledPost, SvgBlogInfo } from "./style";
import Giscus from "@/Components/Giscus";
import ContentHeader from "@/Components/ContentHeader";
import CopiedUrl from "@/Components/CopiedURL";
import SelectCategoryPost from "@/Components/SelectCategoryPost";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({
    params: { slug: post._raw.flattenedPath.split("/") },
  }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const slug = params.slug.join("/");
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "website",
      url: "https://taehyun-blog.vercel.app",
      title: post.title,
      description: post.description,
      siteName: "Taehyun blog",
    },
    twitter: {
      card: "summary_large_image",
      site: "https://taehyun-blog.vercel.app",
      title: post.title,
      description: post.description,
    },
  };
};

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug.join("/");
  const sortedPosts = allPosts.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
  const currentIndex = sortedPosts.findIndex(
    (p) => p._raw.flattenedPath === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const Content = getMDXComponent(post.body.code);

  const previousPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  return (
    <StyledPost>
      <ContentHeader {...post} />
      <div className="post-container">
        <article>
          <p className="category-state">{post.category}</p>
          <h1 className="post-title">{post.title}</h1>
          <div className="time-info">
            <time dateTime={post.date}>
              <SvgBlogInfo
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="32"
                viewBox="0 0 30 32"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="5.5"
                  width="29"
                  height="26"
                  rx="3.5"
                  stroke="black"
                />
                <rect
                  x="0.25"
                  y="11.25"
                  width="29.5"
                  height="0.5"
                  rx="0.25"
                  stroke="black"
                  stroke-width="0.5"
                />
                <rect
                  x="4.5"
                  y="16.5"
                  width="21"
                  height="4"
                  rx="1.5"
                  stroke="black"
                />
                <rect
                  x="4.5"
                  y="23.5"
                  width="21"
                  height="4"
                  rx="1.5"
                  stroke="black"
                />
                <rect
                  x="14.5"
                  y="0.5"
                  width="1"
                  height="7"
                  rx="0.5"
                  stroke="black"
                />
                <rect
                  x="6.5"
                  y="0.5"
                  width="1"
                  height="7"
                  rx="0.5"
                  stroke="black"
                />
                <rect
                  x="22.5"
                  y="0.5"
                  width="1"
                  height="7"
                  rx="0.5"
                  stroke="black"
                />
              </SvgBlogInfo>{" "}
              {format(new Date(post.date), "yyyy년 MM월 dd일")}
            </time>
            <SvgBlogInfo
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <circle cx="15" cy="15" r="14" stroke="black" stroke-width="2" />
              <rect
                x="14.5"
                y="6.5"
                width="1"
                height="9"
                rx="0.5"
                stroke="black"
              />
              <rect
                x="14.4178"
                y="15.2208"
                width="1.4"
                height="11.4"
                rx="0.7"
                transform="rotate(-35 14.4178 15.2208)"
                stroke="black"
                stroke-width="0.6"
              />
            </SvgBlogInfo>{" "}
            {post.time}
          </div>
          <Content />
          <CopiedUrl />
          {nextPost && (
            <Link href={`/${nextPost._raw.flattenedPath}`}>
              <div className="next-prev-container">
                <img src={nextPost.teaser === null ? "/no-image.png" : nextPost.teaser} alt={nextPost.title} />
                <span>
                  다음 포스트
                  <p>{nextPost.title}</p>
                  {nextPost.description}
                </span>
              </div>
            </Link>
          )}
          {previousPost && (
            <Link href={`/${previousPost._raw.flattenedPath}`}>
              <div className="next-prev-container">
                <img src={previousPost.teaser === null ? "/no-image.png" : previousPost.teaser} alt={previousPost.title} />
                <span>
                  이전 포스트
                  <p>{previousPost.title}</p>
                  {previousPost.description}
                </span>
              </div>
            </Link>
          )}
          <Giscus />
        </article>
        <SelectCategoryPost category={post.category} />
      </div>

    </StyledPost>
  );
};

export default PostLayout;
