import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const CategoryList = ({ data, posts }) => {
  return (
    <Base>
      <CategoryItem href={"/blog/posts"}>{`전체 (${posts.length})`}</CategoryItem>
      {data.map((v) => {
        const length = posts.filter((v1) => v1.properties.category.select.name === v).length;
        return (
          <>
            <CategoryItem href={`/blog/posts?category=${v}`}>{`${v} (${length})`}</CategoryItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  padding: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CategoryItem = styled(Link)`
  box-sizing: border-box;
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export default CategoryList;
