import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const CategoryList = ({ data }) => {
  return (
    <Base>
      {data.map((v) => {
        return (
          <>
            <CategoryItem href={`/blog/categories/${v}`}>{v}</CategoryItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: grid;
  padding: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const CategoryItem = styled(Link)`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
`;
export default CategoryList;