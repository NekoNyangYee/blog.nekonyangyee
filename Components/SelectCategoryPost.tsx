"use client"

import Link from "next/link";
import { Post, allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { StyledSelectCategoryPost } from "./styleSelectCategoryPost";
import { usePathname } from "next/navigation";

interface SelectCategoryPostProps {
  category: string;
}

const SelectCategoryPost = ({ category }: SelectCategoryPostProps) => {
  const categoryPosts: Post[] = allPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const pathName = usePathname();
  console.log(pathName);

  return (
    <StyledSelectCategoryPost>
      <h1>"{category}"의 다른 게시물</h1>
      <div className="selectCategory-post-container">
        {categoryPosts.map((post) => (
          <Link href={`/${post._raw.flattenedPath}`}>
            <div key={post._id} className="category-post-container">
              <img src={post.teaser === null ? "/no-image.png" : post.teaser} alt={post.title} />
              <h2>{post.title}</h2>
              <time dateTime={post.date}>{format(new Date(post.date), "yyyy년 MM월 dd일")}</time>
            </div>
          </Link>
        ))}
      </div>
    </StyledSelectCategoryPost>
  );
};

export default SelectCategoryPost;